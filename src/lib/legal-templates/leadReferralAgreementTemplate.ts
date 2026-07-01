import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const leadReferralAgreementTemplate: LegalDocumentTemplate = {
  templateId: "lead-referral",
  templateName: "Lead Referral / Lead Sharing Agreement",
  category: "Business Advisory & Partnerships",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "commercialTerms.commissionPercentage", "commercialTerms.triggerEvent"],
  optionalFields: ["commercialTerms.paymentTimelineDays"],
  clauses: [
    { title: "Referral & Scope", body: "The Referral Party agrees to refer prospective clients looking for property construction, advisory, or development projects to the Lead Owner." },
    { title: "Commission Fee Structure", body: "The Lead Owner shall pay a referral commission upon successful completion of the trigger event by the referred client." },
    { title: "Non-Circumvention", body: "The Lead Owner shall not directly contact, bypass, or do business with referred leads to avoid paying commissions." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Lead Owner Name / MS Legacy]", address: "[Company Address]", pan: "[Company PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Referral Partner Name]", address: "[Partner Address]", pan: "[Partner PAN]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# LEAD REFERRAL / SHARE AGREEMENT

**This Lead Referral Agreement** is made on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"COMPANY"** / **"FIRST PARTY"**);

**AND**

**${p2.name}**, residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"REFERRING PARTY"** / **"SECOND PARTY"**).

---

### 1. SCOPE OF SERVICES
The Referring Party shall introduce potential clients ("Leads") interested in purchasing property, investing in developments, or hiring construction services offered by the Company.

### 2. COMMISSION AND PAYMENTS
* **Commission Rate**: The Company agrees to pay the Referring Party a fee of **${comm.commissionPercentage || "[X]"}%** of the transaction value, or a fixed amount of **₹${(comm.commissionAmount || 0).toLocaleString("en-IN")}** per successful lead conversion.
* **Trigger Event**: Commissions are earned and payable **${comm.triggerEvent || "upon execution of the sale agreement and receipt of the advance amount"}**.
* **Payment Timeline**: Earned commissions shall be paid within **${comm.paymentTimelineDays || 15} days** of the company receiving funds from the referred client.

### 3. CONFIDENTIALITY AND NON-CIRCUMVENTION
* Both parties agree to keep all customer information, lead databases, and financial details strictly confidential.
* The Company shall not circumvent the Referring Party by dealing with the referred Lead directly to bypass the payment of referral fees.

---

**COMPANY (FIRST PARTY)**
Signature: __________________________

**REFERRING PARTY (SECOND PARTY)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

