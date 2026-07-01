# MS Legacy — Live CRM Workflow Test Results

This document verifies the database write operations, updates, and checklist changes within the CRM.

---

## 1. CRM Operations Checksheet

### A. Lead Creation & Kanban Drag
*   *Action*: Onboarded "Aravind Subramanian" manually, and dragged from "New" to "Contacted" column on the pipeline board.
*   *Verification*: Database row updated with `status = 'contacted'`. Audit logging triggered `lead_status_updated` log.
*   *Status*: **Passed (Staging / Mock)**. Awaiting production variables.

### B. Timeline Logs & Task Reminders
*   *Action*: Opened the lead dossier page, added a call log note ("Client requested site visit layout maps"), and registered a reminder task due next week.
*   *Verification*:
    *   Activity timeline displays call note instantly.
    *   Reminder task listed under "Reminders & Tasks".
    *   Row inserted in `tasks` database table.
*   *Status*: **Passed (Staging / Mock)**. Awaiting production variables.

### C. Opportunity Sourcing & Due Diligence Checklists
*   *Action*: Registered a farmstead listing in Kanakapura and updated the due diligence status checklist from "Not Started" to "Under Review".
*   *Verification*:
    *   Sitemap lists public opportunity.
    *   Cheeklist changes saved in the database.
*   *Status*: **Passed (Staging / Mock)**. Awaiting production variables.

---

## 2. Dynamic Notifications Feed
*   *Action*: Opened the header alerts list after registering a lead.
*   *Verification*:
    *   Red counter badge increments correctly.
    *   Dropdown shows "New Lead Onboarded".
*   *Status*: **Passed (Staging / Mock)**.
