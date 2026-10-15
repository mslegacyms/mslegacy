"use client";

import React, { useEffect, useState } from "react";
import { DocumentText } from "./DocumentText";
import { LegalDocumentDraft } from "@/lib/types/legalDocuments";
import { getStoredDraftById } from "@/lib/crm/legalDocumentsStore";
import { legalTemplatesMap } from "@/lib/legal-templates";

export default function LegalDocumentPrint({ id, ownerId }: { id: string; ownerId: string }) {
  const [draft, setDraft] = useState<LegalDocumentDraft | null>(null);

  useEffect(() => {
    if (id) {
      const data = getStoredDraftById(id, ownerId);
      if (data) {
        setDraft(data);
      }
    }
  }, [id, ownerId]);

  useEffect(() => {
    if (draft) {
      // Small timeout to allow styles/fonts to finish rendering before print dialog pops
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [draft]);

  if (!draft) {
    return (
      <div className="flex justify-center items-center h-screen font-serif text-slate-500">
        Loading printable agreement draft...
      </div>
    );
  }

  const template = legalTemplatesMap[draft.documentType];
  const renderedContent = template ? template.renderDocument(draft) : "";

  return (
    <div className="min-h-screen bg-white text-black p-0 print:p-0">
      
      {/* Print Controls (Hidden on Print) */}
      <div className="no-print bg-slate-900 text-white px-6 py-4 flex justify-between items-center print:hidden">
        <div>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold uppercase">
            Print preview mode
          </span>
          <h2 className="text-sm font-bold mt-1 font-serif">{draft.documentTitle}</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => window.print()}
            className="bg-[#8b6e3a] hover:bg-[#725a3a] text-white text-xs font-bold px-4 py-2 rounded transition-colors"
          >
            Trigger Print Dialog
          </button>
          <button
            onClick={() => window.close()}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded transition-colors"
          >
            Close Tab
          </button>
        </div>
      </div>

      {/* A4 Sheet Print Frame */}
      <div className="relative mx-auto bg-white p-12 w-full max-w-[800px] font-serif text-black print:p-0 print:max-w-none print:shadow-none print:border-none antialiased">
        
        {/* Print watermarks if not approved */}
        {(
          <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-center items-center opacity-[0.05] overflow-hidden rotate-[-35deg] print:opacity-[0.04]">
            <span className="text-7xl font-bold uppercase tracking-widest text-black mb-6">
              DRAFT ONLY
            </span>
            <span className="text-3xl font-bold uppercase tracking-wider text-black">
              SUBJECT TO LEGAL REVIEW
            </span>
          </div>
        )}

        {/* Content */}
        <p className="mb-6 text-xs font-bold">WORKING DRAFT — NOT APPROVED FOR EXECUTION</p>
        <DocumentText text={renderedContent} />

        {/* Legal watermark warning */}
        <div className="mt-12 pt-6 border-t border-slate-300 text-[9px] text-slate-500 italic text-justify leading-relaxed">
          <strong>LEGAL DISCLAIMER WARNING:</strong> This template is generated for documentation preparation only. It is not a substitute for legal advice. Verify title, authority approvals, stamp duty, registration requirements, RERA applicability, tax implications, and local laws before execution.
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
        }
      `}</style>
    </div>
  );
}
