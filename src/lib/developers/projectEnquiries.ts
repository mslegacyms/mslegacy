// projectEnquiries.ts
// Log and retrieve marketplace enquiries with simulation fallback

import { createClient } from "../supabase/client";
import { ProjectEnquiry } from "../types/developerMarketplace";
import { isSupabaseConfigured } from "../env";

export async function createProjectEnquiry(enquiry: Omit<ProjectEnquiry, "id" | "createdAt">): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Enquiries are temporarily unavailable. Please try again later." };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("project_enquiries")
      .insert([
        {
          project_id: enquiry.projectId,
          developer_id: enquiry.developerId,
          full_name: enquiry.fullName,
          phone: enquiry.phone,
          email: enquiry.email,
          interest_type: enquiry.interestType,
          message: enquiry.message,
          enquiry_source: enquiry.enquirySource || "project_marketplace"
        }
      ]);

    if (error) {
      console.error("Error inserting project enquiry:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Failed to submit project enquiry:", err);
    return { success: false, error: err.message || "Unknown error occurred" };
  }
}

export async function getProjectEnquiries(): Promise<ProjectEnquiry[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("project_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching project enquiries:", error.message);
      return [];
    }

    return (data as ProjectEnquiry[]) || [];
  } catch (err) {
    console.error("Failed to fetch project enquiries:", err);
    return [];
  }
}
