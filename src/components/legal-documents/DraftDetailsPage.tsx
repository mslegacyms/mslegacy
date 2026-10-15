"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/lib/auth/roles";
import { LegalDocumentDraft, AgreementParty, PropertyDetails, CommercialTerms, PaymentScheduleItem, WitnessDetails, DocumentStatus } from "@/lib/types/legalDocuments";
import { getStoredDraftById, upsertStoredDraft, deleteStoredDraft } from "@/lib/crm/legalDocumentsStore";
import { legalTemplatesMap } from "@/lib/legal-templates";
import PartyDetailsForm from "./PartyDetailsForm";
import PropertyDetailsForm from "./PropertyDetailsForm";
import CommercialTermsForm from "./CommercialTermsForm";
import PaymentScheduleForm from "./PaymentScheduleForm";
import WitnessDetailsForm from "./WitnessDetailsForm";
import SpecialClausesForm from "./SpecialClausesForm";
import LegalDocumentPreview from "./LegalDocumentPreview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface DraftDetailsPageProps {
  documentId: string;
  userProfile: UserProfile;
}

export default function DraftDetailsPage({ documentId, userProfile }: DraftDetailsPageProps) {
  const router = useRouter();
  
  const [draft, setDraft] = useState<LegalDocumentDraft | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "edit" | "review" | "audit">("preview");
  
  // Forms edit state
  const [partyOne, setPartyOne] = useState<AgreementParty | null>(null);
  const [partyTwo, setPartyTwo] = useState<AgreementParty | null>(null);
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  const [commercialTerms, setCommercialTerms] = useState<CommercialTerms | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleItem[]>([]);
  const [witnessOne, setWitnessOne] = useState<WitnessDetails | null>(null);
  const [witnessTwo, setWitnessTwo] = useState<WitnessDetails | null>(null);
  const [jurisdiction, setJurisdiction] = useState("");
  const [disputeResolution, setDisputeResolution] = useState("");
  const [specialClauses, setSpecialClauses] = useState("");
  const [legalDisclaimer, setLegalDisclaimer] = useState("");

  // Review states
  const [advocateNotes, setAdvocateNotes] = useState("");
  const [titleDeedAudited, setTitleDeedAudited] = useState(false);
  const [stampDutyVerified, setStampDutyVerified] = useState(false);
  const [riskBoundaryOverlap, setRiskBoundaryOverlap] = useState(false);
  const [riskMissingMotherDeed, setRiskMissingMotherDeed] = useState(false);
  const [riskOutstandingDues, setRiskOutstandingDues] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const data = getStoredDraftById(documentId, userProfile.id);
    if (data) {
      setDraft(data);
      setPartyOne(data.partyOne);
      setPartyTwo(data.partyTwo);
      if (data.propertyDetails) setPropertyDetails(data.propertyDetails);
      if (data.commercialTerms) setCommercialTerms(data.commercialTerms);
      if (data.paymentSchedule) setPaymentSchedule(data.paymentSchedule);
      if (data.witnessOne) setWitnessOne(data.witnessOne);
      if (data.witnessTwo) setWitnessTwo(data.witnessTwo);
      setJurisdiction(data.jurisdiction || "Bangalore, Karnataka");
      setDisputeResolution(data.disputeResolution || "");
      setSpecialClauses(data.specialClauses || "");
      setLegalDisclaimer(data.legalDisclaimer || "");
      setAdvocateNotes(data.advocateNotes || "");
      
      // Seed audit checkboxes from history if needed, or defaults
      setTitleDeedAudited(data.status === "legal_reviewed" || data.status === "approved_for_print");
      setStampDutyVerified(data.status === "approved_for_print");
    }
  }, [documentId, userProfile.id]);

  if (!draft) {
    return (
      <div className="text-center py-20 bg-white border border-slate-100 rounded-lg font-serif">
        <h2 className="text-xl font-bold text-red-700">Draft Document Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested legal document ID does not exist or has been deleted.</p>
        <Button variant="outline" size="sm" onClick={() => router.push("/crm/legal-documents")} className="mt-4 font-bold border-slate-200">
          Go back to Dashboard
        </Button>
      </div>
    );
  }

  const isLegalOrAdmin = ["founder", "admin", "legal"].includes(userProfile.role);
  const template = legalTemplatesMap[draft.documentType];

  const handleUpdateDraft = () => {
    setIsSaving(true);
    try {
      const updatedDraft: LegalDocumentDraft = {
        ...draft,
        partyOne: partyOne || draft.partyOne,
        partyTwo: partyTwo || draft.partyTwo,
        propertyDetails: propertyDetails || undefined,
        commercialTerms: commercialTerms || undefined,
        paymentSchedule: paymentSchedule,
        witnessOne: witnessOne || undefined,
        witnessTwo: witnessTwo || undefined,
        jurisdiction,
        disputeResolution,
        specialClauses,
        legalDisclaimer,
        advocateNotes,
        updatedAt: new Date().toISOString()
      };
      
      updatedDraft.approvalHistory.push({
        id: `h-update-${Date.now()}`,
        action: "update",
        actorName: userProfile.fullName || "User",
        actorRole: userProfile.role,
        timestamp: new Date().toISOString(),
        notes: "Agreement details modified by editor."
      });

      upsertStoredDraft(updatedDraft, userProfile.id);
      setDraft(updatedDraft);
      alert("Draft agreement updated successfully.");
      setActiveTab("preview");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReviewAction = (newStatus: DocumentStatus, actionNotes: string) => {
    if (newStatus === "approved_for_print") { alert("Official approval requires the server review workflow. This remains a working draft."); return; }
    setIsSaving(true);
    try {
      // Build risk remarks summary
      let riskSummary = [];
      if (riskBoundaryOverlap) riskSummary.push("Boundary Overlap");
      if (riskMissingMotherDeed) riskSummary.push("Missing Mother Deed");
      if (riskOutstandingDues) riskSummary.push("Outstanding Dues");
      const riskText = riskSummary.length > 0 ? ` [Risks: ${riskSummary.join(", ")}]` : "";

      const updatedDraft: LegalDocumentDraft = {
        ...draft,
        status: newStatus,
        advocateNotes,
        updatedAt: new Date().toISOString()
      };

      updatedDraft.approvalHistory.push({
        id: `h-review-${Date.now()}`,
        action: newStatus === "rejected" ? "reject" : "request_review",
        actorName: userProfile.fullName || "Advocate Officer",
        actorRole: userProfile.role,
        timestamp: new Date().toISOString(),
        notes: `${actionNotes}${riskText}`
      });

      upsertStoredDraft(updatedDraft, userProfile.id);
      setDraft(updatedDraft);
      alert(`Document status updated to: ${newStatus.replace("_", " ").toUpperCase()}`);
      setActiveTab("preview");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review decision.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this draft permanent? This action cannot be undone.")) {
      deleteStoredDraft(draft.id, userProfile.id);
      router.push("/crm/legal-documents");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="neutral" className="capitalize text-[10px]">Draft</Badge>;
      case "pending_legal_review":
        return <Badge variant="warning" className="capitalize text-[10px] bg-amber-50 text-amber-700 border-amber-200">Pending Review</Badge>;
      case "legal_reviewed":
        return <Badge variant="gold" className="capitalize text-[10px] bg-amber-100 text-amber-800 border-amber-300">Legal Reviewed</Badge>;
      case "approved_for_print":
        return <Badge variant="success" className="capitalize text-[10px] bg-green-50 text-green-700 border-green-200">Ready to Print</Badge>;
      case "rejected":
        return <Badge variant="danger" className="capitalize text-[10px]">Rejected / Correction Needed</Badge>;
      case "archived":
        return <Badge variant="neutral" className="capitalize text-[10px] bg-slate-100 text-slate-500">Archived</Badge>;
      default:
        return <Badge variant="neutral" className="capitalize text-[10px]">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Details info panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
              {draft.draftNumber}
            </span>
            {getStatusBadge(draft.status)}
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#10291f] mt-2">
            {draft.documentTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Template Category: {template?.category || "Advisory"} | Version: v{template?.version} | Created by {draft.createdBy}
          </p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/crm/legal-documents")} className="font-bold border-slate-200">
            ← Dashboard
          </Button>
          
          {isLegalOrAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="font-bold text-red-500 hover:bg-red-50 border-red-100"
            >
              Delete Draft
            </Button>
          )}
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("preview")}
          className={`pb-3 text-xs font-bold px-4 transition-all ${
            activeTab === "preview" ? "border-b-2 border-[#8A704C] text-[#10291f]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Agreement Preview
        </button>
        
        {/* Sales can edit as long as it's not finalized. Admin/Legal can edit anytime */}
        {(isLegalOrAdmin || draft.status === "draft" || draft.status === "rejected") && (
          <button
            onClick={() => setActiveTab("edit")}
            className={`pb-3 text-xs font-bold px-4 transition-all ${
              activeTab === "edit" ? "border-b-2 border-[#8A704C] text-[#10291f]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Edit Draft Details
          </button>
        )}

        {isLegalOrAdmin && (
          <button
            onClick={() => setActiveTab("review")}
            className={`pb-3 text-xs font-bold px-4 transition-all flex items-center ${
              activeTab === "review" ? "border-b-2 border-[#8A704C] text-[#10291f]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Legal Review Desk
          </button>
        )}

        <button
          onClick={() => setActiveTab("audit")}
          className={`pb-3 text-xs font-bold px-4 transition-all ${
            activeTab === "audit" ? "border-b-2 border-[#8A704C] text-[#10291f]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Audit History ({draft.approvalHistory.length})
        </button>
      </div>

      {/* Tabs Content Switching */}
      <div className="space-y-6">
        
        {activeTab === "preview" && (
          <div className="space-y-4">
            {draft.status === "pending_legal_review" && !isLegalOrAdmin && (
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-md text-xs">
                <strong>🔒 Under Advocate Review:</strong> This agreement draft has been submitted to the legal desk. Printing is currently locked until an advocate reviews and signs off on the stamp duty and property titles.
              </div>
            )}
            
            <LegalDocumentPreview
              draft={draft}
              showActions={true}
              onSendForReview={
                draft.status === "draft"
                  ? () => handleReviewAction("pending_legal_review", "Sales requested legal clearance.")
                  : undefined
              }
            />
          </div>
        )}

        {activeTab === "edit" && partyOne && partyTwo && (
          <div className="bg-white p-6 border border-slate-100 rounded-lg shadow-xs space-y-6">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Modify Draft Inputs</h2>
            
            <PartyDetailsForm
              label="Party One Details (MS Legacy)"
              party={partyOne}
              onChange={(updated) => setPartyOne((p) => p && ({ ...p, ...updated }))}
            />

            <PartyDetailsForm
              label="Party Two Details (Client)"
              party={partyTwo}
              onChange={(updated) => setPartyTwo((p) => p && ({ ...p, ...updated }))}
            />

            {propertyDetails && (
              <PropertyDetailsForm
                property={propertyDetails}
                onChange={(updated) => setPropertyDetails((p) => p && ({ ...p, ...updated }))}
              />
            )}

            {commercialTerms && (
              <CommercialTermsForm
                documentType={draft.documentType}
                terms={commercialTerms}
                onChange={(updated) => setCommercialTerms((p) => p && ({ ...p, ...updated }))}
              />
            )}

            {draft.documentType !== "gpa" && draft.documentType !== "spa" && (
              <PaymentScheduleForm
                schedule={paymentSchedule}
                totalConsideration={commercialTerms?.considerationAmount || 0}
                onChange={setPaymentSchedule}
              />
            )}

            <SpecialClausesForm
              specialClauses={specialClauses}
              disputeResolution={disputeResolution}
              jurisdiction={jurisdiction}
              legalDisclaimer={legalDisclaimer}
              onChange={(fields) => {
                if (fields.specialClauses !== undefined) setSpecialClauses(fields.specialClauses);
                if (fields.disputeResolution !== undefined) setDisputeResolution(fields.disputeResolution);
                if (fields.jurisdiction !== undefined) setJurisdiction(fields.jurisdiction);
                if (fields.legalDisclaimer !== undefined) setLegalDisclaimer(fields.legalDisclaimer);
              }}
            />

            {witnessOne && witnessTwo && (
              <WitnessDetailsForm
                witnessOne={witnessOne}
                witnessTwo={witnessTwo}
                onChangeOne={(updated) => setWitnessOne((w) => w && ({ ...w, ...updated }))}
                onChangeTwo={(updated) => setWitnessTwo((w) => w && ({ ...w, ...updated }))}
              />
            )}

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button
                variant="primary"
                size="sm"
                onClick={handleUpdateDraft}
                disabled={isSaving}
                className="font-bold text-white bg-[#10291f] hover:bg-[#081510]"
              >
                {isSaving ? "Saving changes..." : "Save Draft Changes"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "review" && isLegalOrAdmin && (
          <div className="bg-white p-6 border border-slate-100 rounded-lg shadow-xs space-y-6">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Advocate Clearance Control Desk</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Due diligence checklists */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Verification Checklist</h3>
                <div className="space-y-3 bg-slate-50 p-4 rounded-md border border-slate-200">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="titleCheck"
                      checked={titleDeedAudited}
                      onChange={(e) => setTitleDeedAudited(e.target.checked)}
                      className="h-4 w-4 border-slate-300 rounded text-[#8A704C]"
                    />
                    <label htmlFor="titleCheck" className="text-xs font-bold text-slate-700">
                      Title Search Chain verified (30-year flow cleared)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="stampCheck"
                      checked={stampDutyVerified}
                      onChange={(e) => setStampDutyVerified(e.target.checked)}
                      className="h-4 w-4 border-slate-300 rounded text-[#8A704C]"
                    />
                    <label htmlFor="stampCheck" className="text-xs font-bold text-slate-700">
                      Applicable Stamp Duty charges and Sub-Registrar jurisdictions verified
                    </label>
                  </div>
                </div>

                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Flag Transaction Risk Alerts</h3>
                <div className="space-y-3 bg-slate-50 p-4 rounded-md border border-slate-200">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="riskBoundary"
                      checked={riskBoundaryOverlap}
                      onChange={(e) => setRiskBoundaryOverlap(e.target.checked)}
                      className="h-4 w-4 border-slate-300 rounded text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="riskBoundary" className="text-xs font-bold text-red-800">
                      🚨 Flag: Boundary overlap or survey sketch discrepancy identified
                    </label>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="riskMother"
                      checked={riskMissingMotherDeed}
                      onChange={(e) => setRiskMissingMotherDeed(e.target.checked)}
                      className="h-4 w-4 border-slate-300 rounded text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="riskMother" className="text-xs font-bold text-red-800">
                      🚨 Flag: Mother deeds / Land conversion certificate missing
                    </label>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="riskDues"
                      checked={riskOutstandingDues}
                      onChange={(e) => setRiskOutstandingDues(e.target.checked)}
                      className="h-4 w-4 border-slate-300 rounded text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="riskDues" className="text-xs font-bold text-red-800">
                      🚨 Flag: Unpaid municipal property taxes or agricultural dues detected
                    </label>
                  </div>
                </div>
              </div>

              {/* Reviewer remarks */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Advocate Remarks & Notes</h3>
                <textarea
                  rows={6}
                  value={advocateNotes}
                  onChange={(e) => setAdvocateNotes(e.target.value)}
                  placeholder="Record legal remarks, required corrections, title details, or family tree checklist items..."
                  className="w-full text-xs p-3 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
                />
              </div>
            </div>

            {/* Approval Trigger Actions */}
            <div className="border-t border-slate-200 pt-5 flex flex-wrap gap-2.5 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReviewAction("rejected", "Advocate requested corrections.")}
                disabled={isSaving}
                className="font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200"
              >
                Request Correction
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleReviewAction("legal_reviewed", "Advocate completed review checklist.")}
                disabled={isSaving || !titleDeedAudited}
                className="font-bold text-white bg-[#8b6e3a] hover:bg-[#725a3a]"
              >
                Mark Legal Reviewed
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleReviewAction("approved_for_print", "Advocate approved for printing and execution.")}
                disabled={isSaving || !titleDeedAudited || !stampDutyVerified}
                className="font-bold text-white bg-[#10291f] hover:bg-[#081510] disabled:opacity-40"
              >
                Approve & Unlock Print
              </Button>
            </div>
            {(!titleDeedAudited || !stampDutyVerified) && (
              <p className="text-[10px] text-amber-600 text-right mt-1 font-medium">
                * Note: Title verifications and stamp duty checkoffs must be completed to unlock printing.
              </p>
            )}
          </div>
        )}

        {activeTab === "audit" && (
          <div className="bg-white p-6 border border-slate-100 rounded-lg shadow-xs space-y-6">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Document Governance & Approval Audit Trail</h2>
            
            <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-6">
              {draft.approvalHistory.map((item, idx) => (
                <div key={item.id || idx} className="relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1 bg-white border-2 border-[#8A704C] rounded-full w-3.5 h-3.5" />
                  
                  <div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-black text-slate-800">{item.actorName}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-bold uppercase">
                        {item.actorRole}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        {new Date(item.timestamp).toLocaleString("en-IN")}
                      </span>
                    </div>
                    
                    <div className="text-xs text-slate-500 mt-1 capitalize font-bold">
                      Action: <span className="text-[#8A704C]">{item.action.replace("_", " ")}</span>
                    </div>

                    {item.notes && (
                      <div className="mt-2 text-xs bg-slate-50 border border-slate-100 p-2.5 rounded text-slate-600 max-w-xl">
                        {item.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
