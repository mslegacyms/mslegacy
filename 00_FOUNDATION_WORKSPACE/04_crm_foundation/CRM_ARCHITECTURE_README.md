# MS Legacy — CRM Architecture & Schema Overview

This folder serves as the repository for the database migrations, role-based workflows, and integration guides for the private **MS Legacy CRM Dashboard**.

---

## 1. Relational Database Model
The CRM will utilize a PostgreSQL database (hosted on Supabase) to manage leads, properties, legal reviews, and investments.

### Core Tables List
1.  `profiles`: Stores system users (Sales Managers, Legal Officers, Property Managers, SuperAdmins).
2.  `leads`: Tracks prospective buyers, budget preferences, NRI status, and pipeline stages.
3.  `properties`: Houses listings data, including RERA IDs, coordinates, and calculated Wealth Scores.
4.  `interactions`: Logs timeline events (phone calls, emails, site visits, meeting notes).
5.  `documents`: Stores links to scanned deeds, tax receipts, and customer KYC uploads.
6.  `investments`: Manages private project-share participation logs, ticket sizes, and exit terms.

---

## 2. Role-Based Access Controls (RBAC)

*   **SuperAdmin (Founder)**: Full read/write capability. Accesses system logs, financial statistics, commission structures, and user assignments.
*   **Sales Manager**: Accesses `leads` and `interactions`. Logs calls and coordinates site visits. No access to edit global database configurations or audit logs.
*   **Legal Officer**: Accesses `documents` and `properties` to run title searches, write opinions, and enter score parameters. Cannot edit lead pricing or assign leads.
*   **Property Manager**: Accesses properties marked `under_management`. Logs maintenance tasks and manages tenant leases.
*   **External Partners (Brokers)**: Accesses a restricted dashboard to submit leads and track referral fee payouts. No visibility of other client directories.

---

## 3. Automation Engines

*   **Round-Robin Assignment**: Automatically routes incoming website contact leads to active Sales Managers. NRIs are automatically routed to the specialized NRI sourcing division.
*   **SLA Escalations**: Flags leads in the CRM if left in the `New` stage for more than 4 hours without interaction logs.
*   **Checklist Auto-Generator**: Generates task lists when a lead enters the `Legal Due Diligence` stage (e.g., pulling parent deeds, verifying RERA).
