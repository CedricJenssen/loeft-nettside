import { writeFile, mkdir, appendFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  const body = await req.json();
  const timestamp = new Date().toISOString();
  const email = body.email || `kunde-${timestamp}`;
  const dir = path.resolve('./data');
  await mkdir(dir, { recursive: true });

  const data = { ...body, timestamp };

  // Lagre JSON
  const jsonPath = path.join(dir, `${email}.json`);
  await writeFile(jsonPath, JSON.stringify(data, null, 2));

  // Lagre CSV
  const headers = Object.keys(data);
  const csvPath = path.join(dir, 'leads.csv');
  const csvRow = headers.map(h => `"${(data[h] || '').toString().replace(/"/g, '""')}"`).join(',') + '\n';

  try {
    await appendFile(csvPath, csvRow);
  } catch {
    const headerRow = headers.map(h => `"${h}"`).join(',') + '\n';
    await writeFile(csvPath, headerRow + csvRow);
  }

  // Send til Zapier
  try {
    await fetch('https://hooks.zapier.com/hooks/catch/14869276/uyis77u/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error('Zapier-feil:', (err as Error).message);
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

