import type { Metadata } from "next";
import ContactClient from "./contact-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Dr Divya's Skin & Hair Clinic in Coimbatore",
  description:
    "Contact Dr Divya's Skin & Hair Clinic for consultations, appointments, and treatment guidance in Coimbatore.",
  path: "/contact",
  keywords: [
    "contact dermatologist",
    "clinic appointment",
    "coimbatore skin clinic",
    "book consultation",
  ],
});

export default function ContactPage() {
  return <ContactClient />;
}
