'use client';

import { useEffect, useState } from 'react';

interface RatingData {
  rating: number;
  reviews: number;
  url: string;
}

export default function GoogleRating() {
  const [data, setData] = useState<RatingData | null>(null);

  useEffect(() => {
    fetch('/api/google-rating')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="text-sm text-gray-800 mt-4">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        ⭐ {data.rating} / 5 basert på {data.reviews} anmeldelser på Google
      </a>
    </div>
  );
}
