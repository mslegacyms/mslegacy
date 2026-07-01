"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

/**
 * Inserts an audit trial row to track actions across the CRM.
 * If Supabase is offline or missing credentials, it logs safely in the server console.
 */
export async function logAuditAction(
  action: "lead_created" | "lead_status_updated" | "lead_activity_added" | "task_created" | "task_completed" | "opportunity_created" | "opportunity_updated" | "channel_partner_review_updated",
  entityType: string,
  entityId?: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  const logMessage = `[AUDIT LOG] Action: ${action} | Entity: ${entityType} | ID: ${entityId || "N/A"}`;
  
  if (process.env.NODE_ENV === "development") {
    console.log(logMessage, metadata);
  }

  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("audit_logs").insert([
      {
        actor_id: user?.id || null,
        action,
        entity_type: entityType,
        entity_id: entityId || null,
        metadata,
      },
    ]);

    if (error) {
      console.warn("Audit logging failed to write to database:", error.message);
    }
  } catch (err) {
    console.warn("Audit logging helper exception:", err);
  }
}
