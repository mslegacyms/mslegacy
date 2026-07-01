"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { DeveloperProject, Developer } from "@/lib/types/developerMarketplace";
import { DeveloperLogo } from "@/components/developers/DeveloperLogo";

export default function CrmProjectsPage() {
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

  const getDevName = (devId?: string) => {
    return developers.find((d) => d.id === devId)?.name || "Unknown Developer";
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-sans text-3xl font-bold text-[#10291f]">Projects Catalog</h1>
        <p className="text-xs text-slate-500 mt-1">
          Steward and verify RERA listings for Karnataka gated communities and apartments.
        </p>
      </div>

      <Card className="bg-white border border-gold-elegant">
        <div className="overflow-x-auto text-xs">
          {loading ? (
            <div className="text-center py-10 uppercase tracking-widest text-slate-400 font-bold animate-pulse">
              Retrieving layout catalogs...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Developer</th>
                  <th className="px-6 py-4">RERA ID / Status</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4">Visibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-[#10291f]">{proj.name}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {(() => {
                        const dev = developers.find((d) => d.id === proj.developerId);
                        return (
                          <div className="flex items-center space-x-2">
                            {dev && <DeveloperLogo developer={dev} size="sm" />}
                            <span>{dev?.name || "Unknown Developer"}</span>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="font-mono text-slate-700 block">{proj.reraNumber || "Pending"}</span>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                          proj.reraStatus === "approved" 
                            ? "bg-emerald-500/10 text-emerald-700" 
                            : "bg-amber-500/10 text-amber-700"
                        }`}>
                          {proj.reraStatus.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          proj.mslegacyVerificationStatus === "verified" || proj.mslegacyVerificationStatus === "rera_matched"
                            ? "bg-[#8b6e3a]/15 text-[#8b6e3a]" 
                            : "bg-slate-500/10 text-slate-500"
                        }`}>
                          {proj.mslegacyVerificationStatus.replace("_", " ")}
                        </span>
                        <span className="block text-[8px] text-slate-400 font-bold uppercase mt-0.5">
                          Media: {proj.mediaPermissionStatus || "pending"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        proj.publicVisibility === "published"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "bg-slate-500/10 text-slate-500"
                      }`}>
                        {proj.publicVisibility}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

