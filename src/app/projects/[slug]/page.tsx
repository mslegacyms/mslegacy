"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, getUnitTypesForProject } from "@/lib/developers/projects";
import { getDeveloperBySlug, getDevelopers } from "@/lib/developers/developers";
import { getVerificationRecordsForProject } from "@/lib/developers/projectVerification";
import { DeveloperProject, Developer, ProjectUnitType, ProjectVerificationRecord } from "@/lib/types/developerMarketplace";
import { ReraStatusBadge } from "@/components/projects/ReraStatusBadge";
import { VerificationBadge } from "@/components/projects/VerificationBadge";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { UnitTypeTable } from "@/components/projects/UnitTypeTable";
import { ProjectEnquiryForm } from "@/components/projects/ProjectEnquiryForm";
import { EmiCalculator } from "@/components/calculators/EmiCalculator";
import { ProjectImageFrame } from "@/components/projects/ProjectImageFrame";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectVideoPanel } from "@/components/projects/ProjectVideoPanel";
import { ProjectDocumentPanel } from "@/components/projects/ProjectDocumentPanel";
import { DeveloperLogo } from "@/components/developers/DeveloperLogo";

export default function ProjectDetailsPage() {
  const { slug } = useParams() as { slug: string };
  const [project, setProject] = useState<DeveloperProject | null>(null);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [unitTypes, setUnitTypes] = useState<ProjectUnitType[]>([]);
  const [verifications, setVerifications] = useState<ProjectVerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const projData = await getProjectBySlug(slug);
      if (projData) {
        setProject(projData);
        const [devs, units, verRecs] = await Promise.all([
          getDevelopers(),
          getUnitTypesForProject(projData.id),
          getVerificationRecordsForProject(projData.id)
        ]);
        const devMatch = devs.find((d) => d.id === projData.developerId) || null;
        setDeveloper(devMatch);
        setUnitTypes(units);
        setVerifications(verRecs);
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse bg-[#f8f5ef]">
        Resolving layout dossier...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-[#f8f5ef] text-[#10291f] font-sans">
        <h2 className="font-serif text-2xl font-bold">Project Not Found</h2>
        <p className="text-xs text-slate-500 font-medium">The requested project layout does not exist in our index.</p>
        <Link href="/projects">
          <Button variant="outline" className="border-gold-elegant">Return to Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      
      {/* Dynamic Banners */}
      {project.publicVisibility === "draft" && (
        <div className="bg-[#8b6e3a] text-white py-3 px-6 text-center text-xs font-bold font-sans uppercase tracking-wider border-b border-gold-elegant z-30">
          ⚠️ Internal Preview Mode: This project layout is in DRAFT state. Not public. Internal review only.
        </div>
      )}

      {project.mslegacyVerificationStatus === "pending_verification" && (
        <div className="bg-[#10291f] text-slate-300 py-3 px-6 text-center text-[11px] font-sans font-medium border-b border-gold-elegant z-30">
          <strong>Public Information · Verification Pending:</strong> This project is listed for discovery and advisory reference based on publicly available information. Key details must be verified with the developer, Karnataka RERA, and independent legal advisors.
        </div>
      )}

      {project.mslegacyVerificationStatus === "rera_matched" && (
        <div className="bg-[#0f2a1d] text-emerald-100 py-3 px-6 text-center text-[11px] font-sans font-medium border-b border-[#143625] z-30">
          <strong>RERA Record Matched:</strong> RERA record details have been matched against publicly available registration information. Pricing, availability, possession, approvals, and documents must still be verified before any decision.
        </div>
      )}
      
      {/* 1. Project Visual Frame Top Hero */}
      <div className="h-[400px] w-full relative bg-slate-100 border-b border-gold-elegant">
        <ProjectImageFrame
          src={project.heroImage}
          alt={project.name}
          mediaPermissionStatus={project.mediaPermissionStatus}
          publicUsageAllowed={true}
          hideText={true}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
        
        {/* Project Header Info on Hero Overlay */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="gold" className="bg-[#8b6e3a]/90 text-white border border-[#8b6e3a]/30 uppercase text-[9px] font-bold tracking-wider px-2">
                {project.projectType.toUpperCase()}
              </Badge>
              <ProjectStatusBadge status={project.projectStatus} />
              <VerificationBadge status={project.mslegacyVerificationStatus} />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {project.name}
            </h1>
            <div className="flex items-center space-x-3 pt-2">
              {developer && (
                <DeveloperLogo developer={developer} size="sm" />
              )}
              <p className="text-xs text-slate-300 font-semibold tracking-wide">
                Developer: {developer ? developer.name : "Sourced Developer"} | Region: {project.locality}, {project.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <section className="py-16 sm:py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left - Main Content */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* 3. Project Overview */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">Project Overview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-sans">
                  <div>
                    <span className="text-slate-400 block font-semibold">RERA Number</span>
                    <span className="font-bold text-slate-700 font-mono mt-1 block">{project.reraNumber || "Pending"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">RERA Status</span>
                    <span className="mt-1 block font-bold uppercase"><ReraStatusBadge status={project.reraStatus} verificationStatus={project.mslegacyVerificationStatus} /></span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Land Acreage</span>
                    <span className="font-bold text-slate-700 mt-1 block">{project.landArea || "Under Verification"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Total Units</span>
                    <span className="font-bold text-slate-700 mt-1 block">{project.totalUnits || "Under Verification"}</span>
                  </div>
                </div>
              </div>

              {/* 7. Floor plans / Unit configurations table */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">Configurations & Dimensions</h3>
                <UnitTypeTable unitTypes={unitTypes} />
              </div>

              {/* Documents Block */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">Documentation & Literature</h3>
                <ProjectDocumentPanel
                  projectName={project.name}
                  brochurePath={project.brochurePath}
                  brochurePermissionStatus={project.brochurePermissionStatus}
                  floorPlanPaths={project.floorPlanPaths}
                  floorPlanPermissionStatus={project.floorPlanPermissionStatus}
                />
              </div>

              {/* 9. Amenities */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {project.amenities?.map((item) => (
                    <Badge key={item} variant="neutral" className="bg-white border border-gold-elegant text-[#10291f] text-xs font-semibold px-3 py-1 font-sans">
                      {item}
                    </Badge>
                  )) || <span className="text-xs text-slate-500 font-medium">None catalogued.</span>}
                </div>
              </div>

              {/* Media Gallery */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">Project Gallery</h3>
                <ProjectGallery
                  galleryImages={project.galleryImages}
                  projectName={project.name}
                  mediaPermissionStatus={project.mediaPermissionStatus}
                />
              </div>

              {/* Video Walkthrough */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">Walkthrough Video</h3>
                <ProjectVideoPanel
                  videoUrl={project.videoUrl}
                  videoPoster={project.videoPoster}
                  projectName={project.name}
                  mediaPermissionStatus={project.mediaPermissionStatus}
                />
              </div>

              {/* 12. Verification Records */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">Verification Trail</h3>
                <div className="space-y-4 font-sans text-xs">
                  {verifications.map((record) => (
                    <Card key={record.id} className="p-4 bg-white border border-gold-elegant flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="gold" className="text-[9px] uppercase font-bold tracking-wider">{record.verificationType}</Badge>
                          <span className="font-bold text-[#10291f]">{record.sourceName || "Internal Check"}</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed font-medium">{record.notes}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {record.verificationStatus.toUpperCase()}
                      </span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 14. Buyer Planning Calculators */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="font-serif text-2xl font-bold text-[#10291f]">Loan Cost Projections</h3>
                <EmiCalculator />
              </div>

            </div>

            {/* Right - Lead Intake & Sourcing Services CTAs */}
            <div className="lg:col-span-4 space-y-8">
              
              <ProjectEnquiryForm 
                projectId={project.id} 
                projectName={project.name}
                developerId={project.developerId} 
              />

              {/* Sourcing Services */}
              <Card className="p-6 bg-[#10291f] text-white border-none space-y-4">
                <h4 className="font-sans text-lg font-bold text-white">Client Advisory Desk</h4>
                <div className="space-y-2 text-xs text-slate-300 font-medium">
                  <p>Request structured support vectors:</p>
                  <ul className="list-disc pl-4 space-y-1.5 text-[11px]">
                    <li><strong>30-Year Title Due Diligence</strong> check</li>
                    <li><strong>RERA Certificate</strong> validity verification</li>
                    <li><strong>Physical Site Visit</strong> coordination</li>
                  </ul>
                </div>
                <Link href={`/project-enquiry?project=${project.slug}&need_due_diligence=true`} className="block">
                  <Button className="w-full bg-gold-gradient text-[#10291f] border-none font-bold text-xs py-2.5">
                    Request Site Visit Support
                  </Button>
                </Link>
              </Card>

              {/* Sourcing Slogan Card */}
              <Card className="p-6 bg-white border border-gold-elegant space-y-4">
                <h4 className="font-sans text-sm font-bold text-[#10291f]">Didn't Find What You Need?</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Submit a customized sourcing request. We will protect your private details and match it against off-market layout inventories.
                </p>
                <Link href="/requirements/post" className="block">
                  <Button variant="outline" className="w-full text-xs font-bold border-[#10291f]/20 hover:border-[#8b6e3a] text-[#10291f] py-2.5">
                    Post Sourcing Requirement
                  </Button>
                </Link>
              </Card>

            </div>

          </div>
        </div>
      </section>

      {/* 17. Project Disclaimer */}
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
