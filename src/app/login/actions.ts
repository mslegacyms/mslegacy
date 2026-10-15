"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { isUserRole } from "@/lib/auth/roles";
import { getRedirectRouteByRole } from "@/lib/auth/redirectByRole";

export interface LoginResult { success: boolean; error?: string; redirectUrl?: string }
export async function authenticateUser(email: string, password?: string): Promise<LoginResult> {
  if (!isSupabaseConfigured()) return { success: false, error: "Secure sign-in is temporarily unavailable. Please contact MS LEGACY." };
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 254 || typeof password !== "string" || !password || password.length > 1024) {
    return { success: false, error: "Enter your registered email and password." };
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error || !data.user) return { success: false, error: "Sign-in failed. Check your credentials and try again." };
    const { data: profile, error: profileError } = await supabase.from("profiles").select("role, status").eq("id", data.user.id).single();
    if (profileError || !profile || profile.status !== "active" || !isUserRole(profile.role)) {
      await supabase.auth.signOut();
      return { success: false, error: "Your portal access is unavailable. Please contact MS LEGACY." };
    }
    (await cookies()).delete("mslegacy_mock_user");
    return { success: true, redirectUrl: getRedirectRouteByRole(profile.role) };
  } catch { return { success: false, error: "Sign-in is temporarily unavailable. Please try again." }; }
}

export async function logout(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Sign-out could not be completed. Please try again.");
  }
  (await cookies()).delete("mslegacy_mock_user");
  redirect("/login");
}
