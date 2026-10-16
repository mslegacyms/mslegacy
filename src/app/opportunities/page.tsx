"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockProperties } from "@/lib/data/mockProperties";
import { formatINR } from "@/lib/utils";
import { EmptyState } from "@/components/ui/FeedbackStates";

export default function OpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "bda_site", label: "BDA Sites" },
    { value: "villa", label: "Luxury Villas" },
    { value: "farm_land", label: "Managed Farmlands" },
    { value: "commercial_plot", label: "Commercial Plots" }
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "North", label: "North Bangalore" },
    { value: "East", label: "East Bangalore" },
    { value: "South", label: "South Bangalore" }
  ];

  const filteredProperties = mockProperties.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const locationMatch = selectedLocation === "all" || item.location.includes(selectedLocation);
    return categoryMatch && locationMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Opportunities Showcase</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Curated Real Estate Assets
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Every listing has undergone a detailed legal due diligence audit and connectivity indexing by our internal teams.
          </p>
        </div>
      </section>

      {/* Filters & Listings */}
      <section className="bg-white py-20 sm:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-12 p-6 bg-slate-50 border border-gold-elegant rounded">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Category Select */}
              <div className="w-full sm:w-48">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Asset Class</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Location Select */}
              <div className="w-full sm:w-48">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Corridor</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                >
                  {locations.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
              Showing {filteredProperties.length} of {mockProperties.length} Opportunities
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProperties.map((opportunity) => (
                <Card key={opportunity.id} className="flex flex-col h-full border border-gold-elegant card-lift bg-white">
                  <div className="p-6 flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="neutral" className="uppercase text-[9px] font-bold tracking-wider">{opportunity.category.replace("_", " ")}</Badge>
                      <Badge variant="gold" className="bg-[#8b6e3a]/15 text-[#8A704C] border border-gold-elegant text-[10px] font-sans font-bold">
                        Score: {opportunity.wealthScore.overall}
                      </Badge>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#10291f] line-clamp-2">
                      {opportunity.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 italic border-l-2 border-[#8b6e3a] pl-3 py-1 font-medium">
                      "{opportunity.wealthScore.summary}"
                    </p>
                    
                    <div className="space-y-2 text-xs text-slate-500 pt-4 border-t border-slate-100 font-sans">
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="font-bold text-slate-700">{opportunity.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span className="font-bold text-slate-700">{opportunity.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RERA Status:</span>
                        <span className={opportunity.reraStatus === "approved" ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                          {opportunity.reraStatus === "approved" ? `APPROVED` : opportunity.reraStatus.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Legal Title:</span>
                        <span className="text-emerald-600 font-bold">{opportunity.ownershipStatus.replace("_", " ").toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  {/* Price and Action */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Value starting at</p>
                      <p className="text-base font-sans font-bold text-[#10291f]">{formatINR(opportunity.price)}</p>
                    </div>
                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="font-bold text-xs border-gold-elegant hover:bg-white/5">
                        Request Private Review
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Sourced Listings Match"
              description="Our sifting desks haven't verified layouts with this category filter. Try selecting alternative corridors."
              actionLabel="Clear Filter Selections"
              onActionClick={() => {
                setSelectedCategory("all");
                setSelectedLocation("all");
              }}
            />
          )}

          {/* Compliance Notice */}
          <div className="mt-16 bg-slate-50 border border-gold-elegant p-6 rounded text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto text-center space-y-2 font-medium">
            <span className="font-bold text-[#10291f] uppercase tracking-wider block">Demonstration Listings Disclaimer</span>
            <p>
              The properties and opportunities listed above represent mock demonstration entries seeded to illustrate website layouts and search center functionalities. They do not represent real offerings. RERA registry data, dimensions, prices, and locations are simulated for interface validation.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
