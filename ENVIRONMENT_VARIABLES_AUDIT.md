# MS Legacy — Environment Variables Audit

This document audits the environment parameters used across the MS Legacy website, CRM portals, and deployment systems.

---

## 1. Mapped Variables Mapped

| Variable Name | Exposure | Required Environment | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public / Browser | Local & Production | The base API URL for your Supabase project. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Browser | Local & Production | The public API key used for public database reads/inserts. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Private / Server** | Vercel Server Only | System API key to bypass RLS for system operations. |
| `NEXT_PUBLIC_SITE_URL` | Public / Browser | Local & Production | Base URL used for dynamic sitemaps and auth redirects. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public / Browser | Production Optional | Google Analytics measurement ID for privacy-safe tracking. |

---

## 2. Security Bounds and Import Restrictions
*   **Browser Safety Rules**: Public variables must be prefixed with `NEXT_PUBLIC_`. Variables without this prefix are stripped from browser builds by Next.js.
*   **Service Key Safety**: `SUPABASE_SERVICE_ROLE_KEY` must never be used in client components. The helper `src/lib/supabase/admin.ts` acts as a guard, throwing runtime errors if it is imported into browser clients.

---

## 3. Detecting App Mode (Simulator vs Live DB)
The application determines its operational state dynamically:
1.  **Simulator/Mock Mode**: Active if `NEXT_PUBLIC_SUPABASE_URL` is empty. The login page will display the Mock Role selector.
2.  **Live Database Sync Mode**: Active if `NEXT_PUBLIC_SUPABASE_URL` is populated. The login page requires real credentials and authenticates against Supabase.

---

## 4. Key Deployment Checklist
- `[ ]` Confirm `.env.local` is listed in your `.gitignore` to prevent secret leaks.
- `[ ]` Verify Vercel deployment variables do not have extra trailing slashes or whitespace characters.
