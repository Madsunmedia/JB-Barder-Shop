import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { id, publicId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    // If it has a Cloudinary publicId and credentials exist, delete from Cloudinary
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (publicId && cloudName && apiKey && apiSecret) {
      const timestamp = Math.round(Date.now() / 1000);
      const crypto = await import("crypto");
      const signature = crypto
        .createHash("sha1")
        .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
        .digest("hex");

      const deleteForm = new FormData();
      deleteForm.append("public_id", publicId);
      deleteForm.append("timestamp", String(timestamp));
      deleteForm.append("api_key", apiKey);
      deleteForm.append("signature", signature);

      await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        { method: "POST", body: deleteForm }
      );
    }

    // Always delete from DB
    await prisma.mediaItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
