import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { Landmark, ShieldCheck } from "@/components/ui/Icons";

export default function TurnkeyConstructionPage() {
  const capabilities = [
    {
      title: "Luxury Custom Villas",
      desc: "Personalized, high-end residences engineered for comfort and long-term asset value."
    },
    {
      title: "Managed Farmhouses",
      desc: "Agro-lifestyle retreats combining natural settings with modern structural conveniences."
    },
    {
      title: "Commercial & Retail Assets",
      desc: "Durable, high-efficiency business properties built to optimize tenant layout needs."
    },
    {
      title: "Light Industrial & Warehousing",
      desc: "Functional warehousing spaces designed with strong foundations, logistics access, and utility connections."
    }
  ];

  const steps = [
    { title: "Design & Permissions", desc: "Coordinated floor layouts, structural designs, and municipal clearance approvals." },
    { title: "Structural Phase", desc: "Foundation, columns, concrete works, and brick structures built under strict engineering supervision." },
    { title: "Finishings & Utilities", desc: "Electrical piping, plumbing setups, plastering, flooring, and interior finishings." },
    { title: "Quality Audit & Handover", desc: "A 120-point quality check before key registration and property delivery." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Construction Desk</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Turnkey Construction: Design. Build. Deliver.
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Transforming your architectural vision into premium structures with absolute budget transparency, design engineering, and timely delivery.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-[#10291f] tracking-tight">
              Unified Build Execution
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Managing independent architects, structural engineers, local labor contractors, and materials suppliers is complex. It often leads to cost overruns, poor structural checks, delayed handovers, and coordinate misalignments.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              MS Legacy provides complete, single-point turnkey construction responsibility. From structural engineering and municipal building permits to interior design and utility setups, our project managers handle every stage. We utilize professional project management tools to provide regular progress reports, ensuring your build is completed on schedule and within budget.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-slate-50 py-20 sm:py-24 border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold">Capabilities</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#10291f]">
              Construction Sourcing Desks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {capabilities.map((item, index) => (
              <Card key={index} className="p-6 bg-white space-y-3 border border-gold-elegant card-lift">
                <h3 className="font-serif text-lg font-bold text-[#10291f]">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Roadmap */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold">Steps Roadmap</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#10291f]">
              The Build Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="space-y-2 border-t border-gold-elegant pt-6">
                <span className="font-serif text-3xl font-bold text-[#8b6e3a]/30 block">0{index + 1}</span>
                <h4 className="font-serif text-base font-bold text-[#10291f]">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
}
