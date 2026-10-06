import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    phone.length > 40 || !message || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Please provide valid contact details and message." }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.MANAGER_EMAIL) {
    console.error("Contact email is not configured");
    return NextResponse.json({ ok: false, error: "Unable to send message. Please try again." }, { status: 503 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Poerator <hello@poerator.com>",
      to: process.env.MANAGER_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\n\nMessage:\n${message}`,
    });
    if (error) {
      console.error("Contact email failed (Resend error)", error);
      return NextResponse.json({ ok: false, error: "Unable to send message. Please try again." }, { status: 502 });
    }
    console.info("Contact email sent", data?.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed (exception)", error);
    return NextResponse.json({ ok: false, error: "Unable to send message. Please try again." }, { status: 502 });
  }
}
