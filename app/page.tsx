import GoogleRating from '@/components/GoogleRatings';
import MultiStepForm from '@/components/MultiStepForm';



export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <section className="min-h-[calc(100vh-73.09px)] flex flex-col md:flex-row">
        {/* Venstre kolonne – tekst */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-8 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Flytting gjort enkelt med <span className="text-blue-600">LØFT</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              Profesjonell flyttehjelp i Oslo – rask, trygg og rimelig. Få et gratis tilbud i dag!
            </p>
            <a
              href="#kontakt"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Få tilbud
            </a>
            <GoogleRating />
            <MultiStepForm />
          </div>
        </div>

        {/* Høyre kolonne – bilde */}
        <div
          className="w-full md:w-1/2 bg-cover bg-center h-[400px] md:h-auto"
          style={{ backgroundImage: "url('/images/loft_flytting_lft.png')" }}
        ></div>
      </section>
    </main>
  );
}
