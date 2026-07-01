import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { type UserProfile, type UserRole } from "./roles";

/**
 * Retrieves the profile of the currently logged-in user.
 * Supports a mock fallback if Supabase credentials are not configured.
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const cookieStore = await cookies();

  // FALLBACK MOCK MODE
  if (!supabaseUrl || !supabaseAnonKey) {
    const mockCookie = cookieStore.get("mslegacy_mock_user");
    if (!mockCookie) return null;

    const role = mockCookie.value as UserRole;
    return {
      id: "mock-user-id",
      fullName: "Muzzamil Ahmad (Demo)",
      phone: "+91 98765 43210",
      role,
      status: "active",
    };
  }

  // SUPABASE ACTIVE MODE
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, full_name, phone, role, status")
      .eq("id", user.id)
      .single();

    if (error || !profile) {
      // Create a default profile if user exists but has no profile row yet
      return {
        id: user.id,
        fullName: user.email?.split("@")[0] || "Unknown Client",
        phone: null,
        role: "client",
        status: "active",
      };
    }

    return {
      id: profile.id,
      fullName: profile.full_name,
      phone: profile.phone,
      role: profile.role as UserRole,
      status: profile.status as "active" | "suspended" | "archived",
    };
  } catch (err) {
    console.error("Authentication check failed:", err);
    return null;
  }
}
