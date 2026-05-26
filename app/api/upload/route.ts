import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  // Validate session if Firebase is configured
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
    const fileName = `${uniqueId}.${fileExtension}`;

    if (isFirebase) {
      try {
        const { getStorage } = await import("firebase-admin/storage");
        const { getFirebaseAdminApp } = await import("@/lib/firebase/admin");

        const storage = getStorage(getFirebaseAdminApp());
        const bucketName =
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
          `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;
        
        const bucket = storage.bucket(bucketName);
        const destination = `blogs/${fileName}`;
        const fileRef = bucket.file(destination);

        await fileRef.save(buffer, {
          metadata: {
            contentType: file.type,
          },
        });

        // Try to make the file public
        try {
          await fileRef.makePublic();
        } catch (pubErr) {
          console.warn("Failed to make file public via makePublic(), trying signed/alternative URL.", pubErr);
        }

        // Return public URL
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
        return NextResponse.json({ url: publicUrl });
      } catch (fbError) {
        console.error("Firebase upload failed, falling back to local storage in development:", fbError);
        // Fallback to local storage if running in development mode
        if (process.env.NODE_ENV !== "development") {
          throw fbError;
        }
      }
    }

    // Local upload fallback (development or self-hosted)
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload handler error:", error);
    const message = error instanceof Error ? error.message : "Unable to upload image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
