'use client';

import { useState } from 'react';
import type { Step } from '@/lib/formConfig';

type Props = {
  config: Step[];
};

export default function MultiStepForm({ config }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const step = config[stepIndex];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

  const handleNext = () => setStepIndex(i => i + 1);
  const handleBack = () => setStepIndex(i => i - 1);

  const handleSubmit = async () => {
    await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Takk! Vi har mottatt din forespørsel.');
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
    <form className="space-y-6">
      {step.fields.map(field => {
        if (field.condition && formData[field.condition.field] !== field.condition.value) return null;

        return (
          <div key={field.id}>
            <label className="block mb-1 font-medium">{field.label}</label>

            {['text', 'email', 'tel', 'number', 'date'].includes(field.type) && (
              <input
                type={field.type}
                name={field.id}
                required={field.required}
                min={field.min}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            )}

            {field.type === 'radio' &&
              field.options?.map(option => (
                <label key={option} className="block">
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}

            {field.type === 'select' && (
              <select
                name={field.id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Velg...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === 'textarea' && (
              <textarea
                name={field.id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>
        );
      })}

      <div className="flex justify-between">
        {stepIndex > 0 && <button type="button" onClick={handleBack}>Tilbake</button>}
        {stepIndex < config.length - 1 ? (
          <button type="button" onClick={handleNext}>Neste</button>
        ) : (
          <button type="button" onClick={handleSubmit}>Send inn</button>
        )}
      </div>
    </form>
    </div>
  );
}
