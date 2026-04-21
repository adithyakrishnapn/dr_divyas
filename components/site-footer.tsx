"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Heart, Share2, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";

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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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

        <div className="border-t border-amber-600/20 py-8">
          <div className="page-shell flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>&copy; 2024 Dr Divya's Skin & Hair Clinic. All rights reserved.</p>
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
