"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Heart, Share2, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { localAreaPages } from "@/lib/local-area-pages";

export function SiteFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const mapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.7834818390447!2d77.00191837482221!3d11.054853589111374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8599aa76a4b81%3A0xb6111fd2ef3ef299!2sDr.%20Divya%27s%20Skin%20Clinic!5e0!3m2!1sen!2sin!4v1778333405996!5m2!1sen!2sin";

  return (
    <footer className="relative mt-0 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200 border-t border-amber-600/30">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="page-shell grid gap-12 py-16 md:grid-cols-4">
          <motion.div
            variants={containerVariants}
            initial="visible"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-amber-400">{siteConfig.name}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{siteConfig.description}</p>
            <div className="flex gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-amber-600/20 hover:bg-amber-600/40 p-2 rounded-lg transition"
              >
                <Heart className="h-4 w-4 text-amber-400" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-amber-600/20 hover:bg-amber-600/40 p-2 rounded-lg transition"
              >
                <Share2 className="h-4 w-4 text-amber-400" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-amber-600/20 hover:bg-amber-600/40 p-2 rounded-lg transition"
              >
                <MessageCircle className="h-4 w-4 text-amber-400" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="visible"
            animate="visible"
            className="space-y-4"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="visible"
            animate="visible"
            className="space-y-4"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Coimbatore Clinic Locations
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/coimbatore" className="hover:text-amber-400 transition-smooth">
                  Coimbatore clinic locations
                </Link>
              </li>
              {localAreaPages.slice(0, 4).map((area) => (
                <li key={area.slug}>
                  <Link href={`/coimbatore/${area.slug}`} className="hover:text-amber-400 transition-smooth">
                    {area.areaName}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="visible"
            animate="visible"
            className="space-y-4"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Treatments
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/treatments" className="hover:text-amber-400 transition-smooth">Skin Treatments</Link></li>
              <li><Link href="/treatments" className="hover:text-amber-400 transition-smooth">Hair Care</Link></li>
              <li><Link href="/treatments" className="hover:text-amber-400 transition-smooth">Anti-Aging</Link></li>
              <li><Link href="/treatments" className="hover:text-amber-400 transition-smooth">Acne Solutions</Link></li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="visible"
            animate="visible"
            className="space-y-4"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-amber-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-400">{siteConfig.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <Link href={`tel:${siteConfig.phone}`} className="text-sm text-slate-400 hover:text-amber-400 transition-smooth">
                  {siteConfig.phone}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <Link href={`mailto:${siteConfig.email}`} className="text-sm text-slate-400 hover:text-amber-400 transition-smooth">
                  {siteConfig.email}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="page-shell pb-10">
          <motion.div
            variants={itemVariants}
            initial="visible"
            animate="visible"
            className="overflow-hidden rounded-3xl border border-amber-600/20 bg-white/5 backdrop-blur-sm"
          >
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="min-h-[280px] lg:min-h-[360px]">
                <iframe
                  title="Dr Divya's Skin & Hair Clinic map location"
                  src={mapsEmbedUrl}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 lg:p-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                    Clinic location
                  </p>
                  <h4 className="mt-2 text-2xl font-bold text-white">
                    Visit Dr Divya's Skin & Hair Clinic in Coimbatore
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Use the map below to find the clinic location and open directions in Google Maps.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="https://maps.app.goo.gl/o1vwrpsMj99KKHGAA"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-warm px-5 py-3 font-semibold text-white shadow-lg"
                  >
                    Go to Location
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-amber-300 px-5 py-3 font-semibold text-amber-100 hover:bg-amber-600/10"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-amber-600/20 py-8">
          <div className="page-shell flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>&copy; 2026 Dr Divya&apos;s Skin & Hair Clinic. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-amber-400 transition-smooth">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-smooth">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
