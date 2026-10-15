"use server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { isUuid, text } from "@/lib/validation/intake";
export interface ProjectPublishingDecisionInput { projectId: string; decision: string; decisionNote: string; nextAction: string }
export async function submitPublishingDecision(input: ProjectPublishingDecisionInput) {
  const profile = await getCurrentUserProfile();
  if (!profile || !["founder", "admin"].includes(profile.role)) return { success: false, error: "Only an active administrator can record a publishing decision." };
  const allowed = ["keep_internal", "approve_public_information_preview", "approve_rera_record_matched_preview", "send_to_legal_review", "request_developer_confirmation", "reject_hold"];
  if (!input || !isUuid(input.projectId) || !allowed.includes(input.decision)) return { success: false, error: "Select a saved project and valid decision." };
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("project_publishing_decisions").insert({ project_id: input.projectId, decision: input.decision,
      decision_note: text(input.decisionNote, 4000), next_action: text(input.nextAction, 1000), decided_by: profile.id });
    if (error) return { success: false, error: "The decision could not be saved. Public visibility has not been changed." };
    return { success: true, message: "Decision recorded. Public visibility requires the publishing workflow.", data: { projectId: input.projectId, decision: input.decision, decidedAt: new Date().toISOString(), decidedBy: profile.fullName ?? "Administrator" } };
  } catch { return { success: false, error: "The decision could not be saved. Please try again." }; }
}
