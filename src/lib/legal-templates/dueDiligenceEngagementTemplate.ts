import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const dueDiligenceEngagementTemplate: LegalDocumentTemplate = {
  templateId: "due-diligence-engagement",
  templateName: "Due Diligence Engagement Letter",
  category: "Business Advisory & Partnerships",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name"],
  optionalFields: ["commercialTerms.considerationAmount"],
  clauses: [
    { title: "Scope of Diligence", body: "The Advisor is engaged to perform title searches (30-year flow), verify BBMP/BDA sanctions, RERA compliance, and tax records for the Scheduled Property." },
    { title: "Client Cooperation", body: "The Client agrees to provide all copies of parent deeds, khata receipts, encumbrance certificates, and partition layouts necessary for audit." },
    { title: "No Guarantee of Clear Title", body: "The Advisor's review is based on public records and copies provided. The report is an opinion and does not constitute a title guarantee." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Advisor Name / MS Legacy]", address: "[Company Address]", pan: "[Company PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Client Name]", address: "[Client Address]", pan: "[Client PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# DUE DILIGENCE ENGAGEMENT LETTER

**Date: ${today}**

To:
**${p2.name}**
Address: ${p2.address}
PAN: ${p2.pan}

**RE: Engagement for Legal Due Diligence & Title Search of Property Survey No: ${prop.surveyNumber}**

Dear Client,

We are pleased to confirm our engagement by you to conduct a title verification audit and due diligence search on the property described in the Schedule.

### 1. SCOPE OF SERVICES
Our due diligence audit will cover:
* Review of 30-year parent deeds and title flow.
* Search of Encumbrance Certificates (EC) from the Sub-Registrar's office.
* Verification of Khata registration and BBMP/RERA sanction approvals.
* Identification of pending boundary litigations or land acquisition notices if published.

### 2. PROFESSIONAL FEE
You agree to pay a professional fee of **₹${(comm.considerationAmount || 0).toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.considerationAmount || 0)} Only) for this engagement, with [X]% paid as advance and the balance upon delivery of the Title Search Report.

### 3. DISCLAIMER AND SCOPE LIMITS
Our report will be prepared based on public property records and copy documents provided by you or the seller. We do not inspect physical boundaries unless specifically requested.

---

Sincerely,

**For ${p1.name}**
Signature: __________________________

**Agreed and Accepted:**

**Client Name: ${p2.name}**
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

