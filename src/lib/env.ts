/**
 * Environment configuration utilities.
 * Handles checks for public Supabase credentials and server-side secret keys.
 */

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};

/**
 * Checks if the public Supabase client environment variables are fully configured.
 */
export function isSupabaseConfigured(): boolean {
  return !!env.supabaseUrl && !!env.supabaseAnonKey;
}

/**
 * Checks if the server-side service role key is configured.
 */
export const SUBMISSION_UNAVAILABLE = "We couldn't save your enquiry. Your details are still here. Please try again or contact MS LEGACY directly.";
