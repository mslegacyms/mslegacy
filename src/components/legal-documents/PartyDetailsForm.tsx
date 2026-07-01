import React from "react";
import { AgreementParty, EntityType } from "@/lib/types/legalDocuments";

interface PartyDetailsFormProps {
  label: string;
  party: AgreementParty;
  onChange: (updatedParty: Partial<AgreementParty>) => void;
  isReadOnly?: boolean;
}

export default function PartyDetailsForm({
  label,
  party,
  onChange,
  isReadOnly = false
}: PartyDetailsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: name === "age" ? (value ? parseInt(value, 10) : undefined) : value });
  };

  return (
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-md">
      <h3 className="text-sm font-semibold text-[#10291f] border-b border-slate-200 pb-2">{label}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Entity Type</label>
          <select
            name="entityType"
            value={party.entityType || "individual"}
            onChange={handleChange}
            disabled={isReadOnly}
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C] bg-white"
          >
            <option value="individual">Individual</option>
            <option value="company">Private Limited / Public Company</option>
            <option value="partnership">Partnership Firm</option>
            <option value="LLP">Limited Liability Partnership (LLP)</option>
            <option value="trust">Trust / Society</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
          <input
            type="text"
            name="name"
            value={party.name || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Suresh Gowda"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {party.entityType === "company" || party.entityType === "LLP" || party.entityType === "trust"
              ? "Authorized Representative Name"
              : "Father's / Husband's Name"}
          </label>
          <input
            type="text"
            name="fatherHusbandOrRep"
            value={party.fatherHusbandOrRep || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Late Ramachandra Gowda"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        {party.entityType === "individual" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={party.age || ""}
              onChange={handleChange}
              disabled={isReadOnly}
              placeholder="e.g. 45"
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
        )}

        {party.entityType !== "individual" && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Signatory Name</label>
              <input
                type="text"
                name="signatoryName"
                value={party.signatoryName || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Suresh Gowda"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Signatory Designation</label>
              <input
                type="text"
                name="signatoryDesignation"
                value={party.signatoryDesignation || ""}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="e.g. Managing Director"
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">PAN Number</label>
          <input
            type="text"
            name="pan"
            value={party.pan || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. ABCDE1234F"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Aadhaar (Optional)</label>
          <input
            type="text"
            name="aadhaar"
            value={party.aadhaar || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. 1234 5678 9012"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={party.phone || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. +91 98765 43210"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={party.email || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. client@example.com"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Postal Address</label>
          <textarea
            name="address"
            rows={2}
            value={party.address || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Flat 302, 3rd Floor, Sunrise Heights, HSR Layout, Bangalore - 560102"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>
      </div>
    </div>
  );
}
