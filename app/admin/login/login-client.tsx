"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseClientAuth, isFirebaseClientConfigured } from "@/lib/firebase/client";

export default function AdminLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isFirebaseClientConfigured()) {
      setError("Firebase client variables are missing. Add them in .env.local.");
      return;
    }

    setSubmitting(true);

    try {
      const auth = getFirebaseClientAuth();
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credentials.user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Unable to start admin session.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Invalid login details or server configuration issue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page-shell py-20">
      <section className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-amber-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to manage blogs and analytics.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-amber-900">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-amber-900">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-amber-200 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gradient-warm px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>

          {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}
