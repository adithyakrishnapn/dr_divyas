"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseClientAuth, isFirebaseClientConfigured } from "@/lib/firebase/client";
import { Lock, Mail } from "lucide-react";

export default function PortalLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isFirebaseClientConfigured()) {
      setError("Firebase client configuration is missing. Please check env variables.");
      return;
    }

    setSubmitting(true);

    try {
      const auth = getFirebaseClientAuth();
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credentials.user.getIdToken();

      const response = await fetch("/api/portal/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Unable to start portal session.");
      }

      router.push("/portal");
      router.refresh();
    } catch {
      setError("Invalid email, password, or server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Premium background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full bg-rose-200/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-warm shadow-md">
            <span className="text-2xl font-semibold text-white">DP</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-amber-900 font-serif">
            Clinic Follow-up Portal
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access patient leads and follow-up channels
          </p>
        </div>

        <div className="card-premium p-8 border border-amber-100 shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm">
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-semibold text-amber-900 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-amber-600/60" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full rounded-xl border border-amber-200 pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none text-sm transition-smooth"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-amber-900 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-amber-600/60" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="block w-full rounded-xl border border-amber-200 pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none text-sm transition-smooth"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-rose-50 p-3">
                <p className="text-xs font-semibold text-rose-700">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="group relative flex w-full justify-center rounded-xl bg-gradient-warm py-3 px-4 text-sm font-bold text-white hover:shadow-lg disabled:opacity-60 transition-smooth"
              >
                {submitting ? "Authenticating..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
