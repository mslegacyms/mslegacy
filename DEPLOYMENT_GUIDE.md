# MS Legacy — Production Deployment Guide

This guide details the step-by-step instructions required to build, test, and deploy the MS Legacy website and CRM to a production environment.

---

## 1. Prerequisites & Specifications
*   **Node.js**: Version `18.x` or `20.x` is highly recommended.
*   **Database**: Supabase cloud PostgreSQL.
*   **Hosting**: Vercel (recommended for Next.js App Router).

---

## 2. Local Verification Build
Always run validation checks locally before pushing to git/production:
1.  Verify packages list: `npm install`
2.  Inspect for TypeScript or lint issues: `npm run lint`
3.  Perform optimized production compile: `npm run build`

---

## 3. Provisioning Production Supabase Database

1.  Create a project in your [Supabase Dashboard](https://supabase.com).
2.  Open the **SQL Editor** in the sidebar.
3.  Execute the migration scripts in order:
    *   `supabase/migrations/001_mslegacy_crm_foundation.sql` (Creates core tables, RLS, and indices).
    *   `supabase/migrations/002_mslegacy_notifications_portals_audit.sql` (Creates portals and alerts checksheet).
4.  Optionally, run `supabase/SEED_DATA_SAFE_DEMO.sql` to populate sample test entries.

---

## 4. Deploying to Vercel

1.  Create a project on [Vercel](https://vercel.com).
2.  Import your MS Legacy repository.
3.  Configure the build settings:
    *   *Framework Preset*: **Next.js**
    *   *Root Directory*: `./` (or project root)
4.  Add the **Environment Variables** in settings:
    *   `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase Project URL.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your public anon key.
    *   `SUPABASE_SERVICE_ROLE_KEY` = Your secret service role API key.
    *   `NEXT_PUBLIC_SITE_URL` = Your final production domain (e.g., `https://mslegacy.in`).
5.  Click **Deploy**.

---

## 5. Domain Connection & Verification

1.  Under Vercel Project -> **Settings** -> **Domains**, add `mslegacy.in`.
2.  Update your DNS provider settings (CNAME or A records) to map to Vercel.
3.  Go to Supabase -> **Authentication** -> **URL Configuration**:
    *   Update **Site URL** to `https://mslegacy.in`.
    *   Add redirect URLs: `https://mslegacy.in/**` to allow secure auth redirects.
4.  Submit a test contact query from the website, log into `/login` with an admin user, and verify RLS updates.

---

## 6. Rollback Procedures
If a production issue is identified:
*   *Vercel*: Go to Deployments, locate the previous working compile version, click the options menu, and select **Redeploy** to roll back immediately.
