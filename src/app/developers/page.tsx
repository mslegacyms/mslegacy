"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { DeveloperCard } from "@/components/developers/DeveloperCard";
import { getDevelopers } from "@/lib/developers/developers";
import { Developer } from "@/lib/types/developerMarketplace";

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getDevelopers();
      setDevelopers(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredDevelopers = developers.filter((d) => {
    const nameMatch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = selectedType === "all" || d.developerType === selectedType;
    return nameMatch && typeMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-20 sm:py-24 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Developer Directory</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Promoters & Developers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Explore verified corporate real estate developer profiles and land banking promoters across Karnataka.
          </p>
        </div>
      </section>

      {/* Directory Content */}
      <section className="py-16 sm:py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-white border border-gold-elegant rounded mb-10">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
              {/* Search */}
              <div className="w-full sm:w-64">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Search Developer</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-semibold bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                  placeholder="E.g. Prestige..."
                />
              </div>

              {/* Product Type Filter */}
              <div className="w-full sm:w-48">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Developer Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                >
                  <option value="all">All Profiles</option>
                  <option value="public_limited">Public Limited</option>
                  <option value="private_limited">Private Limited</option>
                </select>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {filteredDevelopers.length} Developers Sourced
            </div>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="text-center py-20 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
              Retrieving corporate listings...
            </div>
          ) : filteredDevelopers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredDevelopers.map((dev) => (
                <DeveloperCard key={dev.id} developer={dev} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gold-elegant rounded max-w-md mx-auto space-y-4">
              <h3 className="font-serif text-lg font-bold">Data Under Verification</h3>
              <p className="text-xs text-slate-500 px-6 font-medium">
                MS Legacy is currently verifying project data directly with developers, RERA records, and documentation sources. For curated recommendations, request a private advisory review.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Advisory Disclaimers */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center text-[10px] text-slate-400 leading-relaxed space-y-2">
          <span className="font-bold text-[#10291f] uppercase tracking-wide block">Directory Advisory Disclaimers</span>
          <p>
            Project details, floor plans, pricing, availability, possession dates, approvals, RERA status, and media are shown for advisory discovery only and may change without notice. Buyers must verify all information directly with the developer, Karnataka RERA, and independent legal advisors before making any decision. Read our full <Link href="/project-disclaimer" className="text-[#8b6e3a] underline font-bold">Marketplace Disclaimer</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
