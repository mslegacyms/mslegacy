import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function CrmSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">System Settings</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Administer team roles, configure lead allocation rules, and inspect audit logs.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Role Configuration */}
        <Card className="p-6 bg-white space-y-4">
          <h3 className="font-sans text-lg font-bold text-[#10291f]">Team Role Assignments</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Specify database read/write levels across CRM divisions. Role restrictions are enforced by PostgreSQL Row Level Security (RLS) tables.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b pb-2">
              <span>SuperAdmin (Founder)</span>
              <Badge variant="gold">FULL ACCESS</Badge>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Sales Manager</span>
              <Badge variant="neutral">LEADS PIPELINE</Badge>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Legal Officer</span>
              <Badge variant="neutral">DOCUMENTS & SCORES</Badge>
            </div>
          </div>
        </Card>

        {/* Database Config */}
        <Card className="p-6 bg-white space-y-4">
          <h3 className="font-sans text-lg font-bold text-[#10291f]">Supabase Settings</h3>
          <div className="bg-slate-50 p-4 rounded text-xs space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span>Database Server:</span>
              <span className="font-mono text-[10px]">AWS Mumbai (ap-south-1)</span>
            </div>
            <div className="flex justify-between">
              <span>Row-Level Security (RLS):</span>
              <span className="text-emerald-600 font-bold uppercase">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Audit Logging:</span>
              <span className="text-emerald-600 font-bold uppercase">Active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

