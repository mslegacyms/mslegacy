# MS Legacy — End-to-End QA Test Plan

This document outlines the test cases, expected results, and validation steps for checking the MS Legacy public website and CRM portals.

---

## 1. Public Marketing Website Test Cases

### Test Case 1.1: Page Loading & Theme
*   **Action**: Navigate to the homepage, `/about`, `/services`, and `/opportunities`.
*   **Verification**: 
    *   No 404 errors or layout breaks.
    *   Fonts load correctly (Outfit and Cormorant Garamond).
    *   Primary Gold/Navy styling matches brand guidelines.

### Test Case 1.2: Public Form Validation & Submission
*   **Action**: Submit the contact form on `/contact` with missing email or phone fields.
*   **Verification**:
    *   Form triggers validation alerts.
    *   Valid submissions show a clear confirmation state.
    *   Verify the row writes to the `leads` table in Supabase (or logs a safe console output in simulator mode).

---

## 2. CRM & Private Dashboard Test Cases

### Test Case 2.1: Route Interceptions & Redirects
*   **Action**: Try accessing `/crm/dashboard` directly in an incognito window.
*   **Verification**: Access must be blocked, and the window redirected to `/login`.

### Test Case 2.2: Authentication & Role Redirection
*   **Action**: Log in with credentials mapped to different roles (e.g., `founder`, `sales`, `legal`).
*   **Verification**: 
    *   Redirection maps to target dashboards:
        *   `founder` ➔ `/crm/dashboard`
        *   `sales` ➔ `/crm/leads`
        *   `legal` ➔ `/crm/legal`

### Test Case 2.3: Kanban Card Interactivity
*   **Action**: Drag a card from "New Leads" to "Contacted" on the Kanban board (`/crm/pipeline`).
*   **Verification**: 
    *   Card moves and updates state.
    *   Updates the status field in Supabase (or locally in mock mode).

---

## 3. Client & Partner Portals Isolation

### Test Case 3.1: Client Portal Security Boundaries
*   **Action**: Access the client portal dashboard at `/client/dashboard`.
*   **Verification**:
    *   No general CRM links are visible.
    *   Client can only view their own request details.

### Test Case 3.2: Partner Lead Referrals
*   **Action**: Submit a referral via the partner form on `/partner/dashboard`.
*   **Verification**: Inserts row to `partner_lead_submissions` and updates the partner dashboard table.
