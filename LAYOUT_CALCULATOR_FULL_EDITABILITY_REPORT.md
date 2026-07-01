# Layout Calculator Full Editability Report

This report documents the config variables, inline input additions, plot type normalization buttons, custom checklists, risk scorings, and build validations completed during this layout calculator upgrade.

---

## 1. Key Metrics & Status
*   **Total Static Routes Optimized**: **46** routes successfully generated with zero warnings.
*   **Editability Index**: All 19 specified factors are fully state-bound and editable in live-presentation style.

---

## 2. Allocation Table Editability
*   **Input Controls**: Roads %, Parks %, CA %, Utilities %, Drains %, Reserved %, and Developer Retained % are now inline numeric fields.
*   **Validation Flags**: Shows instant warnings if total allocations exceed 100%, if saleable efficiency falls below 35%, or if it exceeds 60%.

---

## 3. Plot Yield Mix Editor
*   **Plot Sizes**: Enabled inputs for 20x30, 30x40, 30x50, 40x60, 50x80, Custom 1, and Custom 2.
*   **Yields**: Automatically calculates consumed saleable area, estimated plots, and leftover balance adjustment.
*   **Normalization**: Added a “Normalize plot mix to 100%” button.

---

## 4. Cost and Revenue Inputs
*   **Cost Groups**: Configured inputs for land purchase rates, registration stamp duty, legal, brokerage, DC conversions, road laying, storm drains, water, electric, and contingencies.
*   **Revenue Scenarios**: Inputs for target price per sq.ft and expected inventory absorption outputs conservative, base, and premium GDV projections.

---

## 5. Checklist and Risk Scorings
*   **Checklist Statuses**: Dropdowns for Mother Deed, RTC, mutation, survey sketch, etc., update the readiness score (max 100) and risk indexes live.
*   **Risk Scores**: Dropdowns for title, access, environmental, and financial risks update feasibility grade (Grade A/B/C/D) instantly.

---

## 6. Build Status
Passed Next.js production build verification check.
