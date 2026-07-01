"use server";

import { createClient } from "@/lib/supabase/server";

export interface PartnerSubmissionResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to process Channel Partner applications.
 * Safe fallback if database is not configured.
 */
export async function submitChannelPartnerForm(formData: {
  name: string;
  company: string;
  phone: string;
  email: string;
  reraId: string;
}): Promise<PartnerSubmissionResult> {
  // 1. Basic validation
  if (!formData.name || !formData.company || !formData.phone || !formData.email || !formData.reraId) {
    return { success: false, error: "All onboarding fields are mandatory." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 2. FALLBACK MOCK MODE: Keys are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Channel Partner application submitted (Simulation mode). Mapped data:", formData);
    }
    return { success: true };
  }

  // 3. ACTIVE SUPABASE MODE: Keys exist
  try {
    const supabase = await createClient();
    
    const { error } = await supabase.from("channel_partners").insert([
      {
        full_name: formData.name,
        company_name: formData.company,
        phone: formData.phone,
        email: formData.email,
        rera_id: formData.reraId,
        status: "pending_review",
      },
    ]);

    if (error) {
      console.error("Supabase partner insertion error:", error.message);
      if (error.message.includes("unique")) {
        return { success: false, error: "This RERA ID is already registered in our network." };
      }
      return { success: false, error: "Database submission error. Please check inputs and retry." };
    }

    return { success: true };

  } catch (err: any) {
    console.error("Server action exception:", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
