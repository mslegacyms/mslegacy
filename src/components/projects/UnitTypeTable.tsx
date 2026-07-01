import React from "react";
import { ProjectUnitType } from "@/lib/types/developerMarketplace";
import { formatINR } from "@/lib/utils";

interface UnitTypeTableProps {
  unitTypes: ProjectUnitType[];
}

export const UnitTypeTable = ({ unitTypes }: UnitTypeTableProps) => {
  if (!unitTypes || unitTypes.length === 0) {
    return (
      <div className="text-center py-6 bg-slate-50 border border-gold-elegant rounded text-xs text-slate-500 font-medium">
        No unit configuration data catalogued for this project layout.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gold-elegant rounded">
      <table className="min-w-full divide-y divide-slate-200 text-left text-xs font-sans">
        <thead className="bg-[#10291f] text-white uppercase font-bold tracking-wider text-[10px]">
          <tr>
            <th className="px-6 py-3">Configuration</th>
            <th className="px-6 py-3">Bed / Bath</th>
            <th className="px-6 py-3">SBA / Carpet Area</th>
            <th className="px-6 py-3">Starting Value</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {unitTypes.map((unit) => (
            <tr key={unit.id} className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-bold text-[#10291f]">{unit.unitLabel}</td>
              <td className="px-6 py-4 text-slate-600">
                {unit.bedrooms ? `${unit.bedrooms} BHK` : "N/A"} / {unit.bathrooms ? `${unit.bathrooms} Bath` : "N/A"}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {unit.builtUpArea || unit.plotArea || "Check Brochure"}
              </td>
              <td className="px-6 py-4 font-bold text-[#10291f]">
                {unit.startingPrice ? formatINR(unit.startingPrice) : unit.priceLabel || "Request Call"}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  unit.availabilityStatus === "available" 
                    ? "bg-emerald-500/10 text-emerald-700" 
                    : "bg-slate-500/10 text-slate-500"
                }`}>
                  {unit.availabilityStatus.replace("_", " ")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
