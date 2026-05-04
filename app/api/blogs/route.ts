import { NextResponse } from "next/server";
import { createBlogPost, getPublishedPosts } from "@/lib/blog";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const posts = await getPublishedPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const post = await createBlogPost({
      slug: String(body.slug ?? ""),
      title: String(body.title ?? ""),
      description: String(body.description ?? ""),
      image: body.image ? String(body.image) : undefined,
      contentHtml: String(body.contentHtml ?? ""),
      keywords: Array.isArray(body.keywords)
        ? body.keywords.map((item: unknown) => String(item))
        : String(body.keywords ?? "")
            .split(",")
            .map((item: string) => item.trim())
            .filter(Boolean),
      metaTitle: body.metaTitle ? String(body.metaTitle) : undefined,
      metaDescription: body.metaDescription ? String(body.metaDescription) : undefined,
      published: body.published !== false,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create blog post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
