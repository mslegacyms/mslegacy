"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { DeveloperProject, Developer } from "@/lib/types/developerMarketplace";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmiCalculator } from "@/components/calculators/EmiCalculator";

export default function ProjectsShowroomPage() {
  const [projects, setProjects] = useState<DeveloperProject[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedVerification, setSelectedVerification] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [projData, devData] = await Promise.all([
        getProjects(),
        getDevelopers()
      ]);
      setProjects(projData);
      setDevelopers(devData);
      setLoading(false);
    }
    loadData();
  }, []);

  const getDevName = (devId?: string) => {
    return developers.find((d) => d.id === devId)?.name || "Developer Sourced";
  };

  const handleToggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((cid) => cid !== id));
    } else {
      if (compareIds.length >= 3) {
        alert("You can compare a maximum of 3 project layouts simultaneously.");
        return;
      }
      setCompareIds([...compareIds, id]);
    }
  };

  // Showing all catalogued projects safely
  const filteredProjects = projects.filter((p) => {
    const typeMatch = selectedType === "all" || p.projectType === selectedType;
    const statusMatch = selectedStatus === "all" || p.projectStatus === selectedStatus;
    const cityMatch = selectedCity === "all" || p.city?.toLowerCase() === selectedCity.toLowerCase();
    const verificationMatch =
      selectedVerification === "all" ||
      p.mslegacyVerificationStatus === selectedVerification;
    const visibilityMatch = p.publicVisibility === "published" || p.publicVisibility === "public_information";
    const queryMatch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      getDevName(p.developerId).toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && statusMatch && cityMatch && verificationMatch && visibilityMatch && queryMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      
      {/* 1. Cinematic Luxury Hero */}
      <section className="bg-dark-luxury-gradient text-white py-16 sm:py-24 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,110,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,110,58,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Asset Showroom</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Explore Curated Property Projects Across Karnataka
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Browse apartments, plotted developments, villa communities, and managed land opportunities through MS Legacy’s documentation-first advisory framework.
          </p>
        </div>
      </section>

      {/* 2. Category Tabs (Wrapped & Centered) */}
      <section className="py-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <button 
              onClick={() => { setSelectedType("all"); setSelectedStatus("all"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedType === "all" && selectedStatus === "all" && selectedVerification === "all" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              All Projects
            </button>
            <button 
              onClick={() => { setSelectedType("apartment"); setSelectedStatus("all"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedType === "apartment" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Apartments
            </button>
            <button 
              onClick={() => { setSelectedType("plotted"); setSelectedStatus("all"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedType === "plotted" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Plotted Developments
            </button>
            <button 
              onClick={() => { setSelectedType("villa"); setSelectedStatus("all"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedType === "villa" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Villas
            </button>
            <button 
              onClick={() => { setSelectedType("farmland"); setSelectedStatus("all"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedType === "farmland" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Farm Lands
            </button>
            <button 
              onClick={() => { setSelectedType("all"); setSelectedStatus("ongoing"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedStatus === "ongoing" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Ongoing
            </button>
            <button 
              onClick={() => { setSelectedType("all"); setSelectedStatus("completed"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedStatus === "completed" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Completed
            </button>
            <button 
              onClick={() => { setSelectedType("all"); setSelectedStatus("upcoming"); setSelectedVerification("all"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedStatus === "upcoming" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => { setSelectedType("all"); setSelectedStatus("all"); setSelectedVerification("pending_verification"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedVerification === "pending_verification" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              Verification Pending
            </button>
            <button 
              onClick={() => { setSelectedType("all"); setSelectedStatus("all"); setSelectedVerification("rera_matched"); }}
              className={`px-3 py-1.5 text-xs font-bold rounded ${selectedVerification === "rera_matched" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"}`}
            >
              RERA Record Matched
            </button>
          </div>
        </div>
      </section>

      {/* 3. Smart Filter Panel & Showroom Main Grid */}
      <section className="py-12 sm:py-16 flex-grow max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
          
          {/* Filter sidebar (Aligned with grid) */}
          <div className="space-y-6">
            <Card className="p-6 bg-white border border-gold-elegant space-y-6">
              <div>
                <h3 className="font-serif text-base font-bold text-[#10291f] mb-1">Search & Filter</h3>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Refine Discovery</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Keywords</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-semibold bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                  placeholder="Search project or promoter..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Region / District</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                >
                  <option value="all">All Districts</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chikkaballapur">Chikkaballapur</option>
                </select>
              </div>
            </Card>

            {/* Comparison Widget */}
            {compareIds.length > 0 && (
              <Card className="p-4 bg-slate-50 border border-gold-elegant space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Comparison Matrix</span>
                <p className="text-xs text-[#10291f] font-semibold">{compareIds.length} layouts queued.</p>
                <Link href={`/project-compare?ids=${compareIds.join(",")}`}>
                  <Button className="w-full font-bold text-xs bg-gold-gradient text-[#10291f] border-none">
                    Compare Review
                  </Button>
                </Link>
              </Card>
            )}
          </div>

          {/* 4. Project Grid (Balanced layout) */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Showing {filteredProjects.length} catalogued projects
              </span>
            </div>

            {loading ? (
              <div className="text-center py-20 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                Loading catalogued database...
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects.map((p) => {
                  const isSelected = compareIds.includes(p.id);
                  return (
                    <div key={p.id} className="relative group flex flex-col h-full">
                      <ProjectCard 
                        project={p} 
                        developerName={getDevName(p.developerId)} 
                        developer={developers.find((d) => d.id === p.developerId)} 
                      />
                      {/* Compare checkbox overlay */}
                      <div className="absolute top-4 left-4 z-20">
                        <label className="flex items-center space-x-2 bg-[#10291f]/85 text-white text-[10px] font-bold px-2.5 py-1.5 rounded cursor-pointer border border-white/10 hover:bg-[#10291f]">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => handleToggleCompare(p.id)}
                            className="rounded accent-[#8b6e3a]"
                          />
                          <span>{isSelected ? "Selected" : "Compare"}</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-gold-elegant rounded text-xs text-slate-500 font-medium px-6 space-y-2">
                <h4 className="font-serif text-base font-bold text-[#10291f]">Data Under Verification</h4>
                <p className="max-w-md mx-auto leading-relaxed">
                  No projects match the selected filter criteria. Modify your options or request a private advisory review.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 9. Buyer Calculators Section */}
      <section className="py-16 bg-white border-y border-slate-200 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="gold" className="border border-gold-elegant">Advisory Tools</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#10291f]">
              Property Purchase Planning
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Use our calculator systems to project down payments, registration charges, and ownership cash flows before making a purchasing decision.
            </p>
            <Link href="/calculators">
              <Button variant="outline" className="border-gold-elegant text-xs font-bold text-[#10291f]">
                Open Sourcing Planning Desk
              </Button>
            </Link>
          </div>
          <div className="lg:col-span-7">
            <EmiCalculator />
          </div>
        </div>
      </section>

      {/* 10. Advisory CTA */}
      <section className="py-20 bg-dark-luxury-gradient text-white text-center bg-luxury-grid relative overflow-hidden w-full">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Need Siting Clearance or Title Audits?</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-semibold">
            Connect with our advisory lawyers to complete document vetting and environmental screening.
          </p>
          <Link href="/project-enquiry">
            <Button className="bg-gold-gradient text-[#10291f] border-none font-bold text-xs py-3 px-8 h-auto">
              Request Due Diligence Review
            </Button>
          </Link>
        </div>
      </section>

      {/* 11. Compliance Disclaimer */}
      <section className="bg-white py-12 border-t border-slate-100 w-full">
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
