"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getDevelopers } from "@/lib/developers/developers";
import { Developer } from "@/lib/types/developerMarketplace";
import { DeveloperLogo } from "@/components/developers/DeveloperLogo";

export default function CrmDevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getDevelopers();
      setDevelopers(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-sans text-3xl font-bold text-[#10291f]">Developers Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review legal status and check logo permission cards for promoters in Karnataka.
        </p>
      </div>

      <Card className="bg-white border border-gold-elegant">
        <div className="overflow-x-auto text-xs">
          {loading ? (
            <div className="text-center py-10 uppercase tracking-widest text-slate-400 font-bold animate-pulse">
              Retrieving promoter registry...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Developer</th>
                  <th className="px-6 py-4">Logo Preview</th>
                  <th className="px-6 py-4">Logo Permission & Asset Status</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4">Projects (Ongoing / Estd)</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {developers.map((dev) => (
                  <tr key={dev.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-[#10291f]">{dev.name}</td>
                    <td className="px-6 py-4">
                      <DeveloperLogo developer={dev} size="sm" />
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        dev.logoPermissionStatus === "approved" || dev.logoPermissionStatus === "permission_received"
                          ? "bg-emerald-500/10 text-emerald-700" 
                          : dev.logoPermissionStatus === "permission_received_asset_pending"
                          ? "bg-blue-500/10 text-blue-700"
                          : "bg-amber-500/10 text-amber-700"
                      }`}>
                        {dev.logoPermissionStatus.replace(/_/g, " ")}
                      </span>
                      {dev.logoPermissionStatus === "permission_received_asset_pending" && (
                        <div className="text-[10px] text-amber-700 font-bold">
                          ⚠️ Asset Pending: Fallback CSS active
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        dev.verificationStatus === "verified" 
                          ? "bg-[#8b6e3a]/15 text-[#8b6e3a]" 
                          : "bg-slate-500/10 text-slate-500"
                      }`}>
                        {dev.verificationStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {dev.ongoingProjectsCount || 0} Projects / Estd {dev.establishedYear || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700">
                        {dev.status}
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

