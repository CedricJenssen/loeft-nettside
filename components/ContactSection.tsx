'use client';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) setStatus('sent');
      else throw new Error();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
              Navn <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 py-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
              Epost <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block font-medium text-gray-700 mb-1">
            Melding <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            required
            rows={5}
            onChange={handleChange}
            className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 py-2 resize-none"
          />
        </div>

        <p className="text-center text-sm text-gray-700">
          Ved å sende inn skjemaet samtykker du til at vi behandler opplysningene dine for å
          besvare henvendelsen. <br />
          Les mer i vår{' '}
          <a href="/personvern" className="text-blue-600 underline">
            personvernerklæring
          </a>
          .
        </p>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition"
          >
            {status === 'sending' ? 'Sender...' : 'Send henvendelse'}
          </button>
        </div>

        {status === 'sent' && (
          <p className="text-center text-green-600 font-medium">Takk! Vi svarer deg så snart vi kan.</p>
        )}
        {status === 'error' && (
          <p className="text-center text-red-600 font-medium">Noe gikk galt. Prøv igjen senere.</p>
        )}
      </form>
    </section>
  );
}
