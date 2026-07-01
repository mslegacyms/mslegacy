import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Creates a Supabase client for use in browser/client components.
 */
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock or log warning in development, but don't crash
    if (process.env.NODE_ENV === "development") {
      console.warn("Supabase public credentials missing. Check .env.local file.");
    }
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
