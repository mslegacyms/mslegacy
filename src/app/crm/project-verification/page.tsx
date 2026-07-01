"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { DeveloperProject, Developer } from "@/lib/types/developerMarketplace";

export default function CrmProjectVerificationPage() {
  const [projects, setProjects] = useState<DeveloperProject[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [filterPriority, setFilterPriority] = useState("all");
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

  // Mock addition of priorities and owners for tracking
  const projectsWithMetadata = projects.map((p, idx) => {
    const priorities = ["P1", "P2", "P3"];
    const owners = ["Legal Desk", "Sourcing Desk", "Admin Desk"];
    const nextActions = [
      "Confirm RERA certificate registration matches towers",
      "Follow up with developer marketing team regarding logo permission",
      "Verify 30-year mutation records",
      "Check possession timelines on RERA database"
    ];
    return {
      ...p,
      priority: priorities[idx % 3],
      owner: owners[idx % 3],
      nextAction: nextActions[idx % 4],
      lastUpdated: "2026-06-28"
    };
  });

  const filteredProjects = projectsWithMetadata.filter((p) => {
    return filterPriority === "all" || p.priority === filterPriority;
  });

  // Derived metrics lists
  const reraPending = projectsWithMetadata.filter((p) => p.reraStatus !== "approved");
  const permissionPending = projectsWithMetadata.filter((p) => p.mslegacyVerificationStatus === "pending_verification");
  const founderPending = projectsWithMetadata.filter((p) => p.publicVisibility === "draft");

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-sans text-3xl font-bold text-[#10291f]">Project Verification Queue</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor RERA registries, legal clearances, and developer releases.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-gold-elegant">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Queue Total</span>
          <span className="text-2xl font-bold text-[#10291f] mt-1 block">{projectsWithMetadata.length} Projects</span>
        </Card>
        <Card className="p-4 bg-white border border-gold-elegant">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">RERA Pending</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{reraPending.length} Layouts</span>
        </Card>
        <Card className="p-4 bg-white border border-gold-elegant">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Permission Check</span>
          <span className="text-2xl font-bold text-slate-500 mt-1 block">{permissionPending.length} Operators</span>
        </Card>
        <Card className="p-4 bg-white border border-gold-elegant">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Founder Clearance</span>
          <span className="text-2xl font-bold text-purple-600 mt-1 block">{founderPending.length} Drafts</span>
        </Card>
      </div>

      {/* Main filter list */}
      <Card className="bg-white border border-gold-elegant">
        {/* Filter bar */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Priority filter:</span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded px-2.5 py-1 text-[#10291f] focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="P1">P1 (Branded / High demand)</option>
              <option value="P2">P2 (Data Incomplete)</option>
              <option value="P3">P3 (Farmland / Monitor)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-xs">
          {loading ? (
            <div className="text-center py-10 uppercase tracking-widest text-slate-400 font-bold animate-pulse">
              Retrieving verification backlog...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Promoter</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Assigned Owner</th>
                  <th className="px-6 py-4">Next Sourcing Action</th>
                  <th className="px-6 py-4">Verification Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-[#10291f]">{p.name}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{getDevName(p.developerId)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        p.priority === "P1" 
                          ? "bg-rose-500/10 text-rose-700" 
                          : p.priority === "P2"
                          ? "bg-amber-500/10 text-amber-700"
                          : "bg-slate-500/10 text-slate-500"
                      }`}>
                        {p.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-semibold">{p.owner}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium max-w-xs truncate" title={p.nextAction}>{p.nextAction}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        p.mslegacyVerificationStatus === "verified" 
                          ? "bg-[#8b6e3a]/15 text-[#8b6e3a]" 
                          : "bg-slate-500/10 text-slate-500"
                      }`}>
                        {p.mslegacyVerificationStatus.replace("_", " ")}
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

