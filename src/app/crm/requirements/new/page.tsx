"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createCompanyRequirement } from "@/lib/requirements/requirements";
import { PropertyRequirement } from "@/lib/types/propertyRequirements";

export default function CrmNewRequirementPage() {
  const router = useRouter();
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    sourceType: "company_posted" as PropertyRequirement["sourceType"],
    requirementType: "buy" as PropertyRequirement["requirementType"],
    propertyCategory: "apartment" as PropertyRequirement["propertyCategory"],
    buyerProfile: "end_user" as PropertyRequirement["buyerProfile"],
    preferredCity: "Bengaluru",
    preferredLocations: "",
    microMarket: "",
    budgetMin: "",
    budgetMax: "",
    budgetCurrency: "INR",
    landSizeMin: "",
    landSizeMax: "",
    landSizeUnit: "Sq.Ft",
    builtupAreaMin: "",
    builtupAreaMax: "",
    bedrooms: "3 BHK",
    possessionTimeline: "Ready to Move",
    purchaseTimeline: "Within 3 Months",
    roadWidthRequirement: "",
    approvalRequirement: "",
    reraRequired: true,
    loanRequired: false,
    legalDueDiligenceRequired: true,
    siteVisitRequired: true,
    nriSupportRequired: false,
    requirementSummary: "",
    mustHaveFeatures: "",
    niceToHaveFeatures: "",
    restrictions: "",
    publicVisibility: "public_sanitized" as PropertyRequirement["publicVisibility"],
    verificationStatus: "qualified" as PropertyRequirement["verificationStatus"],
    priority: "medium" as PropertyRequirement["priority"],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    contactCity: "",
    consentToContact: true,
    consentToShareSanitized: true,
    internalNotes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.contactName || !formData.contactPhone || !formData.contactEmail || !formData.requirementSummary) {
      setErrorMsg("Please fill in all required fields (marked with *).");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const parsedLocations = formData.preferredLocations
      .split(",")
      .map(loc => loc.trim())
      .filter(loc => loc.length > 0);

    const mustHave = formData.mustHaveFeatures
      .split(",")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const niceToHave = formData.niceToHaveFeatures
      .split(",")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    try {
      const res = await createCompanyRequirement({
        title: formData.title,
        sourceType: formData.sourceType,
        requirementType: formData.requirementType,
        propertyCategory: formData.propertyCategory,
        buyerProfile: formData.buyerProfile,
        preferredCity: formData.preferredCity,
        preferredLocations: parsedLocations,
        microMarket: formData.microMarket || undefined,
        budgetMin: Number(formData.budgetMin) || 0,
        budgetMax: Number(formData.budgetMax) || 0,
        budgetCurrency: formData.budgetCurrency,
        landSizeMin: formData.landSizeMin ? Number(formData.landSizeMin) : undefined,
        landSizeMax: formData.landSizeMax ? Number(formData.landSizeMax) : undefined,
        landSizeUnit: formData.landSizeUnit || undefined,
        builtupAreaMin: formData.builtupAreaMin ? Number(formData.builtupAreaMin) : undefined,
        builtupAreaMax: formData.builtupAreaMax ? Number(formData.builtupAreaMax) : undefined,
        bedrooms: formData.bedrooms || undefined,
        possessionTimeline: formData.possessionTimeline || undefined,
        purchaseTimeline: formData.purchaseTimeline || undefined,
        roadWidthRequirement: formData.roadWidthRequirement || undefined,
        approvalRequirement: formData.approvalRequirement || undefined,
        reraRequired: formData.reraRequired,
        loanRequired: formData.loanRequired,
        legalDueDiligenceRequired: formData.legalDueDiligenceRequired,
        siteVisitRequired: formData.siteVisitRequired,
        nriSupportRequired: formData.nriSupportRequired,
        requirementSummary: formData.requirementSummary,
        mustHaveFeatures: mustHave,
        niceToHaveFeatures: niceToHave,
        restrictions: formData.restrictions || undefined,
        publicVisibility: formData.publicVisibility,
        verificationStatus: formData.verificationStatus,
        priority: formData.priority,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        contactCity: formData.contactCity || undefined,
        consentToContact: formData.consentToContact,
        consentToShareSanitized: formData.consentToShareSanitized,
        internalNotes: formData.internalNotes || undefined,
        assignedTo: "mock-user-id",
        createdBy: "mock-user-id"
      });

      if (res.success) {
        router.push("/crm/requirements");
      } else {
        setErrorMsg(res.error || "Failed to onboard requirement.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Header */}
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold mb-2">
            <Link href="/crm/requirements" className="hover:underline text-[#8b6e3a]">Requirements Exchange</Link>
            <span>/</span>
            <span>New File</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Onboard New Property Requirement</h1>
        </div>
        <Link href="/crm/requirements">
          <Button variant="outline" size="sm" className="border-slate-200 text-xs font-semibold">
            Cancel
          </Button>
        </Link>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 rounded">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded shadow-xs p-6 space-y-6">
        
        {/* Section 1: Lead details & Source */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-1.5">1. Sourcing Details & Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Requirement Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Sourcing 2-3 Acres JV land near Devanahalli"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Sourced Desk *</label>
              <select
                name="sourceType"
                value={formData.sourceType}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="company_posted">Company Manual Sourced</option>
                <option value="client_submitted">Client Submitted Online</option>
                <option value="nri_requirement">NRI Sourcing Desk</option>
                <option value="investor_requirement">Investor Desk</option>
                <option value="developer_requirement">Developer Mandate</option>
                <option value="agent_requirement">Agent Partner Mandate</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Stage stage *</label>
              <select
                name="verificationStatus"
                value={formData.verificationStatus}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="new">New Submission</option>
                <option value="under_review">Under Review</option>
                <option value="qualified">Qualified</option>
                <option value="approved_public">Public Active</option>
                <option value="matched">Matched</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Public Sourcing Board Visibility *</label>
              <select
                name="publicVisibility"
                value={formData.publicVisibility}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="public_sanitized">Public Sanitized (Sourcing Board)</option>
                <option value="private">Private (CRM Team only)</option>
                <option value="internal_only">Internal (Advisory Sourcing)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Urgency Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Transaction Intent *</label>
              <select
                name="requirementType"
                value={formData.requirementType}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="buy">Outright Purchase</option>
                <option value="rent">Rent / Lease Outtake</option>
                <option value="land_acquisition">Land Sourcing / Purchase</option>
                <option value="jv_development">Joint Development (JV)</option>
                <option value="construction">PMC / Construction Sourcing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Property Preference */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-1.5">2. Property Requirements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Property Category *</label>
              <select
                name="propertyCategory"
                value={formData.propertyCategory}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="apartment">Apartment</option>
                <option value="plotted_development">Plotted / Township</option>
                <option value="villa">Villa</option>
                <option value="farmland">Farmland</option>
                <option value="land">Raw Land</option>
                <option value="commercial">Commercial Space</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Target City *</label>
              <input
                type="text"
                name="preferredCity"
                value={formData.preferredCity}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Target Localities * (comma separated)</label>
              <input
                type="text"
                name="preferredLocations"
                placeholder="Hebbal, Yelahanka, Thanisandra"
                value={formData.preferredLocations}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Budget Minimum (INR) *</label>
              <input
                type="number"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Budget Maximum (INR) *</label>
              <input
                type="number"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Config / Bedrooms</label>
              <input
                type="text"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Road Width (ft)</label>
              <input
                type="text"
                name="roadWidthRequirement"
                placeholder="e.g. 40ft min"
                value={formData.roadWidthRequirement}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Size Min</label>
              <input
                type="number"
                name="landSizeMin"
                value={formData.landSizeMin}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Size Max</label>
              <input
                type="number"
                name="landSizeMax"
                value={formData.landSizeMax}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Size Unit</label>
              <select
                name="landSizeUnit"
                value={formData.landSizeUnit}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="Sq.Ft">Sq.Ft</option>
                <option value="Acres">Acres</option>
                <option value="Guntas">Guntas</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Possession Timeline</label>
              <input
                type="text"
                name="possessionTimeline"
                value={formData.possessionTimeline}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Client Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-1.5">3. Client Contact File (Private)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Client Name *</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Phone *</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">City/Country</label>
              <input
                type="text"
                name="contactCity"
                value={formData.contactCity}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Buyer Profile Type *</label>
              <select
                name="buyerProfile"
                value={formData.buyerProfile}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
              >
                <option value="end_user">End User</option>
                <option value="nri">NRI Client</option>
                <option value="hni">HNI Elite</option>
                <option value="investor">Institutional Investor</option>
                <option value="developer">Developer</option>
              </select>
            </div>

            <div className="flex items-center space-x-6 pt-4 text-xs text-slate-600">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="consentToContact" checked={formData.consentToContact} onChange={handleChange} className="accent-[#8b6e3a]" />
                <span>Client Contact Consent</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="consentToShareSanitized" checked={formData.consentToShareSanitized} onChange={handleChange} className="accent-[#8b6e3a]" />
                <span>Sanitized Board Consent</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Narrative */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-1.5">4. Narrative & Internal Remarks</h3>
          
          <div className="text-xs space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Requirement Summary * (Sanitized text shown publicly)</label>
              <textarea
                name="requirementSummary"
                rows={4}
                value={formData.requirementSummary}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Must Have Features (comma separated)</label>
                <input
                  type="text"
                  name="mustHaveFeatures"
                  value={formData.mustHaveFeatures}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Nice to Have Features (comma separated)</label>
                <input
                  type="text"
                  name="niceToHaveFeatures"
                  value={formData.niceToHaveFeatures}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Internal Notes (Staff Only)</label>
              <textarea
                name="internalNotes"
                rows={3}
                placeholder="Funding availability status, audit schedule, specific lawyer preferences..."
                value={formData.internalNotes}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-4 border-t flex justify-end space-x-4">
          <Link href="/crm/requirements">
            <Button type="button" variant="outline" className="border-slate-200 text-xs font-semibold px-4">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#10291f] hover:bg-[#10291f]/90 text-white text-xs font-bold px-6 py-2 shadow"
          >
            {submitting ? "Onboarding Sourcing File..." : "Onboard Sourcing File"}
          </Button>
        </div>

      </form>
    </div>
  );
}
