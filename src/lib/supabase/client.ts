import { createBrowserClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/lib/env";
export const createClient = () => {
  if (!isSupabaseConfigured()) throw new Error("This service is temporarily unavailable.");
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
};
