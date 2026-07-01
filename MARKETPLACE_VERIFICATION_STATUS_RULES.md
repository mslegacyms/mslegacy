# Marketplace Verification Status Rules

This document outlines verification levels, database constraints, and transitions for catalog listings.

---

## 1. Status States Definition

### 1. Draft
*   *Definition*: Incomplete or unverified internal entry.
*   *Action*: Saved in local datasets; completely hidden from public index.

### 2. Public Information
*   *Definition*: Collected from developer websites or public listings.
*   *Action*: Can be published **only** with the default advisory disclaimers active. "Verified" badge remains hidden.

### 3. Developer Confirmed
*   *Definition*: Sourced directly from written developer emails or project catalog sheets.
*   *Action*: Verification badge displays "Developer Confirmed".

### 4. RERA Verified
*   *Definition*: Checked manually against the official state registry.
*   *Action*: Verification badge displays "RERA Verified" and links to the official certificate.

### 5. MS Legacy Reviewed
*   *Definition*: Audited internally for 30-year mother deed title logs and environmental clearances.
*   *Action*: Verification badge displays "MS Legacy Verified".

---

## 2. Mandatory Progression Checklist
Before changing visibility from `draft` to `published`:
- [ ] RERA registration status checked.
- [ ] Logo permission signed-off or text badge replacement confirmed.
- [ ] No ROI guarantee wording is used in descriptions.
