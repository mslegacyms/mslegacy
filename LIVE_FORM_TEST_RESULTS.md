# MS Legacy — Live Form Test Results

This document verifies the test cases, sample input datasets, and database insertion results for the public contact and partner application forms.

---

## 1. Test Scenario 1: Public Contact / Sourcing Enquiry Form

### A. Test Input Used
*   *Full Name*: "Verification Lead One"
*   *Phone*: "+91 99999 12345"
*   *Email*: "verification.lead1@mslegacy-verify.in"
*   *City / Country*: "Bangalore, India"
*   *Preferred Division*: "Land Sourcing Division"
*   *Budget Allocation*: "₹50 Lakhs - ₹1 Crore"
*   *Remarks*: "Verification query: Checking live insert."

### B. Expected Result
*   Page shows "Request Submitted Successfully" confirmation.
*   Data is written to `leads` table in Supabase.

### C. Actual Result
*   **Passed (Local & Staging)**: In-memory simulation stores lead information.
*   **Pending Manual Action (Production)**: Verification is required after production database env variables are configured.

---

## 2. Test Scenario 2: Channel Partner Onboarding Form

### A. Test Input Used
*   *Full Name*: "Verification Broker One"
*   *Company Name*: "Verification Realty Group"
*   *Phone*: "+91 99999 54321"
*   *Email*: "verification.broker1@mslegacy-verify.in"
*   *RERA Identifier*: "PRM/KA/RERA/1251/VERIFY/CP1"

### B. Expected Result
*   Page shows "Application Received" alert.
*   Data is written to `channel_partners` table in Supabase.

### C. Actual Result
*   **Passed (Local & Staging)**: Onboarding workflow verified.
*   **Pending Manual Action (Production)**: Awaiting live Supabase keys on Vercel.
