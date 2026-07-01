import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const constructionAgreementTemplate: LegalDocumentTemplate = {
  templateId: "construction-agreement",
  templateName: "Construction Agreement",
  category: "Construction & Development",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "commercialTerms.costPerSqFt", "commercialTerms.timelineMonths"],
  optionalFields: ["commercialTerms.materialsSpecification", "witnessOne.name"],
  clauses: [
    { title: "Scope of Construction Work", body: "The Contractor agrees to execute construction of the building on the Scheduled Property according to the approved architectural drawings." },
    { title: "Rates & Costing", body: "The construction cost is calculated per square foot of built-up area, inclusive of labor and core material specifications." },
    { title: "Defect Liability & Milestones", body: "A defect liability period shall apply from the date of handover. Milestone payments are tied to structural completion." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Contractor Name]", address: "[Contractor Address]", pan: "[Contractor PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Employer/Client Name]", address: "[Employer Address]", pan: "[Employer PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;
    const comm = (data.commercialTerms || {}) as any;
    const comp = data.companyDetails || { companyLegalName: "MS Legacy Developers Pvt Ltd" };

    const formattedPayments = data.paymentSchedule && data.paymentSchedule.length > 0
      ? data.paymentSchedule.map((p, idx) => `${idx + 1}. **${p.milestoneName}**: ${p.percentageAmount ? `${p.percentageAmount}% / ` : ''}₹${p.paymentAmount.toLocaleString("en-IN")} (${p.status.toUpperCase()})`).join("\n")
      : "Standard Milestone Structure: Foundation (15%), Plinth (15%), Brickwork (20%), Lintel (20%), Flooring & Plastering (15%), Handover (15%).";

    return `
# CONSTRUCTION AGREEMENT

**This Construction Agreement** ("Agreement") is entered into on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"CONTRACTOR"** / **"FIRST PARTY"**, which expression shall unless repugnant to the context include its successors and permitted assigns);

**AND**

**${p2.name}**, residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"EMPLOYER"** / **"SECOND PARTY"**, which expression shall unless repugnant to the context include its heirs, executors, and assigns).

*(The Contractor and the Employer are hereinafter collectively referred to as "Parties" and individually as "Party".)*

---

### RECITALS:

1. **WHEREAS** the Employer is the absolute owner of the land described in the Schedule hereunder (hereinafter referred to as the **"Scheduled Property"**);
2. **WHEREAS** the Employer desires to construct a residential/commercial building on the Scheduled Property and has requested the Contractor to undertake the construction work;
3. **WHEREAS** the Contractor is a skilled builder and developer and has agreed to undertake the construction work on a contract basis in accordance with the specifications and drawings approved by the Parties;

---

### NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

#### 1. SCOPE OF WORK
The Contractor shall carry out the construction of a building on the Scheduled Property in accordance with the architectural plans, structural designs, and specification list annexed to this Agreement as Annexure-A.
* **Built-up Area**: ${prop.builtUpArea || "[Specify Area, e.g. 2400 sq.ft]"}
* **Scope details**: ${comm.scopeOfWork || "Core structure, masonry, tiling, electrical conduits, plumbing, and painting as per standard specifications."}

#### 2. CONSIDERATION AND COSTING
The Employer shall pay the Contractor for the said construction work at a rate of **₹${(comm.costPerSqFt || 0).toLocaleString("en-IN")}** per square foot of built-up area.
The estimated total construction cost is **₹${(comm.considerationAmount || 0).toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.considerationAmount || 0)} Only), subject to final measurement of the built-up area.

#### 3. STAGED MILESTONE PAYMENTS
The construction cost shall be paid by the Employer in stages linked to physical milestones, as detailed below:

${formattedPayments}

#### 4. TIMELINE AND DELAY PENALTY
* The Contractor shall commence work within [Days] days from the date of signing and complete the entire construction within **${comm.timelineMonths || "[Months]"} months** (Target Handover: **${comm.possessionDate || "[Target Date]"}**).
* **Delay Penalty**: In the event of delay in completion due to Contractor's negligence, the Contractor shall pay a penalty of **${comm.delayClause || "₹5,000 per week"}** to the Employer, subject to Force Majeure exclusions.

#### 5. MATERIALS SPECIFICATION AND QUALITY
The Contractor shall use only premium materials of the brand and quality specified in the Annexure.
* **Material Specifications**: ${comm.materialsSpecification || "Standard draft specification - legal review required. Cement: UltraTech/Birla, Steel: Tata/Fe550, Tiles: Kajaria/Somany."}
* Any major changes in specifications require written change orders approved by both parties.

#### 6. DEFECT LIABILITY PERIOD
The Contractor shall be responsible for rectifying any structural defects or poor workmanship that may appear within a period of **${comm.defectLiabilityPeriod || "12 months"}** from the date of completion and handover of the building, at no extra cost to the Employer.

#### 7. ARCHITECT / ENGINEER APPROVAL
* ${comm.architectApprovalRequired ? "All work must be inspected and certified by the Employer's appointed Architect prior to releasing milestone payments." : "Work will be inspected jointly by the Contractor and Employer representative before milestone clearance."}

---

### SCHEDULE OF THE PROPERTY
*(The site where construction is to be carried out)*

All that piece and parcel of land bearing:
* **Site/Plot No**: ${prop.siteNumber || "[Plot No]"}
* **Survey No**: ${prop.surveyNumber}
* **Location**: Village/Locality: ${prop.villageOrLocality}, Hobli/Taluk: ${prop.hobliOrTaluk || "[To be provided]"}, District: ${prop.district || "[To be provided]"}
* **Extent / Area**: ${prop.extentArea}
* **Boundaries**:
  * **East by**: ${prop.boundariesEast}
  * **West by**: ${prop.boundariesWest}
  * **North by**: ${prop.boundariesNorth}
  * **South by**: ${prop.boundariesSouth}

---

### IN WITNESS WHEREOF the Parties have executed this Agreement on the date and place first written above:

**WITNESS ONE:**
Name & Signature: ______________________

**WITNESS TWO:**
Name & Signature: ______________________

\n\n
**CONTRACTOR (FIRST PARTY)**
Signature: __________________________

\n\n
**EMPLOYER (SECOND PARTY)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution.*
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

