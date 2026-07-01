/**
 * Environment configuration utilities.
 * Handles checks for public Supabase credentials and server-side secret keys.
 */

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  
  // Server-only variables (will be blank on the client/browser bundle)
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
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
export function isSupabaseServerConfigured(): boolean {
  return isSupabaseConfigured() && !!env.supabaseServiceKey;
}
