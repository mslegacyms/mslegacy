import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env, isSupabaseConfigured } from "@/lib/env";
import { isCrmUser, isUserRole } from "@/lib/auth/roles";
import { getRedirectRouteByRole } from "@/lib/auth/redirectByRole";

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const crm = path === "/crm" || path.startsWith("/crm/");
  const partner = path === "/partner" || path.startsWith("/partner/");
  const client = path === "/client" || path.startsWith("/client/");
  const privateRoute = crm || partner || client;
  const login = path === "/login";
  let response = NextResponse.next({ request });
  response.headers.set("Cache-Control", "private, no-store");
  const redirectTo = (pathname: string) => {
    const url = request.nextUrl.clone(); url.pathname = pathname; url.search = "";
    const redirected = NextResponse.redirect(url);
    for (const cookie of response.cookies.getAll()) redirected.cookies.set(cookie);
    for (const header of ["cache-control", "expires", "pragma"]) {
      const value = response.headers.get(header); if (value) redirected.headers.set(header, value);
    }
    return redirected;
  };
  if (!isSupabaseConfigured()) return privateRoute ? redirectTo("/login") : response;
  try {
    const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, { cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        response.headers.set("Cache-Control", "private, no-store");
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
      },
    } });
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return privateRoute ? redirectTo("/login") : response;
    const { data: profile, error: profileError } = await supabase.from("profiles").select("role, status").eq("id", user.id).single();
    if (profileError || !profile || profile.status !== "active" || !isUserRole(profile.role)) return privateRoute ? redirectTo("/login") : response;
    if (login || (crm && !isCrmUser(profile.role)) || (partner && profile.role !== "channel_partner") || (client && profile.role !== "client")) return redirectTo(getRedirectRouteByRole(profile.role));
    return response;
  } catch { return privateRoute ? redirectTo("/login") : response; }
}
