# MS Legacy — Vercel Staging Deployment Runbook

This runbook outlines the steps to deploy a staging build to Vercel, enabling end-to-end QA before redirecting the public domain.

---

## 1. Prepare GitHub Repository
1.  Verify that all local changes are fully committed.
2.  Ensure `.env.local` is in `.gitignore` and is not pushed to remote repositories.
3.  Push your code to the `main` or a `staging` branch.

---

## 2. Import Project to Vercel
1.  Log in to [Vercel Dashboard](https://vercel.com).
2.  Click **Add New** -> **Project**.
3.  Select your repository and click **Import**.
4.  Configure the build details:
    *   *Framework Preset*: **Next.js**
    *   *Build Command*: `npm run build`
    *   *Output Directory*: `.next`

---

## 3. Configure Environment Variables
Under Vercel Settings -> **Environment Variables**, configure:
*   `NEXT_PUBLIC_SUPABASE_URL` = Your staging database API URL.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your public anon key.
*   `SUPABASE_SERVICE_ROLE_KEY` = Your server service role key.
*   `NEXT_PUBLIC_SITE_URL` = The generated Vercel staging deployment URL (e.g., `https://mslegacy-staging.vercel.app`).

---

## 4. Run Staging Deployment
1.  Click **Deploy**.
2.  Once complete, Vercel will issue a unique staging URL (e.g., `https://mslegacy-git-staging-yourusername.vercel.app`).
3.  Copy this URL.

---

## 5. Align Redirects in Supabase Auth
1.  Go to Supabase -> **Authentication** -> **URL Configuration**.
2.  Add your Vercel staging URL to the **Redirect URLs** list:
    *   `https://mslegacy-git-staging-yourusername.vercel.app/**`
3.  This ensures that user authentication redirects are allowed for staging QA.

---

## 6. Staging Testing Guidelines
*   **Form Checks**: Submit a test inquiry on the staging `/contact` page. Confirm that the lead writes to your Supabase tables.
*   **Auth Checks**: Log in via `/login` and confirm you are redirected to the correct dashboard according to the role.
*   **Public Domain Switch**: Only map your production domain `mslegacy.in` once all staging tests pass.
