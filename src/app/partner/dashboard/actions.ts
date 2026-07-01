"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";

export interface ReferralResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to process lead submissions from registered Channel Partners.
 */
export async function submitPartnerReferral(formData: {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  interestType: string;
  notes: string;
}): Promise<ReferralResult> {
  if (!formData.clientName) {
    return { success: false, error: "Client name is mandatory." };
  }

  const profile = await getCurrentUserProfile();
  if (!profile || profile.role !== "channel_partner") {
    return { success: false, error: "Unauthorized access." };
  }

  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.log("[PARTNER REFERRAL LOG] Mock referral submission:", formData);
    }
    return { success: true };
  }

  try {
    const supabase = await createClient();
    
    // Insert into partner_lead_submissions table
    const { error } = await supabase.from("partner_lead_submissions").insert([
      {
        partner_id: profile.id,
        client_name: formData.clientName,
        client_phone: formData.clientPhone,
        client_email: formData.clientEmail,
        interest_type: formData.interestType,
        notes: formData.notes,
        status: "submitted",
      },
    ]);

    if (error) {
      console.error("Partner referral insert failed:", error.message);
      return { success: false, error: "Failed to record referral. Please retry." };
    }

    return { success: true };

  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
