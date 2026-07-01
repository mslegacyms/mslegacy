# MS Legacy — Master Implementation Roadmap

This roadmap outlines the path to transition MS Legacy from a collection of documents into a premium, operational public web application and private CRM. It is divided into 7 sequential stages (Stage 0 to Stage 6) with clear priorities, risk assessments, and approval checkpoints.

---

## Roadmap Overview

```
[Stage 0: File Cleanup & Plan Approval]
                   │
                   ▼
[Stage 1: Brand & Content Finalization]
                   │
                   ▼
[Stage 2: Public Website Design & Frontend Build]
                   │
                   ▼
[Stage 3: CRM Database & Auth Foundation]
                   │
                   ▼
[Stage 4: CRM Dashboard & Lead Workflow Build]
                   │
                   ▼
[Stage 5: Testing, Security & Vercel/Supabase Deploy]
                   │
                   ▼
[Stage 6: Automation, SEO Scale & Marketing Onboarding]
```

---

## Detailed Stages Breakdown

### Stage 0: File Cleanup & Foundation Approval
*   **Tasks**:
    1.  Obtain user approval for the 8 foundation audit documents.
    2.  Consolidate duplicate documents (`property documentation and links`, `website structer` copies).
    3.  Create clean folder structure (as defined in the Audit Report) and convert verified `.docx` files into clean `.md` markdown files.
*   **Priority**: High (Gatekeeper stage)
*   **Dependencies**: None
*   **Estimated Complexity**: Very Low
*   **Risks**: Modifying files before receiving client approval.
*   **Approval Required from User**: Yes, sign-off on the overall foundation plans.
*   **Expected Output**: A clean, organized project directory with zero duplicates and only markdown reference documents.

### Stage 1: Brand & Content Finalization
*   **Tasks**:
    1.  Procure corporate logo assets (Navy and Gold variants) and typography guides.
    2.  Polish the text-heavy sections of the `PROPERTY WEALTH SCORE done.txt` into concise card formats.
    3.  Onboard mock listing data (e.g., 3-5 real property entries with size, budget, coordinates, and RERA numbers) to feed the properties search engine.
*   **Priority**: High
*   **Dependencies**: Stage 0 completion
*   **Estimated Complexity**: Low
*   **Risks**: Building with placeholder images and text delays project launches.
*   **Approval Required from User**: Approval of logo, brand colors, and mock listings text.
*   **Expected Output**: Finalized asset assets, color tokens, and property JSON dataset.

### Stage 2: Website Design & Frontend Build
*   **Tasks**:
    1.  Initialize the Next.js App Router project using TypeScript and Tailwind CSS.
    2.  Implement the global theme token settings (Navy primary, Gold accents, Alabaster backgrounds).
    3.  Construct the public-facing pages: `/` (Home), `/about`, `/properties`, `/investments`, `/nri-services`, `/wealth-score`, `/contact`.
*   **Priority**: High
*   **Dependencies**: Stage 1 completion
*   **Estimated Complexity**: Medium
*   **Risks**: Unresponsive mobile layouts or slow page-speed load times.
*   **Approval Required from User**: Interactive review of Vercel preview links of the public website.
*   **Expected Output**: A fully responsive, beautiful, high-performing Next.js frontend with integrated route setups.

### Stage 3: CRM Database & Auth Foundation
*   **Tasks**:
    1.  Initialize the Supabase Cloud project in the AWS Mumbai region.
    2.  Run the database migrations to create the tables (`profiles`, `leads`, `properties`, `interactions`, `documents`, `investments`).
    3.  Configure authentication providers and session middleware for the `/crm/*` route.
    4.  Establish PostgreSQL Row Level Security (RLS) rules to secure customer data.
*   **Priority**: High
*   **Dependencies**: Stage 2 completion
*   **Estimated Complexity**: Medium-High
*   **Risks**: Misconfigured security rules causing lead data leakage.
*   **Approval Required from User**: Confirm database schema fields and role setups.
*   **Expected Output**: Fully functional Supabase database, operational auth middleware, and secure backend schema API.

### Stage 4: CRM Dashboard & Lead Workflow
*   **Tasks**:
    1.  Build the private dashboard layout, sidebar navigation, and role-specific views.
    2.  Develop the Leads Kanban Board allowing managers to drag and drop leads through stages.
    3.  Build the Property Management registry and the interactive Property Wealth Score™ calculator form for the Legal/SuperAdmin roles.
    4.  Create the Document uploads system linking to encrypted Supabase Storage buckets.
*   **Priority**: Medium-High
*   **Dependencies**: Stage 3 completion
*   **Estimated Complexity**: High
*   **Risks**: Complex workflows causing user experience issues for sales teams.
*   **Approval Required from User**: Walkthrough video review of the active CRM dashboard.
*   **Expected Output**: Complete private CRM dashboard with functional lead staging, document storage, and scoring tools.

### Stage 5: Testing, Security & Deployment
*   **Tasks**:
    1.  Perform comprehensive end-to-end user path testing (form submissions, document uploads, role switching).
    2.  Audit RLS policy rules and enforce database constraints.
    3.  Deploy the production branch of Next.js to Vercel and connect the custom domain name (`mslegacy.in` or equivalent).
*   **Priority**: High
*   **Dependencies**: Stage 4 completion
*   **Estimated Complexity**: Medium
*   **Risks**: Broken API links in the production environment.
*   **Approval Required from User**: Final sign-off on production release.
*   **Expected Output**: Live, fully secure, production-deployed website and CRM system.

### Stage 6: Marketing, SEO, Automation & Scale
*   **Tasks**:
    1.  Verify Google Search Console and submit the dynamic sitemap XML.
    2.  Integrate third-party API platforms (e.g., Twilio for SMS alerts, WhatsApp Business API for site visit schedules).
    3.  Train CRM agents on lead stage transitions and document handling.
*   **Priority**: Medium
*   **Dependencies**: Stage 5 completion
*   **Estimated Complexity**: Low-Medium
*   **Risks**: API key cost escalations.
*   **Approval Required from User**: Permission to connect third-party platforms.
*   **Expected Output**: Fully automated notifications engine, optimized Google SEO ranking index, and onboarded operational team.
