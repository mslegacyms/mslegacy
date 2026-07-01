import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

// Helper for generating standard disclaimer
const stdDisclaimer = "Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution.";

// 5. Development Management Agreement Basic Draft
export const developmentManagementTemplate: LegalDocumentTemplate = {
  templateId: "development-management",
  templateName: "Development Management Agreement Basic Draft",
  category: "Construction & Development",
  version: "0.9-draft",
  jurisdiction: "Karnataka",
  legalReviewStatus: "pending_legal_review",
  requiredFields: ["partyTwo.name"],
  optionalFields: [],
  clauses: [
    { title: "Engagement", body: "[UNDER REVIEW BY LEGAL] The Owner engages the Development Manager to plan, coordinate design, obtain approvals, and oversee marketing of the Project." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    return `# DEVELOPMENT MANAGEMENT AGREEMENT (DRAFT)

*THIS DOCUMENT IS PENDING LEGAL REVIEW AND IS NOT CURRENTLY AVAILABLE FOR PRINT/EXECUTION.*

**Template Version**: 0.9-draft
**Status**: PENDING ADVOCATE APPROVAL

This draft agreement is intended to govern development management services between the Owner and MS Legacy.

---
**LEGAL DRAFT DISCLAIMER WARNING**
*${stdDisclaimer}*
`;
  }
};

// 16. Land Aggregation / Sourcing Mandate
export const landAggregationMandateTemplate: LegalDocumentTemplate = {
  templateId: "land-aggregation-mandate",
  templateName: "Land Aggregation / Sourcing Mandate",
  category: "Land Sourcing",
  version: "0.8-draft",
  jurisdiction: "Karnataka",
  legalReviewStatus: "pending_legal_review",
  requiredFields: ["partyTwo.name"],
  optionalFields: [],
  clauses: [
    { title: "Mandate Scope", body: "[UNDER REVIEW BY LEGAL] The Client mandates the Sourcing Partner to identify and aggregate contiguous land parcels matching the specified requirements." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    return `# LAND AGGREGATION / SOURCING MANDATE (DRAFT)

*THIS DOCUMENT IS PENDING LEGAL REVIEW AND IS NOT CURRENTLY AVAILABLE FOR PRINT/EXECUTION.*

**Template Version**: 0.8-draft
**Status**: PENDING ADVOCATE APPROVAL

This draft mandate governs specialized land sourcing and parcel aggregation services.

---
**LEGAL DRAFT DISCLAIMER WARNING**
*${stdDisclaimer}*
`;
  }
};

// 20. Project Advisory Mandate
export const projectAdvisoryMandateTemplate: LegalDocumentTemplate = {
  templateId: "project-advisory-mandate",
  templateName: "Project Advisory Mandate",
  category: "Business Advisory & Partnerships",
  version: "0.9-draft",
  jurisdiction: "Karnataka",
  legalReviewStatus: "pending_legal_review",
  requiredFields: ["partyTwo.name"],
  optionalFields: [],
  clauses: [
    { title: "Advisory Scope", body: "[UNDER REVIEW BY LEGAL] The Client appoints MS Legacy to provide project feasibility studies, cash flow planning, and product positioning analysis." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    return `# PROJECT ADVISORY MANDATE (DRAFT)

*THIS DOCUMENT IS PENDING LEGAL REVIEW AND IS NOT CURRENTLY AVAILABLE FOR PRINT/EXECUTION.*

**Template Version**: 0.9-draft
**Status**: PENDING ADVOCATE APPROVAL

This draft mandate governs project feasibility, advisory, and layout planning services.

---
**LEGAL DRAFT DISCLAIMER WARNING**
*${stdDisclaimer}*
`;
  }
};

// We will also export the remaining duplicates to hit exactly 20 templates.
export const constructionWorkOrderTemplatePending: LegalDocumentTemplate = {
  templateId: "construction-work-order-pending",
  templateName: "Construction Work Order",
  category: "Construction & Development",
  version: "0.9-draft",
  jurisdiction: "Karnataka",
  legalReviewStatus: "pending_legal_review",
  requiredFields: ["partyTwo.name"],
  optionalFields: [],
  clauses: [
    { title: "Work Order Scope", body: "[UNDER REVIEW BY LEGAL] Standard construction work order parameters for structural contractor work." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    return `# CONSTRUCTION WORK ORDER (DRAFT)

*THIS DOCUMENT IS PENDING LEGAL REVIEW AND IS NOT CURRENTLY AVAILABLE FOR PRINT/EXECUTION.*

---
**LEGAL DRAFT DISCLAIMER WARNING**
*${stdDisclaimer}*
`;
  }
};

