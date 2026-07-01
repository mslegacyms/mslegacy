"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getChannelPartners, updatePartnerStatus } from "@/lib/crm/channelPartners";

export default function ChannelPartnersReviewPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function loadData() {
      const data = await getChannelPartners();
      setPartners(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const result = await updatePartnerStatus(id, newStatus);
    if (result.success) {
      // Reload partners
      const data = await getChannelPartners();
      setPartners(data);
    }
  };

  const filteredPartners = partners.filter((cp) => {
    return statusFilter === "all" || cp.status === statusFilter;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return "success";
      case "pending_review":
        return "warning";
      case "rejected":
        return "danger";
      default:
        return "neutral";
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 text-xs">Loading channel partners directory...</div>;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Channel Partner Approvals</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Review onboarding applications, verify RERA card identifiers, and authorize agent credentials.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-4 p-4 bg-white border border-slate-100 rounded shadow-xs">
        <div className="w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none"
          >
            <option value="all">All Verification States</option>
            <option value="pending_review">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Partners List Table */}
      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-sans text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">Broker Name / Company</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">RERA License Card ID</th>
                <th className="p-4">Application Status</th>
                <th className="p-4 pr-6 text-right">Verification Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-600 divide-y divide-slate-100 font-sans">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((cp) => (
                  <tr key={cp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-[#10291f]">
                      {cp.fullName}
                      <span className="block font-sans text-[9px] text-slate-400 font-normal uppercase tracking-wider mt-1">
                        {cp.companyName}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="block">{cp.email}</span>
                      <span className="block text-slate-400 text-[10px]">{cp.phone}</span>
                    </td>
                    <td className="p-4 font-mono text-[10px] font-semibold text-slate-700 select-all">
                      {cp.reraId}
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusBadgeVariant(cp.status)}>
                        {cp.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      {cp.status === "pending_review" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[10px] px-2 text-rose-600 border-rose-100 hover:bg-rose-50"
                            onClick={() => handleUpdateStatus(cp.id, "rejected")}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="text-[10px] px-3 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handleUpdateStatus(cp.id, "approved")}
                          >
                            Approve Partner
                          </Button>
                        </>
                      )}
                      {cp.status !== "pending_review" && (
                        <span className="text-[10px] text-slate-400 font-semibold italic">Reviewed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No partner applications found in this state.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

