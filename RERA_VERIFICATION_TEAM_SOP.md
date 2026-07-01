# RERA Verification SOP for Sourcing Team

This document outlines the standard operating procedures for verifying public layout details against official state registry records.

---

## 1. Search Protocol on Karnataka RERA

1.  **Access the Portal**: Open the official Karnataka RERA portal: https://rera.karnataka.gov.in
2.  **Navigation**: Click on the **"Project Status"** or **"Registered Projects"** menu.
3.  **Search Input**: Search by the RERA registration number (e.g., `PRM/KA/RERA/...`) or the project name keywords.

---

## 2. Parameter Matching Rules

*   **Promoter Name Match**: The developer's legal corporate name must match the name listed in the RERA registration. For example, Brigade Group projects are registered under *Brigade Enterprises Limited*.
*   **Project Name Match**: The catalogued layout name must match the registered project name. If minor variations exist (e.g., "Park Grove" vs "Prestige Park Grove Phase 1"), document the phase name explicitly.
*   **Location Coordinates**: Check that the registered taluk, district, and village boundary lines match the physical site address.
*   **Validity Check**: Ensure the certificate state is **"Approved"** or **"Active"**, not suspended, withdrawn, or lapsed.

---

## 3. Discrepancy Protocol

*   **If RERA Number is Missing**: Mark RERA Status as `pending_verification` and flag search priority as **P1**.
*   **If Promoter Name Differs**: Log the discrepancy in the verification records notes field and escalate to the Legal Desk.
*   **If Possession Date is Lapsed**: Check the extensions log on the RERA portal before updating the timeline in the database.
*   **Marking RERA Verified**: A project can only be flagged as `RERA Verified` inside the CRM if the RERA number, promoter legal name, and validity state have been verified.
