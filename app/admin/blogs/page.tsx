import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { getAllPostsForAdmin } from "@/lib/blog";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { AdminBlogDeleteButton } from "@/components/admin-blog-delete-button";

export default async function AdminBlogsPage() {
  await requireAdminSession();
  const posts = await getAllPostsForAdmin();

  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">Manage Blogs</h1>
          <p className="text-sm text-slate-600">Update, edit, and delete blog posts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/new"
            className="rounded-lg bg-gradient-warm px-4 py-2 text-sm font-semibold text-white"
          >
            New Blog Post
          </Link>
          <Link
            href="/admin/dashboard"
            className="rounded-lg border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50"
          >
            Dashboard
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl bg-white shadow-xl">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Views</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Updated</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.slug}>
                <td className="px-4 py-4">
                  <div className="max-w-md">
                    <p className="font-semibold text-slate-900">{post.title}</p>
                    <p className="text-sm text-slate-500">/{post.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className={`rounded-full px-3 py-1 font-semibold ${post.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-amber-900">{post.views}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{new Date(post.date).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/admin/blogs/${post.slug}`}
                      className="rounded-lg border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50"
                    >
                      Edit
                    </Link>
                    <AdminBlogDeleteButton slug={post.slug} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}