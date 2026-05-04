import type { Metadata } from "next";
import HomeClient from "./home-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best Dermatology Clinic in Coimbatore",
  description:
    "Dr Divya's Skin & Hair Clinic in Coimbatore offers dermatologist-led acne, pigmentation, laser, and hair restoration treatments.",
  path: "/",
  keywords: [
    "skin clinic coimbatore",
    "dermatologist coimbatore",
    "acne treatment",
    "pigmentation treatment",
    "hair fall treatment",
  ],
});

export default function HomePage() {
  return <HomeClient />;
}
