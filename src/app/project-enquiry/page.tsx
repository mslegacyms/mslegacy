"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { DeveloperProject, Developer } from "@/lib/types/developerMarketplace";
import { ProjectEnquiryForm } from "@/components/projects/ProjectEnquiryForm";

function EnquiryContent() {
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get("project") || "";
  const initialInterestType = searchParams.get("interestType") || undefined;
  const comparedIds = (searchParams.get("ids") || "").split(",").filter(Boolean).slice(0, 4);

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

  const selectedProject = projectSlug ? projects.find((p) => p.slug === projectSlug) : null;
  const selectedDeveloperId = selectedProject?.developerId;

  return (
    <section className="py-16 sm:py-20 flex-grow flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-center">
        {loading ? (
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
            Resolving profiles...
          </div>
        ) : (
          <ProjectEnquiryForm
            key={`${projectSlug}:${initialInterestType}:${comparedIds.join(",")}`}
            initialInterestType={initialInterestType}
            projectIds={comparedIds.length ? projects.filter(project => comparedIds.includes(project.id)).map(project => project.id) : selectedProject ? [selectedProject.id] : []}
            projectId={selectedProject?.id}
            projectName={selectedProject?.name}
            developerId={selectedDeveloperId}
          />
        )}
      </div>
    </section>
  );
}

export default function ProjectEnquiryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-20 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Verification Intake</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Marketplace Enquiry Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Connect with our advisory desk to trace mutation entries or register coordinates checks.
          </p>
        </div>
      </section>

      {/* Form content wrapped in Suspense */}
      <Suspense fallback={
        <div className="text-center py-20 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
          Loading enquiry form...
        </div>
      }>
        <EnquiryContent />
      </Suspense>

      {/* Disclaimers */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center text-[10px] text-slate-400 leading-relaxed space-y-2">
          <span className="font-bold text-[#10291f] uppercase tracking-wide block">Marketplace Disclaimers</span>
          <p>
            Project details, floor plans, pricing, availability, possession dates, approvals, RERA status, and media are shown for advisory discovery only and may change without notice. Buyers must verify all information directly with the developer, Karnataka RERA, and independent legal advisors before making any decision. Read our full <Link href="/project-disclaimer" className="text-[#8b6e3a] underline font-bold">Marketplace Disclaimer</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
