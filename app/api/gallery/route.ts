import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const images = await prisma.gallery.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Admin check placeholder
    const { url, tag } = await req.json();
    const image = await prisma.gallery.create({
      data: { url, tag },
    });
    return NextResponse.json(image);
  } catch (error) {
    console.error("Error adding to gallery:", error);
    return NextResponse.json(
      { error: "Failed to add image" },
      { status: 500 }
    );
  }
}
