"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createPublicRequirementSubmission } from "@/lib/requirements/requirements";
import { PropertyRequirement } from "@/lib/types/propertyRequirements";

export default function PostRequirementClient() {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Fields State
  const [formData, setFormData] = useState({
    title: "",
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
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    contactCity: "",
    consentToContact: false,
    consentToShareSanitized: false
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
      const res = await createPublicRequirementSubmission({
        title: formData.title,
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
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        contactCity: formData.contactCity || undefined,
        consentToContact: formData.consentToContact,
        consentToShareSanitized: formData.consentToShareSanitized
      });

      if (res.success) {
        setReference(res.reference || "");
        setSubmitted(true);
      } else {
        setErrorMsg(res.error || "Failed to submit requirement.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit requirement.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-body items-center justify-center p-6 text-center">
        <Card className="max-w-xl w-full p-10 border border-gold-elegant bg-white shadow-xl space-y-6 rounded-2xl">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-bold text-[#10291f]">Requirement Enquiry Received</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Your request has been saved in the private enquiry queue. It has not been published. Reference: {reference}
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 text-slate-500 rounded text-xs leading-relaxed max-w-md mx-auto">
            <span className="font-bold text-slate-700 block mb-1">Next step</span>
            The team can use your preferred contact details to discuss your requirements.
          </div>
          <div className="flex gap-4 justify-center pt-2">
            <Link href="/requirements">
              <Button className="bg-[#10291f] text-white text-xs font-bold px-6">
                Go to Requirements Board
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-slate-200 text-xs font-bold px-6">
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-body">
      
      {/* Cinematic Hero */}
      <section className="bg-dark-luxury-gradient text-white py-12 relative overflow-hidden border-b border-white/5 bg-luxury-grid">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,110,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,110,58,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-3">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Client Sourcing Portal</Badge>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Post Your Property Requirement
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            Detail your investment parameters below. Our CRM Sourcing team qualifies and matches requirements to developers and layout options.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-12 flex-grow w-full">
        <form onSubmit={handleSubmit} className="bg-white border border-gold-elegant rounded-xl p-8 shadow-md space-y-8">
          
          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 rounded">
              {errorMsg}
            </div>
          )}

          {/* Section A: Requirement Type */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-2">A. Requirement Sourcing Intent</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Requirement Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Seeking 3BHK high-rise apartment near Hebbal"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Sourcing Type *</label>
                <select
                  name="requirementType"
                  value={formData.requirementType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                >
                  <option value="buy">Outright Buy</option>
                  <option value="rent">Rent / Lease Outtake</option>
                  <option value="land_acquisition">Land Acquisition</option>
                  <option value="jv_development">Joint Development (JV)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section B: Property Preference */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-2">B. Property & Location Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Property Category *</label>
                <select
                  name="propertyCategory"
                  value={formData.propertyCategory}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                >
                  <option value="apartment">Apartment</option>
                  <option value="plotted_development">Plotted Development</option>
                  <option value="villa">Villa</option>
                  <option value="farmland">Farmland</option>
                  <option value="land">Raw Land Parcel</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Preferred City *</label>
                <input
                  type="text"
                  name="preferredCity"
                  value={formData.preferredCity}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Localities * (comma-separated)</label>
                <input
                  type="text"
                  name="preferredLocations"
                  placeholder="Hebbal, Sahakar Nagar, Yelahanka"
                  value={formData.preferredLocations}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Budget Minimum (INR) *</label>
                <input
                  type="number"
                  name="budgetMin"
                  placeholder="e.g. 15000000"
                  value={formData.budgetMin}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Budget Maximum (INR) *</label>
                <input
                  type="number"
                  name="budgetMax"
                  placeholder="e.g. 25000000"
                  value={formData.budgetMax}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Bedrooms / Configuration (if apt/villa)</label>
                <input
                  type="text"
                  name="bedrooms"
                  placeholder="3 BHK / 4 BHK"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Land Size Min (Plots/Land)</label>
                <input
                  type="number"
                  name="landSizeMin"
                  placeholder="e.g. 1200"
                  value={formData.landSizeMin}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Land Size Max (Plots/Land)</label>
                <input
                  type="number"
                  name="landSizeMax"
                  placeholder="e.g. 2400"
                  value={formData.landSizeMax}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Size Unit</label>
                <select
                  name="landSizeUnit"
                  value={formData.landSizeUnit}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                >
                  <option value="Sq.Ft">Sq.Ft</option>
                  <option value="Acres">Acres</option>
                  <option value="Guntas">Guntas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Possession Timeline</label>
                <input
                  type="text"
                  name="possessionTimeline"
                  placeholder="Ready to Move / Within 6 months"
                  value={formData.possessionTimeline}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Road Width Requirement (ft)</label>
                <input
                  type="text"
                  name="roadWidthRequirement"
                  placeholder="e.g. 40 Ft minimum road connectivity"
                  value={formData.roadWidthRequirement}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section C: Buyer Profile & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-2">C. Sourcing Profile & Advisory Support Checks</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Buyer Profile Type *</label>
                <select
                  name="buyerProfile"
                  value={formData.buyerProfile}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                >
                  <option value="end_user">End User (Home/Plot seeker)</option>
                  <option value="nri">NRI Sourced</option>
                  <option value="hni">HNI Elite Investor</option>
                  <option value="investor">Bulk Investor Consortium</option>
                  <option value="developer">Developer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Advisory Checks Needed</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center space-x-2 text-slate-600">
                    <input type="checkbox" name="legalDueDiligenceRequired" checked={formData.legalDueDiligenceRequired} onChange={handleChange} className="accent-[#8b6e3a]" />
                    <span>Legal Due Diligence</span>
                  </label>
                  <label className="flex items-center space-x-2 text-slate-600">
                    <input type="checkbox" name="siteVisitRequired" checked={formData.siteVisitRequired} onChange={handleChange} className="accent-[#8b6e3a]" />
                    <span>Site Visit Support</span>
                  </label>
                  <label className="flex items-center space-x-2 text-slate-600">
                    <input type="checkbox" name="loanRequired" checked={formData.loanRequired} onChange={handleChange} className="accent-[#8b6e3a]" />
                    <span>Bank Loan Assistance</span>
                  </label>
                  <label className="flex items-center space-x-2 text-slate-600">
                    <input type="checkbox" name="nriSupportRequired" checked={formData.nriSupportRequired} onChange={handleChange} className="accent-[#8b6e3a]" />
                    <span>NRI Compliance/FEMA</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section D: Contact details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-2">D. Client Confidential Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="contactName"
                  placeholder="e.g. Praveen Kumar"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="contactEmail"
                  placeholder="e.g. client@example.com"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section E: Message details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b6e3a] border-b pb-2">E. Sourcing Narrative & Details</h3>
            
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Requirement Summary * (Confidential details will be stripped before publishing)</label>
              <textarea
                name="requirementSummary"
                rows={4}
                placeholder="Describe your requirement in detail. What are the key elements? (e.g. looking for gated 3BHK flat, builder must have A- Katha title, require high floor, garden facing, budget limits, etc.)"
                value={formData.requirementSummary}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Must-Have Features (comma-separated)</label>
                <input
                  type="text"
                  name="mustHaveFeatures"
                  placeholder="High floor, Gated Community, 2 Car parks"
                  value={formData.mustHaveFeatures}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nice-to-Have Features (comma-separated)</label>
                <input
                  type="text"
                  name="niceToHaveFeatures"
                  placeholder="EV Charging point, Club membership, Swimming pool"
                  value={formData.niceToHaveFeatures}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section F: Privacy & Consent */}
          <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">F. Privacy Sourcing Consent</h4>
            
            <div className="space-y-3 text-xs text-slate-600">
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="consentToShareSanitized"
                  checked={formData.consentToShareSanitized}
                  onChange={handleChange}
                  className="mt-0.5 accent-[#8b6e3a]"
                />
                <span>
                  <strong>Sanitized Listing Consent:</strong> I authorize MS Legacy to publish a sanitized version of my requirement (removing my name, contact number, email, and exact home address) on the public requirement board so that developers, land owners, or agents can submit match offers.
                </span>
              </label>

              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="consentToContact"
                  checked={formData.consentToContact}
                  onChange={handleChange}
                  className="mt-0.5 accent-[#8b6e3a]"
                  required
                />
                <span>
                  <strong>Advisory Sourcing Agreement *:</strong> I agree to allow MS Legacy team to contact me via call, WhatsApp, or email to verify this profile before forwarding matches.
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t flex justify-end space-x-4">
            <Link href="/requirements">
              <Button type="button" variant="outline" className="border-slate-200 font-bold px-6">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#10291f] hover:bg-[#10291f]/90 text-white font-bold px-8 shadow"
            >
              {submitting ? "Submitting Sourcing Ticket..." : "Submit Property Requirement"}
            </Button>
          </div>

        </form>
      </main>

    </div>
  );
}
