import React from "react";
import Link from "next/link";
import { DeveloperProject, Developer } from "@/lib/types/developerMarketplace";
import { formatINR } from "@/lib/utils";
import { ReraStatusBadge } from "./ReraStatusBadge";
import { VerificationBadge } from "./VerificationBadge";
import { DeveloperLogo } from "../developers/DeveloperLogo";

interface ProjectComparisonTableProps {
  projects: DeveloperProject[];
  developers: Developer[];
  onRemove: (id: string) => void;
}

export const ProjectComparisonTable = ({ projects, developers, onRemove }: ProjectComparisonTableProps) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50 border border-gold-elegant rounded text-xs text-slate-500 font-medium">
        Select up to 3 projects from the listings page to generate a comparative analysis matrix.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gold-elegant rounded font-sans bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
        <thead className="bg-[#10291f] text-white uppercase font-bold tracking-wider text-[10px]">
          <tr>
            <th className="px-6 py-4 w-48">Parameter</th>
            {projects.map((p) => (
              <th key={p.id} className="px-6 py-4 relative">
                <div className="flex justify-between items-start">
                  <span className="font-serif text-sm font-bold text-white block pr-6 leading-tight">
                    {p.name}
                  </span>
                  <button 
                    onClick={() => onRemove(p.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white font-sans text-base leading-none focus:outline-none"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {/* Developer */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Developer</td>
            {projects.map((p) => {
              const dev = developers.find((d) => d.id === p.developerId);
              return (
                <td key={p.id} className="px-6 py-4 text-slate-700 font-semibold">
                  <div className="flex items-center space-x-2">
                    {dev && <DeveloperLogo developer={dev} size="sm" />}
                    <span>{dev?.name || "Developer Sourced"}</span>
                  </div>
                </td>
              );
            })}
          </tr>
          {/* Location */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Location Corridor</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 text-slate-600">
                {p.locality}, {p.city}
              </td>
            ))}
          </tr>
          {/* Project Type */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Asset Class</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 text-slate-600 uppercase font-semibold text-[10px]">
                {p.projectType}
              </td>
            ))}
          </tr>
          {/* RERA */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">RERA Registration</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4">
                <div className="space-y-1">
                  <ReraStatusBadge status={p.reraStatus} />
                  <span className="text-[10px] text-slate-400 block font-mono font-medium">{p.reraNumber || "Pending"}</span>
                </div>
              </td>
            ))}
          </tr>
          {/* Verification */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Verification Level</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4">
                <VerificationBadge status={p.mslegacyVerificationStatus} />
              </td>
            ))}
          </tr>
          {/* Starting Price */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Value Indicator</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 font-bold text-[#10291f]">
                {p.startingPrice ? formatINR(p.startingPrice) : "Check Price"}
              </td>
            ))}
          </tr>
          {/* Land Area */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Land / Plot Area</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 text-slate-600">
                {p.landArea || "Under Verification"}
              </td>
            ))}
          </tr>
          {/* Amenities */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Amenities</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 text-slate-600 leading-relaxed">
                {p.amenities?.join(", ") || "N/A"}
              </td>
            ))}
          </tr>
          {/* Risk Notes */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Risk / Advisory Notes</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 text-slate-500 font-medium">
                Siting check required. Confirm mutation entries on municipal portal.
              </td>
            ))}
          </tr>
          {/* Advisory recommendation placeholder */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Advisory Recommendation</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 text-slate-500 font-semibold italic">
                Request MS Legacy Comparison Review for due diligence checklist.
              </td>
            ))}
          </tr>
          {/* Actions */}
          <tr>
            <td className="px-6 py-4 font-bold text-[#10291f] bg-slate-50/50">Actions</td>
            {projects.map((p) => (
              <td key={p.id} className="px-6 py-4 space-y-2">
                <Link href={`/projects/${p.slug}`} className="block">
                  <button className="w-full py-2 bg-[#10291f] text-white hover:bg-[#10291f]/90 text-[10px] font-bold rounded transition-colors">
                    View Details
                  </button>
                </Link>
                <Link href={`/project-enquiry?project=${p.slug}&interestType=project_comparison`} className="block">
                  <button className="w-full py-2 border border-gold-elegant text-[#10291f] hover:bg-slate-50 text-[10px] font-bold rounded transition-colors">
                    Request Comparison Review
                  </button>
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
