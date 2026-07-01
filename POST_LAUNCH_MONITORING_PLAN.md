# MS Legacy — Post-Launch Monitoring Plan

This plan establishes the operational metrics, error alerts, and response guidelines for the first 7 days following the live production release.

---

## 1. Initial 24-Hour Review Grid
During the first 24 hours post-launch, monitor these systems hourly:
*   **Vercel Analytics & Logs**: Monitor CPU usage, edge middleware execution times, and HTTP 500 error spikes.
*   **Supabase Database Health**: Check active database connection counts, API response latency, and RLS policy violation triggers in the logs.
*   **Form Submissions**: Confirm that contact form submissions successfully generate notifications and populate leads table rows.

---

## 2. Day 2 to Day 7 Review Grid
Monitor these systems daily:
*   **Google Search Console**: Check indexing status of sitemaps and resolve any crawler block alerts.
*   **Google Analytics (GA4)**: Check bounce rates, user traffic pathways, and form submission conversion numbers.
*   **CRM Database Backups**: Verify that automated daily PG database backups are running cleanly.

---

## 3. Incident Trigger Thresholds
Initiate rollback or debug protocols if these conditions are met:
*   *Stewardship portal down*: Any system-wide downtime on `mslegacy.in` lasting longer than 5 minutes.
*   *Critical security leak*: Any data isolation check failure (e.g. client viewing general CRM data).
*   *Form submission fail*: Any lead submission resulting in server-side crash or HTTP 500.

---

## 4. Daily Founder Review Briefing Format
Send this quick status message to the founder daily at 6:00 PM:
> **MS Legacy Post-Launch Status Report — [Date]**
>
> 1. **Uptime & Health**: Website and CRM online. No server alerts.
> 2. **Acquisitions Activity**: [N] Leads onboarded today.
> 3. **Broker Registrations**: [N] Channel partner signups pending.
> 4. **Systems Check**: Database connections stable. Backups verified.
