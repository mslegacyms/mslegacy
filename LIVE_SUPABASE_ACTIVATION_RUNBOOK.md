# MS Legacy — Live Supabase Activation Runbook

This runbook guides system operators through the step-by-step SQL migrations, schema verifications, and admin account setup required to connect the live Supabase production database.

---

## 1. Project Initialization & API Mapping
1.  Access the [Supabase Console](https://supabase.com).
2.  Spin up a new project named `mslegacy-prod` in the **ap-south-1 (Mumbai)** region.
3.  Gather connection URLs and keys under **Project Settings** -> **API**:
    *   *URL*: Mapped to `NEXT_PUBLIC_SUPABASE_URL`
    *   *Anon Public Key*: Mapped to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   *Service Role API Key*: Mapped to `SUPABASE_SERVICE_ROLE_KEY` (Server Only).

---

## 2. Execute SQL Database Migrations
Open the **SQL Editor** in the Supabase Dashboard, create a new blank query, and copy/paste and execute the following scripts in order:

### A. Run Migration 001
Execute the contents of `supabase/migrations/001_mslegacy_crm_foundation.sql`. This script initializes:
*   Triggers to auto-manage `updated_at` timestamps.
*   Tables for `profiles`, `leads`, `lead_activities`, `opportunities`, `opportunity_documents`, `channel_partners`, `tasks`, and `audit_logs`.
*   PostgreSQL Row-Level Security (RLS) tables enabling and RLS policy rules.

### B. Run Migration 002
Execute the contents of `supabase/migrations/002_mslegacy_notifications_portals_audit.sql`. This script adds:
*   Tables for `notifications`, `client_requests`, `partner_lead_submissions`, and `document_requests`.
*   Trigger functions and corresponding RLS policies.

---

## 3. Seed Mock Test Records (Optional)
To populate sample listings, tasks, and brokers for testing:
1.  Copy the contents of `supabase/SEED_DATA_SAFE_DEMO.sql`.
2.  Run the query in the Supabase SQL editor.

---

## 4. Elevate the First Admin Profile to Founder
Because profiles are mapped directly to `auth.users` UUID values, you must promote the first admin manually:

1.  In the Supabase console, go to **Authentication** -> **Users** -> **Create User**.
2.  Onboard the user with email (e.g., `admin@mslegacy.in`) and a secure password.
3.  Copy the newly created **User UUID** from the console.
4.  Open the **SQL Editor** and run this query (replace with your UUID):
    ```sql
    update public.profiles
    set role = 'founder', status = 'active'
    where id = 'YOUR-AUTHENTICATED-USER-UUID-HERE';
    ```
5.  Verify the updates in the profiles table:
    ```sql
    select * from public.profiles where role = 'founder';
    ```

---

## 5. Verification Checklist

- `[ ]` **RLS Validation**: Go to Database -> Policies. Verify that all 12 tables have **RLS Enabled**.
- `[ ]` **Unauthenticated Block**: Run `curl -I https://mslegacy.in/crm/dashboard` to verify it redirects to `/login`.
- `[ ]` **Lead Submissions**: Fill out the public contact form and verify the row writes to the `leads` table in Supabase.
