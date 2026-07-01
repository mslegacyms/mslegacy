"use server";

import { createClient } from "@/lib/supabase/server";
import { type LeadActivity } from "@/lib/types/crm";
import { logAuditAction } from "./audit";

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

// In-memory store for activities fallback
const mockActivities: LeadActivity[] = [
  { id: "act-001", leadId: "lead-001", activityType: "call", title: "Follow-up Phone Call", notes: "Discussed layout specifications and pricing tiers. Client is requesting RERA verification documents.", createdBy: "Muzzamil Ahmad", createdDate: "2026-06-27T08:30:00Z" },
  { id: "act-002", leadId: "lead-001", activityType: "note", title: "Internal Assessment Note", notes: "High priority lead. Client has allocated capital ready for direct A-Khata purchase.", createdBy: "Muzzamil Ahmad", createdDate: "2026-06-27T08:45:00Z" },
  { id: "act-003", leadId: "lead-002", activityType: "email", title: "Outbound Email", notes: "Sent virtual walkthrough link and estate layout brochures.", createdBy: "Kiran Kumar", createdDate: "2026-06-26T14:22:00Z" }
];

export async function getLeadActivities(leadId: string): Promise<LeadActivity[]> {
  if (!isSupabaseConfigured) {
    return mockActivities.filter((act) => act.leadId === leadId);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lead_activities")
      .select("id, lead_id, activity_type, title, notes, created_by, created_at")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Supabase fetch activities error:", error?.message);
      return mockActivities.filter((act) => act.leadId === leadId);
    }

    return data.map((item) => ({
      id: item.id,
      leadId: item.lead_id,
      activityType: item.activity_type as any,
      title: item.title,
      notes: item.notes || "",
      createdBy: "Advisory Team Member",
      createdDate: item.created_at,
    }));
  } catch (err) {
    console.error("Activities service exception:", err);
    return mockActivities.filter((act) => act.leadId === leadId);
  }
}

export async function createLeadActivity(activityData: Omit<LeadActivity, "id" | "createdDate">): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured) {
    const newActivity: LeadActivity = {
      ...activityData,
      id: `act-mock-${Date.now()}`,
      createdDate: new Date().toISOString(),
    };
    mockActivities.unshift(newActivity);
    return { success: true, data: newActivity };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("lead_activities").insert([
      {
        lead_id: activityData.leadId,
        activity_type: activityData.activityType,
        title: activityData.title,
        notes: activityData.notes,
      }
    ]).select().single();

    if (error) {
      return { success: false, error: error.message };
    }

    await logAuditAction("lead_activity_added", "lead", activityData.leadId, { activityType: activityData.activityType });

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
