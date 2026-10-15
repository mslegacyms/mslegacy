import "server-only";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { isUserRole, type UserProfile } from "./roles";

/** Missing configuration, profiles and inactive accounts fail closed. */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  // Authorization belongs to the current request, including an unconfigured deployment.
  await cookies();
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;
    const { data: profile, error } = await supabase.from("profiles")
      .select("id, full_name, phone, role, status").eq("id", user.id).single();
    if (error || !profile || profile.id !== user.id || profile.status !== "active" || !isUserRole(profile.role)) return null;
    return { id: profile.id, fullName: profile.full_name, phone: profile.phone, role: profile.role, status: "active" };
  } catch { return null; }
}
