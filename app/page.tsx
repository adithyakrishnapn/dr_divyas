import type { Metadata } from "next";
import HomeClient from "./home-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dr Divya’s Skin & Hair Clinic | Best Dermatologist in Coimbatore",
  description:
    "Dr Divya's Skin & Hair Clinic in Coimbatore offers advanced acne, pigmentation, laser, hair fall and skin rejuvenation treatments.",
  path: "/",
  keywords: [
    "best dermatologist in coimbatore",
    "skin clinic coimbatore",
    "hair clinic coimbatore",
    "best clinic in saravanampatti",
    "best clinic in ganapathy",
    "best clinic in thudiyalur",
    "best clinic in peelamedu",
    "best clinic in gandhipuram",
    "best clinic in rs puram",
    "best clinic in annur",
    "best clinic in singanallur",
    "best clinic in saibaba colony",
    "best clinic in vadavalli",
    "best clinic in kovaipudur",
    "best clinic in race course",
    "best clinic near hope college",
    "best clinic on avinashi road",
    "acne treatment",
    "pigmentation treatment",
    "laser treatment",
    "hair fall treatment",
    "skin rejuvenation",
  ],
  absoluteTitle: true,
});

export default function HomePage() {
  return <HomeClient />;
}
