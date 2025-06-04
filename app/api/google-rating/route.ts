import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = 'AIzaSyAJDC93V0uZ03PdRd9KcCr8itEA-OoBKkI';
const PLACE_ID = 'ChIJ7cfAZgdvQUYRuInuAZtZjUU';

export async function GET() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,url&key=${GOOGLE_API_KEY}`;

  try {
    const res: Response = await fetch(url);
    const data: any = await res.json();

    if (!data.result) {
      return NextResponse.json({ error: 'Ingen resultater fra Google API' }, { status: 500 });
    }

    const { rating, user_ratings_total, url: placeUrl } = data.result;

    return NextResponse.json({
      rating,
      reviews: user_ratings_total,
      url: placeUrl,
    });
  } catch (error) {
    console.error('Feil ved henting av Google-rating:', error);
    return NextResponse.json({ error: 'Intern serverfeil' }, { status: 500 });
  }
}
