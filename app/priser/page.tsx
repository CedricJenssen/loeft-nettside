import Link from "next/link";

export default function PriserPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Priser</h1>

      <p className="mb-4">
        Hos <strong>Løft Flyttebyrå AS</strong> tilbyr vi konkurransedyktige og transparente priser. Alle oppdrag tilpasses kundens behov, og vi gir alltid uforpliktende pristilbud.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Standardpriser</h2>
      <table className="w-full border text-left mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Tjeneste</th>
            <th className="border px-4 py-2">Pris</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">2 løftere + flyttebil</td>
            <td className="border px-4 py-2">1400 kr/time</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">3 løftere + flyttebil</td>
            <td className="border px-4 py-2">1700 kr/time</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">4 løftere + flyttebil</td>
            <td className="border px-4 py-2">1900 kr/time</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Midlertidig lagring (Flexistore)</td>
            <td className="border px-4 py-2">50 % rabatt med koden <strong>LOFT</strong></td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4">Hva påvirker prisen?</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Arbeidstid f.eks. overtid eller røde dager</li>
        <li>Størrelse på flyttelasset</li>
        <li>Ekstra tjenester som pakking eller utvask</li>
        <li>Behov for mellomlagring</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Be om tilbud</h2>
      <p className="mb-4">
        For å gi deg en nøyaktig pris basert på dine behov, anbefaler vi at du sender inn informasjon via vårt skjema.
      </p>
      <Link href="/#kontakt">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition">
          Få et uforpliktende tilbud
        </button>
      </Link>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Spørsmål?</h2>
        <p>
          Ikke nøl med å <Link href="/#kontakt" className="text-blue-600 underline">kontakte oss</Link> dersom du har spørsmål rundt pris eller ønsker mer informasjon.
        </p>
      </div>
    </main>
  );
}
