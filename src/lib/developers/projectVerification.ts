// projectVerification.ts
// Log and retrieve verification records for developer projects

import { createClient } from "../supabase/client";
import { ProjectVerificationRecord } from "../types/developerMarketplace";
import { isSupabaseConfigured } from "../env";

export async function getVerificationRecordsForProject(projectId: string): Promise<ProjectVerificationRecord[]> {
  if (!isSupabaseConfigured()) {
    // Return a mock verification check record
    return [
      {
        id: "mock-ver-1",
        projectId: projectId,
        verificationType: "rera",
        sourceName: "Karnataka RERA portal",
        verificationStatus: "verified",
        notes: "Sample verification report. Checked registration number on official government directory.",
        createdAt: new Date().toISOString()
      }
    ];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("project_verification_records")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.error(`Error fetching verification records for project ${projectId}:`, error.message);
      return [];
    }

    return (data as ProjectVerificationRecord[]) || [];
  } catch (err) {
    console.error(`Failed to fetch verification records for project ${projectId}:`, err);
    return [];
  }
}
