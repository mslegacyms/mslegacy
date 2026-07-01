import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const nriPropertyAdvisoryTemplate: LegalDocumentTemplate = {
  templateId: "nri-property-advisory",
  templateName: "NRI Property Advisory Engagement Letter",
  category: "Business Advisory & Partnerships",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name"],
  optionalFields: ["commercialTerms.considerationAmount"],
  clauses: [
    { title: "Scope of NRI Advisory", body: "The Advisor is engaged to assist the NRI Client in property search, legal title checks, structural audits, and local tax filings in Bangalore." },
    { title: "Remittance & FEMA Compliance", body: "The Client agrees to execute all fund remittances and property purchases in strict compliance with RBI regulations and FEMA rules." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Advisor Name / MS Legacy]", address: "[Company Address]" }) as any;
    const p2 = (data.partyTwo || { name: "[NRI Client Name]", address: "[Client Address]", pan: "[Client PAN]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# NRI PROPERTY ADVISORY ENGAGEMENT LETTER

**Date: ${today}**

To:
**${p2.name}**
Address: ${p2.address}

Dear Client,

We are pleased to confirm our engagement to provide specialized Real Estate Advisory and Property Management Sourcing services in Bangalore, India.

### 1. SERVICES TO BE PROVIDED
We will assist you in:
* Identifying high-yield residential, commercial, or plotting opportunities.
* Facilitating localized legal title searches and municipal approvals audits.
* Representing you for local site visits and providing high-definition video walkthroughs.
* Coordinating with bank channels for NRE/NRO account payments and FEMA compliance procedures.

### 2. ADVISORY FEE
Our advisory fee is set at **₹${(comm.considerationAmount || 0).toLocaleString("en-IN")}** or a fixed commission percentage of [X]% of the property acquisition cost.

---

Sincerely,

**For ${p1.name}**
Signature: __________________________

**Accepted by Client:**
**${p2.name}**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

