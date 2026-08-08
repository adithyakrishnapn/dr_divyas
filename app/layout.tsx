import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactPopup } from "@/components/contact-popup";
import { ClinicSchema } from "@/components/clinic-schema";
const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Dr. Divya's Skin Clinic in Coimbatore offers advanced acne, pigmentation, laser, hair fall and skin rejuvenation treatments.",
  keywords: [
    "Dermatologist in coimbatore",
    "dermatologist coimbatore",
    "skin clinic",
    "skin clinic coimbatore",
    "Skin Clinic in saravanampatti",
    "Skin Clinic in ganapathy",
    "Skin Clinic in thudiyalur",
    "Skin Clinic in peelamedu",
    "Skin Clinic in gandhipuram",
    "Skin Clinic in rs puram",
    "Skin Clinic in annur",
    "Skin Clinic in singanallur",
    "Skin Clinic in saibaba colony",
    "Skin Clinic in vadavalli",
    "Skin Clinic in kovaipudur",
    "Skin Clinic in race course",
    "Skin Clinic near hope college",
    "best skin clinic on avinashi road",
    "hair treatment",
    "acne treatment",
    "pigmentation treatment",
    "laser treatment",
    "skin rejuvenation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="cVbX34OBmRc070M2V2/VMA"
          async
        />
      </head>
      <body className="min-h-full text-slate-800">
        <div className="flex min-h-full flex-col">
          <SiteHeader />
          <ContactPopup />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <ClinicSchema />
      </body>
    </html>
  );
}
