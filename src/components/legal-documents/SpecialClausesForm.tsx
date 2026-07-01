import React from "react";

interface SpecialClausesFormProps {
  specialClauses: string;
  disputeResolution: string;
  jurisdiction: string;
  legalDisclaimer: string;
  onChange: (fields: { specialClauses?: string; disputeResolution?: string; jurisdiction?: string; legalDisclaimer?: string }) => void;
  isReadOnly?: boolean;
}

export default function SpecialClausesForm({
  specialClauses = "",
  disputeResolution = "",
  jurisdiction = "",
  legalDisclaimer = "",
  onChange,
  isReadOnly = false
}: SpecialClausesFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-md">
      <h3 className="text-sm font-semibold text-[#10291f] border-b border-slate-200 pb-2">Jurisdiction & Custom Clauses</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Exclusive Jurisdiction City</label>
          <input
            type="text"
            name="jurisdiction"
            value={jurisdiction}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Bangalore, Karnataka"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Dispute Resolution & Arbitration Clause</label>
          <textarea
            name="disputeResolution"
            rows={2}
            value={disputeResolution}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Disputes shall be resolved through Arbitration in Bangalore under the Arbitration & Conciliation Act, 1996."
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Special / Custom Transaction Clauses (Annexed to Draft)</label>
          <textarea
            name="specialClauses"
            rows={3}
            value={specialClauses}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="Add any transaction-specific clauses here. E.g. Seller agrees to repaint structural walls prior to registration."
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Safety Legal Disclaimer (Printed at Footer)</label>
          <textarea
            name="legalDisclaimer"
            rows={3}
            value={legalDisclaimer}
            onChange={handleChange}
            disabled={isReadOnly}
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C] bg-amber-50/50"
          />
          <p className="text-[10px] text-amber-600 mt-1">
            * Warning: This disclaimer is required on all generated drafts for legal protection.
          </p>
        </div>
      </div>
    </div>
  );
}
