"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function CrmDataImportPage() {
  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-sans text-3xl font-bold text-[#10291f]">Bulk Data Import — Data Sprint 1</h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload and verify CSV template files to bulk onboard developer profiles and layout records.
        </p>
      </div>

      {/* Sprint 1 Notice */}
      <div className="bg-amber-500/10 border-l-4 border-[#8b6e3a] p-4 text-xs text-slate-700 rounded-r font-medium">
        <strong>Data Sprint 1 Active:</strong> Focus is on preparing seed databases for Tier 1 developers, plotted players, and managed farmland operators. All imported records remain in <code>draft</code> mode and must not be published until verification steps are ticked.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left - Guide and downloads */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 bg-white border border-gold-elegant space-y-6">
            <div>
              <h3 className="font-sans text-lg font-bold text-[#10291f]">CSV Template Files</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Download and populate before uploading</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                <span>Developers List Template</span>
                <a href="/data-import-templates/developers_import_template.csv" className="text-[#8b6e3a] hover:underline">Download CSV</a>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                <span>Projects Catalog Template</span>
                <a href="/data-import-templates/projects_import_template.csv" className="text-[#8b6e3a] hover:underline">Download CSV</a>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                <span>Unit Types Template</span>
                <a href="/data-import-templates/project_unit_types_import_template.csv" className="text-[#8b6e3a] hover:underline">Download CSV</a>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                <span>Media Assets Template</span>
                <a href="/data-import-templates/project_media_assets_import_template.csv" className="text-[#8b6e3a] hover:underline">Download CSV</a>
              </div>
            </div>

            {/* Tracker Links */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-bold text-[#10291f] text-sm">Operations Trackers</h4>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-[#8b6e3a] underline">
                <a href="/DEVELOPER_OUTREACH_TRACKER.md" target="_blank">Outreach Tracker</a>
                <a href="/LOGO_AND_MEDIA_PERMISSION_TRACKER.md" target="_blank">Permission Tracker</a>
                <a href="/PROJECT_VERIFICATION_BACKLOG.md" target="_blank">Verification Backlog</a>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <h4 className="font-bold text-[#10291f] text-sm">Bulk Import Safety Framework</h4>
              <p>
                To maintain database integrity and protect RERA compliance status parameters, imports are executed under a strict staging system:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-500 font-medium">
                <li>All newly imported projects are assigned a default public visibility status of <code>draft</code>.</li>
                <li>RERA registration IDs are automatically queued for verification checks.</li>
                <li>Developer logos default to <code>pending_permission</code> states.</li>
              </ul>
            </div>
          </Card>

          {/* Import file upload form placeholder */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <h3 className="font-sans text-lg font-bold text-[#10291f]">Upload Catalog File</h3>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-10 text-center space-y-2">
              <span className="text-slate-400 block text-xs">Drag and drop populated CSV template file here</span>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">or</span>
              <Button variant="outline" size="sm" className="border-gold-elegant text-xs font-bold">Select File</Button>
            </div>
          </Card>
        </div>

        {/* Right - Staging checklist */}
        <div className="lg:col-span-4">
          <Card className="p-6 bg-white border border-gold-elegant space-y-4" borderAccent>
            <h3 className="font-sans text-base font-bold text-[#10291f]">Pre-Import Approvals Checklist</h3>
            <div className="space-y-4 text-xs font-medium text-slate-600 font-sans">
              <div className="flex items-center space-x-2 text-amber-600 font-bold bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                <span>Staging Controls Active</span>
              </div>
              <ul className="space-y-2 text-[11px] text-slate-500">
                <li className="flex items-center space-x-2">
                  <input type="checkbox" readOnly checked className="accent-[#8b6e3a]" />
                  <span>Check slugs are lowercase only</span>
                </li>
                <li className="flex items-center space-x-2">
                  <input type="checkbox" readOnly checked className="accent-[#8b6e3a]" />
                  <span>Logo permission set to pending</span>
                </li>
                <li className="flex items-center space-x-2">
                  <input type="checkbox" readOnly checked className="accent-[#8b6e3a]" />
                  <span>Default disclaimers included</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

