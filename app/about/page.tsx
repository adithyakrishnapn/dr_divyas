import type { Metadata } from "next";
import AboutClient from "./about-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Dr Divya | Dermatologist in Coimbatore",
  description:
    "Meet Dr Divya and learn about the clinic's dermatology expertise, treatment philosophy, and patient-first care model.",
  path: "/about",
  keywords: [
    "about dermatologist",
    "skin doctor coimbatore",
    "dermatology clinic profile",
  ],
});

export default function AboutPage() {
  return <AboutClient />;
}
