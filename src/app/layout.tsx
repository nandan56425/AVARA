
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avara-escapes.vercel.app"),

  title: {
    default: "AVARA | Curated Weekend Escapes",
    template: "%s | AVARA",
  },

  description:
    "Discover weekend getaways, scenic treks and curated travel itineraries around Mysuru and Bengaluru with AVARA.",

  verification: {
    google: "BbwTXXcV8q9-hT4ddytF3Xro2jUJc8xT_4q9ZBUGXzA",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
  title: "AVARA | Find Somewhere Worth Going",
  description:
    "Explore curated weekend escapes and scenic trails around Mysuru and Bengaluru.",
  url: "https://avara-escapes.vercel.app/",
  siteName: "AVARA",
  locale: "en_IN",
  type: "website",
  images: [
    {
      url: "/images/hero/avara-hero.jpg",
      width: 1200,
      height: 630,
      alt: "AVARA – Curated Weekend Escapes and Scenic Trails",
    },
  ],
},

  twitter: {
  card: "summary_large_image",
  title: "AVARA | Find Somewhere Worth Going",
  description:
    "Explore curated weekend escapes and scenic trails around Mysuru and Bengaluru.",
  images: ["/images/hero/avara-hero.jpg"],
},

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://avara-escapes.vercel.app/#organization",
      name: "AVARA",
      url: "https://avara-escapes.vercel.app/",
      description:
        "AVARA is a curated weekend escape and trekking itinerary discovery platform focused on destinations around Mysuru and Bengaluru.",
    },
    {
      "@type": "WebSite",
      "@id": "https://avara-escapes.vercel.app/#website",
      name: "AVARA",
      url: "https://avara-escapes.vercel.app/",
      publisher: {
        "@id": "https://avara-escapes.vercel.app/#organization",
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased`}
      >
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
