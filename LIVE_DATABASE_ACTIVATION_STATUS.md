# MS Legacy — Live Database Activation Status

This document reports the live Supabase tables, migrations status, and Row-Level Security (RLS) policies configured for production launch.

---

## 1. Migration Execution Audit
Verified that target migration scripts `001_` and `002_` have been executed in the Supabase SQL editor:
*   **001 Migration (CRM Core)**: **ACTIVE**. Initialized tables, updated_at triggers, and base indexing parameters.
*   **002 Migration (Alerts & Portals)**: **ACTIVE**. Initialized client request registries, notifications alerts, and document checklists.

---

## 2. Verified Active Tables
Confirming the existence of the following 12 database tables in the `public` schema:

| Table Name | Description | RLS Policy Status |
| :--- | :--- | :--- |
| `profiles` | User accounts and portal roles. | **RLS Enabled** (Access to owner) |
| `leads` | Sourcing inquiries and prospects. | **RLS Enabled** (Access to staff/owner) |
| `lead_activities` | Phone/Email advisory timeline logs. | **RLS Enabled** (Access to staff/owner) |
| `opportunities` | Sourced land parcel registries. | **RLS Enabled** (Read-only, private keys) |
| `opportunity_documents` | Land deed audit references. | **RLS Enabled** (Private bucket) |
| `channel_partners` | Broker application profiles. | **RLS Enabled** (Staff edit only) |
| `tasks` | Advisory deadlines and reminders. | **RLS Enabled** (Staff only) |
| `audit_logs` | Logs for CRM updates. | **RLS Enabled** (Read restricted) |
| `notifications` | In-app notification alerts feed. | **RLS Enabled** (Owner check) |
| `client_requests` | Private buyer consultation requests. | **RLS Enabled** (Isolation active) |
| `partner_lead_submissions` | Broker customer referrals. | **RLS Enabled** (Isolation active) |
| `document_requests` | Legal checklists and status reviews. | **RLS Enabled** (Legal checks active) |

---

## 3. RLS Security Enforcement
*   **Anon Writes Allowed**: Yes, on `leads` and `channel_partners` tables to accept public web form inputs.
*   **General CRM Tables**: Blocked from public writes. Leads and Tasks require valid authenticated sales/founder sessions.
*   **Isolation Policy**: Verified that clients cannot fetch partner submissions, and brokers cannot browse the main leads directory.
