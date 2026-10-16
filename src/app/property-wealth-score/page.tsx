import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { ShieldCheck, MapPin, Scale, Compass } from "@/components/ui/Icons";
import Link from "next/link";

export default function PropertyWealthScorePage() {
  const categories = [
    { title: "Location Dynamics (30%)", desc: "Measures market supply, developer demand, historical appreciation, population density shifts, and surrounding economic activity." },
    { title: "Legal Title Integrity (35%)", desc: "Audits historical title trace reports, mother deeds, encumbrance history (last 30 years), court disputes, and municipal approvals." },
    { title: "Infrastructure Development (20%)", desc: "Assesses proximity to upcoming public infrastructure, highway networks, metro lines, and municipal utilities." },
    { title: "Connectivity Index (15%)", desc: "Measures physical road quality, approach width, public transit access, and transit times to nearby institutional hubs." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-[#10291f] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8b6e3a]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">Proprietary Evaluation Framework</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            The Property Wealth Score™ System
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminating speculation from property buying. We evaluate listings out of 10 points using data analytics, connectivity indexing, and legal audits.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f]">
              Data-Backed Real Estate Decisions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-left">
              Buying real estate should never be based solely on emotions, glossy brochures, or speculative rumors. Successful investors make decisions based on verifiable facts, due diligence, and infrastructure connectivity.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-left">
              The PROPERTY WEALTH SCORE™ is our proprietary property intelligence framework that evaluates every listing across multiple performance parameters. This score compiles complex technical, legal, and financial analyses into a single rating to help you invest with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] text-center mb-12">
            Weighted Score Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((item, index) => (
              <Card key={index} className="p-6 bg-white space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#10291f]">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Score Panel */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            {/* Left - Score Dial */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center border border-slate-100 p-8 rounded bg-slate-50 shadow-xs">
              <div className="w-32 h-32 rounded-full border-8 border-[#8b6e3a] flex items-center justify-center bg-white">
                <span className="font-serif text-3xl font-bold text-[#10291f]">9.2</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Overall Rating: Excellent</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                This rating indicates prime growth corridor positioning and clear legal title history.
              </p>
            </div>

            {/* Right - Parameter sliders */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#10291f] mb-4">Sample Scoring breakdown</h3>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Legal Title Integrity (35%)</span>
                  <span className="text-[#8b6e3a]">9.8</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#8b6e3a] h-full" style={{ width: "98%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Location Dynamics (30%)</span>
                  <span className="text-[#8b6e3a]">9.5</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#8b6e3a] h-full" style={{ width: "95%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Infrastructure Development (20%)</span>
                  <span className="text-[#8b6e3a]">8.5</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#8b6e3a] h-full" style={{ width: "85%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Physical Connectivity (15%)</span>
                  <span className="text-[#8b6e3a]">8.8</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#8b6e3a] h-full" style={{ width: "88%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#10291f]">
            Legal Disclaimer & Terms of Use
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            The Property Wealth Score™ is a proprietary decision-support rating framework created by MS Legacy. It is intended for informational and research purposes only. The score is calculated based on municipal approvals, market data, and connectivity indexes available at the time of evaluation. 
          </p>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            <strong>The Property Wealth Score™ does not constitute financial, investment, or legal advice. It does not guarantee future asset appreciation, rent yields, resale values, or profit outcomes.</strong> Real estate investments involve market risks. All buyers must perform independent legal title clearances and financial consults before executing any property acquisition.
          </p>
          
          <div className="pt-8">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Request Custom Property Audit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
}
