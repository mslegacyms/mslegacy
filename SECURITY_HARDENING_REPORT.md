# MS Legacy — Security Hardening Report

This report summarizes the security audit and architectural hardening steps completed to secure the website and CRM portals for production launch.

---

## 1. Route Protection & Interceptors Status
*   **The Next.js 16 Proxy Interceptor (`src/proxy.ts`)**: Enforces session validations on all matching routes:
    *   `/crm/:path*`
    *   `/partner/:path*`
    *   `/client/:path*`
*   **Redirect Enforcement**: Requests without verified session tokens (Supabase user session or mock role cookie) are immediately redirected to `/login` before rendering occurs.
*   **Public Access**: Marketing pages (`/about`, `/services`, `/contact`, `/opportunities`, `/resources`) remain fully public.

---

## 2. API Key Safety & Environment Isolation
*   **Anon Key Restriction**: Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are exposed in browser client modules.
*   **Service Role Protection**: `SUPABASE_SERVICE_ROLE_KEY` is loaded strictly inside server modules. A compile-time guard in `src/lib/supabase/admin.ts` throws errors if it is imported into browser client code.

---

## 3. Row-Level Security (RLS) Policy Audit
All tables created in migrations `001` and `002` have Row-Level Security explicitly enabled. Access queries are filtered inside PostgreSQL:
*   `profiles`: Read/update operations restricted to the authenticated account ID. Founder/Admin roles bypass constraints.
*   `leads` / `lead_activities` / `tasks`: restricted to the assigned advisors. Founder/Admin holds complete command.
*   `client_requests` / `partner_lead_submissions`: Query filters restrict reads strictly to the logged-in client/partner profile ID, preventing cross-profile leakage.

---

## 4. Public Form Abuse Protection
*   Public contact and partner onboarding routes pass inputs through Server Actions (`src/app/actions/leads.ts` and `src/app/actions/channelPartners.ts`) executing field validations before writing database rows.
*   **Abuse Risks & Mitigation (TODO)**:
    *   *Rate Limiting*: Implement rate-limiting on server routes in Stage 6 to block request spams.
    *   *CAPTCHA Integration*: Onboard Turnstile or Google reCAPTCHA v3 on public lead submission buttons before launch.

---

## 5. Client & Partner Portal Data Isolation
*   Client and partner layout routes utilize Server-side token validation. 
*   **Data Isolation**: Queries fetch matching records strictly by checking `auth.uid() = client_id` or `auth.uid() = partner_id` in PostgreSQL. Brokers cannot access general CRM lead boards, and clients can only view requested documents issued to their specific profiles.

---

## 6. Document Storage & Private URLs
*   **Private Signed Link Strategy**: Documents are never hosted on public URLs.
*   **Link Expiry**: Download links generated via `src/lib/storage/documents.ts` enforce a strict 60-second URL signature expiration, meaning links shared outside the session will fail immediately.

---

## 7. Security Action Items
1.  **Stage 6 Rate Limiting**: Limit API routes to 5 lead submissions per IP per minute.
2.  **CAPTCHA Onboarding**: Integrate Cloudflare Turnstile inside `/contact` and `/channel-partners` forms.
3.  **Logs Monitoring**: Set up database alert triggers in Supabase to monitor RLS violations.
