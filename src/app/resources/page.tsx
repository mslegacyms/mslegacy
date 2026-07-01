import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { ShieldCheck, Compass, Landmark } from "@/components/ui/Icons";

export default function ResourcesPage() {
  const govtLinks = [
    { name: "Kaveri Online Services", url: "https://kaveri.karnataka.gov.in", desc: "Official stamps and registration services of Karnataka (EC search, document copies)." },
    { name: "Bhoomi Land Records", url: "https://landrecords.karnataka.gov.in", desc: "Official digital repository for agricultural land records (RTC, Mutation status)." },
    { name: "Karnataka RERA", url: "https://rera.karnataka.gov.in", desc: "Real Estate Regulatory Authority project compliance search portal." },
    { name: "e-Swathu Portal", url: "https://eswathu.karnataka.gov.in", desc: "Rural municipal properties khata verification records." },
    { name: "BBMP Property Tax", url: "https://bbmptax.karnataka.gov.in", desc: "Bruhat Bengaluru Mahanagara Palike municipal tax dues search." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-[#10291f] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8b6e3a]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">Public Resource Center</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Government Portals & Documentation Guides
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Consolidated resources and compliance directories compiled to help buyers execute legally secure property decisions.
          </p>
        </div>
      </section>

      {/* Checklists */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] text-center mb-8">
              Essential Property Documents Checklist
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              <Card className="p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#10291f] flex items-center border-b pb-2 border-slate-100">
                  <span className="w-1.5 h-1.5 bg-[#8b6e3a] rounded-full mr-2" />
                  Residential Properties
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-4 leading-relaxed">
                  <li><strong>Registered Sale Deed</strong> (establishing final title chain)</li>
                  <li><strong>Mother Deed</strong> (parent ownership tracking docs)</li>
                  <li><strong>Encumbrance Certificate (EC)</strong> (last 30 years verified)</li>
                  <li><strong>Khata Certificate & Extract</strong> (municipal registration)</li>
                  <li><strong>Approved Layout Plan & RERA Certificate</strong></li>
                  <li><strong>Occupancy Certificate (OC)</strong> (for apartments/villas)</li>
                </ul>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#10291f] flex items-center border-b pb-2 border-slate-100">
                  <span className="w-1.5 h-1.5 bg-[#8b6e3a] rounded-full mr-2" />
                  Agricultural / Farm Land
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-4 leading-relaxed">
                  <li><strong>Registered Sale Deed & Succession Certificate</strong></li>
                  <li><strong>RTC (Pahani) / Record of Rights</strong></li>
                  <li><strong>Mutation Extracts & Survey Sketches</strong></li>
                  <li><strong>Official Village Map</strong> showing boundary lanes</li>
                  <li><strong>Zoning Classification Orders</strong> (DC conversion if needed)</li>
                  <li><strong>Forest Department Clearances</strong> (where adjacent)</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Official Portals Directory */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] text-center mb-4">
            Government Property Verification Hub
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
            Explore RERA Karnataka databases, Mojini survey sketches, Bhoomi land records, Kaveri Stamps registration search, and municipal BBMP tax portals on our dedicated links dashboard.
          </p>
          <div className="pt-4 flex justify-center">
            <Link href="/government-links">
              <Button className="bg-[#10291f] text-white font-bold text-xs py-3 px-8 h-auto">
                Launch Government Verification Hub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: RESOURCE DIRECTORIES CARDS */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] text-center mb-4">
            MS Legacy Advisory Directories
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white border border-[#d9c79f]/50 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#8b6e3a]">News & Circulars</span>
                <h4 className="font-sans text-sm font-bold text-[#10291f]">Property News & Government Norms</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Verify RERA extensions, e-swathu Form 9/11 mandates, and guidance adjustments.</p>
              </div>
              <Link href="/news" className="text-xs font-bold text-[#8b6e3a] hover:underline pt-2 block">Read updates →</Link>
            </Card>

            <Card className="p-6 bg-white border border-[#d9c79f]/50 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#8b6e3a]">Official Portals</span>
                <h4 className="font-sans text-sm font-bold text-[#10291f]">Government Property Links</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Direct reference links to Kaveri stamps lookup, Bhoomi maps, and Mojini sketches.</p>
              </div>
              <Link href="/government-links" className="text-xs font-bold text-[#8b6e3a] hover:underline pt-2 block">Open directories →</Link>
            </Card>

            <Card className="p-6 bg-white border border-[#d9c79f]/50 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#8b6e3a]">Financial Planners</span>
                <h4 className="font-sans text-sm font-bold text-[#10291f]">Property Calculators</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Compute stamp registrations, EMIs, rental yields, and layouts feasibility.</p>
              </div>
              <Link href="/calculators" className="text-xs font-bold text-[#8b6e3a] hover:underline pt-2 block">Launch tools →</Link>
            </Card>

            <Card className="p-6 bg-white border border-[#d9c79f]/50 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#8b6e3a]">Security checklists</span>
                <h4 className="font-sans text-sm font-bold text-[#10291f]">Project Verification Guides</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Learn how MS Legacy reviews environmental NOCs and 30-year mother deeds.</p>
              </div>
              <Link href="/news/how-ms-legacy-vets-properties" className="text-xs font-bold text-[#8b6e3a] hover:underline pt-2 block">Read Guide →</Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">Compliance Notice</Badge>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#10291f]">
            Project Participation Caution Note
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Co-development land layouts and structured project participations are not public investment offers. Real estate layouts depend heavily on local municipal sanctions, road accessibility approvals, and RERA registrations. Clients must seek independent legal counsel to verify parent titles, zoning compliance certificates, and contract specifications before signing any formal private co-development agreements.
          </p>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
}
