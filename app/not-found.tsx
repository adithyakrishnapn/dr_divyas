"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 px-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-8xl font-bold text-gradient-gold">404</div>
        </motion.div>

        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back on track.
        </p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-warm text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-amber-600 text-amber-900 font-bold hover:bg-amber-50 transition-colors"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
