"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactSubmissionResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to process contact and lead inquiries.
 * Safe fallback if database is not configured.
 */
export async function submitContactForm(formData: {
  name: string;
  phone: string;
  email: string;
  location: string;
  interestType: string;
  buyerType: string;
  budgetRange: string;
  message: string;
}): Promise<ContactSubmissionResult> {
  // 1. Basic validation
  if (!formData.name || !formData.email || !formData.phone) {
    return { success: false, error: "Required fields are missing." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 2. FALLBACK MOCK MODE: Keys are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Contact form submitted (Simulation mode). Mapped lead data:", formData);
    }
    return { success: true };
  }

  // 3. ACTIVE SUPABASE MODE: Keys exist
  try {
    const supabase = await createClient();
    
    // Map dropdown options to database structures
    const { error } = await supabase.from("leads").insert([
      {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city_country: formData.location,
        interest_type: formData.interestType,
        buyer_type: formData.buyerType,
        budget_range: formData.budgetRange,
        message: formData.message,
        lead_source: "website",
        status: "new",
        priority: formData.interestType === "project_participation" ? "high" : "normal",
      },
    ]);

    if (error) {
      console.error("Supabase lead insertion error:", error.message);
      return { success: false, error: "Database submission error. Please try again." };
    }

    return { success: true };

  } catch (err: any) {
    console.error("Server action exception:", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
