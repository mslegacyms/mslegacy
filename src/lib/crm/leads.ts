"use server";

import { createClient } from "@/lib/supabase/server";
import { mockLeads } from "@/lib/data/mockLeads";
import { type Lead } from "@/lib/types/crm";
import { logAuditAction } from "./audit";

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Retrieves the list of leads.
 * Falls back to mock data if Supabase keys are missing.
 */
export async function getLeads(): Promise<Lead[]> {
  if (!isSupabaseConfigured) {
    return mockLeads;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leads")
      .select("id, full_name, phone, email, city_country, interest_type, buyer_type, budget_range, message, lead_source, status, priority, assigned_to, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Supabase fetch leads error:", error?.message);
      return mockLeads;
    }

    return data.map((item) => ({
      id: item.id,
      fullName: item.full_name,
      phone: item.phone,
      email: item.email,
      cityCountry: item.city_country,
      interestType: item.interest_type,
      buyerType: item.buyer_type,
      budgetRange: item.budget_range,
      message: item.message,
      leadSource: item.lead_source,
      status: item.status as any,
      priority: item.priority as any,
      assignedToName: item.assigned_to ? "Assigned Representative" : "Unassigned",
      createdDate: item.created_at,
    }));
  } catch (err) {
    console.error("Leads data service exception:", err);
    return mockLeads;
  }
}

/**
 * Retrieves a lead by ID.
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  if (!isSupabaseConfigured) {
    return mockLeads.find((lead) => lead.id === id) || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leads")
      .select("id, full_name, phone, email, city_country, interest_type, buyer_type, budget_range, message, lead_source, status, priority, assigned_to, created_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Supabase fetch lead by id error:", error?.message);
      return mockLeads.find((lead) => lead.id === id) || null;
    }

    return {
      id: data.id,
      fullName: data.full_name,
      phone: data.phone,
      email: data.email,
      cityCountry: data.city_country,
      interestType: data.interest_type,
      buyerType: data.buyer_type,
      budgetRange: data.budget_range,
      message: data.message,
      leadSource: data.lead_source,
      status: data.status as any,
      priority: data.priority as any,
      assignedToName: data.assigned_to ? "Assigned Representative" : "Unassigned",
      createdDate: data.created_at,
    };
  } catch (err) {
    console.error("Leads data service fetch exception:", err);
    return mockLeads.find((lead) => lead.id === id) || null;
  }
}

/**
 * Inserts a new lead.
 */
export async function createLead(leadData: Omit<Lead, "id" | "createdDate">): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured) {
    const newLead: Lead = {
      ...leadData,
      id: `lead-mock-${Date.now()}`,
      createdDate: new Date().toISOString(),
    };
    mockLeads.unshift(newLead);
    return { success: true, data: newLead };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("leads").insert([
      {
        full_name: leadData.fullName,
        phone: leadData.phone,
        email: leadData.email,
        city_country: leadData.cityCountry,
        interest_type: leadData.interestType,
        buyer_type: leadData.buyerType,
        budget_range: leadData.budgetRange,
        message: leadData.message,
        lead_source: leadData.leadSource || "crm_manual",
        status: leadData.status || "new",
        priority: leadData.priority || "normal",
      }
    ]).select().single();

    if (error) {
      return { success: false, error: error.message };
    }

    await logAuditAction("lead_created", "lead", data.id, { fullName: leadData.fullName });

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

/**
 * Updates a lead status.
 */
export async function updateLeadStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    const lead = mockLeads.find((l) => l.id === id);
    if (lead) {
      lead.status = status as any;
      return { success: true };
    }
    return { success: false, error: "Lead not found in memory." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) return { success: false, error: error.message };

    await logAuditAction("lead_status_updated", "lead", id, { status });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
