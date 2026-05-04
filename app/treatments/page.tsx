import type { Metadata } from "next";
import TreatmentsClient from "./treatments-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Skin and Hair Treatments in Coimbatore",
  description:
    "Explore advanced acne, pigmentation, hair-fall, melasma, and laser dermatology treatments by Dr Divya in Coimbatore.",
  path: "/treatments",
  keywords: [
    "acne treatment coimbatore",
    "hair fall treatment",
    "melasma treatment",
    "laser skin treatment",
  ],
});

export default function TreatmentsPage() {
  return <TreatmentsClient />;
}
