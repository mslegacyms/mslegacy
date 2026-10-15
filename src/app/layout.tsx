import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { publicSite } from "@/lib/publicSite";

export const metadata: Metadata = {
  metadataBase: new URL(publicSite.url),
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  title: {
    default: "MS LEGACY | Property Advisory & Services",
    template: "%s | MS LEGACY",
  },
  description:
    "Property sourcing, construction and PMC, property management and document-review coordination from MS LEGACY, Bengaluru.",
  openGraph: { siteName: "MS LEGACY", type: "website", locale: "en_IN" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <a className="site-skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
