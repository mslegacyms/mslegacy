# MS LEGACY repair results — 16 October 2026

These changes implement the safe repair scope from the platform audit. The repair branch now combines the audited repairs with the newer public-site redesign at commit 70d79da50a51622fe9a547559163137a8e7d0c17. Production and database activation must be verified separately from source publication.

## Implemented

- Removed implicit mock-role authentication and public Founder selection. Configuration, profile lookup and account-state failures deny portal access. Real logout signs out the Supabase session. Redirects preserve refreshed cookies and route property managers to the existing opportunities page.
- Replaced false submission success in the reusable intake actions with validated, durable lead/application writes and returned receipt IDs. Missing configuration and database failures return errors. These actions target the existing private lead queue; comparison intent and all selected project identifiers survive the handoff. The newer public website uses the reviewed-message flow described below instead of invoking these database actions.
- Connected the lead directory, pipeline, dashboard counts and activity notes to authorized database records. Pipeline state changes only after a confirmed write. Removed fictional client KYC, partner identities/referrals and linked-task/checklist clearances.
- Moved publishing decisions to a server action with administrator checks and real persistence. It reports errors while its table is absent and does not claim to change public visibility.
- Replaced raw HTML document insertion with React text rendering. Working drafts are scoped to their authenticated owner in browser-tab storage. Removed fake example drafts and invented company registration/bank/signatory defaults. Browser drafts cannot grant official print approval and print output remains watermarked.
- Implemented real signed-URL requests under Storage RLS, with role/path validation and honest unavailable errors. No storage bucket or document archive has been activated.
- Replaced prepayment factors with a fixed-rate repayment schedule; affordability now accounts for household expenses. Added invalid-input guards to five detailed financial tools and corrected zero-area/FX/price cases. Development tools no longer fake CRM saves; whole-unit revenue excludes residual area, the configured FAR cap is applied, and the per-square-foot betterment calculation uses consistent units. Planning/authority assumptions still require professional verification.
- Associated 160 visible form labels with controls, repaired the dark homepage heading, removed unsupported hero track-record figures, and changed catalog badges to pending confirmation.
- Unified canonical origin configuration, added key page metadata and real privacy/terms pages, used the business contact details supplied by the owner, added browser security headers, and disabled the unreviewed global analytics tracker.
- Upgraded Next.js and matching lint configuration from 16.2.9 to 16.4.1, pinned Supabase packages, updated compatible dependencies, and retained the lockfile.
- Added regression tests and a GitHub quality workflow with read-only permissions and pinned actions. The workflow checks the repaired scope, tests, production dependency audit, types and build.

## Integration with the newer public website

The newer public design, brand palette, logo, service pages, property research notices, mobile navigation and manual enquiry composer are preserved. Public enquiries remain in page memory until the visitor reviews them and chooses email or WhatsApp; preparing a draft does not claim a submission, appointment or receipt. Property IDs and comparison context are included in the message, duplicate slug/ID selections are removed, and malformed references are ignored.

The login page uses the same legacy-anon/new-publishable-key configuration check as the server. Canonicals, sitemap and contact details use shared validated configuration. The sitemap follows the public catalog and excludes private portals and enquiry pages. Global analytics remains disabled.

The newer site's calculator pages remain marked under review. Corrected calculation components and their regression tests are retained in source; this release does not reactivate unverified public planning tools. Private CRM/database capabilities remain subject to the database activation work below.

## Verification

| Check | Result |
|---|---|
| Regression suite | 35 checks passed, including actual PostgreSQL RLS/column-privilege checks using PGlite |
| Pending requirements schema | Clean bootstrap tested; anonymous contact-bearing reads and client publication attempts denied |
| Focused lint for repaired security/data modules and tests | Passed with zero errors and warnings |
| TypeScript | Passed |
| Production build | Passed on Node 24 with Next.js 16.4.1; private pages render per request |
| Local HTTP checks | 15 passed on the integrated build: public pages, metadata endpoints, headers, enquiry context, calculator review notice and forged-role-cookie denial on four private routes |
| Production dependency audit | Zero known vulnerabilities in the checked dependency tree |
| Development dependency audit | Five high-severity transitive development-tool entries remain in the glob/braces lint dependency chain; no forced framework/lint downgrade performed |
| Repository-wide lint | Still fails with 160 errors and 171 warnings in the wider prototype; the entire repository is not claimed lint-clean |
| Interactive browser / mobile | Not completed: Chromium download returned truncated archives. No browser visual or hydrated form pass is claimed |

Repayment tests include independently expected standard/zero-interest EMI values, short terms, bounded prepayment savings, affordability expense sensitivity and component input errors. Authentication tests cover missing/inactive profiles, forged role cookies, sign-out and refreshed-cookie redirects. Document tests verify inert HTML text and cross-owner draft separation. Intake tests verify successful persistence before receipt confirmation and truthful outage responses.

## Database repair staged, not applied

Migration file: supabase/migrations/20261015194346_audit_access_hardening.sql.

It was created with the Supabase CLI and tested on a disposable PostgreSQL instance. It removes recursive profile policies, restricts self-service authorization columns, constrains public intake, prevents browser audit writes/truncation, adds trusted transactional lead audit events, pins function search paths and adds eleven foreign-key indexes. Its internal role lookup accepts no caller-selected identity and returns only the active authenticated caller's role.

Two attempts to apply this migration to project sguilowwuxnorrtcqqha returned "Invalid or expired requestState". A subsequent read confirmed that the new helper and audit trigger are absent and the original recursive policy remains. The live project still has zero users and leads. No business records were created or edited.

Migration 005 has also been contained in source: public access to contact-bearing requirement tables is removed. Public publication stays disabled until a separate safe summary model is implemented. Reusable requirement-intake actions target the private enquiry queue; the newer public requirements pages route visitors to the reviewed-message composer.

## Remaining activation work

1. Restore authorized Supabase migration execution; reconcile the existing foundation and migration history, then apply and re-check the tested hardening migration. Do not blindly replay 001 or activate the remaining portal/marketplace migrations.
2. Restore Vercel team/project management access and verify production/preview configuration for the intended Supabase project and canonical domain. Never paste private keys into an issue or chat. A configured URL is not proof of a working database.
3. Verify preview and production deployments, real sign-in, ownership isolation and one synthetic enquiry through the actual Supabase API before operational use.
4. Complete the remaining marketplace row mapping, publication transaction, client/partner schema and durable document-review/storage workflows. Some other CRM prototype screens remain outside this repair scope.
5. Complete full browser/mobile accessibility, planning/financial/legal evidence review, wider lint cleanup, recovery testing and operational follow-up ownership.

The public website can support the reviewed email/WhatsApp enquiry flow independently of database activation. Until configuration and the migration are verified, private sign-in and unavailable database submission paths intentionally fail closed. A successful source build and staged SQL do not establish an operational CRM.
