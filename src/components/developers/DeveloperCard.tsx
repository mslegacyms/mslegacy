import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Developer } from "@/lib/types/developerMarketplace";
import { DeveloperLogo } from "./DeveloperLogo";

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <Card className="flex flex-col h-full border border-gold-elegant bg-white card-lift overflow-hidden">
      {/* Visual Header / Logo Area */}
      <div className="h-32 bg-slate-50 border-b border-gold-elegant flex items-center justify-center p-4 relative">
        <DeveloperLogo developer={developer} size="lg" />
      </div>

      {/* Info Body */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4 font-sans">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Badge variant="neutral" className="text-[9px] uppercase font-bold tracking-wider">
              {developer.developerType?.replace("_", " ") || "DEVELOPER"}
            </Badge>
            <Badge 
              variant={developer.verificationStatus === "verified" ? "gold" : "neutral"}
              className="text-[9px] uppercase font-bold tracking-wider"
            >
              {developer.verificationStatus === "verified" ? "MS LEGACY VERIFIED" : "VERIFICATION PENDING"}
            </Badge>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#10291f] leading-snug">
            {developer.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {developer.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 text-center">
          <div>
            <span className="text-xs font-bold text-[#10291f] block">{developer.ongoingProjectsCount || 0}</span>
            <span className="text-[9px] uppercase text-slate-400 block font-semibold">Ongoing</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#10291f] block">{developer.completedProjectsCount || 0}</span>
            <span className="text-[9px] uppercase text-slate-400 block font-semibold">Completed</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#10291f] block">{developer.upcomingProjectsCount || 0}</span>
            <span className="text-[9px] uppercase text-slate-400 block font-semibold">Upcoming</span>
          </div>
        </div>

        <Link href={`/developers/${developer.slug}`} className="block">
          <button className="w-full text-center py-2.5 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-xs border border-gold-elegant rounded transition-colors duration-200">
            View Developer Profile
          </button>
        </Link>
      </div>
    </Card>
  );
};
