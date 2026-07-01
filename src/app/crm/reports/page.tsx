import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function CrmReportsPage() {
  const reports = [
    { title: "Total Onboarded Leads", value: "45 Clients", desc: "Accumulated digital registrations across marketing forms." },
    { title: "Sourced Opportunity Count", value: "4 Assets", desc: "Pre-acquisition audited properties listed in database." },
    { title: "Partner Network Size", value: "2 Agencies", desc: "Registered channel partner brokers with active RERA clearances." },
    { title: "Active Tasks Due", value: "3 Reminders", desc: "Due diligence and video walkthrough tasks assigned." }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Operational Reports</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Review metrics, lead distribution, and asset sourcing outcomes.
        </p>
      </div>

      {/* Grid: 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((r, index) => (
          <Card key={index} className="p-6 bg-white space-y-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{r.title}</span>
            <span className="text-2xl font-sans font-bold text-[#10291f] block">{r.value}</span>
            <p className="text-[10px] text-slate-400 leading-relaxed">{r.desc}</p>
          </Card>
        ))}
      </div>

      {/* Grid: Split reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Lead Sources */}
        <Card className="p-6 bg-white space-y-4">
          <h3 className="font-sans text-base font-bold text-[#10291f] border-b pb-2 border-slate-100">
            Lead Acquisition Channels
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b pb-2">
              <span>Direct Website Sourcing Form</span>
              <span className="font-bold text-[#10291f]">28 Leads (62%)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Channel Partner Referrals</span>
              <span className="font-bold text-[#10291f]">12 Leads (27%)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Offline / Direct Sourcing</span>
              <span className="font-bold text-[#10291f]">5 Leads (11%)</span>
            </div>
          </div>
        </Card>

        {/* Right: Division Requests */}
        <Card className="p-6 bg-white space-y-4">
          <h3 className="font-sans text-base font-bold text-[#10291f] border-b pb-2 border-slate-100">
            Division Request Frequencies
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b pb-2">
              <span>Land Sourcing Division</span>
              <span className="font-bold text-[#10291f]">18 Requests (40%)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Turnkey Construction & PMC</span>
              <span className="font-bold text-[#10291f]">12 Requests (27%)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Project Participation Reviews</span>
              <span className="font-bold text-[#10291f]">9 Requests (20%)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Property Management & Legal</span>
              <span className="font-bold text-[#10291f]">6 Requests (13%)</span>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}

