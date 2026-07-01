# MS Legacy — Production Environment Checklist

This checklist must be reviewed and checked off before switching the MS Legacy site DNS mapping to live production status.

---

## 1. Credentials Configuration
- `[ ]` **`NEXT_PUBLIC_SUPABASE_URL`** is correctly mapped to the production database instance.
- `[ ]` **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** matches the public anon key.
- `[ ]` **`SUPABASE_SERVICE_ROLE_KEY`** matches the secret role key and is marked server-only.
- `[ ]` **`NEXT_PUBLIC_SITE_URL`** points to `https://mslegacy.in`.

---

## 2. Supabase Settings
- `[ ]` **Authentication Redirects**: Site URL in Auth Settings matches `https://mslegacy.in`.
- `[ ]` **SMTP Email Provider**: SMTP parameters are configured for transaction emails (optional, otherwise default limits apply).
- `[ ]` **Row-Level Security (RLS)**: Enabled across all 12 tables. No public write access is allowed on table objects except for public inserts on `leads` and `channel_partners`.

---

## 3. Deployment Sanity Checks
- `[ ]` **First Founder User Onboarded**: Verified that the administrator user is created and promoted to the `founder` role.
- `[ ]` **Public Forms Live Test**: Contact query successfully writes to the `leads` table.
- `[ ]` **CRM Login Redirection**: Admin email logs in and forwards correctly to `/crm/dashboard`.
- `[ ]` **Middleware / Proxy Interceptions**: Unauthenticated paths attempting `/crm/*` are blocked.
- `[ ]` **Production Build Passed**: Output of `npm run build` runs clean.
