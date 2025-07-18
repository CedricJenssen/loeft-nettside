import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // f.eks. smtp.gmail.com eller smtp.domeneshop.no
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: `"LØFT Nettside" <${process.env.SMTP_USER}>`,
      to: 'kontakt@loeft.no', // ← din mottakeradresse
      subject: `Ny henvendelse fra ${name}`,
      text: `Navn: ${name}\nE-post: ${email}\n\nMelding:\n${message}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Feil ved e-postsending:', error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
