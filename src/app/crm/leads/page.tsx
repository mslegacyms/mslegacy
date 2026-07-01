"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockLeads } from "@/lib/data/mockLeads";
import { Search } from "@/components/ui/Icons";

export default function CrmLeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [interestFilter, setInterestFilter] = useState("all");

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.phone && lead.phone.includes(searchTerm));
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
    const matchesInterest = interestFilter === "all" || lead.interestType === interestFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesInterest;
  });

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified" },
    { value: "documentation_review", label: "Doc Review" },
    { value: "site_visit_planned", label: "Site Visit" },
    { value: "negotiation", label: "Negotiation" },
    { value: "converted", label: "Converted" },
    { value: "lost", label: "Lost" }
  ];

  const priorities = [
    { value: "all", label: "All Priorities" },
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "normal", label: "Normal" },
    { value: "low", label: "Low" }
  ];

  const divisions = [
    { value: "all", label: "All Divisions" },
    { value: "land_sourcing", label: "Land Sourcing" },
    { value: "construction", label: "Construction" },
    { value: "property_management", label: "Property Care" },
    { value: "legal_due_diligence", label: "Legal" },
    { value: "project_participation", label: "Project Share" }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "primary";
      case "converted":
        return "success";
      case "contacted":
      case "qualified":
        return "gold";
      case "documentation_review":
      case "site_visit_planned":
      case "negotiation":
        return "warning";
      case "lost":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Leads Directory</h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Manage incoming inquiries, assign representatives, and track deal stages.
          </p>
        </div>
        <Link href="/crm/leads/new">
          <Button variant="primary" size="sm" className="font-semibold">
            Onboard New Lead +
          </Button>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white border border-slate-100 rounded shadow-xs">
        {/* Search input */}
        <div className="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Search leads by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 text-xs font-medium bg-slate-50 border border-slate-200 rounded pl-10 pr-4 text-[#10291f] focus:outline-none"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
        </div>

        {/* Status Dropdown */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 text-xs font-semibold bg-white border border-slate-200 rounded px-3 text-[#10291f] focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Priority Dropdown */}
        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full h-10 text-xs font-semibold bg-white border border-slate-200 rounded px-3 text-[#10291f] focus:outline-none"
          >
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table Card */}
      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-sans text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">Client Name</th>
                <th className="p-4">Contact Coordinates</th>
                <th className="p-4">Preferred Division</th>
                <th className="p-4">Stage Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assigned Advisor</th>
                <th className="p-4 pr-6">Onboard Date</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-600 divide-y divide-slate-100 font-sans">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-[#10291f]">
                      <Link href={`/crm/leads/${lead.id}`} className="hover:underline hover:text-[#8b6e3a]">
                        {lead.fullName}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="block">{lead.email}</span>
                      <span className="block text-slate-400 text-[10px]">{lead.phone}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="neutral" className="bg-slate-100 text-slate-700">
                        {lead.interestType.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusBadgeVariant(lead.status)}>
                        {lead.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold capitalize ${lead.priority === "urgent" || lead.priority === "high" ? "text-rose-600" : "text-slate-500"}`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-[#10291f]/80">{lead.assignedToName || "Unassigned"}</td>
                    <td className="p-4 pr-6 text-slate-400">
                      {new Date(lead.createdDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No leads found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

