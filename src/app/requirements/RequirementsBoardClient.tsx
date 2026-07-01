"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getPublicRequirements } from "@/lib/requirements/requirements";
import { PropertyRequirement } from "@/lib/types/propertyRequirements";
import { formatINR } from "@/lib/utils";

export default function RequirementsBoardClient() {
  const [requirements, setRequirements] = useState<PropertyRequirement[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedBuyerType, setSelectedBuyerType] = useState("all");

  useEffect(() => {
    async function loadRequirements() {
      const data = await getPublicRequirements();
      setRequirements(data);
      setLoading(false);
    }
    loadRequirements();
  }, []);

  // Filter list
  const filteredRequirements = requirements.filter((r) => {
    const queryMatch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.preferredLocations.some((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.preferredCity.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch = selectedCategory === "all" || r.propertyCategory === selectedCategory;
    const cityMatch = selectedCity === "all" || r.preferredCity.toLowerCase() === selectedCity.toLowerCase();
    
    // Budget checks
    let budgetMatch = true;
    if (selectedBudget === "under_50l") {
      budgetMatch = r.budgetMax <= 5000000;
    } else if (selectedBudget === "50l_1cr") {
      budgetMatch = r.budgetMin <= 10000000 && r.budgetMax >= 500000;
    } else if (selectedBudget === "1cr_3cr") {
      budgetMatch = r.budgetMin <= 30000000 && r.budgetMax >= 10000000;
    } else if (selectedBudget === "above_3cr") {
      budgetMatch = r.budgetMax >= 30000000;
    }

    const buyerTypeMatch = selectedBuyerType === "all" || r.buyerProfile === selectedBuyerType;

    return queryMatch && categoryMatch && cityMatch && budgetMatch && buyerTypeMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-body">
      
      {/* 1. Cinematic Luxury Hero */}
      <section className="bg-dark-luxury-gradient text-white py-16 sm:py-24 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,110,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,110,58,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant uppercase tracking-wider text-[10px]">Demand Sourcing Exchange</Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Tell Us What You Need. <br />
            <span className="text-[#8b6e3a] italic font-normal">We’ll Match the Market.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Post your apartment, plot, villa, farmland, rental, land, or JV requirement. MS Legacy reviews your need, protects your identity details, and matches it with verified developers, agents, and property opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/requirements/post">
              <Button className="bg-[#8b6e3a] hover:bg-[#8b6e3a]/90 text-white font-bold px-6 shadow-md text-xs sm:text-sm">
                Submit Your Requirement
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 hover:bg-white/5 text-white font-bold px-6 text-xs sm:text-sm">
                Request Advisory Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Interactive Marketplace Filters */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-4">
          
          {/* Search bar */}
          <div className="lg:col-span-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Search Keywords</label>
            <input
              type="text"
              placeholder="e.g. Hebbal, Sarjapur, 3BHK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="apartment">Apartments</option>
              <option value="plotted_development">Plotted / Layouts</option>
              <option value="villa">Villas</option>
              <option value="farmland">Farmlands</option>
              <option value="land">Raw Land / Commercial Plot</option>
              <option value="commercial">Commercial Space</option>
              <option value="rental">Rentals</option>
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Preferred City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
            >
              <option value="all">All Cities</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="chikballapur">Chikballapur</option>
              <option value="mysore">Mysore</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Budget Slab</label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
            >
              <option value="all">Any Budget</option>
              <option value="under_50l">Under ₹50 Lakhs</option>
              <option value="50l_1cr">₹50 L – ₹1 Crore</option>
              <option value="1cr_3cr">₹1 Cr – ₹3 Crore</option>
              <option value="above_3cr">Above ₹3 Crore</option>
            </select>
          </div>

          {/* Buyer Profile Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Buyer Profile</label>
            <select
              value={selectedBuyerType}
              onChange={(e) => setSelectedBuyerType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
            >
              <option value="all">All Profiles</option>
              <option value="end_user">End User</option>
              <option value="nri">NRI Sourced</option>
              <option value="hni">HNI Elite Investor</option>
              <option value="investor">Investors</option>
              <option value="developer">Developers</option>
            </select>
          </div>

        </div>
      </section>

      {/* 3. Main Board Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        
        {/* Privacy Advisory Banner */}
        <div className="mb-8 p-4 bg-emerald-50/50 border border-emerald-200/50 rounded flex items-start space-x-3 text-xs text-emerald-800">
          <span className="font-bold uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-800 shrink-0">Privacy First</span>
          <p className="leading-relaxed">
            Identity protection is active: Clients' full names, phone numbers, email addresses, and private notes are kept strictly confidential. Verified property developers, agents, and landowners can submit matching proposals by viewing details and clicking “Share Matching Property”.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-4 border-[#8b6e3a] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Syncing Requirements Board...</p>
          </div>
        ) : filteredRequirements.length === 0 ? (
          <Card className="p-12 text-center border border-dashed border-slate-200 bg-white space-y-4 rounded-xl">
            <h3 className="font-display text-2xl font-bold text-[#10291f]">No Matching Requirements</h3>
            <p className="text-slate-500 max-w-md mx-auto text-xs sm:text-sm font-medium">
              We couldn't find any approved public requirements matching your filter parameters. Try expanding your locations or submit your own requirement to build customized listings.
            </p>
            <div className="pt-2">
              <Link href="/requirements/post">
                <Button className="bg-[#10291f] text-white text-xs font-bold px-6 py-2.5">
                  Post Your Need
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequirements.map((req) => (
              <Card key={req.id} className="flex flex-col justify-between border border-gold-elegant bg-white card-lift overflow-hidden rounded-lg shadow-sm">
                
                {/* Card Header */}
                <div className="p-6 pb-4 border-b border-slate-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="neutral" className="text-[9px] uppercase font-bold tracking-wider">
                      {req.requirementCode}
                    </Badge>
                    <Badge 
                      variant={req.priority === "urgent" ? "danger" : req.priority === "high" ? "gold" : "neutral"}
                      className="text-[9px] uppercase font-bold tracking-wider"
                    >
                      {req.priority} Priority
                    </Badge>
                  </div>
                  
                  <Link href={`/requirements/${req.slug}`} className="block group">
                    <h3 className="font-display text-lg font-bold text-[#10291f] group-hover:text-[#8b6e3a] transition-colors line-clamp-2 leading-snug">
                      {req.title}
                    </h3>
                  </Link>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Badge variant="gold" className="bg-[#8b6e3a]/10 text-[#8b6e3a] border border-[#8b6e3a]/20 text-[9px] uppercase font-bold px-2 py-0.5">
                      {req.propertyCategory.replace("_", " ")}
                    </Badge>
                    <Badge variant="neutral" className="text-[9px] uppercase font-bold px-2 py-0.5">
                      {req.buyerProfile} Demand
                    </Badge>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 py-4 flex-grow space-y-4 text-xs">
                  <p className="text-slate-500 line-clamp-3 leading-relaxed">
                    {req.requirementSummary}
                  </p>
                  
                  <div className="space-y-2 border-t border-slate-50 pt-4 font-sans text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Locations:</span>
                      <span className="font-bold text-[#10291f] truncate max-w-[180px]">{req.preferredLocations.join(", ")}, {req.preferredCity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Budget Range:</span>
                      <span className="font-bold text-[#10291f]">{formatINR(req.budgetMin)} - {formatINR(req.budgetMax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timeline:</span>
                      <span className="font-semibold text-slate-700">{req.possessionTimeline || req.purchaseTimeline || "Under Negotiation"}</span>
                    </div>
                    {req.landSizeMax && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Preferred Size:</span>
                        <span className="font-bold text-[#10291f]">{req.landSizeMin || 0} - {req.landSizeMax} {req.landSizeUnit || "Acres"}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-4 border-t border-slate-50 bg-slate-50/50 flex space-x-2 items-center">
                  <Link href={`/requirements/${req.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-[11px] font-bold border-gold-elegant text-[#10291f] hover:bg-[#10291f]/5">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/requirements/${req.slug}`} className="flex-1">
                    <Button size="sm" className="w-full text-[11px] font-bold bg-[#10291f] text-white hover:bg-[#10291f]/90">
                      Submit Match
                    </Button>
                  </Link>
                </div>

              </Card>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}
