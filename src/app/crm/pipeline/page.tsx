"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockLeads } from "@/lib/data/mockLeads";
import { Search } from "@/components/ui/Icons";
import { type Lead } from "@/lib/types/crm";

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [interestFilter, setInterestFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const stages = [
    { id: "new", label: "New Leads" },
    { id: "contacted", label: "Contacted" },
    { id: "qualified", label: "Qualified" },
    { id: "documentation_review", label: "Doc Review" },
    { id: "site_visit_planned", label: "Site Visit" },
    { id: "proposal_sent", label: "Proposal Sent" },
    { id: "negotiation", label: "Negotiation" },
    { id: "converted", label: "Converted" },
    { id: "lost", label: "Lost Pipeline" },
    { id: "archived", label: "Archived" }
  ];

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    
    // Update local state
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === id ? { ...lead, status: targetStage as any } : lead
      )
    );

    // TODO: Connect database server action to update status in Supabase.
    // updateLeadStatus(id, targetStage);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInterest = interestFilter === "all" || lead.interestType === interestFilter;
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
    return matchesSearch && matchesInterest && matchesPriority;
  });

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "danger";
      case "high":
        return "danger";
      case "normal":
        return "primary";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Kanban Deal Board</h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Drag cards between stages to update lead progression. Double click a card to open details.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-slate-100 rounded shadow-xs">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search leads by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded pl-10 pr-4 py-2 text-[#10291f] focus:outline-none"
          />
          <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
        </div>
        
        <div className="flex gap-4">
          <select
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f]"
          >
            <option value="all">All Divisions</option>
            <option value="land_sourcing">Land Sourcing</option>
            <option value="construction">Construction</option>
            <option value="property_management">Property Care</option>
            <option value="legal_due_diligence">Legal</option>
            <option value="project_participation">Project Share</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f]"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Board Scroll Container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-[2800px] h-[calc(100vh-280px)]">
          {stages.map((stage) => {
            const stageLeads = filteredLeads.filter((lead) => lead.status === stage.id);
            return (
              <div
                key={stage.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
                className="w-72 bg-slate-100/70 border border-slate-200/50 rounded p-4 flex flex-col h-full"
              >
                {/* Column Title */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200/80">
                  <h3 className="font-sans text-sm font-bold text-[#10291f]">{stage.label}</h3>
                  <Badge variant="neutral" className="text-[10px]">
                    {stageLeads.length}
                  </Badge>
                </div>

                {/* Cards stack */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Card className="p-4 bg-white border border-slate-200/60 shadow-xs hover:shadow-sm transition-all duration-200 space-y-3">
                        <div className="flex justify-between items-start">
                          <Badge variant={getPriorityBadgeVariant(lead.priority)} className="text-[9px] px-1.5">
                            {lead.priority.toUpperCase()}
                          </Badge>
                          <span className="text-[9px] text-slate-400 font-semibold uppercase">
                            {lead.buyerType.replace("_", " ")}
                          </span>
                        </div>

                        <Link href={`/crm/leads/${lead.id}`} className="block hover:underline">
                          <h4 className="font-sans text-sm font-bold text-[#10291f]">{lead.fullName}</h4>
                        </Link>

                        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                          <div className="flex justify-between">
                            <span>Service:</span>
                            <span className="font-semibold text-slate-700">{lead.interestType.replace("_", " ")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Budget:</span>
                            <span className="font-semibold text-[#8A704C]">{lead.budgetRange}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 text-[9px] text-slate-400 font-medium">
                          <span>Owner: {lead.assignedToName || "Unassigned"}</span>
                          <span>Due: 2 Days</span>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

