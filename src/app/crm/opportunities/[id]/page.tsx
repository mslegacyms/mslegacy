"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getOpportunityById } from "@/lib/crm/opportunities";
import { Landmark } from "@/components/ui/Icons";
import { LegalChecklist } from "@/components/crm/LegalComponents";

export default function OpportunityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Legal checklist status (Phase 7)
  const [checklist, setChecklist] = useState([
    { name: "30-Year Mother Deed Trace", status: "cleared" },
    { name: "Encumbrance Certificate (EC) Search", status: "cleared" },
    { name: "Zoning DC Conversion Certificate", status: "under_review" },
    { name: "RERA Registration Sanction", status: "cleared" }
  ]);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const data = await getOpportunityById(id);
        setProperty(data);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500 text-xs">Loading property details...</div>;
  if (!property) return <div className="p-8 text-center text-slate-500 text-xs">Property asset not found.</div>;

  return (
    <div className="space-y-8">
      {/* Dossier Header */}
      <div className="flex justify-between items-center">
        <Link href="/crm/opportunities" className="text-xs text-slate-400 hover:text-slate-600 font-semibold">
          ← Back to Opportunities Database
        </Link>
        <div className="flex gap-2">
          <Badge variant="gold" className="uppercase px-2.5">
            RERA: {property.reraStatus === "approved" ? "APPROVED" : "PENDING"}
          </Badge>
          <Badge variant="primary" className="uppercase px-2.5">
            Title: {property.ownershipStatus?.replace("_", " ") || "CLEAR TITLE"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Property Overview & Parameters */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card 1: Overview */}
          <Card className="p-6 bg-white space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Property Dossier</span>
              <h2 className="font-sans text-2xl font-bold text-[#10291f]">{property.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Location Corridor</span>
                <span className="font-semibold">{property.location}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Land Area</span>
                <span className="font-semibold">{property.dimensions}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Estimated Price</span>
                <span className="font-semibold text-[#8A704C]">Starting from {property.price ? `₹${(property.price / 10000000).toFixed(2)} Crores` : "₹50L"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Road Access</span>
                <span className="font-semibold">{property.roadAccess || "40 Ft Wide Approach Tar road"}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Utilities Status</span>
                <span className="font-semibold">{property.utilities || "Power Grid & Water connections active"}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Map Coordinates</span>
                <span className="font-semibold">{property.mapCoordinates || "13.1986° N, 77.7066° E"}</span>
              </div>
            </div>
          </Card>

          {/* Card 2: Legal Checklist Status (Phase 7) */}
          <Card className="p-6 bg-white space-y-4">
            <h3 className="font-sans text-lg font-bold text-[#10291f]">Legal Checklist & Document Audit</h3>
            <LegalChecklist items={checklist} />
          </Card>

          {/* Card 3: Due Diligence Risk Notes */}
          <Card className="p-6 bg-white space-y-3">
            <h3 className="font-sans text-lg font-bold text-[#10291f]">Risk Review Remarks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {property.riskNotes || "No active litigation, boundary overlap disputes, or agricultural land conversion blocks identified during pre-acquisition layout checks. Title chains cleared for outright sale deed execution."}
            </p>
          </Card>

        </div>

        {/* Right Column: Wealth Score & Operations */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card 4: Property Wealth Score Parameter Breaks */}
          <Card className="p-6 bg-[#10291f] text-white space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Property Wealth Score™</span>
              <div className="w-24 h-24 rounded-full border-4 border-[#8b6e3a] flex items-center justify-center bg-white/5 mx-auto">
                <span className="font-sans text-2xl font-bold text-white">{property.wealthScore?.overall || "8.5"}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic px-2">
                "{property.wealthScore?.summary || "Clear title history with validated parent deeds."}"
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Parameter Breaks</span>
              <div className="flex justify-between">
                <span className="text-slate-300">Title Integrity:</span>
                <span className="font-semibold text-[#8b6e3a]">9.8 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Location Dynamics:</span>
                <span className="font-semibold text-[#8b6e3a]">8.5 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Infrastructure index:</span>
                <span className="font-semibold text-[#8b6e3a]">8.8 / 10</span>
              </div>
            </div>
          </Card>

          {/* Card 5: Internal Action Logs Placeholder */}
          <Card className="p-6 bg-white space-y-3">
            <h3 className="font-sans text-base font-bold text-[#10291f]">Operational logs</h3>
            <div className="space-y-3 text-[11px] text-slate-500">
              <div className="border-l-2 border-emerald-500 pl-3 space-y-0.5">
                <span className="font-semibold block text-[#10291f]">RERA Certificate Verified</span>
                <span>2 days ago | Sandeep Rao</span>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3 space-y-0.5">
                <span className="font-semibold block text-[#10291f]">Title Search Audit Completed</span>
                <span>3 days ago | Muzzamil Ahmad</span>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
