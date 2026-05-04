"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/50">
      <div className="page-shell flex items-center justify-between py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-bold text-gradient-gold">Dr Divya&apos;s</span>
          <span className="text-xs font-semibold text-amber-700">Skin & Hair Clinic</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, idx) => {
            const active = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-smooth ${
                    active
                      ? "bg-gradient-warm text-white shadow-lg"
                      : "text-slate-700 hover:bg-amber-50 hover:text-amber-900"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-900">
            <Phone className="h-4 w-4 text-amber-600" />
            <span>{siteConfig.phone}</span>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-warm text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-smooth"
          >
            Book Now
          </motion.a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200 text-amber-700 md:hidden transition-smooth hover:bg-amber-50"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-amber-100/50 bg-white/98 px-4 py-4 md:hidden"
        >
          <div className="page-shell flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition-smooth ${
                    active
                      ? "bg-gradient-warm text-white"
                      : "text-slate-700 hover:bg-amber-50 hover:text-amber-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-amber-100/50 mt-3 pt-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-3">
                <Phone className="h-4 w-4 text-amber-600" />
                <span>{siteConfig.phone}</span>
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full bg-gradient-warm text-white px-4 py-3 rounded-lg font-semibold text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}
