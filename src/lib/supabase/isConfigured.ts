import { isSupabaseConfigured as checkConfig } from "@/lib/env";

/**
 * Re-export environment configuration status.
 */
export const isSupabaseConfigured = checkConfig;
