import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// ONE-TIME USE ENDPOINT — DELETE AFTER USE
// Access: GET /api/seed-admin?secret=jb-seed-2026

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== "jb-seed-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
      where: { email: "ijbbarbershop@gmail.com" },
      update: {
        password: hashedPassword,
        role: "ADMIN",
      },
      create: {
        email: "ijbbarbershop@gmail.com",
        name: "JB Admin",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created/updated successfully",
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
