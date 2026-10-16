import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { ShieldCheck } from "@/components/ui/Icons";

export default function LegalDueDiligencePage() {
  const packages = [
    { title: "Comprehensive Title Search", desc: "Review of the 30-year ownership history, mother deeds, and registration records." },
    { title: "Khata & Revenue Verification", desc: "Auditing property khata certificate validity (A-Khata/B-Khata) and mutation records." },
    { title: "Encumbrance Certificate (EC) Auditing", desc: "Verifying that the asset has no outstanding mortgages, liens, or court disputes." },
    { title: "Agreement Drafting & Registration", desc: "Drafting Sale Deeds, Sale Agreements, and Power of Attorney documents, with complete registration support." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Legal Clearance Desk</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Institutional-Grade Real Estate Legal Services
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Securing your property transactions with title investigations, municipal compliance checks, and clear legal documentation.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-[#10291f] tracking-tight">
              Securing Investments, Eliminating Litigation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              The largest risk in real estate is incomplete due diligence. Unregistered parent deeds, outstanding bank loans, property tax defaults, or missing municipal permissions can lead to costly legal disputes.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              MS Legacy's Legal Services division conducts detailed pre-purchase investigations. We compile clear title reports, trace ownership histories for up to 30 years, verify khata documents, and draft secure agreements to protect your investments.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-slate-50 py-20 sm:py-24 border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold">Due Diligence</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#10291f]">
              Due Diligence Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((item, index) => (
              <Card key={index} className="p-6 bg-white flex items-start space-x-4 border border-gold-elegant card-lift">
                <div className="p-2 bg-[#10291f]/5 rounded text-[#8b6e3a]">
                  <ShieldCheck size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#10291f]">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
}
