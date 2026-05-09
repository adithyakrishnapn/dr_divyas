import type { Metadata } from "next";
import TreatmentsClient from "./treatments-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Skin, Hair & Laser Treatments in Coimbatore",
  description:
    "Explore advanced acne, pigmentation, hair-fall, melasma, laser, and skin rejuvenation treatments by Dr Divya in Coimbatore.",
  path: "/treatments",
  keywords: [
    "skin treatments coimbatore",
    "acne treatment coimbatore",
    "pigmentation treatment",
    "hair fall treatment",
    "melasma treatment",
    "laser skin treatment",
    "skin rejuvenation",
  ],
});

export default function TreatmentsPage() {
  return <TreatmentsClient />;
}
