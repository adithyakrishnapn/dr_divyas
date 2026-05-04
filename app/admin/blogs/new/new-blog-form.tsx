"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = {
  title: string;
  slug: string;
  description: string;
  image: string;
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
  published: boolean;
};

type BlogEditorFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<FormState>;
  currentSlug?: string;
  submitLabel?: string;
};

const initialState: FormState = {
  title: "",
  slug: "",
  description: "",
  image: "",
  keywords: "",
  metaTitle: "",
  metaDescription: "",
  contentHtml: "",
  published: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getInitialState(initialValues?: Partial<FormState>): FormState {
  return {
    ...initialState,
    ...initialValues,
    keywords: initialValues?.keywords ?? "",
    published: initialValues?.published ?? true,
  };
}

export function BlogEditorForm({
  mode,
  initialValues,
  currentSlug,
  submitLabel,
}: BlogEditorFormProps) {
  const router = useRouter();
  const [state, setState] = useState<FormState>(getInitialState(initialValues));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const endpoint = mode === "edit" && currentSlug ? `/api/blogs/${currentSlug}` : "/api/blogs";
  const method = mode === "edit" ? "PATCH" : "POST";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...state,
        slug: state.slug || slugify(state.title),
        keywords: state.keywords,
      }),
    });

    const payload = (await response.json()) as { error?: string; slug?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error ?? "Unable to publish blog post.");
      return;
    }

    setStatus("success");
    setMessage(
      mode === "edit"
        ? "Blog post updated successfully."
        : "Blog post published successfully.",
    );

    if (mode === "create") {
      const nextSlug = payload.slug ?? state.slug ?? slugify(state.title);
      router.push(`/admin/blogs/${nextSlug}`);
      router.refresh();
      return;
    }

    if (payload.slug && payload.slug !== currentSlug) {
      router.replace(`/admin/blogs/${payload.slug}`);
      router.refresh();
    }
  }

  return (
    <main className="page-shell py-10">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">
              {mode === "edit" ? "Edit Blog Content" : "Create Blog Content"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              HTML is allowed in the content editor for internal links and custom formatting.
            </p>
          </div>

          <Link
            href="/admin/blogs"
            className="rounded-lg border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50"
          >
            Manage Blogs
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-amber-900">Title</label>
            <input
              required
              value={state.title}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  title: event.target.value,
                  slug: prev.slug || slugify(event.target.value),
                }))
              }
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-amber-900">Slug</label>
            <input
              required
              value={state.slug}
              onChange={(event) => setState((prev) => ({ ...prev, slug: slugify(event.target.value) }))}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-amber-900">Featured Image URL</label>
            <input
              value={state.image}
              onChange={(event) => setState((prev) => ({ ...prev, image: event.target.value }))}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-amber-900">Description</label>
            <textarea
              required
              rows={3}
              value={state.description}
              onChange={(event) => setState((prev) => ({ ...prev, description: event.target.value }))}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-amber-900">SEO Meta Title</label>
            <input
              value={state.metaTitle}
              onChange={(event) => setState((prev) => ({ ...prev, metaTitle: event.target.value }))}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-amber-900">SEO Keywords (comma separated)</label>
            <input
              value={state.keywords}
              onChange={(event) => setState((prev) => ({ ...prev, keywords: event.target.value }))}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-amber-900">SEO Meta Description</label>
            <textarea
              rows={2}
              value={state.metaDescription}
              onChange={(event) => setState((prev) => ({ ...prev, metaDescription: event.target.value }))}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-amber-900">Blog Content HTML</label>
            <textarea
              required
              rows={14}
              value={state.contentHtml}
              onChange={(event) => setState((prev) => ({ ...prev, contentHtml: event.target.value }))}
              placeholder="<h2>Section heading</h2>\n<p>Use <a href='/treatments'>internal links</a> in content.</p>"
              className="w-full rounded-lg border border-amber-200 px-3 py-2 font-mono text-sm focus:border-amber-600 focus:outline-none"
            />
          </div>

          <label className="md:col-span-2 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={state.published}
              onChange={(event) => setState((prev) => ({ ...prev, published: event.target.checked }))}
            />
            Publish immediately
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="md:col-span-2 rounded-lg bg-gradient-warm px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {status === "submitting"
              ? mode === "edit"
                ? "Updating..."
                : "Publishing..."
              : submitLabel ?? (mode === "edit" ? "Update Blog" : "Publish Blog")}
          </button>
        </form>

        {message ? (
          <p className={`mt-4 text-sm font-medium ${status === "success" ? "text-emerald-700" : "text-rose-700"}`}>
            {message}
          </p>
        ) : null}
      </section>
    </main>
  );
}

export function NewBlogForm() {
  return <BlogEditorForm mode="create" submitLabel="Publish Blog" />;
}
