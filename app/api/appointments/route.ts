import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { serviceId, clientName, phone, email, date, time } = await req.json();

    // 1. Save to DB
    // Note: In a real app, we would look up the service and barber properly
    const appointment = await prisma.appointment.create({
      data: {
        userId: "guest", // Placeholder for guest users
        serviceId: serviceId,
        barberId: "any", // Placeholder
        startTime: new Date(`${date}T${time}`),
        endTime: new Date(`${date}T${time}`), // Should calculate based on service duration
        status: "PENDING",
      },
    });

    // 2. Send Emails via Resend
    if (process.env.RESEND_API_KEY) {
      // Confirm to Client
      await resend.emails.send({
        from: "JB Barbershop <appointments@resend.dev>", // Replace with verified domain
        to: [email],
        subject: "Appointment Confirmed - JB Barbershop",
        html: `<p>Hi ${clientName}, your appointment for ${date} at ${time} is confirmed!</p>`,
      });

      // Notify Barber
      await resend.emails.send({
        from: "JB Barbershop System <system@resend.dev>",
        to: ["ijbbarbershop@gmail.com"],
        subject: "New Appointment Request",
        html: `<p>New appointment from ${clientName} (${phone}) on ${date} at ${time}.</p>`,
      });
    }

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
