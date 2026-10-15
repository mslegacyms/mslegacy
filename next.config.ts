import type { NextConfig } from "next";
const csp = [
  "default-src 'self'", "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob: https:", "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co" + (process.env.NODE_ENV === "development" ? " ws: http:" : ""),
  "media-src 'self' https: blob:", "frame-src https://www.youtube.com https://maps.google.com",
  "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'",
].join("; ");
const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ] },
      ...["/crm/:path*", "/client/:path*", "/partner/:path*", "/login"].map(source => ({
        source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      })),
    ];
  },
};
export default nextConfig;
