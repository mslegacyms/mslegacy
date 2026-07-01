# MS Legacy — Vercel Production Launch Checklist

This checklist must be fully signed off by the lead developer and project manager before switching the domain DNS settings to live production status.

---

## 1. Codebase & Git Readiness
- `[ ]` **Main Branch is Clean**: No uncommitted files or local changes exist.
- `[ ]` **Secrets Guard**: Verify that `.env.local` is present in `.gitignore` and has never been pushed to the remote repository.
- `[ ]` **Staging Sign-off**: Staging URL deployment has passed the E2E QA test suite.

---

## 2. Vercel Configuration Check
- `[ ]` **Production Environment Variables**:
    *   `NEXT_PUBLIC_SUPABASE_URL` points to the production database instance.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY` matches the production anon key.
    *   `SUPABASE_SERVICE_ROLE_KEY` is loaded and marked server-only.
    *   `NEXT_PUBLIC_SITE_URL` is set to `https://mslegacy.in`.
- `[ ]` **Build Command**: Set to `npm run build` with Node.js version mapped to `18.x` or `20.x`.

---

## 3. Domain & DNS Checklist
- `[ ]` Mapped `mslegacy.in` and `www.mslegacy.in` in Vercel domains setting.
- `[ ]` Verified DNS A-records are pointing to Vercel IP `76.76.21.21` or CNAME aliases.
- `[ ]` HTTPS certificate is issued and active.

---

## 4. Post-DNS Release Checkups
- `[ ]` Dynamic `/sitemap.xml` is accessible on the production domain.
- `[ ]` Dynamic `/robots.txt` displays correct index exclusion guidelines.
- `[ ]` Public contact form submission successfully writes a new row to the database.
- `[ ]` Protected CRM directories are inaccessible without valid session tokens.
- `[ ]` Rollback path is tested and ready to revert to the previous deployment version on Vercel if needed.
