import GoogleRating from '@/components/GoogleRatings';
import Link from 'next/link';
import Logo from "@/public/lft_dark.svg";
import Image from "next/image";
import ContactSection from '@/components/ContactSection';
import { Phone } from 'lucide-react';




export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <section className="min-h-[calc(100vh-73.09px)] flex flex-col md:flex-row">
        {/* Venstre kolonne – tekst */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Får tingene dine trygt på plass
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              Å flytte er en risikosport du bør overlate til de som kan det.
            </p>
            <a
              href="/tilbud"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-200"
            >
              Flytt med Løft
            </a>
            <GoogleRating />
          </div>
        </div>

        {/* Høyre kolonne – bilde */}
        <div
          className="w-full md:w-1/2 bg-cover bg-center h-[400px] md:h-auto"
          style={{ backgroundImage: "url('/images/loft_flytting_lft.png')" }}
        ></div>
      </section>
      <section className="w-full min-h-screen bg-white flex items-center justify-center px-4 pt-24 md:pt-32">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4">Flytt med oss!</h2>
          <p className="text-center text-lg mb-6">
            Ta kontakt for et uforpliktende pristilbud.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 text-lg">
              <Phone className="w-5 h-5 text-blue-700" />
              <a href="tel:+4740040040" className="underline hover:text-blue-500">
                214 56  858
              </a>
            </div>
          </div>

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Har du spørsmål? Send oss en henvendelse:
          </p>

          <ContactSection />
        </div>
      </section>
    </main>
  );
}
