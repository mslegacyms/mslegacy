import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session token and enforces route protection policies.
 * Supports a mock fallback mode when Supabase environment variables are missing.
 */
export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define protected route boundaries
  const isCrmRoute = path.startsWith("/crm");
  const isPartnerRoute = path.startsWith("/partner");
  const isClientRoute = path.startsWith("/client");
  const isAuthRoute = path.startsWith("/login");
  const isPrivateRoute = isCrmRoute || isPartnerRoute || isClientRoute;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // FALLBACK MOCK MODE: If Supabase keys are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    const mockUserCookie = request.cookies.get("mslegacy_mock_user");
    
    if (isPrivateRoute && !mockUserCookie) {
      // Redirect unauthenticated requests to login
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    
    if (isAuthRoute && mockUserCookie) {
      // Redirect already logged-in mock users to their dashboards
      const mockRole = mockUserCookie.value;
      const url = request.nextUrl.clone();
      
      if (mockRole === "founder" || mockRole === "admin") {
        url.pathname = "/crm/dashboard";
      } else if (mockRole === "sales") {
        url.pathname = "/crm/leads";
      } else if (mockRole === "legal") {
        url.pathname = "/crm/legal";
      } else if (mockRole === "property_manager") {
        url.pathname = "/crm/properties";
      } else if (mockRole === "channel_partner") {
        url.pathname = "/partner/dashboard";
      } else {
        url.pathname = "/client/dashboard";
      }
      return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
  }

  // STANDARD SUPABASE MODE: Credentials are present
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (isPrivateRoute && !user) {
    // Redirect unauthenticated user to login
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && user) {
    // Fetch profile role and redirect to dashboard
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
      
    const role = profile?.role || "client";
    const url = request.nextUrl.clone();
    
    if (role === "founder" || role === "admin") {
      url.pathname = "/crm/dashboard";
    } else if (role === "sales") {
      url.pathname = "/crm/leads";
    } else if (role === "legal") {
      url.pathname = "/crm/legal";
    } else if (role === "property_manager") {
      url.pathname = "/crm/properties";
    } else if (role === "channel_partner") {
      url.pathname = "/partner/dashboard";
    } else {
      url.pathname = "/client/dashboard";
    }
    return NextResponse.redirect(url);
  }

  return response;
}
