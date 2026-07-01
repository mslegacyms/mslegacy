"use client";

import React from "react";
import DocumentRequestCard from "./DocumentRequestCard";

interface DocumentRequest {
  id: string;
  documentName: string;
  status: "requested" | "received" | "under_review" | "cleared" | "issue_found" | "not_applicable";
  dueDate?: string;
  storagePath?: string;
}

export default function DocumentChecklistPanel({
  requests,
  onVerify
}: {
  requests: DocumentRequest[];
  onVerify?: (id: string, status: "cleared" | "issue_found") => void;
}) {
  return (
    <div className="space-y-3">
      {requests.length > 0 ? (
        requests.map((req) => (
          <DocumentRequestCard key={req.id} request={req} onVerify={onVerify} />
        ))
      ) : (
        <p className="text-xs text-slate-400 italic">No outstanding document checks scheduled.</p>
      )}
    </div>
  );
}
