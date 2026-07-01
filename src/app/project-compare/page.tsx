"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { DeveloperProject, Developer } from "@/lib/types/developerMarketplace";
import { ProjectComparisonTable } from "@/components/projects/ProjectComparisonTable";

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idsParam = searchParams.get("ids") || "";

  const [projects, setProjects] = useState<DeveloperProject[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
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

  const selectedIds = idsParam ? idsParam.split(",") : [];
  const selectedProjects = projects.filter((p) => selectedIds.includes(p.id));

  const devNamesRecord: Record<string, string> = {};
  developers.forEach((d) => {
    devNamesRecord[d.id] = d.name;
  });

  const handleRemoveProject = (id: string) => {
    const updatedIds = selectedIds.filter((cid) => cid !== id);
    if (updatedIds.length === 0) {
      router.push("/projects");
    } else {
      router.push(`/project-compare?ids=${updatedIds.join(",")}`);
    }
  };

  return (
    <section className="py-16 sm:py-20 flex-grow">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex justify-between items-center">
          <Link href="/projects">
            <Button variant="outline" className="border-gold-elegant text-[#10291f] font-bold text-xs">
              ← Back to Discover
            </Button>
          </Link>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {selectedProjects.length} of 3 Layouts
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
            Generating comparative matrices...
          </div>
        ) : (
          <ProjectComparisonTable 
            projects={selectedProjects} 
            developers={developers}
            onRemove={handleRemoveProject}
          />
        )}
      </div>
    </section>
  );
}

export default function ProjectComparePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-20 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Comparative Matrix</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Project Comparison Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Review specifications, RERA indicators, and verification notes side-by-side to assist in decision backing.
          </p>
        </div>
      </section>

      {/* Comparison Layout wrapped in Suspense */}
      <Suspense fallback={
        <div className="text-center py-20 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
          Loading comparison data...
        </div>
      }>
        <CompareContent />
      </Suspense>

      {/* Disclaimers */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center text-[10px] text-slate-400 leading-relaxed space-y-2">
          <span className="font-bold text-[#10291f] uppercase tracking-wide block">Marketplace Disclaimers</span>
          <p>
            Project details, floor plans, pricing, availability, possession dates, approvals, RERA status, and media are shown for advisory discovery only and may change without notice. Buyers must verify all information directly with the developer, Karnataka RERA, and independent legal advisors before making any decision.
          </p>
        </div>
      </section>
    </div>
  );
}
