import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Layout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url + "/"),
  title: { default: `${SITE.name}｜${SITE.tagline}`, template: `%s｜${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: `${SITE.basePath}/og.png`, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, images: [`${SITE.basePath}/og.png`] },
  alternates: { canonical: "./" },
  icons: { icon: `${SITE.basePath}/favicon.svg` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1424",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-2">
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
