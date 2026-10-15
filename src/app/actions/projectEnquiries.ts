"use server";
import { submitContactForm } from "@/app/contact/actions";
import { text, code } from "@/lib/validation/intake";
interface SubmitEnquiryInput {
  fullName: string; phone: string; email: string; interestType: string; message: string;
  projectId?: string; developerId?: string; projectIds?: string[];
  cityCountry?: string; buyerType?: string; budgetRange?: string;
}
/** Use the existing durable staff lead queue until the marketplace schema is deployed. */
export async function submitProjectEnquiry(input: SubmitEnquiryInput) {
  try {
    if (!input || typeof input !== "object") throw new Error("Please complete the enquiry form.");
    const ids = input.projectIds ?? (input.projectId ? [input.projectId] : []);
    if (!Array.isArray(ids) || ids.length > 4) throw new Error("Choose up to four projects.");
    const context = { source: "project_marketplace", projectIds: ids.map(id => text(id, 100)), developerId: text(input.developerId ?? "", 100) };
    return await submitContactForm({ name: input.fullName, phone: input.phone, email: input.email,
      location: text(input.cityCountry ?? "", 200), interestType: code(input.interestType), buyerType: code(input.buyerType ?? "end_user"),
      budgetRange: text(input.budgetRange ?? "", 80), message: text(input.message, 6000) + "\n\nProject context: " + JSON.stringify(context) });
  } catch (error) { return { success: false, error: error instanceof Error ? error.message : "Please check your enquiry." }; }
}
