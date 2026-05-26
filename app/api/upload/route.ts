import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  // Validate session if Firebase is configured (for production admin check)
  const isFirebase = isFirebaseAdminConfigured();
  if (isFirebase) {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else {
    // In local dev without Firebase, allow uploads only if NODE_ENV is development
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Validate that it's an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a safe, unique filename
    const fileExtension = file.name.split(".").pop() || "jpg";
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const fileName = `blogs/${uniqueId}.${fileExtension}`;

    // If Vercel Blob token is configured, use Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        console.log("Uploading image to Vercel Blob...");
        const blob = await put(fileName, buffer, {
          access: "public",
          contentType: file.type,
        });
        console.log("Vercel Blob upload successful:", blob.url);
        return NextResponse.json({ url: blob.url });
      } catch (vercelError) {
        console.error("Vercel Blob upload failed:", vercelError);
        // In local development, fall back to local storage even if token is configured but fails
        if (process.env.NODE_ENV !== "development") {
          throw vercelError;
        }
      }
    }

    // Local upload fallback (development only - Vercel is read-only)
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "Vercel Blob Storage is not configured. Please enable Vercel Blob in your project's Vercel Dashboard (it has a completely free Hobby tier!)." },
        { status: 500 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    
    const localFileName = `${uniqueId}.${fileExtension}`;
    const filePath = path.join(uploadsDir, localFileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${localFileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload handler error:", error);
    const message = error instanceof Error ? error.message : "Unable to upload image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
