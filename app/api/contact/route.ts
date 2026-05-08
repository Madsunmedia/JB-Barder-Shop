import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, service } = await req.json();

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "JB Barbershop Contact <system@resend.dev>",
        to: ["ijbbarbershop@gmail.com"],
        subject: `New Inquiry from ${escapeHtml(name)}`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone ?? "")}</p>
          <p><strong>Service:</strong> ${escapeHtml(service ?? "")}</p>
          <p><strong>Message:</strong> ${escapeHtml(message)}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
