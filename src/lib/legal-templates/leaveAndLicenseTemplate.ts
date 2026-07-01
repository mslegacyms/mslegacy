import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const leaveAndLicenseTemplate: LegalDocumentTemplate = {
  templateId: "leave-and-license",
  templateName: "Leave and License Agreement",
  category: "Property Rental & Management",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "commercialTerms.monthlyRent", "commercialTerms.securityDeposit"],
  optionalFields: ["commercialTerms.leaseTermMonths"],
  clauses: [
    { title: "Grant of License", body: "The Licensor grants a temporary license to the Licensee to occupy the Scheduled Property for residential use without creating any tenancy rights." },
    { title: "License Fee & Deposit", body: "Licensee shall pay a monthly license fee and maintain a security deposit with the Licensor." },
    { title: "No Interest Creation", body: "The Licensee acknowledges that this agreement constitutes a mere license and does not create any estate, tenancy, or leasehold interest in the property." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Licensor Name]", address: "[Licensor Address]", pan: "[Licensor PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Licensee Name]", address: "[Licensee Address]", pan: "[Licensee PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey/Site No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# LEAVE AND LICENSE AGREEMENT

**This Leave and License Agreement** is entered into on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"LICENSOR"** / **"FIRST PARTY"**);

**AND**

**${p2.name}**, residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"LICENSEE"** / **"SECOND PARTY"**).

---

### RECITALS:

1. **WHEREAS** the Licensor is the sole and absolute owner of the premises described in the Schedule (hereinafter referred to as the **"Licensed Premises"**);
2. **WHEREAS** the Licensee has requested the Licensor to grant them license to temporarily use the Licensed Premises for residential/office use on a leave and license basis, and the Licensor has agreed to grant such license;

---

### NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

#### 1. GRANT OF LICENSE
The Licensor hereby grants a license to the Licensee to use and occupy the Licensed Premises for a temporary period of **${comm.leaseTermMonths || 11} months** from [Start Date], without creating any tenancy or leasehold interest in favour of the Licensee.

#### 2. LICENSE FEE AND SECURITY DEPOSIT
* The Licensee shall pay a monthly license fee of **₹${(comm.monthlyRent || 0).toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.monthlyRent || 0)} Only) on or before the 5th of every month.
* The Licensee has deposited an interest-free security deposit of **₹${(comm.securityDeposit || 0).toLocaleString("en-IN")}** with the Licensor.

#### 3. NO LEASEHOLD INTEREST
It is explicitly agreed that the legal possession of the Licensed Premises remains with the Licensor. The Licensee is only permitted to enter and occupy as a licensee. Nothing in this agreement shall create a relationship of landlord and tenant.

#### 4. DISPUTE RESOLUTION
All disputes under this Agreement shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka.

---

### SCHEDULE OF THE PROPERTY
*(The Licensed Premises)*

* **Location / Address**: ${prop.flatNumber || prop.siteNumber || "[Door No]"}, Survey No: ${prop.surveyNumber}, Locality: ${prop.villageOrLocality}
* **Boundaries**: East: ${prop.boundariesEast}, West: ${prop.boundariesWest}, North: ${prop.boundariesNorth}, South: ${prop.boundariesSouth}

---

**LICENSOR (FIRST PARTY)**
Signature: __________________________

**LICENSEE (SECOND PARTY)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution. Tenancy rules and leave & license rules vary by jurisdiction and term.*
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

