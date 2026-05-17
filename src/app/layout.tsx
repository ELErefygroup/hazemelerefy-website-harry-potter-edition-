import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./portfolio-stage2.css";
import "./story-book-stage2.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { BackToTop } from "@/components/chrome/BackToTop";
import { Analytics } from "@/components/analytics/Analytics";
import { site } from "@/lib/site";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} — ${site.role}`,
    template: `%s · ${site.fullName}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  applicationName: site.fullName,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  openGraph: {
    title: `${site.fullName} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.fullName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.role}`,
    description: site.description,
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full bg-night text-parchment antialiased">
        <SmoothScrollProvider />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-candle focus:px-4 focus:py-2 focus:font-display focus:text-[11px] focus:uppercase focus:tracking-[0.3em] focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="content" className="relative">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
