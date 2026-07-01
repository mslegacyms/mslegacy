import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const brokerAgreementTemplate: LegalDocumentTemplate = {
  templateId: "broker-agreement",
  templateName: "Channel Partner / Broker Agreement",
  category: "Business Advisory & Partnerships",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "commercialTerms.commissionPercentage"],
  optionalFields: ["commercialTerms.exclusivityAndNonCircumvention"],
  clauses: [
    { title: "Engagement", body: "The Company engages the Channel Partner / Broker to market and solicit buyers for the projects listed in the annexures." },
    { title: "Brokerage Commission", body: "The Company shall pay a brokerage commission to the Broker upon successful property registration by the referred buyer." },
    { title: "RERA Compliance", body: "The Channel Partner must be registered with the State Real Estate Regulatory Authority (RERA) and represent project details accurately." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Developer Name / MS Legacy]", address: "[Company Address]", pan: "[Company PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Broker/Channel Partner Name]", address: "[Broker Address]", pan: "[Broker PAN]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# CHANNEL PARTNER / BROKER AGREEMENT

**This Channel Partner Agreement** is signed on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"DEVELOPER"** / **"COMPANY"**);

**AND**

**${p2.name}**, residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"CHANNEL PARTNER"** / **"BROKER"**).

---

### 1. BROKERAGE COMMISSION
* The Developer agrees to pay the Broker a commission of **${comm.commissionPercentage || "[2-3]"}%** of the basic sale price (BSP) of the properties sold through their direct referral.
* **Exclusivity**: ${comm.exclusivityAndNonCircumvention || "Non-exclusive engagement. The Channel Partner may represent other developers, and the Developer may engage other agents."}

### 2. RERA REGISTRATION NOTE
The Channel Partner represents that they possess a valid RERA Agent Registration Number (Karnataka RERA: ${data.propertyDetails?.reraNumber || "[RERA NO]"}) and shall comply with all provisions of the RERA Act, 2016.

### 3. JURISDICTION
This Agreement is subject to the jurisdiction of the courts of Bangalore, Karnataka.

---

**DEVELOPER (FIRST PARTY)**
Signature: __________________________

**CHANNEL PARTNER (SECOND PARTY)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

