"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { validateLead } from "@/lib/validation/leads";
import { createLead } from "@/lib/crm/leads";

export default function NewLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cityCountry: "",
    interestType: "land_sourcing",
    buyerType: "private_buyer",
    budgetRange: "₹50 Lakhs - ₹1 Crore",
    preferredService: "",
    message: "",
    priority: "normal" as any,
    status: "new" as any,
    leadSource: "crm_manual",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate inputs
    const valResult = validateLead({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      interestType: formData.interestType,
      buyerType: formData.buyerType,
      budgetRange: formData.budgetRange
    });

    if (!valResult.isValid) {
      setError(Object.values(valResult.errors)[0] || "Validation error.");
      setLoading(false);
      return;
    }

    try {
      const result = await createLead(formData);
      if (result.success) {
        router.push("/crm/leads");
      } else {
        setError(result.error || "Submission failed. Please check parameters.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Onboard Client Lead</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Add an incoming inquiry manually to the pipeline directory.
        </p>
      </div>

      <Card className="p-8 bg-white border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-rose-500/10 text-rose-700 text-xs p-3 rounded font-semibold border border-rose-500/20">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Client Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]"
                placeholder="E.g. Aravind Subramanian"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                placeholder="E.g. +91 98765 43210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                placeholder="client@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Residence City / Country</label>
              <input
                type="text"
                value={formData.cityCountry}
                onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                placeholder="E.g. London, UK"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Primary Interest</label>
              <select
                value={formData.interestType}
                onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="land_sourcing">Land Sourcing</option>
                <option value="construction">Construction</option>
                <option value="property_management">Property Care</option>
                <option value="legal_due_diligence">Legal Diligence</option>
                <option value="project_participation">Project Share</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Buyer Profile</label>
              <select
                value={formData.buyerType}
                onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="private_buyer">Private Buyer</option>
                <option value="hni_investor">HNI / HNW Investor</option>
                <option value="developer">Developer Partner</option>
                <option value="broker">Channel Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Budget Range</label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="₹25 Lakhs - ₹50 Lakhs">₹25L - ₹50L</option>
                <option value="₹50 Lakhs - ₹1 Crore">₹50L - ₹1C</option>
                <option value="₹1 Crore - ₹3 Crores">₹1C - ₹3C</option>
                <option value="₹3 Crores - ₹5 Crores">₹3C - ₹5C</option>
                <option value="₹5 Crores+">₹5C+</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Status Stage</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="documentation_review">Doc Review</option>
                <option value="site_visit_planned">Site Visit</option>
                <option value="proposal_sent">Proposal Sent</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Source Channel</label>
              <select
                value={formData.leadSource}
                onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="crm_manual">Manual Entry</option>
                <option value="website">Website Form</option>
                <option value="partner_referral">Broker Referral</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Message / Customer Requirements Description</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
              placeholder="Provide specific notes regarding plot requirements, zoning requests, or POA details..."
            />
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Button variant="outline" type="button" onClick={() => router.push("/crm/leads")}>
              Cancel Onboarding
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Adding lead record..." : "Onboard Lead"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

