'use client';

import { useEffect, useRef } from 'react';

interface Props {
    onSelect: (data: { adresse: string; postnummer: string }) => void;
    placeholder?: string;
}

export default function AddressAutocomplete({ onSelect }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!window.google || !inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'no' },
        });


        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.address_components) return;

            let adresse = '';
            let postnummer = '';

            for (const comp of place.address_components) {
                const types = comp.types;
                if (types.includes('route')) adresse += comp.long_name + ' ';
                if (types.includes('street_number')) adresse = comp.long_name + ' ' + adresse;
                if (types.includes('postal_code')) postnummer = comp.long_name;
            }

            onSelect({ adresse: adresse.trim(), postnummer });
        });
    }, []);

    return <input ref={inputRef} type="text" placeholder="Skriv inn adresse" className="input" />;
}
