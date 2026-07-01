import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { ShieldCheck, Activity } from "@/components/ui/Icons";
import Link from "next/link";

export default function ProjectParticipationPage() {
  const models = [
    { title: "Land Sourcing Partnerships", desc: "Acquiring strategic acreage within infrastructure-driven corridors prior to layout development." },
    { title: "Residential Layout Developments", desc: "Co-developing premium, RERA-compliant gated community plots in partnership with land banking teams." },
    { title: "Commercial Asset Developments", desc: "Structured co-ownership in retail spaces, business offices, and logistical warehouse developments." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Private Development Desk</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Structured Project Participation
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Participate in early-stage layout developments and land banking ventures alongside experienced development teams.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-[#10291f] tracking-tight">
              Private Co-Development Frameworks
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Historically, real estate development returns have been restricted to large developers and high-net-worth institutional funds. MS Legacy's Project Participation model changes this by offering qualified participants a structured pathway to participate in the value created during land acquisition, layout development, and project monetization.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Every private project is subjected to rigorous legal and financial due diligence. Participation is invitation-based, restricted to qualified users who meet eligibility criteria, and managed through formal, private placement documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="bg-slate-50 py-20 sm:py-24 border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold">Structured Models</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#10291f]">
              Structured Models of Participation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((item, index) => (
              <Card key={index} className="p-8 bg-white space-y-4 border border-gold-elegant card-lift">
                <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                  <Activity size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#10291f]">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Warnings / Disclaimers */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-serif text-3xl font-bold text-[#10291f] text-center mb-6">
            Regulatory Notice & Disclaimers
          </h2>
          
          <div className="bg-slate-50 border border-gold-elegant p-6 rounded text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
            <p className="font-bold text-[#10291f]">
              Please review the following warnings carefully before inquiring:
            </p>
            <p>
              1. <strong>Private Placement Only:</strong> Project participation opportunities are offered on a private placement basis. They do not constitute public offerings of securities or collective investment schemes (CIS).
            </p>
            <p>
              2. <strong>No Guaranteed Returns:</strong> Real estate co-developments involve market risks, regulatory dependencies, and timeline variations. MS Legacy does not guarantee returns on capital, specific exit windows, or project approvals.
            </p>
            <p>
              3. <strong>Due Diligence Required:</strong> All participations require independent legal and financial due diligence checks by the participant. Access is subject to an eligibility-based review.
            </p>
          </div>
          
          <div className="text-center pt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-gold-gradient text-[#10291f] hover:brightness-110 font-bold px-8 border-none h-fit py-3.5">
                Request Eligibility Review
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
