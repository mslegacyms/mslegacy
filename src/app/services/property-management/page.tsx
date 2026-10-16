import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { UserCheck } from "@/components/ui/Icons";

export default function PropertyManagementPage() {
  const services = [
    { title: "Verified Tenant Sourcing", desc: "Strict background checks and income verifications to secure reliable tenants." },
    { title: "Lease Compliance & Administration", desc: "Drafting and executing legally compliant lease agreements to protect your assets." },
    { title: "Financial Administration", desc: "Monthly rent collection, deposit holding, and prompt transfers to your bank account." },
    { title: "Routine Maintenance & Inspections", desc: "Proactive upkeep, plumber/electrician coordination, and digital inspection reports for owners." },
    { title: "Specialized NRI Care", desc: "A dedicated service team to manage overseas assets, handle local taxes, and execute power of attorney commands." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Property Custody Desk</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Professional Property Stewardship & Management
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Preserve property value and secure consistent cash flows with hands-off local asset oversight and tenant administration.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-[#10291f] tracking-tight">
              Protecting Assets, Maximizing Yields
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Property ownership, especially for overseas owners or NRIs, can become a administrative challenge. Dealing with tenant turnovers, lease agreements, maintenance, and unpaid utilities can consume significant time.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              MS Legacy acts as your local property caretaker. Our property management division handles tenant sourcing, lease renewals, security deposits, rent collection, routine upkeep, and utility compliance. We provide an online client dashboard featuring detailed reports and photographs of your assets.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-slate-50 py-20 sm:py-24 border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold">Management Services</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#10291f]">
              Core Custody Desks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <Card key={index} className="p-6 bg-white space-y-3 border border-gold-elegant card-lift">
                <h3 className="font-serif text-lg font-bold text-[#10291f]">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
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
