"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { submitPublishingDecision } from "@/app/actions/projectPublishingDecisions";

interface MockCandidate {
  id: string;
  name: string;
  developer: string;
  projectType: string;
  location: string;
  reraNumber: string;
  reraStatus: string;
  mslegacyVerificationStatus: string;
  riskLevel: "Low" | "Medium" | "High";
  missingData: string;
  currentVisibility: "draft" | "published";
  recommendedAction: string;
  // Media Statuses
  heroStatus: "loaded" | "missing";
  galleryStatus: "loaded" | "missing";
  videoStatus: "loaded" | "missing";
  brochureStatus: "loaded" | "missing";
  floorPlanStatus: "loaded" | "missing";
  mediaPermission: "permission_received" | "pending_permission" | "permission_claimed_pending_document";
  logoPermission: "permission_received" | "pending_permission";
}

export default function ProjectPublishingReviewPage() {
  const [candidates, setCandidates] = useState<MockCandidate[]>([
    {
      id: "cand-1",
      name: "Century Seasons",
      developer: "Century Real Estate",
      projectType: "Plotted development",
      location: "Devanahalli, North Bangalore",
      reraNumber: "PRM/KA/RERA/1250/303/PR/200908/003590",
      reraStatus: "approved",
      mslegacyVerificationStatus: "pending_verification",
      riskLevel: "Low",
      missingData: "Khata conversion certificate registration details",
      currentVisibility: "draft",
      recommendedAction: "Approve Public Information Preview",
      heroStatus: "missing",
      galleryStatus: "missing",
      videoStatus: "missing",
      brochureStatus: "missing",
      floorPlanStatus: "missing",
      mediaPermission: "pending_permission",
      logoPermission: "permission_received"
    },
    {
      id: "cand-2",
      name: "Sambhrama Farms",
      developer: "Hosachiguru Farms",
      projectType: "Farm land",
      location: "Gudibande, Chikkaballapur",
      reraNumber: "N/A (Exempt)",
      reraStatus: "not_applicable",
      mslegacyVerificationStatus: "pending_verification",
      riskLevel: "Medium",
      missingData: "Bhoomi mutation registration logs",
      currentVisibility: "draft",
      recommendedAction: "Approve Public Information Preview",
      heroStatus: "loaded",
      galleryStatus: "missing",
      videoStatus: "missing",
      brochureStatus: "missing",
      floorPlanStatus: "missing",
      mediaPermission: "permission_received",
      logoPermission: "permission_received"
    },
    {
      id: "cand-3",
      name: "Prestige Lakeside Habitat",
      developer: "Prestige Group",
      projectType: "Apartment",
      location: "Varthur Hobli, East Bangalore",
      reraNumber: "PRM/KA/RERA/1251/446/PR/170915/000176",
      reraStatus: "approved",
      mslegacyVerificationStatus: "rera_matched",
      riskLevel: "Low",
      missingData: "None (Fully catalogued)",
      currentVisibility: "draft",
      recommendedAction: "Approve RERA Record Matched Preview",
      heroStatus: "loaded",
      galleryStatus: "loaded",
      videoStatus: "loaded",
      brochureStatus: "loaded",
      floorPlanStatus: "loaded",
      mediaPermission: "permission_received",
      logoPermission: "permission_received"
    },
    {
      id: "cand-4",
      name: "Brigade El Dorado",
      developer: "Brigade Group",
      projectType: "Apartment",
      location: "Aerospace Park, Bagalur",
      reraNumber: "PRM/KA/RERA/1251/309/PR/190913/002873",
      reraStatus: "approved",
      mslegacyVerificationStatus: "rera_matched",
      riskLevel: "Low",
      missingData: "Phase-wise structure certifications",
      currentVisibility: "draft",
      recommendedAction: "Approve RERA Record Matched Preview",
      heroStatus: "loaded",
      galleryStatus: "loaded",
      videoStatus: "missing",
      brochureStatus: "loaded",
      floorPlanStatus: "loaded",
      mediaPermission: "permission_received",
      logoPermission: "permission_received"
    },
    {
      id: "cand-5",
      name: "Sobha Dream Acres",
      developer: "Sobha Limited",
      projectType: "Apartment",
      location: "Balagere, East Bangalore",
      reraNumber: "PRM/KA/RERA/1251/309/PR/181122/002158",
      reraStatus: "approved",
      mslegacyVerificationStatus: "rera_matched",
      riskLevel: "Low",
      missingData: "Local municipal sanction extensions status",
      currentVisibility: "draft",
      recommendedAction: "Approve RERA Record Matched Preview",
      heroStatus: "loaded",
      galleryStatus: "loaded",
      videoStatus: "missing",
      brochureStatus: "loaded",
      floorPlanStatus: "loaded",
      mediaPermission: "permission_received",
      logoPermission: "permission_received"
    },
    {
      id: "cand-6",
      name: "Purva Zensation",
      developer: "Puravankara",
      projectType: "Plotted development",
      location: "Bangalore East",
      reraNumber: "PRM/KA/RERA/1251/446/PR/190215/002388",
      reraStatus: "under_process",
      mslegacyVerificationStatus: "pending_verification",
      riskLevel: "Low",
      missingData: "Manual check of layout permissions pending",
      currentVisibility: "draft",
      recommendedAction: "Send to Legal Review",
      heroStatus: "missing",
      galleryStatus: "missing",
      videoStatus: "missing",
      brochureStatus: "missing",
      floorPlanStatus: "missing",
      mediaPermission: "pending_permission",
      logoPermission: "permission_received"
    },
    {
      id: "cand-7",
      name: "Windmills of Your Mind",
      developer: "Total Environment",
      projectType: "Villa",
      location: "Whitefield, East Bangalore",
      reraNumber: "PRM/KA/RERA/1251/446/PR/170830/000085",
      reraStatus: "approved",
      mslegacyVerificationStatus: "pending_verification",
      riskLevel: "Medium",
      missingData: "Duplex structural approvals scan missing",
      currentVisibility: "draft",
      recommendedAction: "Send to Legal Review",
      heroStatus: "missing",
      galleryStatus: "missing",
      videoStatus: "missing",
      brochureStatus: "missing",
      floorPlanStatus: "missing",
      mediaPermission: "pending_permission",
      logoPermission: "permission_received"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [decision, setDecision] = useState("keep_internal");
  const [note, setNote] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleDecisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;

    const res = await submitPublishingDecision({
      projectId: selectedProjectId,
      decision,
      decisionNote: note,
      nextAction
    });

    if (res.success) {
      setFeedbackMsg(`Success: Decision saved. Note: "${note}"`);
      setCandidates(candidates.map((c) => {
        if (c.id === selectedProjectId) {
          const actionLabel = decision.replace("_", " ").toUpperCase();
          return {
            ...c,
            recommendedAction: actionLabel,
            currentVisibility: (decision.startsWith("approve_") ? "published" : "draft") as "draft" | "published"
          };
        }
        return c;
      }));
      setSelectedProjectId(null);
      setNote("");
      setNextAction("");
    } else {
      setFeedbackMsg("Error: Decision submission failed.");
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "safe_public_info") return c.recommendedAction.includes("Public Information");
    if (activeFilter === "rera_matched") return c.recommendedAction.includes("RERA Record");
    if (activeFilter === "legal") return c.recommendedAction.includes("Legal Review");
    return true;
  });

  return (
    <div className="space-y-8 font-sans text-[#10291f]">
      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h1 className="font-sans text-3xl font-bold text-[#10291f]">Founder Project Publishing Review</h1>
          <p className="text-xs text-slate-500 mt-1">
            Gated review console to approve catalog entries for public preview or legal title checks.
          </p>
        </div>
        <Badge variant="gold" className="text-xs font-bold border border-gold-elegant">Chief Admin Console</Badge>
      </div>

      {feedbackMsg && (
        <div className="bg-[#10291f]/5 border border-gold-elegant text-[#10291f] text-xs p-4 rounded font-bold">
          {feedbackMsg}
        </div>
      )}

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-white border border-gold-elegant space-y-1">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Reviewed Candidates</span>
          <span className="text-2xl font-sans font-bold text-[#10291f]">20</span>
        </Card>
        <Card className="p-4 bg-white border border-gold-elegant space-y-1">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Public Info Targets</span>
          <span className="text-2xl font-sans font-bold text-slate-700">2</span>
        </Card>
        <Card className="p-4 bg-white border border-gold-elegant space-y-1">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">RERA Record Matched</span>
          <span className="text-2xl font-sans font-bold text-slate-700">3</span>
        </Card>
        <Card className="p-4 bg-white border border-gold-elegant space-y-1">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Needs Legal Review</span>
          <span className="text-2xl font-sans font-bold text-rose-600">2</span>
        </Card>
        <Card className="p-4 bg-white border border-gold-elegant space-y-1">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Gated Internal Only</span>
          <span className="text-2xl font-sans font-bold text-slate-400">13</span>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 text-xs font-bold rounded ${activeFilter === "all" ? "bg-[#10291f] text-white" : "bg-white border text-slate-600"}`}
        >
          All Candidates
        </button>
        <button
          onClick={() => setActiveFilter("safe_public_info")}
          className={`px-3 py-1.5 text-xs font-bold rounded ${activeFilter === "safe_public_info" ? "bg-[#10291f] text-white" : "bg-white border text-slate-600"}`}
        >
          Safe Public Info (2)
        </button>
        <button
          onClick={() => setActiveFilter("rera_matched")}
          className={`px-3 py-1.5 text-xs font-bold rounded ${activeFilter === "rera_matched" ? "bg-[#10291f] text-white" : "bg-white border text-slate-600"}`}
        >
          RERA Matched (3)
        </button>
        <button
          onClick={() => setActiveFilter("legal")}
          className={`px-3 py-1.5 text-xs font-bold rounded ${activeFilter === "legal" ? "bg-[#10291f] text-white" : "bg-white border text-slate-600"}`}
        >
          Needs Legal Review (2)
        </button>
      </div>

      {/* Table grid */}
      <Card className="border border-gold-elegant overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
            <thead className="bg-[#10291f] text-white uppercase font-bold tracking-wider text-[9px]">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Developer</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Media Audit Status</th>
                <th className="px-6 py-4">Logo Permission</th>
                <th className="px-6 py-4">RERA ID</th>
                <th className="px-6 py-4">Current Visibility</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredCandidates.map((c) => {
                const isMediaApproved = c.mediaPermission === "permission_received";
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-[#10291f]">{c.name}</td>
                    <td className="px-6 py-4 text-slate-500 font-semibold">{c.developer}</td>
                    <td className="px-6 py-4 text-slate-500">{c.location}</td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex space-x-1.5 text-[9px] font-bold">
                        <span className={c.heroStatus === "loaded" ? "text-emerald-600" : "text-slate-400"}>HERO</span>
                        <span className={c.galleryStatus === "loaded" ? "text-emerald-600" : "text-slate-400"}>GALLERY</span>
                        <span className={c.brochureStatus === "loaded" ? "text-emerald-600" : "text-slate-400"}>BROCHURE</span>
                      </div>
                      <Badge variant="neutral" className={`text-[8px] uppercase font-bold ${
                        isMediaApproved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-400"
                      }`}>
                        {isMediaApproved ? "READY FOR PUBLIC MEDIA" : "MEDIA REVIEW PENDING"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 uppercase font-bold text-[9px]">
                      {c.logoPermission === "permission_received" ? (
                        <span className="text-emerald-600">Logo Approved</span>
                      ) : (
                        <span className="text-slate-400">Placeholder</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">{c.reraNumber}</td>
                    <td className="px-6 py-4">
                      <Badge variant={c.currentVisibility === "published" ? "gold" : "neutral"} className="text-[10px] uppercase font-bold">
                        {c.currentVisibility.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => setSelectedProjectId(c.id)}
                        className="bg-[#10291f] text-white text-[10px] font-bold px-3 py-1 h-auto"
                      >
                        Audit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Decision Form modal popup mockup */}
      {selectedProjectId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <Card className="p-8 bg-white border border-gold-elegant max-w-md w-full space-y-6 shadow-2xl">
            <div>
              <h3 className="font-sans text-lg font-bold text-[#10291f]">Publishing Review Decision</h3>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Audit Log Entry</p>
            </div>

            <form onSubmit={handleDecisionSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Decision Option</label>
                <select
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold"
                >
                  <option value="keep_internal">Keep Internal</option>
                  <option value="approve_public_information_preview">Approve Public Information Preview</option>
                  <option value="approve_rera_record_matched_preview">Approve RERA Record Matched Preview</option>
                  <option value="send_to_legal_review">Send to Legal Review</option>
                  <option value="request_developer_confirmation">Request Developer Confirmation</option>
                  <option value="reject_hold">Reject / Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Decision Note</label>
                <textarea
                  rows={3}
                  required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                  placeholder="Enter details of RERA lookup confirmation or title check references..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Next Action Required</label>
                <input
                  type="text"
                  required
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
                  placeholder="E.g., Match BDA zoning certificate files"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedProjectId(null)}
                  className="border-gold-elegant text-xs font-bold text-[#10291f]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#10291f] text-white text-xs font-bold px-4"
                >
                  Save Decision
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

