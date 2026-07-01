"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function CrmLegalPage() {
  const [reviews, setReviews] = useState([
    {
      id: "rev-001",
      property: "Kanakapura Managed Farmland",
      owner: "Suresh Gowda",
      status: "under_review",
      checklist: [
        { name: "30-Year Title Search", status: "cleared" },
        { name: "RTC / Land Records (Bhoomi)", status: "under_review" },
        { name: "DC Land Conversion Certificate", status: "requested" },
        { name: "Boundary Map Clearance", status: "not_started" }
      ],
      remarks: "Pending DC conversion document from revenue department."
    },
    {
      id: "rev-002",
      property: "Whitefield Villa Plots",
      owner: "Apex Realty",
      status: "cleared",
      checklist: [
        { name: "Mother Deed Audit", status: "cleared" },
        { name: "Khata Certificate (A-Khata)", status: "cleared" },
        { name: "RERA Registration Sanction", status: "cleared" },
        { name: "Tax Dues Receipts (BBMP)", status: "cleared" }
      ],
      remarks: "All title verification checks cleared. Ready for sale deed execution."
    },
    {
      id: "rev-003",
      property: "Devanahalli Residential Plots",
      owner: "Private Landowners",
      status: "issue_found",
      checklist: [
        { name: "Title Succession deeds", status: "issue_found" },
        { name: "Encumbrance Certificate (EC)", status: "cleared" },
        { name: "Layout Plan Sanction", status: "under_review" },
        { name: "NOC from Forest Dept", status: "not_applicable" }
      ],
      remarks: "Boundary overlap flagged on survey sketch. Clarification requested."
    }
  ]);

  const getChecklistBadge = (status: string) => {
    switch (status) {
      case "cleared":
        return <Badge variant="success" className="text-[8px] py-0">Cleared</Badge>;
      case "under_review":
        return <Badge variant="warning" className="text-[8px] py-0">Reviewing</Badge>;
      case "requested":
        return <Badge variant="gold" className="text-[8px] py-0">Requested</Badge>;
      case "issue_found":
        return <Badge variant="danger" className="text-[8px] py-0">Issue</Badge>;
      case "not_applicable":
        return <Badge variant="neutral" className="text-[8px] py-0">N/A</Badge>;
      default:
        return <Badge variant="neutral" className="text-[8px] py-0">Pending</Badge>;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "cleared":
        return "success";
      case "under_review":
        return "warning";
      case "issue_found":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Legal Audit Dashboard</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Perform property title checks, audit parent ownership deeds, and review zoning compliance parameters.
        </p>
      </div>

      {/* Audit grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <Card key={rev.id} className="p-6 bg-white space-y-4 flex flex-col justify-between" borderAccent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Property Title</span>
                  <h3 className="font-sans text-base font-bold text-[#10291f]">{rev.property}</h3>
                </div>
                <Badge variant={getStatusBadgeVariant(rev.status)} className="capitalize text-[9px] px-2">
                  {rev.status.replace("_", " ")}
                </Badge>
              </div>

              {/* Checklist list */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Due Diligence Checklist</span>
                {rev.checklist.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs text-slate-600">
                    <span>{item.name}</span>
                    {getChecklistBadge(item.status)}
                  </div>
                ))}
              </div>
            </div>

            {/* Remarks and action */}
            <div className="space-y-3 pt-4 mt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded">
                <span className="font-bold text-[9px] text-slate-400 uppercase tracking-wider block mb-1">Legal Remarks</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">{rev.remarks}</p>
              </div>
              <Button variant="outline" size="sm" fullWidth className="font-semibold text-[11px]">
                Update Audit Remarks
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

