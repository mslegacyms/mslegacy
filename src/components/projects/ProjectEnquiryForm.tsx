"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "@/components/ui/Icons";
import { submitProjectEnquiry } from "@/app/actions/projectEnquiries";
import { mockDevelopers } from "@/lib/data/mockDevelopers";
import { DeveloperLogo } from "../developers/DeveloperLogo";

interface ProjectEnquiryFormProps {
  projectId?: string;
  projectName?: string;
  developerId?: string;
}

export const ProjectEnquiryForm = ({ projectId, projectName, developerId }: ProjectEnquiryFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cityCountry: "",
    buyerType: "end_user",
    budgetRange: "50l_to_1cr",
    interestType: projectName ? "project_due_diligence" : "general_advisory",
    needSiteVisit: false,
    needDueDiligence: false,
    needLoanGuidance: false,
    needNriSupport: false,
    message: projectName ? `Requesting verification parameters and due diligence clearance briefs for ${projectName}.` : ""
  });

  const interestTypes = [
    { value: "apartment_enquiry", label: "Apartment Enquiry" },
    { value: "plot_enquiry", label: "Plot Enquiry" },
    { value: "villa_enquiry", label: "Villa Enquiry" },
    { value: "farmland_enquiry", label: "Farmland Enquiry" },
    { value: "project_comparison", label: "Project Comparison" },
    { value: "project_due_diligence", label: "Project Title Due Diligence" },
    { value: "nri_advisory", label: "NRI Advisory" },
    { value: "site_visit_support", label: "Site Visit Support" },
    { value: "construction_support", label: "Construction Support" },
    { value: "property_management", label: "Property Management Support" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await submitProjectEnquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        interestType: formData.interestType,
        message: `${formData.message} | Buyer Type: ${formData.buyerType} | Budget: ${formData.budgetRange} | Location: ${formData.cityCountry} | Site Visit: ${formData.needSiteVisit} | Due Diligence: ${formData.needDueDiligence} | Loan: ${formData.needLoanGuidance} | NRI: ${formData.needNriSupport}`,
        projectId,
        developerId
      });
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Submission failed. Please check inputs and try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during lead capture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-slate-50 border border-gold-elegant max-w-lg w-full font-sans">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header with optional Developer Logo */}
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
            <div className="space-y-1">
              <Badge variant="gold" className="bg-[#8b6e3a]/20 text-[#8b6e3a] border border-[#8b6e3a]/30">Advisory Desk</Badge>
              <h3 className="font-serif text-2xl font-bold text-[#10291f]">
                {projectName ? `Inquire: ${projectName}` : "Request Sourcing Advisory"}
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Submit your inquiry to request title search audits or RERA documentation updates.
              </p>
            </div>
            {(() => {
              const developer = mockDevelopers.find((d) => d.id === developerId);
              return developer ? (
                <DeveloperLogo developer={developer} size="md" className="ml-4 shrink-0" />
              ) : null;
            })()}
          </div>

          {error && (
            <div className="bg-rose-500/10 text-rose-700 text-xs p-3 rounded font-semibold border border-rose-500/20">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                placeholder="E.g. Rajesh Kumar"
              />
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                  placeholder="E.g. +91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                  placeholder="E.g. client@example.com"
                />
              </div>
            </div>

            {/* City/Country & Buyer Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">City / Country</label>
                <input
                  type="text"
                  required
                  value={formData.cityCountry}
                  onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                  className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                  placeholder="E.g. Bangalore, India or Dubai, UAE"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Buyer Profile</label>
                <select
                  value={formData.buyerType}
                  onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                >
                  <option value="end_user">End User</option>
                  <option value="nri">NRI Client</option>
                  <option value="hni">HNI Family Office</option>
                  <option value="investor">Strategic Investor</option>
                  <option value="channel_partner">Channel Partner</option>
                </select>
              </div>
            </div>

            {/* Budget & Interest Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Budget Range</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                >
                  <option value="under_50l">Under ₹50 Lakhs</option>
                  <option value="50l_to_1cr">₹50 Lakhs - ₹1 Crore</option>
                  <option value="1cr_to_3cr">₹1 Crore - ₹3 Crores</option>
                  <option value="3cr_to_5cr">₹3 Crores - ₹5 Crores</option>
                  <option value="above_5cr">Above ₹5 Crores</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Advisory Interest</label>
                <select
                  value={formData.interestType}
                  onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                >
                  {interestTypes.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Checklist Checkboxes */}
            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-600">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Support vectors required</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.needSiteVisit} 
                    onChange={(e) => setFormData({ ...formData, needSiteVisit: e.target.checked })} 
                    className="rounded accent-[#8b6e3a]" 
                  />
                  <span>Need Site Visit?</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.needDueDiligence} 
                    onChange={(e) => setFormData({ ...formData, needDueDiligence: e.target.checked })} 
                    className="rounded accent-[#8b6e3a]" 
                  />
                  <span>Need Legal Due Diligence?</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.needLoanGuidance} 
                    onChange={(e) => setFormData({ ...formData, needLoanGuidance: e.target.checked })} 
                    className="rounded accent-[#8b6e3a]" 
                  />
                  <span>Need Loan Guidance?</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.needNriSupport} 
                    onChange={(e) => setFormData({ ...formData, needNriSupport: e.target.checked })} 
                    className="rounded accent-[#8b6e3a]" 
                  />
                  <span>Need NRI Support?</span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Message Details</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                placeholder="Please describe specific title search queries or municipal approvals you wish to verify..."
              />
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading} className="bg-gold-gradient text-[#10291f] border-none font-bold">
            {loading ? "Submitting Inquiry..." : "Submit Inquiry Request"}
          </Button>

          <p className="text-[10px] text-slate-400 leading-relaxed text-center font-medium">
            <strong>NDA Protocol:</strong> Your inquiry will be forwarded to the MS Legacy verification desk. No client data is sold or shared with third-party developers. Read our full <Link href="/project-disclaimer" className="text-[#8b6e3a] underline font-bold">Marketplace Disclaimer</Link>.
          </p>
        </form>
      ) : (
        <div className="text-center py-12 space-y-6">
          <div className="p-4 bg-[#8b6e3a]/15 text-[#8b6e3a] rounded-full w-fit mx-auto border border-gold-elegant">
            <ShieldCheck size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#10291f]">Enquiry Successfully Registered</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
              MS Legacy advisory team will review your request. An advisor will check RERA entries and contact you within 24 business hours to arrange legal title briefs.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="border-gold-elegant text-xs font-bold">
            Submit Another Inquiry
          </Button>
        </div>
      )}
    </Card>
  );
};
