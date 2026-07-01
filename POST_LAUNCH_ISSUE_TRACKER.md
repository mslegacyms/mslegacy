# MS Legacy — Post-Launch Issue Tracker

This tracker monitors, prioritizes, and logs resolutions for operational concerns identified post-deployment.

---

## Active Issues Register

| Issue ID | Date Found | Area / Module | Severity | Description | Owner | Status | Fix / Resolution Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CP-001** | 2026-06-28 | Authentication | **P2** | Founder mock user session cookie expires on browser close. | Muzzamil | **Resolved** | Updated session cookie persistence settings. |
| **CP-002** | 2026-06-28 | UI Layout | **P3** | Long company names overflow the broker applications table. | Sandeep | **Resolved** | Added word-break styles to table cell components. |
| **CP-003** | 2026-06-28 | Sourcing | **P4** | Add coordinates maps iframe block in opportunity pages. | Kiran | **Open** | Scheduled for Stage 10 enhancement review. |

---

## Severity Tiers Reference
*   **P1 (Critical)**: Site-wide downtime, data security breach, RLS policy bypass.
*   **P2 (High)**: Lead forms broken, user logins failing, key workflows blocked.
*   **P3 (Normal)**: UI spacing glitches, SEO description updates, analytics trackers down.
*   **P4 (Enhancement)**: Feature requests, minor styling polish.
