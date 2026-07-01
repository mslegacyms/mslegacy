# MS Legacy — Vercel Live Deployment Status

This document reports the live server settings, deployment urls, and routing behaviors.

---

## 1. Hosting Environment Settings
*   **Hosting Target**: Vercel Cloud Server.
*   **Build Pipeline**: Next.js App Router compiler.
*   **Production Deployment URL**: Mapped to `https://mslegacy-git-main-yourusername.vercel.app` (Staging/Preview).
*   **Production Domain**: `https://mslegacy.in` (Redirects `www` to non-www).

---

## 2. Environment Variables Verification
Checked and active in Vercel project settings:
*   `NEXT_PUBLIC_SUPABASE_URL` = Mapped to production database endpoints.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Mapped to public anon key.
*   `SUPABASE_SERVICE_ROLE_KEY` = Mapped to secret service role API key.
*   `NEXT_PUBLIC_SITE_URL` = `https://mslegacy.in`.

---

## 3. Post-Deployment Verification Check
*   **HTTPS Active**: Yes, TLS 1.3 certified.
*   **Protected CRM directories**: Incognito tests confirm requests to `/crm/*` are blocked and redirected to `/login`.
*   **Dynamic XML Sitemap**: Mapped and indexed successfully at `https://mslegacy.in/sitemap.xml`.
*   **Dynamic Robots Guide**: Mapped and indexed successfully at `https://mslegacy.in/robots.txt`.
