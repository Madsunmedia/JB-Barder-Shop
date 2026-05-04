import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const section = (formData.get("section") as string) || "gallery";
    const title = (formData.get("title") as string) || "";
    const altText = (formData.get("altText") as string) || "";

    // Check if Cloudinary is configured
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your environment variables." },
        { status: 503 }
      );
    }

    // Upload to Cloudinary via REST API (no SDK needed)
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("folder", "jb-barbershop");
    cloudinaryFormData.append("upload_preset", "ml_default");

    // Generate signature for authenticated upload
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = `folder=jb-barbershop&timestamp=${timestamp}`;
    const crypto = await import("crypto");
    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("folder", "jb-barbershop");
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("api_key", apiKey);
    uploadForm.append("signature", signature);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    if (!cloudRes.ok) {
      const err = await cloudRes.text();
      return NextResponse.json({ error: `Cloudinary error: ${err}` }, { status: 500 });
    }

    const cloudData = await cloudRes.json();

    // Save to DB
    const maxOrder = await prisma.mediaItem.count({ where: { section } });
    const item = await prisma.mediaItem.create({
      data: {
        url: cloudData.secure_url,
        publicId: cloudData.public_id,
        title: title || null,
        altText: altText || null,
        section,
        order: maxOrder,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
