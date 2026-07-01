"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getLeadById } from "@/lib/crm/leads";
import { getLeadActivities, createLeadActivity } from "@/lib/crm/activities";
import { type Lead, type LeadActivity } from "@/lib/types/crm";
import { Landmark } from "@/components/ui/Icons";
import { ActivityTimeline, ActivityComposer } from "@/components/crm/ActivityComponents";
import { TaskForm } from "@/components/crm/TaskComponents";
import { LegalChecklist } from "@/components/crm/LegalComponents";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Task inline state
  const [tasks, setTasks] = useState([
    { id: "t-1", title: "Trace 30-Year Mother Deeds", due: "2026-06-30", status: "open" },
    { id: "t-2", title: "Verify BDA Layout Plan", due: "2026-07-05", status: "open" }
  ]);

  // Checklist inline state
  const [checklist, setChecklist] = useState([
    { name: "Mother Deed / Succession search", status: "cleared" },
    { name: "Encumbrance Certificate (30 Years)", status: "under_review" },
    { name: "Zoning / Land Conversion Order", status: "requested" },
    { name: "RERA Registration status", status: "not_started" }
  ]);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const leadData = await getLeadById(id);
        const actData = await getLeadActivities(id);
        setLead(leadData);
        setActivities(actData);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  const handleAddActivity = async (notes: string, type: LeadActivity["activityType"]) => {
    if (!lead) return;

    const result = await createLeadActivity({
      leadId: lead.id,
      activityType: type,
      title: type === "note" ? "Internal Advisory Note" : `Logged Customer ${type}`,
      notes,
      createdBy: "Muzzamil Ahmad",
    });

    if (result.success) {
      // Reload activities
      const updatedActs = await getLeadActivities(lead.id);
      setActivities(updatedActs);
    }
  };

  const handleAddTask = (title: string, dueDate: string, priority: "low" | "normal" | "high") => {
    setTasks([
      ...tasks,
      {
        id: `t-mock-${Date.now()}`,
        title,
        due: dueDate || new Date().toISOString().split("T")[0],
        status: "open"
      }
    ]);
  };

  const toggleChecklist = (index: number) => {
    const nextStatusMap: Record<string, string> = {
      not_started: "requested",
      requested: "under_review",
      under_review: "cleared",
      cleared: "issue_found",
      issue_found: "not_started"
    };

    setChecklist(
      checklist.map((item, idx) =>
        idx === index ? { ...item, status: nextStatusMap[item.status] || "not_started" } : item
      )
    );
  };

  if (loading) return <div className="p-8 text-center text-slate-500 text-xs">Loading lead dossier...</div>;
  if (!lead) return <div className="p-8 text-center text-slate-500 text-xs">Client lead record not found.</div>;

  return (
    <div className="space-y-8">
      {/* Back to list */}
      <div className="flex justify-between items-center">
        <Link href="/crm/leads" className="text-xs text-slate-400 hover:text-slate-600 font-semibold">
          ← Back to Leads Directory
        </Link>
        
        <div className="flex gap-3">
          <Badge variant="gold" className="uppercase px-2.5">
            Stage: {lead.status.replace("_", " ")}
          </Badge>
          <Badge variant={lead.priority === "high" || lead.priority === "urgent" ? "danger" : "primary"} className="uppercase px-2.5">
            Priority: {lead.priority}
          </Badge>
        </div>
      </div>

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Details, checklists, Opportunities */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card 1: Dossier Header */}
          <Card className="p-6 bg-white space-y-4">
            <h2 className="font-sans text-2xl font-bold text-[#10291f]">{lead.fullName}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Phone Coordinate</span>
                <span className="font-semibold">{lead.phone || "No phone listed"}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Coordinate</span>
                <span className="font-semibold">{lead.email || "No email listed"}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Country / Residence</span>
                <span className="font-semibold">{lead.cityCountry || "Not specified"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Primary Division</span>
                <span className="font-semibold capitalize">{lead.interestType.replace("_", " ")}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Budget Allocation</span>
                <span className="font-semibold text-[#8A704C]">{lead.budgetRange}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Client Profile</span>
                <span className="font-semibold capitalize">{lead.buyerType.replace("_", " ")}</span>
              </div>
            </div>
          </Card>

          {/* Card 2: Legal Checklist (Phase 7) */}
          <Card className="p-6 bg-white space-y-4">
            <h3 className="font-sans text-lg font-bold text-[#10291f]">Legal Due Diligence Checklist</h3>
            <p className="text-[11px] text-slate-400">
              Click check tags to cycles status checks. RLS locks edits for unauthorized roles.
            </p>
            <LegalChecklist items={checklist} onItemClick={toggleChecklist} />
          </Card>

          {/* Card 3: Timeline & Activity Composer (Phase 4) */}
          <div className="space-y-4">
            <h3 className="font-sans text-lg font-bold text-[#10291f]">Communication History</h3>
            <ActivityComposer onSubmitActivity={handleAddActivity} />
            <ActivityTimeline activities={activities} />
          </div>
        </div>

        {/* Right Column - Tasks, Quick Actions, Opportunity Links */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card 4: Tasks & Follow-ups (Phase 5) */}
          <Card className="p-6 bg-white space-y-4">
            <h3 className="font-sans text-base font-bold text-[#10291f]">Reminders & Tasks</h3>
            <TaskForm onSubmitTask={handleAddTask} />
            
            <div className="space-y-3 pt-4 border-t border-slate-100">
              {tasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center text-xs p-2 rounded border border-slate-100 hover:bg-slate-50/50">
                  <div className="space-y-0.5">
                    <p className="font-bold text-[#10291f]">{task.title}</p>
                    <p className="text-[10px] text-slate-400">Due: {task.due}</p>
                  </div>
                  <Badge variant="warning" className="text-[9px]">Open</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 5: Related Opportunity Links */}
          <Card className="p-6 bg-[#10291f] text-white space-y-4">
            <h3 className="font-sans text-base font-bold text-white flex items-center">
              <Landmark size={18} className="mr-2 text-[#8b6e3a]" />
              Matching Opportunity
            </h3>
            
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="text-slate-300 text-[11px]">
                Aravind's budget matches standard BDA residential layouts:
              </p>
              <div className="bg-white/5 border border-white/10 p-3 rounded space-y-1 hover:bg-white/10 transition-colors">
                <Link href="/crm/opportunities/prop-001" className="font-sans font-bold text-[#8b6e3a] block hover:underline">
                  Devanahalli Layout plots
                </Link>
                <span className="text-[10px] text-slate-400 block">Bangalore North Corridor | ₹50L+</span>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
