"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, X, Link as LinkIcon } from "lucide-react";


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
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file.");
      return;
    }

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Failed to upload image.");
      }

      const data = (await response.json()) as { url: string };
      setState((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      console.error(err);
      setUploadError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setState((prev) => ({ ...prev, image: "" }));
    setUploadError("");
  };

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

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-amber-900">Featured Image</label>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Upload Zone / Preview (takes 2 cols on md) */}
              <div className="md:col-span-2">
                {state.image ? (
                  // Image Preview Card
                  <div className="relative overflow-hidden rounded-xl border border-amber-100 bg-amber-50/20 p-4">
                    <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={state.image}
                        alt="Featured image preview"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="rounded-full bg-white p-2.5 text-rose-600 shadow-lg hover:bg-rose-50 transition transform hover:scale-110 cursor-pointer"
                          title="Remove image"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between gap-4 text-xs text-slate-500">
                      <span className="truncate flex-1 font-mono bg-white px-2 py-1 rounded border border-amber-100">
                        {state.image}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="font-semibold text-rose-600 hover:text-rose-700 transition cursor-pointer"
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  // Drag & Drop Zone
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${
                      dragActive
                        ? "border-amber-600 bg-amber-50/50"
                        : "border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/10"
                    }`}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                    
                    {uploading ? (
                      <div className="flex flex-col items-center py-4">
                        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
                        <p className="mt-3 text-sm font-medium text-amber-900">Uploading image...</p>
                        <p className="mt-1 text-xs text-slate-500">Please wait while we store your file securely.</p>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="flex cursor-pointer flex-col items-center justify-center"
                      >
                        <div className="rounded-full bg-amber-50 p-4 text-amber-600 transition group-hover:scale-110">
                          <UploadCloud className="h-8 w-8" />
                        </div>
                        <span className="mt-4 text-sm font-semibold text-amber-900">
                          Drag and drop or <span className="text-amber-700 underline font-bold">browse</span>
                        </span>
                        <span className="mt-1 text-xs text-slate-500">
                          Supports PNG, JPG, JPEG, WEBP (Max 5MB)
                        </span>
                      </label>
                    )}
                  </div>
                )}
                
                {uploadError && (
                  <p className="mt-2 text-xs font-semibold text-rose-600">{uploadError}</p>
                )}
              </div>
              
              {/* Image URL fallback Input (takes 1 col on md) */}
              <div className="flex flex-col justify-between rounded-xl border border-amber-100 bg-amber-50/10 p-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                    <LinkIcon className="h-3.5 w-3.5" />
                    <span>External URL</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    Prefer using an external link or Unsplash image? Paste the absolute URL below.
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={state.image}
                    onChange={(event) => setState((prev) => ({ ...prev, image: event.target.value }))}
                    className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
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
