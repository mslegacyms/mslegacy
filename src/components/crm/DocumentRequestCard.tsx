"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface DocumentRequest {
  id: string;
  documentName: string;
  status: "requested" | "received" | "under_review" | "cleared" | "issue_found" | "not_applicable";
  dueDate?: string;
  storagePath?: string;
}

export default function DocumentRequestCard({
  request,
  onVerify
}: {
  request: DocumentRequest;
  onVerify?: (id: string, status: "cleared" | "issue_found") => void;
}) {
  const getStatusBadge = (status: DocumentRequest["status"]) => {
    switch (status) {
      case "cleared":
        return <Badge variant="success">Cleared</Badge>;
      case "under_review":
        return <Badge variant="warning">Under Review</Badge>;
      case "received":
        return <Badge variant="primary">Received</Badge>;
      case "issue_found":
        return <Badge variant="danger">Flagged Issue</Badge>;
      case "requested":
      default:
        return <Badge variant="gold">Requested</Badge>;
    }
  };

  return (
    <Card className="p-4 bg-white border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-[#10291f]">{request.documentName}</h4>
        {request.dueDate && (
          <p className="text-[10px] text-slate-400">Due: {new Date(request.dueDate).toLocaleDateString("en-IN")}</p>
        )}
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
        {getStatusBadge(request.status)}
        
        {request.storagePath && (
          <a href="#" className="text-[10px] font-bold text-[#8b6e3a] hover:underline">
            Download Copy
          </a>
        )}

        {request.status === "received" && onVerify && (
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="text-[9px] px-2 py-1 h-fit text-rose-600 border-rose-100"
              onClick={() => onVerify(request.id, "issue_found")}
            >
              Flag
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="text-[9px] px-2 py-1 h-fit bg-emerald-600 hover:bg-emerald-700"
              onClick={() => onVerify(request.id, "cleared")}
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
