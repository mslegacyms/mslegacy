import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { ShieldCheck, Compass, Users } from "@/components/ui/Icons";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-[#10291f] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8b6e3a]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">About The Platform</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Creating Wealth through Real Estate
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Building assets, mitigating regulatory risks, and securing multi-generational legacies under a single, institutional-grade ecosystem.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] text-center mb-8">
            Stewardship & Asset Preservation
          </h2>
          <p>
            At MS Legacy, we believe real estate is more than land, structures, and transactional contracts. It is one of the most powerful vehicles for creating wealth, securing financial independence, and building a legacy that endures for generations.
          </p>
          <p>
            Our purpose is simple: <strong>To help individuals, families, investors, NRIs, and businesses navigate the complex real estate landscape with absolute clarity and safety.</strong>
          </p>
          <p>
            We have constructed an integrated real estate ecosystem that brings property sales, land sourcing, custom turnkey construction, legal due diligence, and asset stewardship under a single, accountable corporate platform. Whether you are building your custom villa, acquiring agricultural holdings, or seeking private project participations, MS Legacy is your trusted partner.
          </p>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] text-center mb-12">
            The Structural Evolution
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded border border-slate-200">
              <thead>
                <tr className="bg-[#10291f] text-white font-serif text-sm">
                  <th className="p-4 border border-slate-800">Operational Category</th>
                  <th className="p-4 border border-slate-800">Traditional Real Estate Market</th>
                  <th className="p-4 border border-slate-800 text-[#8b6e3a]">MS Legacy Integrated Platform</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-slate-600">
                <tr>
                  <td className="p-4 font-bold border border-slate-100 bg-slate-50 text-[#10291f]">Due Diligence</td>
                  <td className="p-4 border border-slate-100">Speculative checking, unverified claims, buyer carries full risk.</td>
                  <td className="p-4 border border-slate-100 text-emerald-700 font-semibold bg-emerald-500/5">Exhaustive 30-year title checks, municipal audits, RERA validation before list.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold border border-slate-100 bg-slate-50 text-[#10291f]">Execution Control</td>
                  <td className="p-4 border border-slate-100">Fragmented builders, materials compromises, cost overruns.</td>
                  <td className="p-4 border border-slate-100 text-emerald-700 font-semibold bg-emerald-500/5">Turnkey project managers, transparent schedules, quality checks.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold border border-slate-100 bg-slate-50 text-[#10291f]">Asset Management</td>
                  <td className="p-4 border border-slate-100">Independent caretakers, rent default risks, maintenance delays.</td>
                  <td className="p-4 border border-slate-100 text-emerald-700 font-semibold bg-emerald-500/5">Lease administration, verified tenant screening, digital photo reports.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold border border-slate-100 bg-slate-50 text-[#10291f]">Investment Style</td>
                  <td className="p-4 border border-slate-100">Speculative broker advice, emotional purchasing.</td>
                  <td className="p-4 border border-slate-100 text-emerald-700 font-semibold bg-emerald-500/5">Proprietary PROPERTY WEALTH SCORE™ metric-based reviews.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] text-center mb-12">
            Our Foundation Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4">
              <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Absolute Integrity</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe trust is earned through transparency. Every contract, title search, and recommendation is guided by ethical corporate governance.
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                <Compass size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Analytical Precision</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No speculation. Every property on our platform is backed by local market data, connectivity indexing, and legal verifications.
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                <Users size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Long-Term Thinking</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We measure our success by the multi-generational legacies our clients build. We focus on sustainable growth and asset preservation.
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
