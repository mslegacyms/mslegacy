import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { ApartmentDevelopmentCalculator } from "@/components/calculators/ApartmentDevelopmentCalculator";

export const metadata: Metadata = {
  title: "Apartment Development Feasibility Planner | MS Legacy",
  description: "Estimate FAR/FSI, built-up potential, saleable area, apartment mix, parking, approvals, construction cost, launch budget, GDV, and investor requirement with MS Legacy."
};

export default function ApartmentDevelopmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 relative overflow-hidden bg-luxury-grid border-b border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Developer Advisory Tools</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Apartment Development Feasibility Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Estimate FAR/FSI, built-up potential, saleable area, apartment mix, parking, approvals, construction cost, launch budget, GDV, and investor requirement using editable authority-wise assumptions.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <ApartmentDevelopmentCalculator />
        </div>
      </section>
    </div>
  );
}
