"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { type LeadActivity } from "@/lib/types/crm";

export function ActivityBadge({ type }: { type: LeadActivity["activityType"] }) {
  switch (type) {
    case "call":
      return <Badge variant="primary">Call</Badge>;
    case "email":
      return <Badge variant="neutral">Email</Badge>;
    case "whatsapp":
      return <Badge variant="success">WhatsApp</Badge>;
    case "site_visit":
      return <Badge variant="gold">Site Visit</Badge>;
    case "document_review":
      return <Badge variant="warning">Doc Review</Badge>;
    case "note":
    default:
      return <Badge variant="neutral">Note</Badge>;
  }
}

export function ActivityComposer({
  onSubmitActivity
}: {
  onSubmitActivity: (notes: string, type: LeadActivity["activityType"]) => void;
}) {
  const [notes, setNotes] = useState("");
  const [type, setType] = useState<LeadActivity["activityType"]>("note");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;
    onSubmitActivity(notes, type);
    setNotes("");
  };

  return (
    <Card className="p-4 bg-white border border-slate-200/50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Log Activity</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none"
          >
            <option value="note">Internal Note</option>
            <option value="call">Phone Call</option>
            <option value="whatsapp">WhatsApp Log</option>
            <option value="email">Email Sent</option>
            <option value="site_visit">Site Visit</option>
            <option value="document_review">Document Review</option>
          </select>
        </div>

        <textarea
          required
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded p-3 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
          placeholder="Record notes, call summaries, or details..."
        />

        <div className="flex justify-end">
          <Button variant="primary" size="sm" type="submit">
            Post Activity Log
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function ActivityTimeline({ activities }: { activities: LeadActivity[] }) {
  return (
    <div className="space-y-4">
      {activities.length > 0 ? (
        activities.map((act) => (
          <Card key={act.id} className="p-4 bg-white border border-slate-100">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <ActivityBadge type={act.activityType} />
                  <h4 className="text-xs font-bold text-[#10291f]">{act.title}</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">{act.notes}</p>
              </div>
              <div className="text-right text-[10px] text-slate-400 font-medium">
                <span>{new Date(act.createdDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                <span className="block mt-0.5">By {act.createdBy}</span>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-xs text-slate-400 italic">No communication logs recorded yet.</p>
      )}
    </div>
  );
}
