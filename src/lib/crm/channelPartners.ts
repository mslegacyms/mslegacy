"use server";

import { createClient } from "@/lib/supabase/server";
import { logAuditAction } from "./audit";

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

const mockPartners = [
  { id: "cp-001", fullName: "Rajesh Kumar", companyName: "Apex Realty Bangalore", phone: "+91 98450 12345", email: "rajesh@apexrealty.in", reraId: "PRM/KA/RERA/1251/309/PR/180222/001422", status: "pending_review", created_at: "2026-06-27T10:00:00Z" },
  { id: "cp-002", fullName: "Suresh Gowda", companyName: "Deccan Homes & Land Sourcing", phone: "+91 99800 54321", email: "suresh@deccanhomes.com", reraId: "PRM/KA/RERA/1251/310/PR/180322/001567", status: "approved", created_at: "2026-06-26T15:30:00Z" }
];

export async function getChannelPartners() {
  if (!isSupabaseConfigured) {
    return mockPartners;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("channel_partners")
      .select("id, full_name, company_name, phone, email, rera_id, status, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Supabase fetch partners error:", error?.message);
      return mockPartners;
    }

    return data.map((item) => ({
      id: item.id,
      fullName: item.full_name,
      companyName: item.company_name,
      phone: item.phone,
      email: item.email,
      reraId: item.rera_id,
      status: item.status,
      created_at: item.created_at,
    }));
  } catch (err) {
    console.error("Channel partners service exception:", err);
    return mockPartners;
  }
}

export async function updatePartnerStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    const partner = mockPartners.find((p) => p.id === id);
    if (partner) {
      partner.status = status;
      return { success: true };
    }
    return { success: false, error: "Partner application not found in memory." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("channel_partners")
      .update({ status })
      .eq("id", id);

    if (error) return { success: false, error: error.message };

    await logAuditAction("channel_partner_review_updated", "channel_partner", id, { status });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
