"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getRequirementBySlug, createRequirementResponse } from "@/lib/requirements/requirements";
import { PropertyRequirement } from "@/lib/types/propertyRequirements";
import { formatINR } from "@/lib/utils";

export default function RequirementDetailsClient() {
  const { slug } = useParams() as { slug: string };
  const [requirement, setRequirement] = useState<PropertyRequirement | null>(null);
  const [loading, setLoading] = useState(true);

  // Response Form State
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const [submittingResponse, setSubmittingResponse] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [responseForm, setResponseForm] = useState({
    responderType: "developer" as "developer" | "agent" | "channel_partner" | "landowner",
    responderName: "",
    responderCompany: "",
    responderPhone: "",
    responderEmail: "",
    propertyTitle: "",
    propertyLocation: "",
    propertyCategory: "apartment" as "apartment" | "plotted_development" | "villa" | "farmland" | "commercial" | "land" | "mixed_use" | "warehouse" | "rental",
    offeredPrice: "",
    propertyDetails: "",
    documentLink: "",
    mediaLink: "",
    consent: false
  });

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const data = await getRequirementBySlug(slug, false); // Fetch public sanitized version
      setRequirement(data);
      setLoading(false);
    }
    loadData();
  }, [slug]);

  const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setResponseForm(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setResponseForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleResponseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirement) return;
    
    if (!responseForm.responderName || !responseForm.responderPhone || !responseForm.responderEmail || !responseForm.propertyTitle || !responseForm.propertyLocation || !responseForm.offeredPrice || !responseForm.consent) {
      setResponseError("Please fill in all required fields and accept the contact consent.");
      return;
    }

    setSubmittingResponse(true);
    setResponseError("");

    try {
      const res = await createRequirementResponse({
        requirementId: requirement.id,
        responderType: responseForm.responderType,
        responderName: responseForm.responderName,
        responderCompany: responseForm.responderCompany || undefined,
        responderPhone: responseForm.responderPhone,
        responderEmail: responseForm.responderEmail,
        propertyTitle: responseForm.propertyTitle,
        propertyLocation: responseForm.propertyLocation,
        propertyCategory: responseForm.propertyCategory,
        offeredPrice: Number(responseForm.offeredPrice) || 0,
        propertyDetails: responseForm.propertyDetails || undefined,
        documentLinks: responseForm.documentLink ? [responseForm.documentLink] : [],
        mediaLinks: responseForm.mediaLink ? [responseForm.mediaLink] : []
      });

      if (res.success) {
        setResponseSubmitted(true);
      } else {
        setResponseError(res.error || "Failed to submit match response.");
      }
    } catch (err: any) {
      setResponseError(err.message || "An error occurred.");
    } finally {
      setSubmittingResponse(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-body items-center justify-center py-20 space-y-4">
        <div className="w-8 h-8 border-4 border-[#8b6e3a] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Loading Sourcing Details...</p>
      </div>
    );
  }

  if (!requirement) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-body items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold">Requirement Not Found</h2>
        <p className="text-slate-500 max-w-md text-xs sm:text-sm">
          The requirement you are searching for might have been archived, completed, or is undergoing internal qualification.
        </p>
        <Link href="/requirements">
          <Button className="bg-[#10291f] text-white text-xs font-bold px-6">
            Return to Exchange Board
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-body">
      
      {/* cinematic header */}
      <section className="bg-dark-luxury-gradient text-white py-16 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,110,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,110,58,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Link href="/requirements" className="text-xs text-[#8b6e3a] hover:underline flex items-center space-x-1 font-bold">
              <span>&larr; Sourcing Board</span>
            </Link>
            <span className="text-slate-500 text-xs">/</span>
            <span className="text-slate-400 text-xs">{requirement.requirementCode}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="gold" className="bg-[#8b6e3a]/90 text-white uppercase text-[9px] font-bold tracking-wider px-2 py-0.5">
              {requirement.propertyCategory.replace("_", " ")}
            </Badge>
            <Badge variant="neutral" className="text-[9px] uppercase font-bold px-2 py-0.5 bg-white/10 text-white">
              {requirement.verificationStatus.replace("_", " ")}
            </Badge>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-4xl">
            {requirement.title}
          </h1>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        
        {/* Left Columns - Sourcing Parameters */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card: core details */}
          <Card className="p-8 border border-gold-elegant bg-white shadow-sm rounded-xl space-y-6">
            <h3 className="font-display text-xl font-bold text-[#10291f] border-b pb-2">Sourcing Summary</h3>
            
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {requirement.requirementSummary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-sans text-xs">
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Preferred Locations:</span>
                  <span className="font-bold text-[#10291f]">{requirement.preferredLocations.join(", ")}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Preferred City:</span>
                  <span className="font-bold text-[#10291f]">{requirement.preferredCity}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Budget Limit:</span>
                  <span className="font-bold text-[#10291f]">
                    {formatINR(requirement.budgetMin)} - {formatINR(requirement.budgetMax)}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Buyer Profile:</span>
                  <span className="font-bold text-[#10291f] uppercase tracking-wider">{requirement.buyerProfile}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Configuration:</span>
                  <span className="font-bold text-slate-800">{requirement.bedrooms || "N/A"}</span>
                </div>
                {requirement.landSizeMax && (
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-400">Target Size:</span>
                    <span className="font-bold text-slate-800">
                      {requirement.landSizeMin || 0} - {requirement.landSizeMax} {requirement.landSizeUnit}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Timeline:</span>
                  <span className="font-bold text-slate-800">{requirement.possessionTimeline || requirement.purchaseTimeline || "Flexible"}</span>
                </div>
                {requirement.roadWidthRequirement && (
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-400">Road Width req:</span>
                    <span className="font-bold text-slate-800">{requirement.roadWidthRequirement}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Features card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 border border-gold-elegant bg-white shadow-sm rounded-lg space-y-3 text-xs">
              <h4 className="font-display text-sm font-bold text-[#10291f]">Must-Have Specifications</h4>
              {requirement.mustHaveFeatures && requirement.mustHaveFeatures.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium">
                  {requirement.mustHaveFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400 italic">No specific must-haves declared.</p>
              )}
            </Card>

            <Card className="p-6 border border-gold-elegant bg-white shadow-sm rounded-lg space-y-3 text-xs">
              <h4 className="font-display text-sm font-bold text-[#10291f]">Nice-to-Have Preferences</h4>
              {requirement.niceToHaveFeatures && requirement.niceToHaveFeatures.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium">
                  {requirement.niceToHaveFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400 italic">No specific nice-to-haves declared.</p>
              )}
            </Card>
          </div>

          {/* Diligence checklist and disclaimer */}
          <Card className="p-6 bg-slate-50 border border-slate-200 text-xs space-y-4">
            <div>
              <h4 className="font-display text-sm font-bold text-[#10291f] mb-1">MS Legacy Verification Audit Checks</h4>
              <p className="text-slate-500 leading-relaxed font-medium">
                This requirement has been audited by MS Legacy. Sourcing requests undergo verified profile verification, title due diligence trails (30-year mother deed checks if purchasing), and site development reviews before client shortlist presentation.
              </p>
            </div>
            
            <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 uppercase font-bold leading-normal">
              <strong>ADVISORY DISCLAIMER:</strong> Public requirements are shown in sanitized form. Identity and contact details are not disclosed without client consent and MS Legacy review. Submission of matching properties does not guarantee transaction outcome or developer acceptance.
            </div>
          </Card>
        </div>

        {/* Right Column - Submission form */}
        <div className="space-y-6">
          <Card className="p-6 border border-gold-elegant bg-white shadow-md rounded-xl space-y-6">
            
            {responseSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-display text-lg font-bold text-[#10291f]">Proposal Submitted</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Your matching property option has been successfully submitted to MS Legacy Sourcing Desk.
                </p>
                <div className="pt-2">
                  <Button 
                    onClick={() => setResponseSubmitted(false)}
                    variant="outline"
                    className="w-full text-xs font-bold border-slate-200"
                  >
                    Submit Another Option
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResponseSubmit} className="space-y-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-[#10291f]">Share Matching Property</h4>
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">INTAKE DESK FOR PARTNERS</p>
                </div>

                {responseError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-[10px] font-bold text-rose-800 rounded">
                    {responseError}
                  </div>
                )}

                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">I am a *</label>
                    <select
                      name="responderType"
                      value={responseForm.responderType}
                      onChange={handleResponseChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                    >
                      <option value="developer">Developer Representative</option>
                      <option value="landowner">Landowner / JV Partner</option>
                      <option value="agent">Real Estate Agent / Broker</option>
                      <option value="channel_partner">Channel Partner</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="responderName"
                        value={responseForm.responderName}
                        onChange={handleResponseChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Company (Optional)</label>
                      <input
                        type="text"
                        name="responderCompany"
                        value={responseForm.responderCompany}
                        onChange={handleResponseChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="responderPhone"
                        value={responseForm.responderPhone}
                        onChange={handleResponseChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Email *</label>
                      <input
                        type="email"
                        name="responderEmail"
                        value={responseForm.responderEmail}
                        onChange={handleResponseChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-3 mt-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b6e3a] block mb-2">Offered Property Details</label>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Project / Property Name *</label>
                        <input
                          type="text"
                          name="propertyTitle"
                          placeholder="e.g. Prestige Willow Heights 3BHK"
                          value={responseForm.propertyTitle}
                          onChange={handleResponseChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Offered Category *</label>
                          <select
                            name="propertyCategory"
                            value={responseForm.propertyCategory}
                            onChange={handleResponseChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                          >
                            <option value="apartment">Apartment</option>
                            <option value="plotted_development">Plotted / Layout</option>
                            <option value="villa">Villa</option>
                            <option value="land">Raw Land</option>
                            <option value="farmland">Farmland</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Offered Price (INR) *</label>
                          <input
                            type="number"
                            name="offeredPrice"
                            placeholder="e.g. 21000000"
                            value={responseForm.offeredPrice}
                            onChange={handleResponseChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Exact Location *</label>
                        <input
                          type="text"
                          name="propertyLocation"
                          placeholder="Hebbal, Outer Ring Road, Bengaluru"
                          value={responseForm.propertyLocation}
                          onChange={handleResponseChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Offered Specifications</label>
                        <textarea
                          name="propertyDetails"
                          rows={3}
                          placeholder="Provide size, RERA status, water connections, layout specifications, etc."
                          value={responseForm.propertyDetails}
                          onChange={handleResponseChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Document Link / PDF (Google Drive/Dropbox)</label>
                        <input
                          type="url"
                          name="documentLink"
                          placeholder="https://drive.google.com/..."
                          value={responseForm.documentLink}
                          onChange={handleResponseChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-[#8b6e3a] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start space-x-2 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={responseForm.consent}
                      onChange={handleResponseChange}
                      className="mt-0.5 accent-[#8b6e3a]"
                      required
                    />
                    <span className="text-[10px] text-slate-500 leading-normal">
                      I agree to allow MS Legacy team to contact me regarding this proposal, and confirm this property has clear titles/RERA. *
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={submittingResponse}
                  className="w-full bg-[#10291f] hover:bg-[#10291f]/90 text-white font-bold py-2 shadow"
                >
                  {submittingResponse ? "Submitting Proposal..." : "Submit Matching Property"}
                </Button>
              </form>
            )}
          </Card>

          <Card className="p-6 border border-slate-200 bg-white rounded-xl space-y-4">
            <h4 className="font-display text-sm font-bold text-[#10291f]">Need Sourcing Support?</h4>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              If you have a similar requirement, you can post it directly or get our dedicated legal auditing/PMC support.
            </p>
            <div className="space-y-2">
              <Link href="/requirements/post" className="block">
                <Button variant="outline" className="w-full text-xs font-bold border-gold-elegant text-[#10291f] py-2">
                  Post Similar Requirement
                </Button>
              </Link>
              <Link href="/contact" className="block">
                <Button className="w-full text-xs font-bold bg-[#8b6e3a] hover:bg-[#8b6e3a]/90 text-white py-2">
                  Request Advisory Call
                </Button>
              </Link>
            </div>
          </Card>
        </div>

      </main>

    </div>
  );
}
