# Legal Document Draft Generator Report — MS Legacy

## 1. Legal Document Routes Created
The generator is situated entirely inside the protected CRM space. Public users and clients have no direct access to these endpoints:
- **Main Dashboard**: [`/crm/legal-documents`](file:///D:/Muzzamil/Mslegacy/src/app/crm/legal-documents/page.tsx)
- **Onboarding Wizard**: [`/crm/legal-documents/new`](file:///D:/Muzzamil/Mslegacy/src/app/crm/legal-documents/new/page.tsx)
- **Document Review / Details**: [`/crm/legal-documents/[id]`](file:///D:/Muzzamil/Mslegacy/src/app/crm/legal-documents/[id]/page.tsx)
- **Templates Catalog**: [`/crm/legal-documents/templates`](file:///D:/Muzzamil/Mslegacy/src/app/crm/legal-documents/templates/page.tsx)
- **Dedicated Print Window**: [`/crm/legal-documents/print/[id]`](file:///D:/Muzzamil/Mslegacy/src/app/crm/legal-documents/print/[id]/page.tsx)

## 2. Agreement Templates Added
A registry of **20 templates** has been registered in the template library:
- **16 Standard Approved Templates** (with full recitals, boundaries, commercial parameters, dispute/jurisdiction fields, and signature blocks):
  1. Agreement to Sell / Sale Agreement
  2. Sale Deed
  3. Construction Agreement
  4. Joint Development Agreement (JDA)
  5. Rental / Lease Agreement
  6. Leave and License Agreement
  7. Property Management Agreement
  8. Channel Partner / Broker Agreement
  9. Lead Referral Agreement
  10. General Power of Attorney (GPA)
  11. Special Power of Attorney (SPA)
  12. Memorandum of Understanding (MOU)
  13. Site Visit Confirmation / Client Undertaking
  14. Due Diligence Engagement Letter
  15. NRI Property Advisory Engagement Letter
  16. Contractor Work Agreement
- **4 Pending Advocate Review Templates** (safely locked from final print/generation):
  17. Development Management Agreement basic draft
  18. Land Aggregation / Sourcing Mandate
  19. Construction Work Order
  20. Project Advisory Mandate

## 3. Company Profile Auto-Fill
Centralized company parameters are stored in [`src/lib/company/msLegacyCompanyProfile.ts`](file:///D:/Muzzamil/Mslegacy/src/lib/company/msLegacyCompanyProfile.ts). All generated agreements automatically pull parameters like legal name, CIN, GSTIN, registered addresses, website, represented by details, and bank routing fields, eliminating administrative duplicate inputs.

## 4. Input Forms Created
Reusable, validation-enabled form modules have been created under [`src/components/legal-documents/`](file:///D:/Muzzamil/Mslegacy/src/components/legal-documents/):
- **Party Details Form**: Individual and corporate representative fields, PAN, Aadhaar, and email inputs.
- **Property Details Form**: Survey details, BBMP khata, PID codes, district dimensions, and boundary coordinates.
- **Commercial Terms Form**: Autodetects document categories to dynamically render rental terms (escalations, notices), construction metrics (sq.ft costing, material brands), CP commissions, or standard consideration prices.
- **Payment Schedule Form**: Staged milestone calculator with checkoff validation warnings for price mismatch.
- **Witness Details Form**: Sub-forms for witness identification logs.
- **Special Clauses Form**: Custom legal terms additions, arbitration adjustments, and jurisdiction cities.
- **Template Selector**: Categorized grid for selecting from the 20 templates with search and status badges.

## 5. Preview, Print, and PDF Support
- **Visual Preview Panel**: Simulates an A4 document sheet with custom margins, double-underlined title structures, and a clear `DRAFT — SUBJECT TO LEGAL REVIEW` watermark.
- **Native Browser Printing**: The print page applies print media CSS (hides sidebars, nav panels, control headers; scales fonts to 12pt; preserves page breaks before schedule tables and signature blocks) ensuring that "Print Draft" or "Save as PDF" produces clean pages.

## 6. Legal Review Workflow
A four-stage authorization workflow has been integrated:
- `Draft` -> `Pending Legal Review` -> `Legal Reviewed` (checking title search, stamp duty details) -> `Approved for Print` (unlocks print/export options).
- Timestamps and advocate check-off actions are logged to a persistent audit trail visible on the detail page.

## 7. Safety Disclaimers
Mandatory legal protections are injected into the top watermark, footer schedules, and review notes of all documents:
- Top Watermark: `"DRAFT — SUBJECT TO LEGAL REVIEW"`
- General Footer warning: *This template is generated for documentation preparation only. It is not a substitute for legal advice.*
- Specific warnings for deeds, tenancy, and POA.

## 8. Build Status
- Build test successfully compiled (`npm run build`).

## 9. Remaining Legal Review Required
The following templates are pre-registered but require review by MS Legacy's legal team to change their status from `pending_legal_review` to `reviewed`:
- Development Management Agreement Basic Draft
- Land Aggregation / Sourcing Mandate
- Construction Work Order
- Project Advisory Mandate
