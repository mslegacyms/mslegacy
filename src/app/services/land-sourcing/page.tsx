import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { Compass, ShieldCheck } from "@/components/ui/Icons";

export default function LandSourcingPage() {
  const handles = [
    "Identify growth corridors driven by upcoming infrastructure (metro, airports).",
    "Trace and verify 30-year title ownership chains to eliminate dispute risks.",
    "Verify layout compliance and land zoning parameters (residential vs agricultural).",
    "Perform comparable market valuation audits to ensure fair direct purchase pricing."
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Sourcing Desk</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Strategic Land Sourcing in Emerging Growth Corridors
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Acquire premium land assets backed by comprehensive demographic research, infrastructure forecasting, and pre-acquisition legal clearance.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-[#10291f] tracking-tight">
              Acquiring with Metrics, Not Speculation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Sourcing land in India is fraught with legal complexity. Buyers often struggle with overlapping ownership claims, hidden encumbrances, zoning classification errors, and overpricing due to intermediaries.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              MS Legacy resolves this friction. We execute data-driven property acquisitions. Our sourcing team monitors government zoning expansions, highway corridor announcements, and transit updates to identify high-potential lands. Before any land plot is recommended to a client, it is subjected to an exhaustive legal and technical audit by our internal legal team.
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#8b6e3a] p-6 rounded-r border border-gold-elegant">
            <h4 className="font-serif text-lg font-bold text-[#10291f] mb-2 flex items-center">
              <ShieldCheck size={18} className="mr-2 text-[#8b6e3a]" />
              Zero-Risk Sourcing Mandate
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              We never broker unverified properties. Every sourcing recommendation is accompanied by a complete legal audit chain dossier.
            </p>
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="bg-slate-50 py-20 sm:py-24 border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold">Process rigor</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#10291f]">
              What MS Legacy Manages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {handles.map((item, index) => (
              <Card key={index} className="p-6 bg-white flex items-start space-x-4 border border-gold-elegant card-lift">
                <span className="font-serif text-2xl font-bold text-[#8b6e3a]">0{index + 1}</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <h2 className="font-serif text-3xl font-bold text-[#10291f] tracking-tight">
            Who This Is For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <Card className="p-8 space-y-4 border border-gold-elegant card-lift bg-white">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Private Home Builders</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Secure residential plots in Bangalore's premium layout belts, completely insulated from title overlapping or land conversion disputes.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border border-gold-elegant card-lift bg-white">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Corporate & HNI Land Banking</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Position family capital inside long-term growth corridors, utilizing structural analytics to time exit appreciation windows.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
}
