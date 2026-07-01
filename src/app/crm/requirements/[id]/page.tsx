"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  getPublicRequirements, // used for imports
  getCrmRequirements,
  getRequirementActivityLogs,
  getRequirementMatches,
  getRequirementResponses,
  updateRequirementStatus,
  createRequirementMatch,
  updateMatchStatus,
  updateResponseStatus,
  logRequirementActivity
} from "@/lib/requirements/requirements";
import { calculateMatchesForRequirement, ScoredMatch } from "@/lib/requirements/matchRequirements";
import { PropertyRequirement, RequirementMatch, RequirementResponse, RequirementActivityLog } from "@/lib/types/propertyRequirements";
import { formatINR } from "@/lib/utils";

export default function CrmRequirementDossierPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [requirement, setRequirement] = useState<PropertyRequirement | null>(null);
  const [matches, setMatches] = useState<RequirementMatch[]>([]);
  const [responses, setResponses] = useState<RequirementResponse[]>([]);
  const [logs, setLogs] = useState<RequirementActivityLog[]>([]);
  
  // Scored matches calculated dynamically
  const [recommendedMatches, setRecommendedMatches] = useState<ScoredMatch[]>([]);
  const [calculatingMatches, setCalculatingMatches] = useState(false);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [noteText, setNoteText] = useState("");

  // Reload action
  async function loadDossierData() {
    if (!id) return;
    const allCrm = await getCrmRequirements();
    const req = allCrm.find(r => r.id === id) || null;
    
    if (req) {
      setRequirement(req);
      
      // Load linked matches, responses, and log timelines
      const [linkedMatches, partnerResponses, activityLogs] = await Promise.all([
        getRequirementMatches(req.id),
        getRequirementResponses(req.id),
        getRequirementActivityLogs(req.id)
      ]);
      
      setMatches(linkedMatches);
      setResponses(partnerResponses);
      setLogs(activityLogs);

      // Run dynamic scoring engine
      setCalculatingMatches(true);
      const scored = await calculateMatchesForRequirement(req);
      setRecommendedMatches(scored);
      setCalculatingMatches(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadDossierData();
  }, [id]);

  // Handle stage/priority/visibility changes
  const handleUpdate = async (field: string, value: any) => {
    if (!requirement) return;
    setUpdating(true);
    const res = await updateRequirementStatus(requirement.id, { [field]: value });
    if (res.success) {
      await loadDossierData();
    } else {
      alert("Failed to update: " + res.error);
    }
    setUpdating(false);
  };

  // Add a manual / suggested match
  const handleLinkMatch = async (rec: ScoredMatch) => {
    if (!requirement) return;
    setUpdating(true);
    const res = await createRequirementMatch({
      requirementId: requirement.id,
      matchedProjectId: rec.projectId,
      matchedDeveloperId: rec.developerId,
      matchedPropertyTitle: rec.title,
      matchType: "project",
      matchScore: rec.score,
      matchReason: rec.reason,
      matchStatus: "suggested",
      createdBy: "mock-user-id"
    });
    if (res.success) {
      await loadDossierData();
    } else {
      alert("Failed to link match: " + res.error);
    }
    setUpdating(false);
  };

  // Update Match suggestion status
  const handleUpdateMatchStatus = async (matchId: string, status: RequirementMatch["matchStatus"]) => {
    if (!requirement) return;
    setUpdating(true);
    const res = await updateMatchStatus(matchId, requirement.id, status);
    if (res.success) {
      await loadDossierData();
    } else {
      alert("Failed to update status");
    }
    setUpdating(false);
  };

  // Update Responder proposal status
  const handleUpdateResponseStatus = async (resId: string, status: RequirementResponse["responseStatus"]) => {
    if (!requirement) return;
    setUpdating(true);
    const res = await updateResponseStatus(resId, requirement.id, status, noteText || undefined);
    if (res.success) {
      setNoteText("");
      await loadDossierData();
    } else {
      alert("Failed to update proposal status");
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 font-sans">
        <div className="w-8 h-8 border-4 border-[#8b6e3a] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Syncing Client Dossier...</p>
      </div>
    );
  }

  if (!requirement) {
    return (
      <div className="text-center py-20 font-sans space-y-4">
        <h2 className="text-xl font-bold">Requirement Sourcing File Not Found</h2>
        <Link href="/crm/requirements">
          <Button variant="outline" size="sm">Return to Index</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold mb-2">
            <Link href="/crm/requirements" className="hover:underline text-[#8b6e3a]">Requirements Exchange</Link>
            <span>/</span>
            <span>Dossier</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
            <span>{requirement.requirementCode}</span>
            <span className="text-slate-300">|</span>
            <span className="text-lg font-medium text-slate-500">{requirement.title}</span>
          </h1>
        </div>

        <div className="flex space-x-2">
          <Link href="/crm/requirements">
            <Button variant="outline" size="sm" className="font-semibold text-xs border-slate-200">
              &larr; Back to Directory
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Main Sourcing Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Specs, Matches, and Responses */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card A: Property Preferences */}
          <Card className="p-6 bg-white border border-slate-100 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f] border-b pb-2">Client Preferences Summary</h3>
            
            <div className="p-4 bg-slate-50 border rounded text-xs text-slate-600 leading-relaxed font-medium">
              <span className="font-bold text-slate-800 block mb-1">Requirement Narrative</span>
              {requirement.requirementSummary}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-bold text-slate-800 capitalize">{requirement.propertyCategory.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Preferred City:</span>
                  <span className="font-bold text-slate-800">{requirement.preferredCity}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Locations list:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[200px]">{requirement.preferredLocations.join(", ")}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Budget limit:</span>
                  <span className="font-bold text-[#10291f]">{formatINR(requirement.budgetMin)} - {formatINR(requirement.budgetMax)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Config:</span>
                  <span className="font-semibold text-slate-800">{requirement.bedrooms || "N/A"}</span>
                </div>
                {requirement.landSizeMax && (
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-400">Land Area Size:</span>
                    <span className="font-bold text-slate-800">{requirement.landSizeMin || 0} - {requirement.landSizeMax} {requirement.landSizeUnit}</span>
                  </div>
                )}
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Timeline:</span>
                  <span className="font-semibold text-slate-800">{requirement.possessionTimeline || requirement.purchaseTimeline || "Flexible"}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Source Desk:</span>
                  <span className="font-bold text-slate-800 capitalize">{requirement.sourceType.replace("_", " ")}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Card B: Matching Engine recommendations */}
          <Card className="p-6 bg-white border border-slate-100 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f] border-b pb-2">Rule-Based Match Recommendations</h3>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">Dynamic Sourcing Scoring Engine results</p>
            </div>

            {calculatingMatches ? (
              <div className="py-10 text-center text-xs text-slate-400 font-semibold animate-pulse">Running catalog scoring matching rules...</div>
            ) : recommendedMatches.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed rounded">
                No automatic project matches met the 40% matching score criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {recommendedMatches.slice(0, 3).map((rec, idx) => {
                  const alreadyLinked = matches.some(m => m.matchedProjectId === rec.projectId);
                  return (
                    <div key={idx} className="p-4 bg-slate-50/50 border rounded-lg flex justify-between items-start text-xs gap-4 hover:border-gold-elegant transition-colors">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-700 font-bold">{rec.title}</span>
                          <Badge variant={rec.score >= 80 ? "success" : "gold"} className="text-[9px] px-1 py-0.5">{rec.score}% match</Badge>
                        </div>
                        <p className="text-slate-500 leading-relaxed font-medium">{rec.reason}</p>
                        {rec.gaps.length > 0 && (
                          <div className="text-[10px] text-slate-400 font-medium">
                            <span className="text-rose-500 font-bold">Gaps:</span> {rec.gaps.join("; ")}
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => handleLinkMatch(rec)}
                        disabled={alreadyLinked || updating}
                        className={`text-[10px] font-bold px-3 py-1.5 shrink-0 ${alreadyLinked ? "bg-slate-100 text-slate-400" : "bg-[#10291f] text-white"}`}
                      >
                        {alreadyLinked ? "Linked" : "Link Proposal"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Card C: Linked matches status */}
          <Card className="p-6 bg-white border border-slate-100 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f] border-b pb-2">Active Shortlist / Linked Matches ({matches.length})</h3>
            
            {matches.length === 0 ? (
              <p className="text-center text-xs text-slate-400 py-6 font-medium">No linked matching options on this ticket yet.</p>
            ) : (
              <div className="divide-y divide-slate-50">
                {matches.map((match) => (
                  <div key={match.id} className="py-4 flex justify-between items-center text-xs gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800">{match.matchedPropertyTitle}</span>
                      <div className="flex space-x-3 text-[10px] text-slate-400 font-medium">
                        <span>Score: {match.matchScore || 0}%</span>
                        <span>•</span>
                        <span>Type: {match.matchType}</span>
                        <span>•</span>
                        <span>Stage: <span className="font-bold uppercase text-[#8b6e3a]">{match.matchStatus}</span></span>
                      </div>
                    </div>

                    <div className="flex space-x-1.5">
                      <select
                        value={match.matchStatus}
                        onChange={(e) => handleUpdateMatchStatus(match.id, e.target.value as any)}
                        disabled={updating}
                        className="bg-slate-50 border border-slate-200 rounded p-1 text-[10px] focus:outline-none"
                      >
                        <option value="suggested">Suggested</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="sent_to_client">Sent to Client</option>
                        <option value="client_interested">Interested</option>
                        <option value="rejected">Rejected</option>
                        <option value="converted">Converted</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Card D: Partner Offered Responses */}
          <Card className="p-6 bg-white border border-slate-100 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f] border-b pb-2">Developer / Agent Responses ({responses.length})</h3>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">Submissions received from public marketplace board</p>
            </div>

            {responses.length === 0 ? (
              <p className="text-center text-xs text-slate-400 py-6 font-medium">No partner proposals received yet.</p>
            ) : (
              <div className="space-y-6 divide-y divide-slate-100">
                {responses.map((res) => (
                  <div key={res.id} className="pt-4 first:pt-0 space-y-3 text-xs">
                    
                    {/* Responder metadata header */}
                    <div className="flex justify-between items-start bg-slate-50 p-3 rounded-lg border">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800">{res.responderName}</span>
                          <span className="text-[10px] text-slate-400 capitalize">({res.responderType})</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {res.responderCompany ? `${res.responderCompany} | ` : ""}{res.responderPhone} | {res.responderEmail}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400 font-semibold">Stage:</span>
                        <Badge 
                          variant={res.responseStatus === "shortlisted" || res.responseStatus === "converted" ? "success" : res.responseStatus === "rejected" ? "danger" : "gold"}
                          className="text-[9px] uppercase px-2 py-0.5"
                        >
                          {res.responseStatus}
                        </Badge>
                      </div>
                    </div>

                    {/* Offered property details */}
                    <div className="space-y-2 pl-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-800">{res.propertyTitle}</span>
                        <span className="text-[#10291f] font-bold">INR {res.offeredPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        Location: <span className="font-semibold text-slate-700">{res.propertyLocation}</span> | Category: <span className="capitalize font-semibold text-slate-700">{res.propertyCategory}</span>
                      </p>
                      {res.propertyDetails && (
                        <p className="text-[11px] text-slate-600 bg-slate-50/50 p-2 rounded leading-relaxed border-l-2 border-[#8b6e3a] font-medium">
                          {res.propertyDetails}
                        </p>
                      )}
                      
                      {/* Document links */}
                      {res.documentLinks && res.documentLinks.length > 0 && (
                        <div className="flex space-x-2 pt-1">
                          {res.documentLinks.map((link, idx) => (
                            <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#8b6e3a] font-bold hover:underline">
                              View Attachment PDF &rarr;
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions control panel */}
                    <div className="pt-2 flex flex-wrap gap-2 items-center bg-slate-50/50 p-2 rounded border border-dashed">
                      <span className="text-[10px] text-slate-400 font-semibold">Intake Decision:</span>
                      <Button
                        onClick={() => handleUpdateResponseStatus(res.id, "shortlisted")}
                        disabled={updating}
                        className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1"
                      >
                        Accept & Shortlist
                      </Button>
                      <Button
                        onClick={() => handleUpdateResponseStatus(res.id, "rejected")}
                        disabled={updating}
                        className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1"
                      >
                        Reject Option
                      </Button>
                      <Button
                        onClick={() => handleUpdateResponseStatus(res.id, "converted")}
                        disabled={updating}
                        className="bg-[#10291f] text-white text-[10px] font-bold px-2 py-1"
                      >
                        Mark Converted
                      </Button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Status control, Client information, Notes, Activity logs */}
        <div className="space-y-8">
          
          {/* Sourcing File controls */}
          <Card className="p-6 bg-white border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f] border-b pb-2">Sourcing Lifecycle</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Dossier Stage</label>
                <select
                  value={requirement.verificationStatus}
                  onChange={(e) => handleUpdate("verificationStatus", e.target.value)}
                  disabled={updating}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                >
                  <option value="new">New Submission</option>
                  <option value="under_review">Under Review</option>
                  <option value="qualified">Qualified</option>
                  <option value="approved_public">Public Active</option>
                  <option value="matched">Matched</option>
                  <option value="shared_with_partners">Shared with Partners</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Public Visibility</label>
                <select
                  value={requirement.publicVisibility}
                  onChange={(e) => handleUpdate("publicVisibility", e.target.value)}
                  disabled={updating}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                >
                  <option value="private">Private (Staff only)</option>
                  <option value="public_sanitized">Public Sanitized (Sourcing Board)</option>
                  <option value="internal_only">Internal (Advisory Only)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Urgency Priority</label>
                <select
                  value={requirement.priority}
                  onChange={(e) => handleUpdate("priority", e.target.value)}
                  disabled={updating}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Client contact info (private card) */}
          <Card className="p-6 bg-white border border-slate-100 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f]">Confidential Client File</h3>
              <Badge variant="danger" className="text-[9px] uppercase px-1.5 py-0.5">Confidential</Badge>
            </div>
            
            <div className="space-y-2 text-xs font-sans text-slate-600">
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400">Client Name:</span>
                <span className="font-bold text-slate-800">{requirement.contactName || "Sourced"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400">Phone:</span>
                <span className="font-mono font-bold text-slate-800">{requirement.contactPhone || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400">Email:</span>
                <span className="font-bold text-slate-800">{requirement.contactEmail || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400">Location:</span>
                <span className="font-bold text-slate-800">{requirement.contactCity || "N/A"}</span>
              </div>
              
              <div className="space-y-1.5 bg-slate-50 p-2.5 rounded border text-[10px] mt-2 font-medium">
                <div className="flex justify-between">
                  <span>Advisory Consent:</span> 
                  <span className={requirement.consentToContact ? "text-emerald-700 font-bold" : "text-slate-400 font-bold"}>
                    {requirement.consentToContact ? "GRANTED" : "PENDING"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Public Sourcing board Consent:</span> 
                  <span className={requirement.consentToShareSanitized ? "text-emerald-700 font-bold" : "text-slate-400 font-bold"}>
                    {requirement.consentToShareSanitized ? "GRANTED" : "PENDING"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Internal notes and updates */}
          <Card className="p-6 bg-white border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f] border-b pb-2">Internal Sourcing remarks</h3>
            
            <div className="space-y-2 text-xs">
              <textarea
                value={requirement.internalNotes || ""}
                onChange={(e) => handleUpdate("internalNotes", e.target.value)}
                placeholder="Write internal team notes, client checkups, status, etc."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
              />
            </div>
          </Card>

          {/* Sourcing log timeline */}
          <Card className="p-6 bg-white border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#10291f] border-b pb-2">Audit activity timeline</h3>
            
            {logs.length === 0 ? (
              <p className="text-center text-xs text-slate-400 font-medium">No activity log entries.</p>
            ) : (
              <div className="space-y-4 relative border-l pl-3 ml-2 border-slate-200 text-xs">
                {logs.map((log) => (
                  <div key={log.id} className="space-y-1 relative">
                    {/* Circle marker */}
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#8b6e3a]"></div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span className="font-bold text-[#8b6e3a] capitalize">{log.action.replace("_", " ")}</span>
                      <span>
                        {new Date(log.createdAt).toLocaleDateString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium leading-normal">{log.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

        </div>

      </div>

    </div>
  );
}
