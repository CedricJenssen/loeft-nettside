import MultiStepForm from '@/components/MultiStepForm';

export default function TilbudPage() {
  return (
    <main className="min-h-screen p-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Få et gratis & uforpliktende tilbud</h1>
      <div className="flex items-center justify-center">
          <MultiStepForm />
      </div>
    </main>
  );
}
