"use server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, SUBMISSION_UNAVAILABLE } from "@/lib/env";
import { validateContact, text, code } from "@/lib/validation/intake";

export interface ContactSubmissionResult { success: boolean; error?: string; reference?: string }
export interface ContactInput { name: string; phone: string; email: string; location: string; interestType: string; buyerType: string; budgetRange: string; message: string }
export async function submitContactForm(input: ContactInput): Promise<ContactSubmissionResult> {
  let row;
  try {
    if (!input || typeof input !== "object") throw new Error("Please complete the enquiry form.");
    const contact = validateContact(input);
    row = { id: crypto.randomUUID(), full_name: contact.name, phone: contact.phone, email: contact.email,
      city_country: text(input.location, 200), interest_type: code(input.interestType), buyer_type: code(input.buyerType),
      budget_range: text(input.budgetRange, 80), message: text(input.message, 8000), lead_source: "website", status: "new", priority: "normal" };
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : "Please check your entries." }; }
  if (!isSupabaseConfigured()) return { success: false, error: SUBMISSION_UNAVAILABLE };
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert(row);
    if (error) return { success: false, error: SUBMISSION_UNAVAILABLE };
    return { success: true, reference: row.id };
  } catch { return { success: false, error: SUBMISSION_UNAVAILABLE }; }
}
