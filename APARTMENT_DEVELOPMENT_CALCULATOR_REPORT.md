# Apartment Development Calculator Report

This report documents the config schemas, page routes, unit mix plans, cost matrices, visual diagrams, and build validations completed during this layout calculator upgrade.

---

## 1. Key Metrics & Status
*   **Total Static Routes Optimized**: **47** routes successfully generated with zero warnings.
*   **New Route**: `/calculators/apartment-development`
*   **New component**:
    *   `ApartmentDevelopmentCalculator.tsx` (Handles inputs, checklists, risk scoring)
    *   `ApartmentFeasibilityDiagram.tsx` (Renders footprint coverage bars and floor sketches)
*   **New configs**:
    *   `apartmentAuthorityProfiles.ts` (Stores FAR limits, ground coverage percentages, setbacks, and cost metrics for BDA, BMRDA, GP, and DTCP)

---

## 2. Dynamic Inputs & Scenarios
*   **FAR Potential Math**: Calculates gross land, base/premium/TDR FAR, common area loadings, and net saleable apartment sq.ft.
*   **Unit Mix Yield**: Inputs for Studio, 1BHK, 2BHK, 3BHK, etc. calculate unit counts, Consumed Area, and Balance Adjustment sq.ft with a "Normalize mix to 100%" button.
*   **Parking & Services**: Estimates car parks required, visitor parking spaces, ev provisions, and parking area in sq.ft.
*   **Revenue GDV**: Evaluates target selling prices and expected absorption rates to output Conservative, Base, and Premium GDV projections.

---

## 3. Checklist and Risk Scorings
*   **Checklist**: Interactive statuses for Mother Deed, RTC, plan sanctions, env clearances, and BESCOM NOCs update the readiness score (max 100).
*   **Risk Score**: Dropdowns for title, zoning, and cost risks evaluate the feasibility grade (Grade A/B/C/D) on the sticky card.

---

## 4. Build Status
Passed Next.js production build verification check.
