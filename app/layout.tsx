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
    "Dr Divya's Skin & Hair Clinic in Coimbatore offers advanced acne, pigmentation, laser, hair fall and skin rejuvenation treatments.",
  keywords: [
    "best dermatologist in coimbatore",
    "dermatologist coimbatore",
    "skin clinic",
    "skin clinic coimbatore",
    "best skin clinic in saravanampatti",
    "best skin clinic in ganapathy",
    "best skin clinic in thudiyalur",
    "best skin clinic in peelamedu",
    "best skin clinic in gandhipuram",
    "best skin clinic in rs puram",
    "best skin clinic in annur",
    "best skin clinic in singanallur",
    "best skin clinic in saibaba colony",
    "best skin clinic in vadavalli",
    "best skin clinic in kovaipudur",
    "best skin clinic in race course",
    "best skin clinic near hope college",
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
