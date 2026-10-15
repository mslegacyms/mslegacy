import { DocumentText } from "./DocumentText";
import React, { useRef, useState } from "react";
import { LegalDocumentDraft } from "@/lib/types/legalDocuments";
import { legalTemplatesMap } from "@/lib/legal-templates";
import { Button } from "@/components/ui/Button";

interface LegalDocumentPreviewProps {
  draft: Partial<LegalDocumentDraft>;
  onSave?: () => void;
  onSendForReview?: () => void;
  isSaving?: boolean;
  showActions?: boolean;
}

export default function LegalDocumentPreview({
  draft,
  onSave,
  onSendForReview,
  isSaving = false,
  showActions = true
}: LegalDocumentPreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const printFrameRef = useRef<HTMLDivElement>(null);

  const template = draft.documentType ? legalTemplatesMap[draft.documentType] : null;
  const renderedContent = template ? template.renderDocument(draft) : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(renderedContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy document text:", err);
    }
  };

  const handlePrint = () => {
    // Native print action or redirect to dedicated print route
    if (draft.id) {
      window.open(`/crm/legal-documents/print/${draft.id}`, "_blank");
    } else {
      // In-line print fallback
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      <p role="status" className="text-sm text-amber-800">Local working draft only. This browser tab does not provide official review or approval.</p>
      {/* Top Action Bar */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-slate-100 rounded shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Draft Mode:</span>
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-black border border-amber-200 uppercase">
              {draft.status || "draft"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="text-[11px] font-bold"
            >
              {copySuccess ? "✓ Copied" : "Copy Draft Text"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              disabled={template?.legalReviewStatus === "pending_legal_review"}
              className="text-[11px] font-bold border-slate-200"
            >
              Print Draft / PDF
            </Button>

            {onSendForReview && draft.status === "draft" && (
              <Button
                variant="primary"
                size="sm"
                onClick={onSendForReview}
                className="text-[11px] font-bold text-white bg-[#8b6e3a] hover:bg-[#725a3a]"
              >
                Send for Legal Review
              </Button>
            )}

            {onSave && (
              <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                disabled={isSaving}
                className="text-[11px] font-bold text-white bg-[#10291f] hover:bg-[#081510]"
              >
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* A4 Paper Container */}
      <div className="relative bg-slate-200 p-4 md:p-8 rounded-lg border border-slate-300 flex justify-center overflow-x-auto">
        
        {/* The Document Page */}
        <div
          ref={printFrameRef}
          id="legal-document-print-area"
          className="relative bg-white shadow-xl w-full max-w-[800px] min-h-[1130px] p-10 md:p-16 border border-slate-300 font-serif text-slate-900 antialiased print:p-0 print:border-none print:shadow-none"
        >
          {/* Watermark Overlay (Visual only, removed on official print if approved) */}
          {(
            <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-center items-center opacity-[0.06] overflow-hidden rotate-[-35deg]">
              <span className="text-5xl md:text-7xl font-bold uppercase tracking-widest text-[#10291f] whitespace-nowrap mb-6">
                DRAFT ONLY
              </span>
              <span className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-red-800 whitespace-nowrap">
                SUBJECT TO ADVOCATE REVIEW
              </span>
            </div>
          )}

          {/* Document Content */}
          {template ? (
            <DocumentText text={renderedContent} />
          ) : (
            <div className="text-center py-20 text-slate-400 text-xs font-serif font-semibold">
              Select an agreement template above and fill in party details to preview the draft.
            </div>
          )}

          {/* Top disclaimer watermark inside the text layout */}
          {template && (
            <div className="mt-12 pt-6 border-t border-slate-300 text-[10px] text-slate-500 italic text-justify leading-relaxed">
              <strong>OFFICIAL LEGAL DISCLAIMER:</strong> This is a draft template generated by the {draft.companyDetails?.brandName || "MS LEGACY"} legal draft tool. It is for review and editing purposes only and is not final legal advice or registration-ready documentation. The parties must verify local laws, RERA provisions, title clearances, stamp duty, and local registration parameters with a certified advocate before execution.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
