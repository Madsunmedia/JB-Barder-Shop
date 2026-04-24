import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(barbers);
  } catch (error) {
    console.error("Error fetching barbers:", error);
    return NextResponse.json(
      { error: "Failed to fetch barbers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Note: In production, check for Admin session here
    const data = await req.json();
    const barber = await prisma.barber.create({
      data: {
        name: data.name,
        bio: data.bio,
        image: data.image,
        title: data.title, // I need to add title to schema
        specialties: data.specialties,
      },
    });
    return NextResponse.json(barber);
  } catch (error) {
    console.error("Error creating barber:", error);
    return NextResponse.json(
      { error: "Failed to create barber" },
      { status: 500 }
    );
  }
}
