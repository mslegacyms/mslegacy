"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { validateOpportunity } from "@/lib/validation/opportunities";
import { createOpportunity } from "@/lib/crm/opportunities";

export default function NewOpportunityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    landArea: "",
    priceRange: "₹50 Lakhs - ₹1 Crore",
    developmentModel: "Outright Purchase",
    legalStatus: "clear_title",
    reraStatus: "approved",
    visibility: "private",
    wealthScore: "8.0",
    status: "draft",
    roadAccess: "",
    utilities: "",
    mapCoordinates: "",
    riskNotes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const valResult = validateOpportunity({
      title: formData.title,
      location: formData.location,
      landArea: formData.landArea,
      priceRange: formData.priceRange,
      reraStatus: formData.reraStatus,
      wealthScore: formData.wealthScore,
    });

    if (!valResult.isValid) {
      setError(Object.values(valResult.errors)[0] || "Validation failed.");
      setLoading(false);
      return;
    }

    try {
      const result = await createOpportunity(formData);
      if (result.success) {
        router.push("/crm/opportunities");
      } else {
        setError(result.error || "Submission failed. Please check inputs.");
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
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Register Property Asset</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Add a sourced land parcel or residential layout to the private opportunities inventory.
        </p>
      </div>

      <Card className="p-8 bg-white border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-rose-500/10 text-rose-700 text-xs p-3 rounded font-semibold border border-rose-500/20">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Property Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]"
              placeholder="E.g. Devanahalli Gate Gated Layout plots"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Location / Corridor *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                placeholder="E.g. Devanahalli, North Bangalore"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Land Dimensions (Area) *</label>
              <input
                type="text"
                required
                value={formData.landArea}
                onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
                placeholder="E.g. 30x40 Ft or 1.5 Acres"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Development Model</label>
              <select
                value={formData.developmentModel}
                onChange={(e) => setFormData({ ...formData, developmentModel: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="Outright Purchase">Outright Purchase</option>
                <option value="Joint Development">Joint Development</option>
                <option value="Gated Layout Development">Gated Layout</option>
                <option value="Managed Farm Life">Managed Farmland</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Legal Status</label>
              <select
                value={formData.legalStatus}
                onChange={(e) => setFormData({ ...formData, legalStatus: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="clear_title">Clear Title (Cleared)</option>
                <option value="under_review">Title Under Review</option>
                <option value="litigation_dispute">Active Litigation / Blocked</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">RERA Status</label>
              <select
                value={formData.reraStatus}
                onChange={(e) => setFormData({ ...formData, reraStatus: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="approved">RERA Approved</option>
                <option value="pending">RERA Registration Pending</option>
                <option value="exempt">RERA Exempted</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Property Wealth Score (0-10)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.wealthScore}
                onChange={(e) => setFormData({ ...formData, wealthScore: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Target Visibility</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
              >
                <option value="private">Private (Restricted to advisors)</option>
                <option value="public">Public (Sitemap listings)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Price Range Indicator</label>
              <select
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
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
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Road Access Details</label>
              <input
                type="text"
                value={formData.roadAccess}
                onChange={(e) => setFormData({ ...formData, roadAccess: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
                placeholder="E.g. 40 Ft Approach tar road"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Utility Connections</label>
              <input
                type="text"
                value={formData.utilities}
                onChange={(e) => setFormData({ ...formData, utilities: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
                placeholder="E.g. Power Grid & Water active"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Map Coordinates</label>
              <input
                type="text"
                value={formData.mapCoordinates}
                onChange={(e) => setFormData({ ...formData, mapCoordinates: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
                placeholder="E.g. 13.1986° N, 77.7066° E"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Internal Risk Remarks & Due Diligence Notes</label>
            <textarea
              rows={3}
              value={formData.riskNotes}
              onChange={(e) => setFormData({ ...formData, riskNotes: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded p-3 text-[#10291f]"
              placeholder="List any boundary concerns, pending DC conversions, or parent title checks needed..."
            />
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Button variant="outline" type="button" onClick={() => router.push("/crm/opportunities")}>
              Cancel Registry
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Adding property..." : "Register Property"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

