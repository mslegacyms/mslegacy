# MS Legacy — Launch Incident Response Playbook

This playbook defines the severity tiers, immediate action steps, and communication procedures for issues encountered during the live launch of MS Legacy.

---

## 1. Incident Severity Classification

*   **P1 (Critical)**: Site-wide downtime, data security breach, private data exposed publicly, or CRM route interceptor bypass.
*   **P2 (High)**: Form submission fails, user login loops, or email notifications blocked.
*   **P3 (Normal)**: Minor copy bugs, page load speed slowdowns, or analytics tracker failures.

---

## 2. Playbook Action Steps

### Incident A: CRM Data Access / Isolation Breach (P1)
*   *Immediate Action*: Switch the Vercel production routing target back to the previous deployment version or activate Maintenance Mode.
*   *Verification*: Verify RLS policy configurations in the Supabase Dashboard.
*   *Founder Alert*: "Critical system access issue identified. Temporary maintenance window activated while our engineering desk resolves database settings."

### Incident B: Public Lead Form Failures (P2)
*   *Immediate Action*: Check server action output logs in Vercel to inspect for database connection timeouts.
*   *Fix Path*: Switch the form to save leads locally (in-memory simulator) if database limits are hit, then notify engineering.
*   *Founder Alert*: "Public contact form experiencing connection latency. Fallback mode activated to ensure no leads are lost."

### Incident C: DNS / SSL Resolution Delays (P2)
*   *Immediate Action*: Verify DNS records propagation status using DNS propagation checkers.
*   *Fix Path*: Confirm Vercel Nameservers are mapped correctly. Do not edit main files.

---

## 3. Post-Incident Review Protocol
For any P1 or P2 incidents:
1.  Document the timeline of the incident.
2.  Determine the root cause (e.g. database overload, RLS syntax error).
3.  Implement automated regression checks to prevent recurrence before relaunching.
