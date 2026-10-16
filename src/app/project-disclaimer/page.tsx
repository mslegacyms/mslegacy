import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ProjectDisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-20 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Legal Disclosure</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Marketplace Disclaimer & Waivers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Please read the following compliance notice carefully regarding real estate developer catalogs and layout listings.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 flex-grow">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="p-8 bg-white border border-gold-elegant space-y-6 leading-relaxed text-xs text-slate-600 font-medium">
            <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">1. Advisory and Discovery Framework</h3>
            <p>
              MS Legacy is an advisory and property discovery platform. Gated layouts, villas, farm plots, and apartments catalogued on this marketplace represent compiled information sieved from public sources and promoter relations channels. 
            </p>
            <p>
              Publication of these records does not constitute an endorsement, recommendation, or warranty of title clearances or municipal sanctions.
            </p>

            <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">2. Customer Verification Mandate</h3>
            <p>
              Zoning laws, municipal layout sanctions, possession dates, Tower configurations, and starting price benchmarks may change without notice. Buyers must verify all details, including RERA registration status, approvals, encumbrance certificates, and mutation entries, directly with the developer and through independent legal due diligence checks before executing any agreement.
            </p>

            <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">3. RERA Karnataka Compliance</h3>
            <p>
              MS Legacy catalogued records indicate RERA registration status matching active public certificates on the Karnataka RERA portal. We recommend that buyers cross-reference RERA certificate IDs directly on the state portal directory prior to making capital allocations.
            </p>

            <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">4. Trademark & Copyright Placeholder Badges</h3>
            <p>
              Promoter logos and layouts media assets are displayed strictly where marketing rights are authorized. If a developer's permission is pending or denied, MS Legacy serves a neutral text placeholder badge. We resolve takedown requests immediately within 24 business hours.
            </p>

            <div className="pt-6 border-t border-slate-100 text-center">
              <Link href="/projects">
                <Button className="bg-gold-gradient text-[#10291f] border-none font-bold text-xs px-6 py-3 h-auto">
                  Return to Discovery Marketplace
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
