import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockProperties } from "@/lib/data/mockProperties";
import { formatINR } from "@/lib/utils";

export default function CrmOpportunitiesPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Opportunities Directory</h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Database of active land parcels, residential layouts, villas, and commercial listings.
          </p>
        </div>
        <Link href="/crm/opportunities/new">
          <Button variant="primary" size="sm" className="font-semibold">
            Onboard Property +
          </Button>
        </Link>
      </div>

      {/* Database Listings */}
      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-sans text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">Property / Title</th>
                <th className="p-4">Location Corridor</th>
                <th className="p-4">Dimensions</th>
                <th className="p-4">RERA Compliance</th>
                <th className="p-4">Wealth Score™</th>
                <th className="p-4">Development Model</th>
                <th className="p-4 pr-6">Target Price</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-600 divide-y divide-slate-100 font-sans">
              {mockProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-6 font-bold text-[#10291f]">
                    <Link href={`/crm/opportunities/${prop.id}`} className="hover:underline hover:text-[#8b6e3a]">
                      {prop.title}
                    </Link>
                    <span className="block font-sans text-[9px] text-slate-400 font-normal uppercase tracking-wider mt-1">
                      {prop.category.replace("_", " ")} | ID: {prop.id}
                    </span>
                  </td>
                  <td className="p-4">{prop.location}</td>
                  <td className="p-4 font-semibold">{prop.dimensions}</td>
                  <td className="p-4">
                    <Badge variant={prop.reraStatus === "approved" ? "success" : "warning"} className="text-[9px]">
                      {prop.reraStatus === "approved" ? "APPROVED" : prop.reraStatus.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-4 font-bold text-[#8b6e3a] text-sm">
                    {prop.wealthScore.overall} / 10
                  </td>
                  <td className="p-4 text-slate-500 font-semibold">{prop.developmentModel}</td>
                  <td className="p-4 pr-6 font-bold text-[#10291f]">{formatINR(prop.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

