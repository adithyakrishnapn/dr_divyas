import { NextResponse } from "next/server";
import { deleteBlogPost, getPostBySlug, updateBlogPost } from "@/lib/blog";
import { getAdminSession } from "@/lib/auth";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

function parseKeywords(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function GET(_request: Request, context: RouteParams) {
  const { slug } = await context.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(request: Request, context: RouteParams) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const body = await request.json();

  try {
    const post = await updateBlogPost(slug, {
      slug: String(body.slug ?? slug),
      title: String(body.title ?? ""),
      description: String(body.description ?? ""),
      image: body.image ? String(body.image) : undefined,
      contentHtml: String(body.contentHtml ?? ""),
      keywords: parseKeywords(body.keywords),
      metaTitle: body.metaTitle ? String(body.metaTitle) : undefined,
      metaDescription: body.metaDescription ? String(body.metaDescription) : undefined,
      published: body.published !== false,
    });

    return NextResponse.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update blog post.";
    const status = message === "Blog post not found." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteParams) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;

  try {
    await deleteBlogPost(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete blog post.";
    const status = message === "Blog post not found." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}