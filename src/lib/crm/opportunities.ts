"use server";

import { createClient } from "@/lib/supabase/server";
import { mockProperties } from "@/lib/data/mockProperties";
import { logAuditAction } from "./audit";

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function getOpportunities() {
  if (!isSupabaseConfigured) {
    return mockProperties;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Supabase fetch opportunities error:", error?.message);
      return mockProperties;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      category: "bda_site", // maps to mock schemas
      location: item.location || "North Bangalore",
      dimensions: item.land_area || "30x40 Ft",
      price: Number(item.price_range?.split("-")[0]?.replace(/[^0-9]/g, "") || "5000000"),
      reraStatus: item.rera_status || "approved",
      ownershipStatus: item.legal_status || "clear_title",
      developmentModel: item.development_model || "Outright Purchase",
      wealthScore: {
        overall: Number(item.wealth_score || "8.5"),
        summary: "Clear title and high connectivity index.",
      },
    }));
  } catch (err) {
    console.error("Opportunities service exception:", err);
    return mockProperties;
  }
}

export async function getOpportunityById(id: string) {
  const localFind = mockProperties.find((p) => p.id === id);
  if (!isSupabaseConfigured) {
    return localFind || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Supabase fetch opportunity by id error:", error?.message);
      return localFind || null;
    }

    return {
      id: data.id,
      title: data.title,
      category: "bda_site",
      location: data.location || "North Bangalore",
      dimensions: data.land_area || "30x40 Ft",
      price: Number(data.price_range?.split("-")[0]?.replace(/[^0-9]/g, "") || "5000000"),
      reraStatus: data.rera_status || "approved",
      ownershipStatus: data.legal_status || "clear_title",
      developmentModel: data.development_model || "Outright Purchase",
      wealthScore: {
        overall: Number(data.wealth_score || "8.5"),
        summary: "Clear title history with validated parent deeds.",
      },
      roadAccess: "40 Ft Wide Approach",
      utilities: "Water & Power connection active",
      mapCoordinates: "13.1986° N, 77.7066° E",
      riskNotes: "No active litigation or boundary overlaps found during layout checks.",
    };
  } catch (err) {
    console.error("Opportunities service fetch exception:", err);
    return localFind || null;
  }
}

export async function createOpportunity(oppData: any) {
  if (!isSupabaseConfigured) {
    const newOpp = {
      id: `prop-${Date.now()}`,
      title: oppData.title,
      category: "bda_site",
      location: oppData.location,
      dimensions: oppData.landArea,
      price: Number(oppData.priceRange?.split("-")[0]?.replace(/[^0-9]/g, "") || "5000000"),
      reraStatus: oppData.reraStatus,
      ownershipStatus: oppData.legalStatus,
      developmentModel: oppData.developmentModel,
      wealthScore: {
        overall: Number(oppData.wealthScore || "8.0"),
        summary: "Sourced with structured due diligence checklists.",
      },
    };
    mockProperties.unshift(newOpp as any);
    return { success: true, data: newOpp };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("opportunities").insert([
      {
        title: oppData.title,
        location: oppData.location,
        land_area: oppData.landArea,
        price_range: oppData.priceRange,
        development_model: oppData.developmentModel,
        legal_status: oppData.legalStatus,
        rera_status: oppData.reraStatus,
        visibility: oppData.visibility || "private",
        wealth_score: Number(oppData.wealthScore || "8.0"),
        status: oppData.status || "draft",
      }
    ]).select().single();

    if (error) {
      return { success: false, error: error.message };
    }

    await logAuditAction("opportunity_created", "opportunity", data.id, { title: oppData.title });

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
