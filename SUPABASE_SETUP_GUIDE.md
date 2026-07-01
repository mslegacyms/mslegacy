# MS Legacy — Supabase Integration & Setup Guide

This guide outlines the steps required to provision, configure, and synchronize your Supabase cloud database with the MS Legacy platform, enabling live logins and database-backed pipelines.

---

## 1. Provision a Supabase Project

1.  Navigate to [Supabase Cloud](https://supabase.com) and log in.
2.  Click **New Project** and select your organization.
3.  Enter the project details:
    *   *Name*: `mslegacy`
    *   *Database Password*: (Generate a secure password and save it).
    *   *Region*: Select **AWS Mumbai (ap-south-1)** to ensure low latency for users in India.
4.  Wait for the project database to spin up (takes about 1–2 minutes).

---

## 2. Configure Environment Variables

1.  Duplicate the example configuration file at the root of the project:
    *   On Windows PowerShell: `Copy-Item .env.example .env.local`
2.  Open `.env.local` in your editor.
3.  Go to the Supabase Dashboard -> **Project Settings** -> **API**.
4.  Copy the credentials and paste them into `.env.local`:
    *   `NEXT_PUBLIC_SUPABASE_URL` = Copy the **Project URL**.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Copy the **API key** labeled `anon public`.
    *   `SUPABASE_SERVICE_ROLE_KEY` = Copy the secret **API key** labeled `service_role` (keep this secure; do not share it).

Once these values are populated in `.env.local`, the application will automatically switch from the mock/simulation mode to live database sync.

---

## 3. Execute Database Migrations

To build the database tables, triggers, and Row-Level Security rules:

1.  In your Supabase Dashboard, click on the **SQL Editor** icon in the sidebar.
2.  Click **New Query** -> **Blank Query**.
3.  Open the file `supabase/migrations/001_mslegacy_crm_foundation.sql` from your project.
4.  Copy the entire contents of the file.
5.  Paste the SQL commands into the Supabase SQL Editor text area.
6.  Click **Run** (at the bottom right).
7.  Verify that the console returns: `Success. No rows returned.`

---

## 4. Onboard the First Founder / SuperAdmin Account

Since Row-Level Security (RLS) is active, only registered users with the role `founder` or `admin` can view the general directories.

### Step A: Create User in Supabase Auth
1.  Go to the Supabase Dashboard -> **Authentication** -> **Users**.
2.  Click **Add User** -> **Create User**.
3.  Enter the email and password for the admin account (e.g., `admin@mslegacy.in`) and click **Save**.

### Step B: Promote Profile Role to Founder
By default, newly registered users are assigned the `client` role. To promote the account to `founder`:
1.  Go to the Supabase Dashboard -> **SQL Editor** -> **New Query**.
2.  Run this SQL update query (replace with the email you registered):
    ```sql
    update public.profiles
    set role = 'founder'
    where id = (
      select id 
      from auth.users 
      where email = 'admin@mslegacy.in'
    );
    ```
3.  Click **Run**. The account now has full SuperAdmin privileges.

---

## 5. Verify Row-Level Security (RLS) Policies

1.  In your Supabase Dashboard, click on **Database** -> **Policies**.
2.  Confirm that all 8 tables (`profiles`, `leads`, `lead_activities`, `opportunities`, `opportunity_documents`, `channel_partners`, `tasks`, `audit_logs`) have **RLS Enabled**.
3.  Verify that the policies show the customized access limits (e.g., *Founder manages all leads*, *Sales managers read assigned leads*, *Public inserts leads*).

---

## 6. Testing the Login & Troubleshooting

### A. Test Login Flow
1.  Launch the development server: `npm run dev`
2.  Navigate to `http://localhost:3000/login`.
3.  The login card will show a green status alert: **"Database Sync Status: CONNECTED"**, indicating that `.env.local` variables are detected.
4.  Enter the email and password you created.
5.  On click, you will be redirected to the secure CRM dashboard `/crm/dashboard`.

### B. Troubleshooting
*   *Warning: Supabase public credentials missing...*: This error means your `.env.local` is not loaded or variable names have typos. Verify that the file is in the root directory and contains the correct prefix (`NEXT_PUBLIC_`).
*   *Authentication Failures*: Check if the email password was typed correctly. Go to the Supabase Authentication console and make sure the user's status is not "Waiting for email confirmation" (if enabled, you must confirm the sign-up or disable "Confirm Email" in Auth Settings).
