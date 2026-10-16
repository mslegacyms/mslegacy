import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { DeveloperProject, Developer } from "@/lib/types/developerMarketplace";
import { ReraStatusBadge } from "./ReraStatusBadge";
import { VerificationBadge } from "./VerificationBadge";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectImageFrame } from "./ProjectImageFrame";
import { DeveloperLogo } from "../developers/DeveloperLogo";

interface ProjectCardProps {
  project: DeveloperProject;
  developerName?: string;
  developer?: Developer;
}

export const ProjectCard = ({ project, developerName, developer }: ProjectCardProps) => {
  return (
    <Card className="flex flex-col h-full border border-gold-elegant bg-white card-lift overflow-hidden font-sans">
      
      {/* Visual Frame */}
      <div className="h-60 relative bg-slate-100 border-b border-gold-elegant">
        <ProjectImageFrame
          src={project.cardImage}
          alt={project.name}
          mediaPermissionStatus={project.mediaPermissionStatus}
          publicUsageAllowed={true}
          className="w-full h-full object-cover"
        />
        
        {/* Type Badge Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="gold" className="bg-[#8b6e3a]/90 text-white border border-[#8b6e3a]/30 uppercase text-[9px] font-bold tracking-wider px-2 py-0.5 shadow-sm">
            {project.projectType.replace("_", " ")}
          </Badge>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {developer && (
              <DeveloperLogo developer={developer} size="sm" />
            )}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#10291f] leading-snug line-clamp-1">
                {project.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5 block">
                {developerName || developer?.name || "Developer Sourced"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <ProjectStatusBadge status={project.projectStatus} />
            <ReraStatusBadge status={project.reraStatus} verificationStatus={project.mslegacyVerificationStatus} />
            <VerificationBadge status={project.mslegacyVerificationStatus} />
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 italic border-l-2 border-[#8b6e3a] pl-3 py-1 font-medium">
            "{project.disclaimer}"
          </p>

          <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100 font-sans">
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-bold text-slate-700">{project.locality}, {project.city}</span>
            </div>
            <div className="flex justify-between">
              <span>Land Area:</span>
              <span className="font-bold text-slate-700">{project.landArea || "Under Verification"}</span>
            </div>
            <div className="flex justify-between">
              <span>RERA ID:</span>
              <span className="font-bold text-slate-700 font-mono">{project.reraNumber || "Pending"}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Link */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 -mx-6 -mb-6 p-6">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Starting Value</p>
            <p className="text-base font-sans font-bold text-[#10291f]">
              {project.startingPrice ? formatINR(project.startingPrice) : "Price subject to confirmation"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href={`/projects/${project.slug}`}>
              <Button variant="outline" size="sm" className="font-bold text-xs border-gold-elegant hover:bg-[#10291f]/5 text-[#10291f]">
                Details
              </Button>
            </Link>
            <Link href={`/project-enquiry?project=${project.slug}`}>
              <Button size="sm" className="bg-[#10291f] text-white font-bold text-xs px-3">
                Advisory
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
