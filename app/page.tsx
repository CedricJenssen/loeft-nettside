import GoogleRating from '@/components/GoogleRatings';
import Link from 'next/link';
import Logo from "@/public/lft_dark.svg";
import Image from "next/image";



export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <section className="min-h-[calc(100vh-73.09px)] flex flex-col md:flex-row">
        {/* Venstre kolonne – tekst */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-8 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Får tingene dine trygt på plass
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              Å flytte er en risikosport du bør overlate til de som kan det.
            </p>
            <a
              href="/tilbud"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Få tilbud
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
    </main>
  );
}
