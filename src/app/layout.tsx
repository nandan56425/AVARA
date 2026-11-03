
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
    "Discover curated weekend escapes, scenic destinations and trekking trails around Mysuru and Bengaluru. Explore thoughtfully planned itineraries for your next adventure.",

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
    url: "https://avara-escapes.vercel.app",
    siteName: "AVARA",
    locale: "en_IN",
    type: "website",
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
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
