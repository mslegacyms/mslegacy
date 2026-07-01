import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const mouTemplate: LegalDocumentTemplate = {
  templateId: "mou",
  templateName: "Memorandum of Understanding / MOU",
  category: "Business Advisory & Partnerships",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name"],
  optionalFields: ["commercialTerms.considerationAmount"],
  clauses: [
    { title: "Purpose", body: "The Parties express their mutual intent to collaborate on the project under discussion, setting forth initial understandings and roles." },
    { title: "Financial Understandings", body: "The parties outline estimated investments, revenue sharing ratios, and deposit structures which will be finalized in the definitive agreement." },
    { title: "Non-Binding Nature", body: "This MOU is a declaration of intent only and, except for confidentiality and exclusivity clauses, does not create legally binding obligations." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[First Party Name]", address: "[First Party Address]", pan: "[First Party PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Second Party Name]", address: "[Second Party Address]", pan: "[Second Party PAN]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# MEMORANDUM OF UNDERSTANDING (MOU)

**This Memorandum of Understanding** ("MOU") is executed on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"FIRST PARTY"**);

**AND**

**${p2.name}**, residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"SECOND PARTY"**).

---

### 1. PURPOSE AND COLLABORATION
The Parties intend to collaborate for the development of [Project/Land Details]. This MOU sets forth the broad principles under which the Parties will negotiate and execute a definitive contract.

### 2. PRINCIPLES OF AGREEMENT
* **Commercial Expectation**: The estimated financial commitment is **₹${(comm.considerationAmount || 0).toLocaleString("en-IN")}** with a profit sharing ratio of [X]% to First Party and [Y]% to Second Party.
* **Exclusivity**: Both parties agree not to negotiate with any third party for a period of [Days] days from signing.

### 3. NON-BINDING CLAUSE
Save for clauses relating to Exclusivity, Confidentiality, and Dispute Resolution, this MOU is non-binding and is intended solely to facilitate negotiations. Neither party shall be liable to the other for failing to execute a definitive agreement.

---

**FIRST PARTY**
Signature: __________________________

**SECOND PARTY**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

