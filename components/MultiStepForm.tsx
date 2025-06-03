'use client';

import AddressAutocomplete from '@/components/AddressAutocomplete';
import { useState } from 'react';

const steps = [
    'Flyttedato',
    'Flyttelasset',
    'Nåværende adresse',
    'Etasjer og bod',
    'Ny adresse',
    'Etasjer ny bolig',
    'Spesialgjenstander',
    'Kontaktinfo',
];

export default function MultiStepForm() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const finalValue = type === 'checkbox' ? target.checked : value;

        setFormData((prev: any) => ({
            ...prev,
            [name]: finalValue,
        }));
    };


    const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const handleSubmit = async () => {
        await fetch('https://hooks.zapier.com/hooks/catch/xxx/yyy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        alert('Takk! Innsendingen er sendt.');
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Steg {step + 1} av {steps.length}: {steps[step]}
            </h2>

            <form className="space-y-4">
                {step === 0 && (
  <>
    <label className="block">
      Ønsket flyttedato?
      <input type="date" name="flyttedato" onChange={handleChange} className="input mt-1" />
    </label>

    <label className="block">
      Er flyttedatoen fleksibel?
      <select name="dato_fleksibel" onChange={handleChange} className="input mt-1">
        <option value="">Velg et alternativ</option>
        <option value="Ja">Ja</option>
        <option value="Nei">Nei</option>
      </select>
    </label>

                        <label className="block">
                            Hvor fleksibel er datoen?
                            <select name="fleksibel_margin" onChange={handleChange} className="input mt-1">
                                <option value="">Velg margin</option>
                                <option value="1 dag">1 dag</option>
                                <option value="2 dager">2 dager</option>
                                <option value="3+ dager">3+ dager</option>
                            </select>
                        </label>

                        <label className="block">
                            Ønsker du at vi pakker gjenstandene?
                            <select name="pakking" onChange={handleChange} className="input mt-1">
                                <option value="">Velg et alternativ</option>
                                <option value="Ja">Ja</option>
                                <option value="Nei">Nei</option>
                            </select>
                        </label>

                        <label className="block">
                            Ønsker du utvask av nåværende bolig?
                            <select name="utvask" onChange={handleChange} className="input mt-1">
                                <option value="">Velg et alternativ</option>
                                <option value="Ja">Ja</option>
                                <option value="Nei">Nei</option>
                            </select>
                        </label>
                    </>
                )}


                {step === 1 && (
                    <>
                        <select name="volum" onChange={handleChange} className="input">
                            <option value="">Hvor stort er flyttelasset?</option>
                            <option value="Henger">Fyller en henger</option>
                            <option value="Lastebil">En lastebil</option>
                            <option value="To lastebiler">To lastebiler</option>
                        </select>
                        <select name="husstand" onChange={handleChange} className="input">
                            <option value="">Antall personer i husstanden</option>
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </>
                )}

                {step === 2 && (
                    <>
                        <AddressAutocomplete
                            placeholder="Adresse"
                            onSelect={({ adresse, postnummer }) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    adresse_nå: adresse,
                                    postnummer_nå: postnummer,
                                }))
                            }
                        />
                        <input name="gatenr_nå" placeholder="Gatenummer" onChange={handleChange} className="input" />
                        <input name="postnummer_nå" type="number" placeholder="Postnummer" onChange={handleChange} className="input" />
                        <input name="kvm_nå" type="number" placeholder="Boligens størrelse (kvm)" onChange={handleChange} className="input" />
                        <input name="rom_nå" type="number" placeholder="Antall rom" onChange={handleChange} className="input" />
                        <select name="boligtype_nå" onChange={handleChange} className="input">
                            <option value="">Boligtype</option>
                            <option value="Leilighet">Leilighet</option>
                            <option value="Enebolig">Enebolig</option>
                            <option value="Tomannsbolig">Tomannsbolig</option>
                            <option value="Rekkehus">Rekkehus</option>
                        </select>
                    </>
                )}

                {step === 3 && (
                    <>
                        <select name="etasjer_nå" onChange={handleChange} className="input">
                            <option value="">Antall etasjer</option>
                            {[1, 2, 3, 4].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        <select name="bod" onChange={handleChange} className="input">
                            <option value="">Flytting fra bod?</option>
                            <option value="Ja">Ja</option>
                            <option value="Nei">Nei</option>
                        </select>
                        <select name="garasje" onChange={handleChange} className="input">
                            <option value="">Flytting fra garasje?</option>
                            <option value="Ja">Ja</option>
                            <option value="Nei">Nei</option>
                        </select>
                        <input name="parkering_nå" type="number" placeholder="Avstand til parkering (meter)" onChange={handleChange} className="input" />
                    </>
                )}

                {step === 4 && (
                    <>
                        <input name="adresse_ny" placeholder="Ny adresse" onChange={handleChange} className="input" />
                        <input name="gatenr_ny" placeholder="Gatenr" onChange={handleChange} className="input" />
                        <input name="postnummer_ny" type="number" placeholder="Postnummer" onChange={handleChange} className="input" />
                        <input name="kvm_ny" type="number" placeholder="Boligens størrelse (kvm)" onChange={handleChange} className="input" />
                        <input name="rom_ny" type="number" placeholder="Antall rom" onChange={handleChange} className="input" />
                        <select name="boligtype_ny" onChange={handleChange} className="input">
                            <option value="">Boligtype</option>
                            <option value="Leilighet">Leilighet</option>
                            <option value="Enebolig">Enebolig</option>
                            <option value="Tomannsbolig">Tomannsbolig</option>
                            <option value="Rekkehus">Rekkehus</option>
                        </select>
                    </>
                )}

                {step === 5 && (
                    <>
                        <select name="etasjer_ny" onChange={handleChange} className="input">
                            <option value="">Antall etasjer i ny bolig</option>
                            {[1, 2, 3, 4].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        <input name="parkering_ny" type="number" placeholder="Avstand til parkering (meter)" onChange={handleChange} className="input" />
                    </>
                )}

                {step === 6 && (
                    <>
                        <select name="tungt" onChange={handleChange} className="input">
                            <option value="">Tunge gjenstander?</option>
                            <option value="Ja">Ja</option>
                            <option value="Nei">Nei</option>
                        </select>
                        <select name="skjøre" onChange={handleChange} className="input">
                            <option value="">Skjøre/verdifulle gjenstander?</option>
                            <option value="Ja">Ja</option>
                            <option value="Nei">Nei</option>
                        </select>
                    </>
                )}

                {step === 7 && (
                    <>
                        <textarea name="kommentar" placeholder="Utfyllende informasjon (valgfritt)" onChange={handleChange} className="input" />
                        <input name="navn" placeholder="Ditt navn" onChange={handleChange} className="input" />
                        <input name="epost" type="email" placeholder="E-post" onChange={handleChange} className="input" />
                        <input name="telefon" type="tel" placeholder="Telefonnummer" onChange={handleChange} className="input" />
                    </>
                )}
            </form>

            <div className="flex justify-between mt-6">
                {step > 0 && (
                    <button onClick={prevStep} className="px-4 py-2 border rounded-lg">
                        Tilbake
                    </button>
                )}
                {step < steps.length - 1 ? (
                    <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Neste
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                        Send inn
                    </button>
                )}
            </div>
        </div>
    );
}
