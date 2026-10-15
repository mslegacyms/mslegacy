"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserProfile } from "@/lib/auth/roles";
import { LegalDocumentDraft } from "@/lib/types/legalDocuments";
import { getStoredDrafts, deleteStoredDraft, upsertStoredDraft } from "@/lib/crm/legalDocumentsStore";
import { legalTemplates } from "@/lib/legal-templates";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Scale, ShieldCheck, Landmark } from "@/components/ui/Icons";

interface LegalDocumentsDashboardProps {
  userProfile: UserProfile;
}

export default function LegalDocumentsDashboard({ userProfile }: LegalDocumentsDashboardProps) {
  const [drafts, setDrafts] = useState<LegalDocumentDraft[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "review_queue" | "approved_queue">("all");

  useEffect(() => {
    setDrafts(getStoredDrafts(userProfile.id));
  }, [userProfile.id]);

  const handleArchive = (id: string) => {
    const updated = drafts.map(d => {
      if (d.id === id) {
        const archivedDraft = { ...d, status: "archived" as const };
        // Add audit history
        archivedDraft.approvalHistory.push({
          id: `h-${Date.now()}`,
          action: "archive",
          actorName: userProfile.fullName || "User",
          actorRole: userProfile.role,
          timestamp: new Date().toISOString(),
          notes: "Draft archived from dashboard."
        });
        upsertStoredDraft(archivedDraft, userProfile.id);
        return archivedDraft;
      }
      return d;
    });
    setDrafts(updated);
  };

  const filteredDrafts = drafts.filter((draft) => {
    const matchesSearch =
      draft.draftNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.partyTwo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (draft.propertyDetails?.villageOrLocality || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || draft.status === statusFilter;
    const matchesType = typeFilter === "all" || draft.documentType === typeFilter;
    
    // Tab filters
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "review_queue" && draft.status === "pending_legal_review") ||
      (activeTab === "approved_queue" && draft.status === "approved_for_print");

    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  // Calculate Metrics
  const totalCount = drafts.length;
  const pendingReviewCount = drafts.filter((d) => d.status === "pending_legal_review").length;
  const approvedCount = drafts.filter((d) => d.status === "approved_for_print").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="neutral" className="capitalize text-[9px]">Draft</Badge>;
      case "pending_legal_review":
        return <Badge variant="warning" className="capitalize text-[9px] bg-amber-50 text-amber-700 border-amber-200">Pending Review</Badge>;
      case "legal_reviewed":
        return <Badge variant="gold" className="capitalize text-[9px] bg-amber-100 text-amber-800 border-amber-300">Legal Reviewed</Badge>;
      case "approved_for_print":
        return <Badge variant="success" className="capitalize text-[9px] bg-green-50 text-green-700 border-green-200">Ready to Print</Badge>;
      case "rejected":
        return <Badge variant="danger" className="capitalize text-[9px]">Rejected</Badge>;
      case "archived":
        return <Badge variant="neutral" className="capitalize text-[9px] bg-slate-100 text-slate-500">Archived</Badge>;
      default:
        return <Badge variant="neutral" className="capitalize text-[9px]">{status}</Badge>;
    }
  };

  const getTemplateName = (typeId: string) => {
    const t = legalTemplates.find((temp) => temp.templateId === typeId);
    return t ? t.templateName : typeId;
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] tracking-tight">
            Legal Agreements & Drafting Center
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Generate and manage premium land aggregation mandates, sale deeds, leases, and powers of attorney.
          </p>
        </div>
        <Link href="/crm/legal-documents/new">
          <Button variant="primary" size="sm" className="font-semibold bg-[#10291f] hover:bg-[#081510] text-white">
            + Onboard New Agreement
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 bg-white border border-slate-100 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-[#10291f]/5 text-[#10291f]">
            <Scale size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Drafts</span>
            <span className="text-xl font-serif font-black text-[#10291f]">{totalCount}</span>
          </div>
        </Card>
        
        <Card className="p-5 bg-white border border-slate-100 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-amber-50 text-amber-700">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Legal Review</span>
            <span className="text-xl font-serif font-black text-[#10291f]">{pendingReviewCount}</span>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-slate-100 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-50 text-green-700">
            <Landmark size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Approved for Print</span>
            <span className="text-xl font-serif font-black text-[#10291f]">{approvedCount}</span>
          </div>
        </Card>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 text-xs font-bold px-4 transition-all ${
            activeTab === "all"
              ? "border-b-2 border-[#8A704C] text-[#10291f]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          All Active Drafts
        </button>
        {["founder", "admin", "legal"].includes(userProfile.role) && (
          <>
            <button
              onClick={() => setActiveTab("review_queue")}
              className={`pb-3 text-xs font-bold px-4 transition-all flex items-center ${
                activeTab === "review_queue"
                  ? "border-b-2 border-[#8A704C] text-[#10291f]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Legal Review Queue
              {pendingReviewCount > 0 && (
                <span className="ml-2 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {pendingReviewCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("approved_queue")}
              className={`pb-3 text-xs font-bold px-4 transition-all ${
                activeTab === "approved_queue"
                  ? "border-b-2 border-[#8A704C] text-[#10291f]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Approved-for-Print Queue
              {approvedCount > 0 && (
                <span className="ml-2 bg-green-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {approvedCount}
                </span>
              )}
            </button>
          </>
        )}
      </div>

      {/* Filter / Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white border border-slate-100 rounded shadow-xs">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by draft number, party name, or property locality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C] bg-white"
          />
        </div>

        {/* Status */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft State</option>
            <option value="pending_legal_review">Pending Review</option>
            <option value="legal_reviewed">Legal Reviewed</option>
            <option value="approved_for_print">Approved for Print</option>
            <option value="rejected">Rejected</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Document Type */}
        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          >
            <option value="all">All Document Types</option>
            {legalTemplates.map((t) => (
              <option key={t.templateId} value={t.templateId}>
                {t.templateName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Document Listing Table */}
      <div className="bg-white border border-slate-100 rounded shadow-xs overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left">
          <thead className="bg-[#10291f]/5">
            <tr>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Draft No</th>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Document Type</th>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Party / Client</th>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Property Schedule</th>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Created By</th>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Updated Date</th>
              <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredDrafts.map((draft) => (
              <tr key={draft.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-[#10291f] whitespace-nowrap">
                  {draft.draftNumber}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-700 whitespace-nowrap">
                  {getTemplateName(draft.documentType)}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{draft.partyTwo.name}</div>
                  <div className="text-[10px] text-slate-400">{draft.partyTwo.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-700 truncate max-w-[200px]">
                    {draft.propertyDetails?.villageOrLocality || "Not Specified"}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {draft.propertyDetails?.surveyNumber || "No Survey No"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(draft.status)}
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                  {draft.createdBy}
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                  {new Date(draft.updatedAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap space-x-1.5">
                  <Link href={`/crm/legal-documents/${draft.id}`}>
                    <Button variant="outline" size="sm" className="font-bold">
                      View/Edit
                    </Button>
                  </Link>

                  {draft.status === "approved_for_print" ? (
                    <Link href={`/crm/legal-documents/print/${draft.id}`} target="_blank">
                      <Button variant="outline" size="sm" className="font-bold text-green-700 border-green-200 bg-green-50/50 hover:bg-green-50">
                        Print PDF
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="font-bold text-slate-300 border-slate-100 bg-slate-50 cursor-not-allowed"
                      title="Requires legal review approval to unlock official printing"
                    >
                      Print
                    </Button>
                  )}

                  {draft.status !== "archived" && ["founder", "admin", "legal"].includes(userProfile.role) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArchive(draft.id)}
                      className="font-bold text-red-500 hover:bg-red-50 border-red-100"
                    >
                      Archive
                    </Button>
                  )}
                </td>
              </tr>
            ))}

            {filteredDrafts.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-slate-400 italic">
                  No agreement drafts found. Click "Onboard New Agreement" to generate one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Template Quick Links */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#10291f]">Onboarding Templates Quick-Launch</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {legalTemplates.slice(0, 4).map((template) => (
            <Card key={template.templateId} className="p-4 bg-white border border-slate-100 flex flex-col justify-between h-36">
              <div>
                <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black tracking-wider uppercase">
                  {template.category}
                </span>
                <h4 className="font-serif text-xs font-bold text-[#10291f] mt-2 leading-snug">
                  {template.templateName}
                </h4>
              </div>
              <Link href={`/crm/legal-documents/new?templateId=${template.templateId}`}>
                <span className="text-[10px] text-[#8b6e3a] font-bold cursor-pointer hover:underline block pt-2">
                  Draft Agreement →
                </span>
              </Link>
            </Card>
          ))}
          <Card className="p-4 bg-amber-50/20 border border-dashed border-[#8b6e3a]/30 flex flex-col justify-between h-36">
            <div>
              <span className="text-[8px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-black uppercase">
                Registry
              </span>
              <h4 className="font-serif text-xs font-bold text-[#10291f] mt-2 leading-snug">
                Browse Complete Library (20 Documents)
              </h4>
            </div>
            <Link href="/crm/legal-documents/templates">
              <span className="text-[10px] text-[#8b6e3a] font-bold cursor-pointer hover:underline block pt-2">
                View Template Catalog →
              </span>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
