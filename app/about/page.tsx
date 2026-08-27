import type { Metadata } from "next";
import AboutClient from "./about-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dr. Divya Skin Clinic Coimbatore | About Our Dermatology Clinic",
  description:
    "Meet Dr Divya and learn about the clinic's dermatology expertise, treatment philosophy, and patient-first care model in Coimbatore.",
  path: "/about",
  keywords: [
    "dr divya skin clinic",
    "about dermatologist",
    "best dermatologist coimbatore",
    "skin doctor coimbatore",
    "dermatology clinic profile",
  ],
});

export default function AboutPage() {
  return <AboutClient />;
}
