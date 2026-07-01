"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitPartnerReferral } from "./actions";

export default function PartnerReferralForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    interestType: "land_sourcing",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await submitPartnerReferral(formData);
      if (result.success) {
        setSuccess(true);
        setFormData({ clientName: "", clientPhone: "", clientEmail: "", interestType: "land_sourcing", notes: "" });
      } else {
        setError(result.error || "Failed to submit referral.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs p-4 rounded text-center space-y-3">
        <p className="font-bold">Referral Logged Successfully</p>
        <p>The client lead details have been submitted for review. Our desk will contact the client.</p>
        <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>
          Refer Another Client
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-700 text-xs p-2.5 rounded font-semibold">
          {error}
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Client Full Name *</label>
        <input
          type="text"
          required
          value={formData.clientName}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-[#10291f]"
          placeholder="E.g. Aravind Subramanian"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Phone Number</label>
          <input
            type="tel"
            value={formData.clientPhone}
            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-[#10291f]"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
          <input
            type="email"
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-[#10291f]"
            placeholder="client@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Area of Interest</label>
        <select
          value={formData.interestType}
          onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
          className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-[#10291f]"
        >
          <option value="land_sourcing">Land Sourcing Division</option>
          <option value="construction">Turnkey Construction & PMC</option>
          <option value="property_management">Property Care & Renting</option>
          <option value="legal_due_diligence">Legal due diligence checks</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Referral Remarks / Requirements</label>
        <textarea
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded p-2.5 text-[#10291f]"
          placeholder="List budget allocation indicators, timing preferences, or local property selections..."
        />
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? "Registering Client Referral..." : "Submit Referral"}
      </Button>
    </form>
  );
}
