# MS Legacy — Privacy-Safe Analytics Setup Guide

This guide details how to configure Google Analytics and Search Console tracking for the MS Legacy public website without compromising user privacy.

---

## 1. Setup Google Analytics 4 (GA4)

1.  Log in to [Google Analytics Console](https://analytics.google.com).
2.  Create a GA4 property named `mslegacy-web`.
3.  Add a **Web Data Stream** and configure:
    *   *Website URL*: `https://mslegacy.in`
4.  Copy the **Measurement ID** (format: `G-XXXXXXXXXX`).
5.  Add this ID to your environment configuration in Vercel:
    *   `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
6.  The application will automatically load the GA scripts using `<AnalyticsProvider>` in `src/app/layout.tsx`.

---

## 2. Privacy-Safe Tracking Parameters
To protect investor privacy, our implementation enforces these strict guidelines:
*   **IP Anonymization**: IP addresses are anonymized automatically by default.
*   **Zero PII Collection**: Do not track user emails, phone numbers, or private portfolio details in event parameters.
*   **Directory Disallow**: Analytics scripts are disabled inside protected directories (`/crm/*`, `/partner/*`, `/client/*`).

---

## 3. Recommended Marketing Event Tracking
We recommend tracking these key interactions on public pages:
*   *Contact Form Submissions*: Track when users submit a consultation request.
*   *Partner Form Submissions*: Track broker onboarding registration clicks.
*   *Wealth Score Calculations*: Track when users request custom audit reports.
