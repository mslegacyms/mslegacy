"use server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { validateContact, text } from "@/lib/validation/intake";
export interface PartnerSubmissionResult { success: boolean; error?: string; reference?: string }
export async function submitChannelPartnerForm(input: { name: string; company: string; phone: string; email: string; reraId: string }): Promise<PartnerSubmissionResult> {
  let row;
  try {
    if (!input || typeof input !== "object") throw new Error("Please complete the application.");
    const contact = validateContact(input), company = text(input.company, 200), reraId = text(input.reraId, 150);
    if (!company || !reraId) throw new Error("Enter your company name and RERA ID.");
    row = { id: crypto.randomUUID(), full_name: contact.name, phone: contact.phone, email: contact.email, company_name: company, rera_id: reraId, status: "pending_review" };
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : "Please check your entries." }; }
  const unavailable = { success: false, error: "We couldn't save your application. Your details are still here. Please try again or contact MS LEGACY." };
  if (!isSupabaseConfigured()) return unavailable;
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("channel_partners").insert(row);
    return error ? unavailable : { success: true, reference: row.id };
  } catch { return unavailable; }
}
