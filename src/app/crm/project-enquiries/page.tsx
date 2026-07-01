"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getProjectEnquiries } from "@/lib/developers/projectEnquiries";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { ProjectEnquiry, DeveloperProject, Developer } from "@/lib/types/developerMarketplace";

export default function CrmProjectEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [projects, setProjects] = useState<DeveloperProject[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [enqData, projData, devData] = await Promise.all([
        getProjectEnquiries(),
        getProjects(),
        getDevelopers()
      ]);
      setEnquiries(enqData);
      setProjects(projData);
      setDevelopers(devData);
      setLoading(false);
    }
    loadData();
  }, []);

  const getProjectName = (projId?: string) => {
    return projects.find((p) => p.id === projId)?.name || "General Marketplace Inquiry";
  };

  const getDevName = (devId?: string) => {
    return developers.find((d) => d.id === devId)?.name || "Direct Sourcing";
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-sans text-3xl font-bold text-[#10291f]">Project Enquiries</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review customer requests and routing parameters from the discovery marketplace.
        </p>
      </div>

      <Card className="bg-white border border-gold-elegant">
        <div className="overflow-x-auto text-xs">
          {loading ? (
            <div className="text-center py-10 uppercase tracking-widest text-slate-400 font-bold animate-pulse">
              Retrieving customer enquiries...
            </div>
          ) : enquiries.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Target Layout</th>
                  <th className="px-6 py-4">Promoter</th>
                  <th className="px-6 py-4">Parameter Interest</th>
                  <th className="px-6 py-4">Message Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#10291f] block">{enq.fullName}</span>
                        <span className="text-slate-500 block font-medium">{enq.email} | {enq.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{getProjectName(enq.projectId)}</td>
                    <td className="px-6 py-4 text-slate-600 font-semibold">{getDevName(enq.developerId)}</td>
                    <td className="px-6 py-4">
                      <Badge variant="gold" className="bg-[#8b6e3a]/15 text-[#8b6e3a] uppercase text-[9px] font-bold tracking-wider">
                        {enq.interestType?.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate font-medium" title={enq.message}>
                      {enq.message || "No notes appended."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-slate-500 font-medium">
              No project enquiries logged in the system registry.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

