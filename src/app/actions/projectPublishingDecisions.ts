"use client";

// Client-side simulator for project publishing decisions action.
// Fallback logic matches standard client session patterns.

export interface ProjectPublishingDecisionInput {
  projectId: string;
  decision: string;
  decisionNote: string;
  nextAction: string;
}

export async function submitPublishingDecision(input: ProjectPublishingDecisionInput) {
  // Validate basic parameters
  if (!input.projectId || !input.decision) {
    return { success: false, error: "Missing mandatory decision parameters." };
  }

  const allowedDecisions = [
    "keep_internal",
    "approve_public_information_preview",
    "approve_rera_record_matched_preview",
    "send_to_legal_review",
    "request_developer_confirmation",
    "reject_hold"
  ];

  if (!allowedDecisions.includes(input.decision)) {
    return { success: false, error: "Invalid publishing decision value." };
  }

  // Simulated DB success response
  return { 
    success: true, 
    message: "Publishing decision successfully recorded.", 
    data: {
      projectId: input.projectId,
      decision: input.decision,
      decidedAt: new Date().toISOString(),
      decidedBy: "System Administrator"
    } 
  };
}
