import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Compass, Landmark, UserCheck, ShieldCheck, Activity, ArrowRight } from "@/components/ui/Icons";
import { CTAStrip } from "@/components/layout/CTAStrip";

export default function ServicesPage() {
  const serviceList = [
    {
      title: "Land Sourcing Division",
      desc: "Acquire high-potential agricultural, residential, and commercial land plots in emerging growth corridors. Backed by rigorous pre-acquisition audits.",
      href: "/services/land-sourcing",
      icon: <Compass size={24} />,
    },
    {
      title: "Turnkey Construction",
      desc: "Design and build luxury villas, independent residences, farmhouses, and light industrial assets under a single turnkey contract.",
      href: "/services/turnkey-construction",
      icon: <Landmark size={24} />,
    },
    {
      title: "Property Management",
      desc: "Hassle-free landlord services including tenant verification, rental collection, lease compliance, and routine digital care reports.",
      href: "/services/property-management",
      icon: <UserCheck size={24} />,
    },
    {
      title: "Legal Due Diligence",
      desc: "Audit property title histories, parent deeds, khata certificate status, and secure registration documentation by legal experts.",
      href: "/services/legal-due-diligence",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Project Participation",
      desc: "Participate in early-stage layout developments and land banking ventures alongside experienced development teams under private reviews.",
      href: "/project-participation",
      icon: <Activity size={24} />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-[#10291f] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8b6e3a]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">Integrated Services Portal</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Comprehensive Real Estate Stewardship
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Consolidating the fragmented property journey. We manage acquisitions, designs, builds, rentals, and legalities under one accountable ecosystem.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceList.map((service, index) => (
              <Card key={index} className="p-8 flex flex-col justify-between" borderAccent>
                <div className="space-y-4">
                  <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#10291f]">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="pt-8">
                  <Link href={service.href}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto font-semibold">
                      Explore Division <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </Link>
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
