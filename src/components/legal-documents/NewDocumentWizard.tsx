"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserProfile } from "@/lib/auth/roles";
import { LegalDocumentDraft, LegalDocumentTemplate, AgreementParty, PropertyDetails, CommercialTerms, PaymentScheduleItem, WitnessDetails } from "@/lib/types/legalDocuments";
import { msLegacyCompanyProfile } from "@/lib/company/msLegacyCompanyProfile";
import { legalTemplatesMap } from "@/lib/legal-templates";
import { upsertStoredDraft } from "@/lib/crm/legalDocumentsStore";
import TemplateSelector from "./TemplateSelector";
import PartyDetailsForm from "./PartyDetailsForm";
import PropertyDetailsForm from "./PropertyDetailsForm";
import CommercialTermsForm from "./CommercialTermsForm";
import PaymentScheduleForm from "./PaymentScheduleForm";
import WitnessDetailsForm from "./WitnessDetailsForm";
import SpecialClausesForm from "./SpecialClausesForm";
import LegalDocumentPreview from "./LegalDocumentPreview";
import { Button } from "@/components/ui/Button";

interface NewDocumentWizardProps {
  userProfile: UserProfile;
}

export default function NewDocumentWizard({ userProfile }: NewDocumentWizardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateIdParam = searchParams.get("templateId");

  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<LegalDocumentTemplate | null>(null);
  
  // Form States
  const [partyOne, setPartyOne] = useState<AgreementParty>({
    name: msLegacyCompanyProfile.companyLegalName,
    fatherHusbandOrRep: `${msLegacyCompanyProfile.representedBy} (${msLegacyCompanyProfile.designation})`,
    address: msLegacyCompanyProfile.registeredOfficeAddress,
    pan: msLegacyCompanyProfile.pan || "",
    phone: msLegacyCompanyProfile.phone,
    email: msLegacyCompanyProfile.email,
    entityType: "company",
    signatoryName: msLegacyCompanyProfile.representedBy,
    signatoryDesignation: msLegacyCompanyProfile.designation
  });
  
  const [partyTwo, setPartyTwo] = useState<AgreementParty>({
    name: "",
    fatherHusbandOrRep: "",
    address: "",
    pan: "",
    phone: "",
    email: "",
    entityType: "individual"
  });

  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    propertyType: "plot",
    surveyNumber: "",
    siteNumber: "",
    flatNumber: "",
    khataNumber: "",
    pidNumber: "",
    villageOrLocality: "",
    boundariesEast: "",
    boundariesWest: "",
    boundariesNorth: "",
    boundariesSouth: "",
    extentArea: "",
    scheduleDescription: ""
  });

  const [commercialTerms, setCommercialTerms] = useState<CommercialTerms>({
    considerationAmount: 0,
    advanceTokenAmount: 0,
    paymentMode: "bank_transfer",
    taxesResponsibility: "Buyer",
    registrationExpenseResponsibility: "Buyer"
  });

  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleItem[]>([]);
  
  const [witnessOne, setWitnessOne] = useState<WitnessDetails>({
    name: "",
    fatherHusbandName: "",
    address: ""
  });
  
  const [witnessTwo, setWitnessTwo] = useState<WitnessDetails>({
    name: "",
    fatherHusbandName: "",
    address: ""
  });

  const [jurisdiction, setJurisdiction] = useState("Bangalore, Karnataka");
  const [disputeResolution, setDisputeResolution] = useState(
    "Any dispute arising out of this Agreement shall be referred to Arbitration in Bangalore under the Arbitration and Conciliation Act, 1996."
  );
  const [specialClauses, setSpecialClauses] = useState("");
  const [legalDisclaimer, setLegalDisclaimer] = useState(msLegacyCompanyProfile.standardDisclaimer);
  
  const [isSaving, setIsSaving] = useState(false);

  // Handle template query parameter initialization
  useEffect(() => {
    if (templateIdParam && legalTemplatesMap[templateIdParam]) {
      const template = legalTemplatesMap[templateIdParam];
      setSelectedTemplate(template);
      
      // Auto-adapt commercial inputs
      if (templateIdParam.includes("rental") || templateIdParam.includes("license")) {
        setCommercialTerms((prev) => ({
          ...prev,
          leaseTermMonths: 11,
          lockInPeriodMonths: 6,
          noticePeriodDays: 30,
          permittedUse: "Residential purposes",
          renewalTerms: "Renewed by mutual consent with 5% escalation"
        }));
      }

      setStep(2);
    }
  }, [templateIdParam]);

  const handleTemplateSelect = (template: LegalDocumentTemplate) => {
    setSelectedTemplate(template);
    
    // Default setup for specific templates
    if (template.templateId.includes("rental") || template.templateId.includes("license")) {
      setCommercialTerms((prev) => ({
        ...prev,
        leaseTermMonths: 11,
        lockInPeriodMonths: 6,
        noticePeriodDays: 30,
        permittedUse: "Residential purposes",
        renewalTerms: "Renewed by mutual consent with 5% escalation"
      }));
    } else if (template.templateId === "gpa" || template.templateId === "spa") {
      setCommercialTerms((prev) => ({
        ...prev,
        powersGranted: [
          "To sign and submit sanction plans and applications before BBMP/BESCOM/BWSSB.",
          "To pay property tax and obtain tax clearances.",
          "To represent the Principal in dispute hearings."
        ]
      }));
    }

    setStep(2);
  };

  const getCombinedDraft = (): Partial<LegalDocumentDraft> => {
    const today = new Date().toISOString();
    return {
      id: `draft-${Date.now()}`,
      documentType: selectedTemplate?.templateId || "",
      documentTitle: `${selectedTemplate?.templateName || "Agreement"} — ${partyTwo.name || "Unnamed Draft"}`,
      draftNumber: `MSL-LD-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdBy: userProfile.fullName || "Sales Agent",
      createdById: userProfile.id,
      createdAt: today,
      updatedAt: today,
      status: "draft",
      companyDetails: msLegacyCompanyProfile,
      partyOne,
      partyTwo,
      propertyDetails,
      commercialTerms,
      paymentSchedule,
      witnessOne,
      witnessTwo,
      jurisdiction,
      disputeResolution,
      specialClauses,
      legalDisclaimer,
      approvalHistory: [
        {
          id: `h-1-${Date.now()}`,
          action: "create",
          actorName: userProfile.fullName || "User",
          actorRole: userProfile.role,
          timestamp: today,
          notes: `Draft initialized under template: ${selectedTemplate?.templateName}`
        }
      ]
    };
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    try {
      const fullDraft = getCombinedDraft() as LegalDocumentDraft;
      upsertStoredDraft(fullDraft);
      router.push("/crm/legal-documents");
    } catch (err) {
      console.error("Failed to save draft:", err);
      alert("Error saving draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendForReview = () => {
    setIsSaving(true);
    try {
      const fullDraft = getCombinedDraft() as LegalDocumentDraft;
      fullDraft.status = "pending_legal_review";
      fullDraft.approvalHistory.push({
        id: `h-2-${Date.now()}`,
        action: "request_review",
        actorName: userProfile.fullName || "User",
        actorRole: userProfile.role,
        timestamp: new Date().toISOString(),
        notes: "Sent for legal review to Advocate officer desk."
      });
      upsertStoredDraft(fullDraft);
      router.push("/crm/legal-documents");
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Error submitting for review. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const stepsList = [
    { num: 1, label: "Template" },
    { num: 2, label: "Parties" },
    { num: 3, label: "Property" },
    { num: 4, label: "Commercials" },
    { num: 5, label: "Clauses & Witnesses" },
    { num: 6, label: "Preview & Save" }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#10291f]">
            {selectedTemplate ? `Drafting: ${selectedTemplate.templateName}` : "Create Legal Document Draft"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Fill in the required information steps to generate a professional, watermarked legal draft.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("/crm/legal-documents")} className="font-bold border-slate-200">
          Cancel & Back
        </Button>
      </div>

      {/* Progress Tabs */}
      <div className="flex justify-between items-center bg-white p-3 border border-slate-100 rounded-lg shadow-xs overflow-x-auto">
        {stepsList.map((s) => (
          <button
            key={s.num}
            type="button"
            disabled={s.num > 1 && !selectedTemplate}
            onClick={() => setStep(s.num)}
            className={`flex items-center space-x-2 pb-1 border-b-2 text-xs font-bold transition-all px-3 whitespace-nowrap ${
              step === s.num
                ? "border-[#8A704C] text-[#10291f]"
                : s.num > 1 && !selectedTemplate
                ? "border-transparent text-slate-300 cursor-not-allowed"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
              step === s.num
                ? "bg-[#10291f] text-white"
                : "bg-slate-100 text-slate-400"
            }`}>
              {s.num}
            </span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Steps Content switcher */}
      <div className="bg-white p-6 border border-slate-100 rounded-lg shadow-xs space-y-6">
        
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Step 1: Choose Legal Template Form</h2>
            <TemplateSelector
              selectedTemplateId={selectedTemplate?.templateId}
              onSelect={handleTemplateSelect}
            />
          </div>
        )}

        {step === 2 && selectedTemplate && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Step 2: Signatory & Party Details</h2>
            
            <PartyDetailsForm
              label="Party One (MS Legacy / Sourcing Authority)"
              party={partyOne}
              onChange={(updated) => setPartyOne((p) => ({ ...p, ...updated }))}
            />

            <PartyDetailsForm
              label="Party Two (Client / Purchasing Authority / Landowner)"
              party={partyTwo}
              onChange={(updated) => setPartyTwo((p) => ({ ...p, ...updated }))}
            />
          </div>
        )}

        {step === 3 && selectedTemplate && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Step 3: Property Schedule & Boundaries</h2>
            <PropertyDetailsForm
              property={propertyDetails}
              onChange={(updated) => setPropertyDetails((p) => ({ ...p, ...updated }))}
            />
          </div>
        )}

        {step === 4 && selectedTemplate && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Step 4: Commercial Terms & Milestone Schedule</h2>
            
            <CommercialTermsForm
              documentType={selectedTemplate.templateId}
              terms={commercialTerms}
              onChange={(updated) => setCommercialTerms((p) => ({ ...p, ...updated }))}
            />

            {/* Render Payment milestones only if it is a purchase / construction type, not GPA/Advisory */}
            {selectedTemplate.templateId !== "gpa" && selectedTemplate.templateId !== "spa" && (
              <PaymentScheduleForm
                schedule={paymentSchedule}
                totalConsideration={commercialTerms.considerationAmount || 0}
                onChange={setPaymentSchedule}
              />
            )}
          </div>
        )}

        {step === 5 && selectedTemplate && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Step 5: Jurisdiction, Witness & Special Clauses</h2>
            
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

            <WitnessDetailsForm
              witnessOne={witnessOne}
              witnessTwo={witnessTwo}
              onChangeOne={(updated) => setWitnessOne((w) => ({ ...w, ...updated }))}
              onChangeTwo={(updated) => setWitnessTwo((w) => ({ ...w, ...updated }))}
            />
          </div>
        )}

        {step === 6 && selectedTemplate && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-[#10291f] uppercase tracking-wider">Step 6: Live Document Draft Preview</h2>
            
            <LegalDocumentPreview
              draft={getCombinedDraft()}
              onSave={handleSaveDraft}
              onSendForReview={handleSendForReview}
              isSaving={isSaving}
              showActions={false}
            />
          </div>
        )}

        {/* Navigation buttons */}
        {selectedTemplate && (
          <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={step === 1}
              onClick={prevStep}
              className="font-bold border-slate-200 disabled:opacity-30"
            >
              ← Back Step
            </Button>
            
            {step < 6 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={nextStep}
                className="font-bold bg-[#10291f] hover:bg-[#081510] text-white"
              >
                Next Step →
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                  className="font-bold border-slate-200"
                >
                  Save as Draft
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSendForReview}
                  disabled={isSaving}
                  className="font-bold text-white bg-[#8b6e3a] hover:bg-[#725a3a]"
                >
                  Request Legal Review
                </Button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
