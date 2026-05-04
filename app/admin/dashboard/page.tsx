import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { getPublishedPosts } from "@/lib/blog";
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { AdminLogoutButton } from "@/components/admin-logout-button";

type Lead = {
  name: string;
  phone: string;
  source: string;
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  const posts = await getPublishedPosts();
  let leadCount = 0;
  let recentLeads: Lead[] = [];
  let analyticsError = false;

  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();

      const [leadsSnapshot, recentLeadsSnapshot] = await Promise.all([
        db.collection("contactLeads").get(),
        db.collection("contactLeads").orderBy("createdAt", "desc").limit(5).get(),
      ]);

      leadCount = leadsSnapshot.size;

      recentLeads = recentLeadsSnapshot.docs.map((doc) => {
        const data = doc.data() as Record<string, unknown>;
        return {
          name: String(data.name ?? "Unknown"),
          phone: String(data.phone ?? ""),
          source: String(data.source ?? "website"),
        };
      });
    } catch (error) {
      analyticsError = true;
      console.warn("Unable to load admin dashboard analytics.", error);
    }
  }

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">Signed in as {session.email ?? session.uid}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="rounded-lg border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50"
          >
            Manage Blogs
          </Link>
          <Link
            href="/admin/blogs/new"
            className="rounded-lg bg-gradient-warm px-4 py-2 text-sm font-semibold text-white"
          >
            New Blog Post
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Published blogs</p>
          <p className="mt-2 text-3xl font-bold text-amber-900">{posts.length}</p>
        </article>
        <article className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Total blog views</p>
          <p className="mt-2 text-3xl font-bold text-amber-900">{totalViews}</p>
        </article>
        <article className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Total contact leads</p>
          <p className="mt-2 text-3xl font-bold text-amber-900">{leadCount}</p>
        </article>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded-xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-amber-900">Top Blogs by Views</h2>
          <ul className="mt-4 space-y-3">
            {[...posts]
              .sort((a, b) => b.views - a.views)
              .slice(0, 6)
              .map((post) => (
                <li key={post.slug} className="flex items-center justify-between rounded-lg bg-amber-50/60 px-3 py-2">
                  <span className="text-sm font-medium text-slate-700">{post.title}</span>
                  <span className="text-sm font-bold text-amber-900">{post.views}</span>
                </li>
              ))}
          </ul>
        </article>

        <article className="rounded-xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-amber-900">Recent Contact Leads</h2>
          {analyticsError ? (
            <p className="mt-2 text-sm text-amber-700">
              Lead analytics are temporarily unavailable until Firestore is ready.
            </p>
          ) : null}
          <ul className="mt-4 space-y-3">
            {recentLeads.length ? (
              recentLeads.map((lead, index) => (
                <li key={`${lead.phone}-${index}`} className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-sm font-semibold text-slate-800">{lead.name}</p>
                  <p className="text-xs text-slate-500">
                    {lead.phone} • {lead.source}
                  </p>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">No leads available yet.</li>
            )}
          </ul>
        </article>
      </section>
    </main>
  );
}
