import { getSiteOrigin } from "@/lib/site";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: "MS LEGACY | Property Information & Planning",
  description: "An integrated ecosystem for land sourcing, turnkey construction, legal audits, property management, and structured project participations.",
  openGraph: {
    title: "MS LEGACY | Property Information & Planning",
    description: "An integrated ecosystem for land sourcing, turnkey construction, legal audits, property management, and structured project participations.",
    type: "website",
    locale: "en_IN",
    url: getSiteOrigin(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f8f5ef] text-[#10291f] overflow-x-hidden">
        <Header />
        <main className="flex-grow pt-24">
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
