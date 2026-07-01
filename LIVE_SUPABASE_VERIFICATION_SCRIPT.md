# MS Legacy — Live Supabase Verification Script

This step-by-step verification script is designed for the system operator to run manual post-deployment tests once live Supabase credentials are configured.

---

## Test Scenario 1: Public Contact Form Insertion
1.  Navigate to the public website contact page: `https://mslegacy.in/contact`.
2.  Fill in the form:
    *   *Name*: "Prod Test Lead"
    *   *Phone*: "+91 99999 00001"
    *   *Email*: "prod.test.lead@mslegacy.in"
    *   *Division*: "Land Sourcing Division"
    *   *Message*: "Verification Test: Please ignore."
3.  Click **Submit Sourcing Request**.
4.  *Expected Result*: The page displays a confirmation notice.
5.  *Database Verification*: Open your Supabase SQL editor and run:
    ```sql
    select * from public.leads where email = 'prod.test.lead@mslegacy.in';
    ```
    Verify the row exists with `lead_source = 'website'` and `status = 'new'`.

---

## Test Scenario 2: Channel Partner Form Insertion
1.  Navigate to `https://mslegacy.in/channel-partners`.
2.  Fill in the registration form:
    *   *Name*: "Prod Partner Test"
    *   *Company*: "Apex Verification Agency"
    *   *RERA ID*: "PRM/KA/RERA/1251/VERIFY/001"
    *   *Phone*: "+91 99999 00002"
    *   *Email*: "prod.partner@mslegacy.in"
3.  Click **Submit Application**.
4.  *Expected Result*: Page displays confirmation alert.
5.  *Database Verification*: Run in SQL Editor:
    ```sql
    select * from public.channel_partners where email = 'prod.partner@mslegacy.in';
    ```
    Verify the row is present with `status = 'pending_review'`.

---

## Test Scenario 3: Admin Registration & Promotion
1.  Navigate to the `/login` page on the live website.
2.  Register a new account (e.g., `admin@mslegacy.in`).
3.  *Expected Result*: User account created in Supabase Auth.
4.  *Promotion*: Retrieve the User UUID from the Supabase dashboard and run:
    ```sql
    update public.profiles
    set role = 'founder', status = 'active'
    where id = 'YOUR-USER-UUID-HERE';
    ```
5.  Log in again on the `/login` page with this account.
6.  *Expected Result*: Automatically redirected to `/crm/dashboard`.

---

## Test Scenario 4: Row-Level Security (RLS) Enforcement
1.  Open an incognito browser window.
2.  Attempt to fetch leads API directly or browse `/crm/dashboard` without logging in.
3.  *Expected Result*: Denied access, automatically redirected to `/login` by `src/proxy.ts`.
4.  Log in with a mock `client` user credentials.
5.  Attempt to navigate to `/crm/dashboard`.
6.  *Expected Result*: Redirected to `/client/dashboard`. Client can only see their own requests.
