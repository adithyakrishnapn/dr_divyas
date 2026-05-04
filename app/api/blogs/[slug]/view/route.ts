import { NextResponse } from "next/server";
import { incrementBlogViews } from "@/lib/blog";

export async function POST(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  try {
    await incrementBlogViews(slug);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to update views." }, { status: 500 });
  }
}
