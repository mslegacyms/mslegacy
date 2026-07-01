import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const contractorWorkOrderTemplate: LegalDocumentTemplate = {
  templateId: "contractor-work-order",
  templateName: "Vendor / Contractor Work Agreement",
  category: "Construction & Development",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "commercialTerms.scopeOfWork"],
  optionalFields: ["commercialTerms.considerationAmount"],
  clauses: [
    { title: "Engagement and Work Scope", body: "The Contractor agrees to execute specialized vendor services (such as fabrication, electrical, plumbing, or masonry work) as outlined in the work schedule." },
    { title: "Rates & Billing", body: "Payment shall be processed based on progressive work certification and certified measurements by the project site engineer." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Developer Name / MS Legacy]", address: "[Company Address]" }) as any;
    const p2 = (data.partyTwo || { name: "[Contractor/Vendor Name]", address: "[Vendor Address]", pan: "[Vendor PAN]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# VENDOR / CONTRACTOR WORK AGREEMENT

**Date: ${today}**

### BY AND BETWEEN:

**${p1.name}** ("Company" / "Contracting Authority");

**AND**

**${p2.name}** ("Vendor" / "Sub-Contractor"), residing/having office at ${p2.address}, PAN: **${p2.pan}**.

---

### 1. SCOPE OF WORK
The Vendor agrees to execute the following specific sub-contracting services at [Project Site Name]:
* **Scope of Work**: ${comm.scopeOfWork || "[Detail electrical, plumbing, structural, tiling work, etc.]"}
* **Timeline**: Completion within **${comm.timelineMonths || "[X]"} months**.

### 2. BILLING AND PAYMENTS
* Progressive milestone payments will be cleared based on joint measurement sheets signed by the Project Site Engineer.
* Total contract value is estimated at **₹${(comm.considerationAmount || 0).toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.considerationAmount || 0)} Only).
* Retainage: [X]% will be withheld from each invoice and released post-defect liability period of [Y] months.

---

**For ${p1.name}**
Signature: __________________________

**Accepted by Vendor:**
**${p2.name}**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

function numberToWords(num: number): string {
  if (num === 0) return "Zero";
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const g = ['', 'Thousand', 'Lakh', 'Crore'];
  let str = '';
  const helper = (n: number): string => {
    let s = '';
    if (n > 99) {
      s += a[Math.floor(n / 100)] + 'Hundred ';
      n %= 100;
    }
    if (n > 19) {
      s += b[Math.floor(n / 10)] + ' ' + a[n % 10];
    } else if (n > 0) {
      s += a[n];
    }
    return s;
  };
  let c = Math.floor(num / 10000000);
  num %= 10000000;
  let l = Math.floor(num / 100000);
  num %= 100000;
  let t = Math.floor(num / 1000);
  num %= 1000;
  let h = num;
  if (c > 0) str += helper(c) + 'Crore ';
  if (l > 0) str += helper(l) + 'Lakh ';
  if (t > 0) str += helper(t) + 'Thousand ';
  if (h > 0) str += helper(h);
  return str.trim();
}

