import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * SERVER-ONLY SUPABASE ADMIN CLIENT
 * 
 * WARNING: This client bypasses PostgreSQL Row-Level Security (RLS).
 * It must NEVER be imported, referenced, or executed on the client-side/browser bundle.
 * Only use for system operations (like system logs or role modifications) under Server actions.
 */

if (typeof window !== "undefined") {
  throw new Error("CRITICAL SECURITY ERROR: supabase/admin.ts imported on browser client.");
}

export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured() || !serviceKey) {
    throw new Error("Supabase Server credentials missing. Check SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }
  
  return createClient(env.supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
