"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getDeveloperBySlug } from "@/lib/developers/developers";
import { getProjectsByDeveloperId } from "@/lib/developers/projects";
import { Developer, DeveloperProject } from "@/lib/types/developerMarketplace";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { DeveloperLogo } from "@/components/developers/DeveloperLogo";

export default function DeveloperProfilePage() {
  const { slug } = useParams() as { slug: string };
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [projects, setProjects] = useState<DeveloperProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const devData = await getDeveloperBySlug(slug);
      if (devData) {
        setDeveloper(devData);
        const projData = await getProjectsByDeveloperId(devData.id);
        setProjects(projData.filter((p) => p.publicVisibility === "published" || p.publicVisibility === "public_information"));
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse bg-[#f8f5ef]">
        Resolving corporate profile...
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-[#f8f5ef] text-[#10291f] font-sans">
        <h2 className="font-serif text-2xl font-bold">Developer Profile Not Found</h2>
        <p className="text-xs text-slate-500 font-medium">The requested promoter profile does not exist in our advisory index.</p>
        <Link href="/developers">
          <Button variant="outline" className="border-gold-elegant">Return to Directory</Button>
        </Link>
      </div>
    );
  }

  const isLogoApproved = (developer.logoPermissionStatus === "permission_received" || developer.logoPermissionStatus === "public_marketing_use_allowed") && !!developer.logoPath;

  // Filter projects by asset class
  const apartments = projects.filter((p) => p.projectType === "apartment");
  const plotted = projects.filter((p) => p.projectType === "plotted");
  const villas = projects.filter((p) => p.projectType === "villa");
  const farmlands = projects.filter((p) => p.projectType === "farmland");

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      
      {/* Profile Header */}
      <section className="bg-dark-luxury-gradient text-white py-20 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="gold" className="bg-[#8b6e3a]/20 text-[#8b6e3a] border border-[#8b6e3a]/30 uppercase text-[9px] font-bold tracking-wider px-2">
                  {developer.developerType?.replace("_", " ")}
                </Badge>
                <Badge variant="neutral" className="text-[9px] uppercase font-bold tracking-wider">
                  {developer.verificationStatus === "verified" ? "MS LEGACY VERIFIED" : "VERIFICATION PENDING"}
                </Badge>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
                {developer.name}
              </h1>
              <p className="text-xs text-slate-300 font-semibold tracking-wide">
                Headquarters: {developer.headquarters || "Karnataka"} | Estd: {developer.establishedYear || "N/A"}
              </p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link href={`/project-enquiry?developer=${developer.slug}`}>
                <Button className="bg-gold-gradient text-[#10291f] border-none font-bold text-xs h-fit py-3 px-6 w-full">
                  Request projects from this developer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid split */}
      <section className="py-16 sm:py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left - Bio/Details */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="p-6 bg-white border border-gold-elegant space-y-6">
                
                {/* Logo or Text Placeholder */}
                <div className="h-24 bg-slate-50 border border-gold-elegant rounded flex items-center justify-center p-4">
                  <DeveloperLogo developer={developer} size="md" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#10291f]">Company Dossier</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {developer.description}
                  </p>
                </div>

                {/* Sourcing Breakdown */}
                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Apartments Catalogued:</span>
                    <span className="font-bold text-slate-700">{apartments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plotted Projects:</span>
                    <span className="font-bold text-slate-700">{plotted.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Villas:</span>
                    <span className="font-bold text-slate-700">{villas.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Managed Farmlands:</span>
                    <span className="font-bold text-slate-700">{farmlands.length}</span>
                  </div>
                </div>
              </Card>

              {/* Sourcing/Demand Card for Developers */}
              <Card className="p-6 bg-[#10291f] text-white border-none space-y-4">
                <h4 className="font-sans text-sm font-bold text-white">Active Buyer Demand</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  We have verified client demand tickets seeking Hebbal, Sarjapur, or Devanahalli inventory. View open requirements and submit your matching units.
                </p>
                <Link href="/requirements" className="block">
                  <Button className="w-full bg-gold-gradient text-[#10291f] border-none font-bold text-xs py-2.5">
                    View Buyer Requirements
                  </Button>
                </Link>
              </Card>
            </div>

            {/* Right - Projects List */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#10291f] mb-1">Catalogued Layout Projects</h2>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Listings verified or under review for {developer.name}
                </p>
              </div>

              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((proj) => (
                    <ProjectCard 
                      key={proj.id} 
                      project={proj} 
                      developerName={developer.name} 
                      developer={developer} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-gold-elegant rounded text-xs text-slate-500 font-medium">
                  No verified projects matched under this developer profile.
                </div>
              )}
            </div>

          </div>
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
