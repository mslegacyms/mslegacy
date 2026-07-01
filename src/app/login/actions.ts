"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { type UserRole } from "@/lib/auth/roles";
import { getRedirectRouteByRole } from "@/lib/auth/redirectByRole";

export interface LoginResult {
  success: boolean;
  error?: string;
  redirectUrl?: string;
}

/**
 * Server action to authenticate a user.
 * Supports active Supabase auth or fallback mock role-based cookie generation.
 */
export async function authenticateUser(
  email: string,
  password?: string,
  mockRole?: UserRole
): Promise<LoginResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const cookieStore = await cookies();

  // 1. FALLBACK MOCK MODE: Keys are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    if (!mockRole) {
      return { success: false, error: "Please select a role for simulation." };
    }
    
    // Set a mock user cookie containing their role (valid for 1 hour)
    cookieStore.set("mslegacy_mock_user", mockRole, {
      maxAge: 3600,
      path: "/",
    });
    
    const targetUrl = getRedirectRouteByRole(mockRole);
    return { success: true, redirectUrl: targetUrl };
  }

  // 2. ACTIVE SUPABASE MODE: Keys exist
  try {
    const supabase = await createClient();
    
    // Authenticate credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password || "",
    });

    if (error || !data.user) {
      return { success: false, error: error?.message || "Invalid credentials." };
    }

    // Retrieve profile role to assign redirect routing
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileErr || !profile) {
      // Default to client if profile is missing
      cookieStore.set("mslegacy_mock_user", "client", { maxAge: 3600, path: "/" });
      return { success: true, redirectUrl: "/client/dashboard" };
    }

    const role = profile.role as UserRole;
    const targetUrl = getRedirectRouteByRole(role);
    return { success: true, redirectUrl: targetUrl };

  } catch (err: any) {
    return { success: false, error: err.message || "An authentication error occurred." };
  }
}
