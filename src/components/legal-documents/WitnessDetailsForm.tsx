import React from "react";
import { WitnessDetails } from "@/lib/types/legalDocuments";

interface WitnessDetailsFormProps {
  witnessOne?: WitnessDetails;
  witnessTwo?: WitnessDetails;
  onChangeOne: (updated: Partial<WitnessDetails>) => void;
  onChangeTwo: (updated: Partial<WitnessDetails>) => void;
  isReadOnly?: boolean;
}

export default function WitnessDetailsForm({
  witnessOne = { name: "", fatherHusbandName: "", address: "" },
  witnessTwo = { name: "", fatherHusbandName: "", address: "" },
  onChangeOne,
  onChangeTwo,
  isReadOnly = false
}: WitnessDetailsFormProps) {
  
  const handleChangeOne = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChangeOne({ [name]: value });
  };

  const handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChangeTwo({ [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-200 rounded-md">
      {/* Witness One */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#10291f] border-b border-slate-200 pb-2">Witness 01 Details</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={witnessOne.name || ""}
              onChange={handleChangeOne}
              disabled={isReadOnly}
              placeholder="e.g. Ramesh Kumar"
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Father's / Husband's Name</label>
            <input
              type="text"
              name="fatherHusbandName"
              value={witnessOne.fatherHusbandName || ""}
              onChange={handleChangeOne}
              disabled={isReadOnly}
              placeholder="e.g. Ananth Kumar"
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Postal Address</label>
            <textarea
              name="address"
              rows={2}
              value={witnessOne.address || ""}
              onChange={handleChangeOne}
              disabled={isReadOnly}
              placeholder="Witness address details..."
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
        </div>
      </div>

      {/* Witness Two */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#10291f] border-b border-slate-200 pb-2">Witness 02 Details</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={witnessTwo.name || ""}
              onChange={handleChangeTwo}
              disabled={isReadOnly}
              placeholder="e.g. Priya Sharma"
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Father's / Husband's Name</label>
            <input
              type="text"
              name="fatherHusbandName"
              value={witnessTwo.fatherHusbandName || ""}
              onChange={handleChangeTwo}
              disabled={isReadOnly}
              placeholder="e.g. Suresh Sharma"
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Postal Address</label>
            <textarea
              name="address"
              rows={2}
              value={witnessTwo.address || ""}
              onChange={handleChangeTwo}
              disabled={isReadOnly}
              placeholder="Witness address details..."
              className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
