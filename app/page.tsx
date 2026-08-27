import type { Metadata } from "next";
import HomeClient from "./home-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Divya Skin Clinic Coimbatore | Dr. Divya's Skin & Hair Clinic",
  description:
    "Dr. Divya's Skin Clinic in Coimbatore offers dermatologist-led acne, pigmentation, hair fall, laser, and skin tag removal treatments.",
  path: "/",
  keywords: [
    "divya skin clinic",
    "dermatologist in coimbatore",
    "skin doctor in coimbatore",
    "skin clinic in coimbatore",
    "dermatologist near me",
    "skin doctor near me",
    "dr divya dermatologist coimbatore",
    "acne treatment in coimbatore",
    "hair fall treatment in coimbatore",
    "pigmentation treatment in coimbatore",
    "laser treatment in coimbatore"
  ],
  absoluteTitle: true,
});

export default function HomePage() {
  return <HomeClient />;
}
