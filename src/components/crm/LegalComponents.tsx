"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";

export function DocumentStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "cleared":
      return <Badge variant="success">Cleared</Badge>;
    case "under_review":
      return <Badge variant="warning">Under Review</Badge>;
    case "requested":
      return <Badge variant="gold">Requested</Badge>;
    case "issue_found":
      return <Badge variant="danger">Flagged Issue</Badge>;
    case "not_applicable":
      return <Badge variant="neutral">Not Applicable</Badge>;
    case "not_started":
    default:
      return <Badge variant="neutral">Not Started</Badge>;
  }
}

export function LegalRiskBadge({ severity }: { severity: "low" | "medium" | "high" | "critical" }) {
  switch (severity) {
    case "critical":
    case "high":
      return <Badge variant="danger" className="uppercase">{severity} RISK</Badge>;
    case "medium":
      return <Badge variant="gold" className="uppercase">{severity} RISK</Badge>;
    case "low":
    default:
      return <Badge variant="success" className="uppercase">{severity} RISK</Badge>;
  }
}

export interface ChecklistItem {
  name: string;
  status: string;
}

export function LegalChecklist({
  items,
  onItemClick
}: {
  items: ChecklistItem[];
  onItemClick?: (index: number) => void;
}) {
  return (
    <div className="divide-y divide-slate-100">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick && onItemClick(index)}
          className={`py-3.5 flex justify-between items-center ${onItemClick ? "cursor-pointer hover:bg-slate-50/50 px-2 rounded transition-colors" : ""}`}
        >
          <span className="text-xs font-semibold text-slate-600">{item.name}</span>
          <DocumentStatusBadge status={item.status} />
        </div>
      ))}
    </div>
  );
}
