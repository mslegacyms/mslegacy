import React from "react";
import { PropertyDetails, PropertyType } from "@/lib/types/legalDocuments";

interface PropertyDetailsFormProps {
  property?: PropertyDetails;
  onChange: (updatedProperty: Partial<PropertyDetails>) => void;
  isReadOnly?: boolean;
}

export default function PropertyDetailsForm({
  property = {
    propertyType: "plot",
    surveyNumber: "",
    siteNumber: "",
    flatNumber: "",
    khataNumber: "",
    pidNumber: "",
    villageOrLocality: "",
    boundariesEast: "",
    boundariesWest: "",
    boundariesNorth: "",
    boundariesSouth: "",
    extentArea: "",
    scheduleDescription: ""
  },
  onChange,
  isReadOnly = false
}: PropertyDetailsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-md">
      <h3 className="text-sm font-semibold text-[#10291f] border-b border-slate-200 pb-2">Property Specifications (Schedule)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
          <select
            name="propertyType"
            value={property.propertyType || "plot"}
            onChange={handleChange}
            disabled={isReadOnly}
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C] bg-white"
          >
            <option value="plot">Plot / Site</option>
            <option value="apartment">Apartment Unit</option>
            <option value="villa">Villa / Independent House</option>
            <option value="farmland">Managed Farmland</option>
            <option value="commercial">Commercial Space</option>
            <option value="layout">Residential Layout</option>
            <option value="other">Other Land Parcel</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Survey Number</label>
          <input
            type="text"
            name="surveyNumber"
            value={property.surveyNumber || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Survey No 144/2"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Flat / Site / Plot Number</label>
          <input
            type="text"
            name="siteNumber"
            value={property.siteNumber || property.flatNumber || ""}
            onChange={(e) => {
              onChange({ siteNumber: e.target.value, flatNumber: e.target.value });
            }}
            disabled={isReadOnly}
            placeholder="e.g. Plot No 12 or Flat 401"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Khata Number</label>
          <input
            type="text"
            name="khataNumber"
            value={property.khataNumber || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. A-Khata No 123/A"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">PID / Property ID Number</label>
          <input
            type="text"
            name="pidNumber"
            value={property.pidNumber || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. BBMP PID 102-W0102-12"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Village / Locality</label>
          <input
            type="text"
            name="villageOrLocality"
            value={property.villageOrLocality || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Kanakapura Road, Bangalore"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Hobli / Taluk</label>
          <input
            type="text"
            name="hobliOrTaluk"
            value={property.hobliOrTaluk || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Bangalore South"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
          <input
            type="text"
            name="district"
            value={property.district || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Bangalore Rural"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Extent Area / Dimensions</label>
          <input
            type="text"
            name="extentArea"
            value={property.extentArea || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. 30x40 ft (1200 sq.ft)"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Built-up Area (Optional)</label>
          <input
            type="text"
            name="builtUpArea"
            value={property.builtUpArea || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. 2500 sq.ft"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Undivided Share (UDS, if Apt)</label>
          <input
            type="text"
            name="undividedShare"
            value={property.undividedShare || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. 450 sq.ft UDS"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">RERA Number (Optional)</label>
          <input
            type="text"
            name="reraNumber"
            value={property.reraNumber || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. PRM/KA/RERA/1251/..."
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Bounded East by</label>
          <input
            type="text"
            name="boundariesEast"
            value={property.boundariesEast || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Site No 12"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Bounded West by</label>
          <input
            type="text"
            name="boundariesWest"
            value={property.boundariesWest || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Road / Common Passage"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Bounded North by</label>
          <input
            type="text"
            name="boundariesNorth"
            value={property.boundariesNorth || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Private Property"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Bounded South by</label>
          <input
            type="text"
            name="boundariesSouth"
            value={property.boundariesSouth || ""}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder="e.g. Site No 10"
            className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Schedule Description / Parent Title deeds reference</label>
        <textarea
          name="scheduleDescription"
          rows={3}
          value={property.scheduleDescription || ""}
          onChange={handleChange}
          disabled={isReadOnly}
          placeholder="Detailed narrative description of the property boundaries, history, and undivided share inclusions as they should appear in the schedule annexure."
          className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C]"
        />
      </div>
    </div>
  );
}
