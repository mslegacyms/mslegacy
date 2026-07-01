"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCrmRequirements } from "@/lib/requirements/requirements";
import { PropertyRequirement } from "@/lib/types/propertyRequirements";
import { formatINR } from "@/lib/utils";

export default function CrmRequirementsPage() {
  const [requirements, setRequirements] = useState<PropertyRequirement[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  useEffect(() => {
    async function loadData() {
      const data = await getCrmRequirements();
      setRequirements(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredRequirements = requirements.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.requirementCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.contactName && r.contactName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === "all" || r.verificationStatus === selectedStatus;
    const matchesCategory = selectedCategory === "all" || r.propertyCategory === selectedCategory;
    const matchesPriority = selectedPriority === "all" || r.priority === selectedPriority;
    const matchesSource = selectedSource === "all" || r.sourceType === selectedSource;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesSource;
  });

  // Calculate Stat Cards
  const totalCount = requirements.length;
  const newCount = requirements.filter(r => r.verificationStatus === "new").length;
  const qualifiedCount = requirements.filter(r => r.verificationStatus === "qualified").length;
  const approvedPublicCount = requirements.filter(r => r.verificationStatus === "approved_public").length;
  const matchedCount = requirements.filter(r => r.verificationStatus === "matched").length;
  const urgentCount = requirements.filter(r => r.priority === "urgent").length;
  const nriCount = requirements.filter(r => r.buyerProfile === "nri").length;

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "danger";
      case "high":
        return "gold";
      case "medium":
        return "primary";
      default:
        return "neutral";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "primary";
      case "under_review":
        return "warning";
      case "qualified":
        return "gold";
      case "approved_public":
        return "success";
      case "matched":
        return "success";
      case "converted":
        return "success";
      case "closed":
      case "rejected":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#10291f]">Property Requirements Exchange</h1>
          <p className="text-xs text-slate-500 mt-1">
            Qualify incoming buyer demand tickets, approve sanitized public posts, run matches, and review responses.
          </p>
        </div>
        <Link href="/crm/requirements/new">
          <Button className="bg-[#10291f] text-white text-xs font-bold px-4 py-2 shadow hover:bg-[#10291f]/90">
            Onboard Requirement +
          </Button>
        </Link>
      </div>

      {/* 2. Overview Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="p-4 bg-white border border-slate-100 text-center">
          <span className="text-2xl font-bold text-[#10291f] block">{totalCount}</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold block mt-1">Total Demand</span>
        </Card>
        <Card className="p-4 bg-white border border-slate-100 text-center">
          <span className="text-2xl font-bold text-blue-600 block">{newCount}</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold block mt-1">New Tickets</span>
        </Card>
        <Card className="p-4 bg-white border border-slate-100 text-center">
          <span className="text-2xl font-bold text-[#8b6e3a] block">{qualifiedCount}</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold block mt-1">Qualified</span>
        </Card>
        <Card className="p-4 bg-white border border-slate-100 text-center">
          <span className="text-2xl font-bold text-emerald-600 block">{approvedPublicCount}</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold block mt-1">Public Active</span>
        </Card>
        <Card className="p-4 bg-white border border-slate-100 text-center">
          <span className="text-2xl font-bold text-teal-600 block">{matchedCount}</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold block mt-1">Matched</span>
        </Card>
        <Card className="p-4 bg-white border border-slate-100 text-center">
          <span className="text-2xl font-bold text-rose-600 block">{urgentCount}</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold block mt-1">Urgent Priorities</span>
        </Card>
        <Card className="p-4 bg-white border border-slate-100 text-center">
          <span className="text-2xl font-bold text-[#8A704C] block">{nriCount}</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold block mt-1">NRI Seekers</span>
        </Card>
      </div>

      {/* 3. Sourcing Demand Intelligence (Analytics section) */}
      <Card className="p-6 bg-white border border-slate-100 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Demand Intelligence Indicator</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Aggregate metrics reflecting live market demand requirements collected from verified sources.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs border-t pt-4">
          <div>
            <span className="font-bold text-slate-500 block mb-2">Top Sought-after Sectors</span>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span>Hebbal / North Bengaluru</span> <span className="font-semibold text-slate-800">32% demand</span></div>
              <div className="flex justify-between"><span>Devanahalli Airport Hub</span> <span className="font-semibold text-slate-800">24% demand</span></div>
              <div className="flex justify-between"><span>Sarjapur Corridor</span> <span className="font-semibold text-slate-800">22% demand</span></div>
              <div className="flex justify-between"><span>Whitefield / East Bengaluru</span> <span className="font-semibold text-slate-800">18% demand</span></div>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-500 block mb-2">Category Split</span>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span>Apartments</span> <span className="font-semibold text-slate-800">40%</span></div>
              <div className="flex justify-between"><span>Plotted Township</span> <span className="font-semibold text-slate-800">25%</span></div>
              <div className="flex justify-between"><span>Villas</span> <span className="font-semibold text-slate-800">20%</span></div>
              <div className="flex justify-between"><span>Raw Land / Farmland</span> <span className="font-semibold text-slate-800">15%</span></div>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-500 block mb-2">Budget Distribution</span>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span>Under ₹1 Crore</span> <span className="font-semibold text-slate-800">28%</span></div>
              <div className="flex justify-between"><span>₹1 Cr – ₹3 Crore</span> <span className="font-semibold text-slate-800">45%</span></div>
              <div className="flex justify-between"><span>Above ₹3 Crore</span> <span className="font-semibold text-slate-800">27%</span></div>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-500 block mb-2">Unmatched Backlog</span>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 space-y-1">
              <div className="flex justify-between font-bold"><span>Open requirements:</span> <span>{requirements.filter(r => r.verificationStatus === 'new' || r.verificationStatus === 'under_review').length}</span></div>
              <p className="text-[10px] leading-relaxed text-amber-700">
                Awaiting developer proposal updates. High demand for converted plots near airport growth corridor.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 4. Filters & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white border border-slate-100 rounded shadow-xs">
        
        {/* Search */}
        <div className="md:col-span-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Search Sourcing Files</label>
          <input
            type="text"
            placeholder="Search code, client name, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Status Stage</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
          >
            <option value="all">All Stages</option>
            <option value="new">New Submission</option>
            <option value="under_review">Under Review</option>
            <option value="qualified">Qualified</option>
            <option value="approved_public">Public Active</option>
            <option value="matched">Matched</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Property Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="apartment">Apartment</option>
            <option value="plotted_development">Plotted / Layout</option>
            <option value="villa">Villa</option>
            <option value="farmland">Farmland</option>
            <option value="land">Raw Land</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Priority</label>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Source Type */}
        <div>
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Enquiry Sourced From</label>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
          >
            <option value="all">All Sources</option>
            <option value="client_submitted">Client Submitted</option>
            <option value="company_posted">Company Posted</option>
            <option value="nri_requirement">NRI Desk</option>
            <option value="investor_requirement">Investor Desk</option>
          </select>
        </div>

      </div>

      {/* 5. Requirements Table */}
      <Card className="bg-white border border-slate-100 overflow-hidden shadow-xs rounded">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-4 border-[#8b6e3a] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Syncing Requirements Ledger...</p>
          </div>
        ) : filteredRequirements.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <p className="text-sm font-semibold">No requirement files found.</p>
            <p className="text-xs text-slate-400 mt-1">Adjust your filters or add a new record to begin tracking.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] border-b tracking-wider">
                  <th className="p-4">Code</th>
                  <th className="p-4">Requirement Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Target Locations</th>
                  <th className="p-4">Budget Range</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredRequirements.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#10291f] whitespace-nowrap">
                      {req.requirementCode}
                    </td>
                    <td className="p-4 max-w-[200px] truncate font-bold text-slate-800">
                      {req.title}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <Badge variant="gold" className="text-[9px] uppercase px-2 py-0.5">
                        {req.propertyCategory.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4 max-w-[150px] truncate">
                      {req.preferredLocations.join(", ")}, {req.preferredCity}
                    </td>
                    <td className="p-4 whitespace-nowrap font-bold text-[#10291f]">
                      {formatINR(req.budgetMin)} - {formatINR(req.budgetMax)}
                    </td>
                    <td className="p-4 font-semibold text-slate-600 whitespace-nowrap">
                      {req.contactName || "Anonymous Sourced"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <Badge variant={getPriorityBadgeVariant(req.priority)} className="text-[9px] uppercase px-2 py-0.5">
                        {req.priority}
                      </Badge>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(req.verificationStatus)} className="text-[9px] uppercase px-2 py-0.5">
                        {req.verificationStatus.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {new Date(req.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <Link href={`/crm/requirements/${req.id}`}>
                        <Button className="bg-[#10291f]/5 hover:bg-[#10291f]/10 text-[#10291f] text-[10px] font-bold px-3 py-1 rounded">
                          View Dossier
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

    </div>
  );
}
