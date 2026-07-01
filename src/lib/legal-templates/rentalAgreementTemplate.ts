import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const rentalAgreementTemplate: LegalDocumentTemplate = {
  templateId: "rental-agreement",
  templateName: "Rental Agreement / Lease Agreement",
  category: "Property Rental & Management",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "propertyDetails.surveyNumber", "commercialTerms.monthlyRent", "commercialTerms.securityDeposit"],
  optionalFields: ["commercialTerms.leaseTermMonths", "commercialTerms.noticePeriodDays"],
  clauses: [
    { title: "Tenancy & Term", body: "The Landlord lets and the Tenant takes the Scheduled Property for residential/commercial purpose for the agreed tenancy term." },
    { title: "Rent & Deposit", body: "The Tenant shall pay monthly rent in advance and deposit a security sum, refundable at tenancy termination minus damages." },
    { title: "Maintenance & Covenants", body: "The Tenant agrees to maintain the premises in good condition, pay utilities on time, and not sub-let without written approval." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Landlord Name]", address: "[Landlord Address]", pan: "[Landlord PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Tenant Name]", address: "[Tenant Address]", pan: "[Tenant PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey/Site No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;
    const comm = (data.commercialTerms || {}) as any;
    const comp = data.companyDetails || { companyLegalName: "MS Legacy Developers Pvt Ltd" };

    return `
# RENTAL / LEASE AGREEMENT

**This Rental / Lease Agreement** ("Agreement") is executed on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"LANDLORD"** / **"LESSOR"** / **"FIRST PARTY"**, which expression shall unless repugnant to the context include its successors and assigns);

**AND**

**${p2.name}**, residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"TENANT"** / **"LESSEE"** / **"SECOND PARTY"**, which expression shall unless repugnant to the context include its heirs, executors, and permitted assigns).

*(Lessor and Lessee are collectively referred to as "Parties" and individually as "Party".)*

---

### RECITALS:

1. **WHEREAS** the Lessor is the absolute owner of the premises described in the Schedule hereunder (hereinafter referred to as the **"Leased Premises"**);
2. **WHEREAS** the Lessee has requested the Lessor to grant a lease/tenancy in respect of the Leased Premises, and the Lessor has agreed to grant the lease of the same on the terms and conditions hereinafter set forth;

---

### NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES AS FOLLOWS:

#### 1. LEASE TERM AND RENEWAL
* The lease shall be for a fixed term of **${comm.leaseTermMonths || 11} months** commencing from [Start Date] and ending on [End Date].
* **Renewal Terms**: ${comm.renewalTerms || "The lease may be renewed for a further period by mutual consent in writing, with a standard rent escalation of 5% to 10%."}

#### 2. MONTHLY RENT AND UTILITIES
* The Lessee shall pay to the Lessor a monthly rent of **₹${(comm.monthlyRent || 0).toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.monthlyRent || 0)} Only) on or before the 5th day of every English calendar month.
* **Maintenance Charges**: The monthly maintenance of **₹${(comm.maintenanceCharges || 0).toLocaleString("en-IN")}** shall be paid by the **${comm.utilitiesResponsibility || "Lessee"}** directly to the association/Lessor.
* The Lessee shall pay all electricity charges, water charges, internet, and utilities bills directly to the respective authorities as per meter readings.

#### 3. SECURITY DEPOSIT
* The Lessee has paid an interest-free refundable security deposit of **₹${(comm.securityDeposit || 0).toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.securityDeposit || 0)} Only) to the Lessor, the receipt of which is hereby acknowledged.
* The said security deposit shall be refunded to the Lessee at the time of handing over vacant possession of the Leased Premises, subject to deduction of unpaid rents, utility bills, painting charges, or structural damages, if any.

#### 4. LOCK-IN PERIOD AND TERMINATION
* **Lock-in Period**: Both Parties agree to a lock-in period of **${comm.lockInPeriodMonths || 6} months** during which neither party can terminate the tenancy.
* **Notice Period**: After the lock-in period, either party may terminate the lease by giving **${comm.noticePeriodDays || 30} days** prior written notice.
* If the Lessee vacates during the lock-in period, the security deposit for the lock-in duration will be forfeited.

#### 5. USE OF PREMISES
* The Leased Premises shall be used by the Lessee solely for **${comm.permittedUse || "Residential purposes"}** and the Lessee shall not sub-let, assign, or part with the possession of the premises to any third party without written consent.
* The Lessee shall not make any major structural changes, alterations, or additions to the premises without the Lessor's prior approval in writing.

---

### SCHEDULE OF THE PROPERTY
*(The premises leased out)*

All that piece and parcel of land/building bearing:
* **Address / flat / Door No**: ${prop.flatNumber || prop.siteNumber || "[Door No]"}
* **Survey/Property ID No**: ${prop.surveyNumber}
* **Location**: Village/Locality: ${prop.villageOrLocality}, Hobli/Taluk: ${prop.hobliOrTaluk || "[To be provided]"}
* **Extent / Area**: ${prop.extentArea}
* **Boundaries**:
  * **East by**: ${prop.boundariesEast}
  * **West by**: ${prop.boundariesWest}
  * **North by**: ${prop.boundariesNorth}
  * **South by**: ${prop.boundariesSouth}

---

### IN WITNESS WHEREOF the Parties have signed this Agreement on the day and year first above written:

**WITNESS ONE:**
Name & Signature: ______________________

**WITNESS TWO:**
Name & Signature: ______________________

\n\n
**LESSOR (LANDLORD)**
Signature: __________________________

\n\n
**LESSEE (TENANT)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution. Stamp duty, registration, police verification, and tenancy rules vary by jurisdiction and term.*
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

