"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

type BlogDetailClientProps = {
  post: BlogPost;
};

export function BlogDetailClient({ post }: BlogDetailClientProps) {
  useEffect(() => {
    void fetch(`/api/blogs/${post.slug}/view`, { method: "POST" });
  }, [post.slug]);

  return (
    <main className="relative min-h-screen">
      {/* Background Decorations */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <div className="page-shell pt-8">
        <motion.a
          href="/blog"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </motion.a>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="page-shell">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-amber-600" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-amber-600" />
                {post.readTime}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-700 leading-relaxed">
              {post.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="page-shell pb-12">
        <motion.div
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative aspect-[16/9] w-full bg-slate-100"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="page-shell">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="article-content card-premium max-w-none p-12"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </motion.div>
        </div>
      </section>

      {/* Related Articles / CTA */}
      <section className="py-20 bg-luxury-light">
        <div className="page-shell">
          <motion.div
            className="relative rounded-3xl overflow-hidden bg-gradient-warm p-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <motion.div
              className="relative z-10 space-y-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready for Your Skin Transformation?
              </h2>

              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Let Dr Divya create a personalized treatment plan based on your unique skin needs.
              </p>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-amber-900 font-bold shadow-lg"
              >
                Book Your Consultation
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to Blog Link */}
      <section className="py-12">
        <div className="page-shell text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>
        </div>
      </section>
    </main>
  );
}
