"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type FormState = {
  name: string;
  phone: string;
  email: string;
  concern: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  concern: "",
  message: "",
};

const STORAGE_KEY = "clinic_contact_popup_dismissed";

export function ContactPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
      return;
    }

    const dismissed = window.localStorage.getItem(STORAGE_KEY) === "true";
    if (dismissed) {
      return;
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
    return null;
  }

  function dismissPopup(permanent = false) {
    setOpen(false);
    if (permanent) {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          source: `popup:${pathname}`,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Unable to submit popup contact form.";

        try {
          const data = (await response.json()) as { error?: string };
          if (data?.error) {
            errorMessage = data.error;
          }
        } catch {
          // Ignore JSON parse failures and keep fallback message.
        }

        console.error("Popup contact form submission failed:", {
          status: response.status,
          message: errorMessage,
        });
        setStatus("error");
        return;
      }

      setStatus("success");
      setState(initialState);
      window.localStorage.setItem(STORAGE_KEY, "true");
      window.setTimeout(() => setOpen(false), 1500);
    } catch (error) {
      console.error("Popup contact form request error:", error);
      setStatus("error");
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-amber-100 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-amber-900">Talk to Dr. Divya&apos;s Team</h2>
            <p className="mt-1 text-sm text-slate-600">
              Share your concern and get a quick callback from the clinic.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dismissPopup(true)}
            className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100"
            aria-label="Close contact form"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            required
            placeholder="Full name"
            value={state.name}
            onChange={(event) => setState((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
          />
          <input
            required
            placeholder="Phone number"
            value={state.phone}
            onChange={(event) => setState((prev) => ({ ...prev, phone: event.target.value }))}
            className="rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
          />
          <input
            placeholder="Email (optional)"
            value={state.email}
            onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
          />
          <input
            placeholder="Concern (acne, hair loss, pigmentation...)"
            value={state.concern}
            onChange={(event) => setState((prev) => ({ ...prev, concern: event.target.value }))}
            className="rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
          />
          <textarea
            required
            rows={3}
            placeholder="Tell us about your concern"
            value={state.message}
            onChange={(event) => setState((prev) => ({ ...prev, message: event.target.value }))}
            className="md:col-span-2 rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="md:col-span-2 rounded-lg bg-gradient-warm px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Request Callback"}
          </button>
        </form>

        {status === "success" ? (
          <p className="mt-3 text-sm font-medium text-emerald-700">Thanks, we will contact you shortly.</p>
        ) : null}
        {status === "error" ? (
          <p className="mt-3 text-sm font-medium text-rose-700">
            Unable to submit right now. Please call the clinic directly.
          </p>
        ) : null}
      </div>
    </div>
  );
}
