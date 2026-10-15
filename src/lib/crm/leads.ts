"use server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { type Lead } from "@/lib/types/crm";
import { isUuid, text, code } from "@/lib/validation/intake";
const statuses = ["new", "contacted", "qualified", "documentation_review", "site_visit_planned", "proposal_sent", "negotiation", "converted", "lost", "archived"];
const priorities = ["low", "normal", "high", "urgent"];
const fields = "id, full_name, phone, email, city_country, interest_type, buyer_type, budget_range, message, lead_source, status, priority, assigned_to, created_at";
async function staff(write = false) {
  const profile = await getCurrentUserProfile();
  if (!profile || !(write ? ["founder", "admin", "sales"] : ["founder", "admin", "sales", "legal"]).includes(profile.role)) throw new Error("This lead operation is unavailable for your account.");
  return profile;
}
function mapLead(value: unknown): Lead {
  if (!value || typeof value !== "object") throw new Error("Invalid lead record.");
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || typeof row.full_name !== "string" || !statuses.includes(String(row.status)) || !priorities.includes(String(row.priority))) throw new Error("Invalid lead record.");
  const nullable = (v: unknown) => typeof v === "string" ? v : null;
  return { id: row.id, fullName: row.full_name, phone: nullable(row.phone), email: nullable(row.email), cityCountry: nullable(row.city_country),
    interestType: String(row.interest_type ?? ""), buyerType: String(row.buyer_type ?? ""), budgetRange: String(row.budget_range ?? ""), message: nullable(row.message),
    leadSource: String(row.lead_source ?? ""), status: row.status as Lead["status"], priority: row.priority as Lead["priority"],
    assignedToName: row.assigned_to ? "Assigned representative" : "Unassigned", createdDate: String(row.created_at ?? "") };
}
export async function getLeads(): Promise<Lead[]> {
  await staff(); const supabase = await createClient();
  const { data, error } = await supabase.from("leads").select(fields).order("created_at", { ascending: false });
  if (error) throw new Error("The lead queue could not be loaded. Please retry.");
  return (data ?? []).map(mapLead);
}
export async function getLeadById(id: string): Promise<Lead | null> {
  await staff(); if (!isUuid(id)) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("leads").select(fields).eq("id", id).maybeSingle();
  if (error) throw new Error("The lead could not be loaded.");
  return data ? mapLead(data) : null;
}
export async function createLead(input: Omit<Lead, "id" | "createdDate">): Promise<{ success: boolean; data?: Lead; error?: string }> {
  try {
    const profile = await staff(true);
    const name = text(input.fullName,150), status = code(input.status), priority = code(input.priority);
    if (name.length < 2 || !statuses.includes(status) || !priorities.includes(priority)) throw new Error("Please check the lead details.");
    const supabase = await createClient();
    const { data, error } = await supabase.from("leads").insert({ full_name: name, phone: text(input.phone ?? "",30), email: text(input.email ?? "",254),
      city_country: text(input.cityCountry ?? "",200), interest_type: code(input.interestType), buyer_type: code(input.buyerType), budget_range: text(input.budgetRange, 80),
      message: text(input.message ?? "",8000), lead_source: "crm_manual", status, priority, created_by: profile.id }).select(fields).single();
    if (error || !data) return { success: false, error: "The lead could not be saved. Please retry." };
    return { success: true, data: mapLead(data) };
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : "The lead could not be saved." }; }
}
export async function updateLeadStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
  try {
    await staff(true);
    if (!isUuid(id) || !statuses.includes(status)) return { success: false, error: "Invalid lead or status." };
    const supabase = await createClient();
    const { data, error } = await supabase.from("leads").update({ status }).eq("id", id).select("id").maybeSingle();
    return error || !data ? { success: false, error: "The status was not saved. Check your access and retry." } : { success: true };
  } catch { return { success: false, error: "The status was not saved. Please retry." }; }
}
