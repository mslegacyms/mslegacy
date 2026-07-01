import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const agreementToSellTemplate: LegalDocumentTemplate = {
  templateId: "agreement-to-sell",
  templateName: "Agreement to Sell / Sale Agreement",
  category: "Property Sale",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "propertyDetails.surveyNumber", "commercialTerms.considerationAmount"],
  optionalFields: ["commercialTerms.advanceTokenAmount", "witnessOne.name", "witnessTwo.name"],
  clauses: [
    { title: "Agreement to Sell", body: "The Seller agrees to sell and the Buyer agrees to purchase the Scheduled Property for the agreed Sale Consideration." },
    { title: "Payment Schedule", body: "The Buyer shall pay the consideration amount as per the agreed payment schedule." },
    { title: "Possession & Title Clearance", body: "The Seller covenants that the property has clear title and possession will be handed over upon full payment and registration." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Seller Name]", address: "[Seller Address]", pan: "[Seller PAN]", entityType: "individual", fatherHusbandOrRep: "" }) as any;
    const p2 = (data.partyTwo || { name: "[Buyer Name]", address: "[Buyer Address]", pan: "[Buyer PAN]", entityType: "individual", fatherHusbandOrRep: "" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;
    const comm = (data.commercialTerms || { considerationAmount: 0, advanceTokenAmount: 0, taxesResponsibility: "Buyer", registrationExpenseResponsibility: "Buyer" }) as any;
    const comp = (data.companyDetails || { companyLegalName: "MS Legacy Developers Pvt Ltd", registeredOfficeAddress: "[Company Address]" }) as any;

    const formattedPayments = data.paymentSchedule && data.paymentSchedule.length > 0
      ? data.paymentSchedule.map((p, idx) => `${idx + 1}. **${p.milestoneName}**: ₹${p.paymentAmount.toLocaleString("en-IN")} (${p.status.toUpperCase()})`).join("\n")
      : "Standard Terms: Advance / Token to be paid on signing, balance at registration.";

    return `
# AGREEMENT TO SELL

**This Agreement to Sell** ("Agreement") is executed on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, ${p1.entityType === 'company' ? 'a Company incorporated under the Companies Act' : 'an individual'}, represented by its Authorized Signatory, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"SELLER"** / **"FIRST PARTY"**, which expression shall unless repugnant to the context include its successors-in-office and permitted assigns);

**AND**

**${p2.name}**, ${p2.entityType === 'company' ? 'a Company incorporated under the Companies Act' : 'an individual'}, ${p2.fatherHusbandOrRep ? `represented by / son/daughter/wife of ${p2.fatherHusbandOrRep},` : ''} residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"BUYER"** / **"SECOND PARTY"**, which expression shall unless repugnant to the context include its heirs, executors, administrators, and permitted assigns).

*(The Seller and the Buyer are hereinafter collectively referred to as "Parties" and individually as "Party".)*

---

### RECITALS:

1. **WHEREAS** the Seller is the absolute owner and in peaceful possession of all that piece and parcel of the property described in the Schedule hereunder written (hereinafter referred to as the **"Scheduled Property"**);
2. **WHEREAS** the Seller purchased/acquired the Scheduled Property through a registered Sale Deed dated [Date] registered as Document No. [Doc No] in the Office of the Sub-Registrar;
3. **WHEREAS** the Seller has represented that the Scheduled Property is free from all encumbrances, attachments, litigations, and family disputes, and that the Seller has a clear, marketable, and subsisting title to the same;
4. **WHEREAS** the Buyer has inspected the title documents and physical condition of the Scheduled Property and has agreed to purchase the Scheduled Property, and the Seller has agreed to sell the same on the terms and conditions hereinafter set forth;

---

### NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES AS FOLLOWS:

#### 1. SALE CONSIDERATION
The total Sale Consideration for the Scheduled Property is fixed at **₹${comm.considerationAmount.toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.considerationAmount)} Only).

#### 2. PAYMENT TERMS & SCHEDULE
The Buyer has paid an advance token amount of **₹${(comm.advanceTokenAmount || 0).toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.advanceTokenAmount || 0)} Only) as part payment of the Sale Consideration, the receipt of which the Seller hereby acknowledges.
The balance Sale Consideration of **₹${(comm.considerationAmount - (comm.advanceTokenAmount || 0)).toLocaleString("en-IN")}** shall be paid by the Buyer to the Seller in the following manner:

${formattedPayments}

#### 3. COVENANTS OF THE SELLER
* The Seller covenants that they shall clear all outstanding statutory dues, tax audits, property taxes, electricity, and water bills in respect of the Scheduled Property up to the date of physical possession.
* The Seller agrees to execute and register a absolute Sale Deed in favour of the Buyer or their nominee(s) on or before **${comm.possessionDate || "[Target Date]"}**, subject to receipt of the full Sale Consideration.
* The Seller agrees to deliver peaceful, vacant physical possession of the Scheduled Property along with all original title deeds, sanctioned layouts, tax receipts, and Encumbrance Certificates to the Buyer at the time of registration.

#### 4. PENALTY AND DEFAULT CLAUSE
* If the Buyer fails to pay the balance consideration within the stipulated timeline, the Seller shall be entitled to forfeit the advance amount or charge interest.
* If the Seller fails to execute the Sale Deed despite the Buyer being ready with the balance consideration, the Buyer shall have the right to seek specific performance of this Agreement in a Court of Law.
* **Default Penalty Terms**: ${comm.penaltyClause || "Standard draft clause — legal review required. If either party fails to comply with the terms, they shall be liable to compensate the other party for actual losses incurred."}

#### 5. STAMP DUTY AND REGISTRATION CHARGES
The expenses towards Stamp Duty, Registration Charges, Advocate fees, and other incidental expenses for the Sale Deed shall be borne entirely by the **${comm.registrationExpenseResponsibility || "Buyer"}**.

#### 6. DISPUTE RESOLUTION AND JURISDICTION
Any dispute arising out of this Agreement shall be resolved through mutual negotiations. If unresolved, the dispute shall be referred to Arbitration in accordance with the Arbitration and Conciliation Act, 1996. The place of arbitration shall be Bangalore.
This Agreement shall be subject to the exclusive jurisdiction of the Courts in Bangalore, Karnataka.

---

### SCHEDULE OF THE PROPERTY
*(The property hereby agreed to be sold by the Seller)*

All that piece and parcel of land/property bearing:
* **Property ID / Survey No**: ${prop.surveyNumber} ${prop.flatNumber ? `, Flat No: ${prop.flatNumber}` : ''} ${prop.siteNumber ? `, Site No: ${prop.siteNumber}` : ''}
* **Khata No**: ${prop.khataNumber || "[To be provided]"}
* **Location**: Village/Locality: ${prop.villageOrLocality}, Hobli/Taluk: ${prop.hobliOrTaluk || "[To be provided]"}, District: ${prop.district || "[To be provided]"}
* **Extent / Area**: ${prop.extentArea} ${prop.builtUpArea ? `, Built-up Area: ${prop.builtUpArea}` : ''} ${prop.undividedShare ? `, Undivided Share: ${prop.undividedShare}` : ''}
* **RERA Registration No**: ${prop.reraNumber || "Not Applicable"}
* **Boundaries**:
  * **East by**: ${prop.boundariesEast}
  * **West by**: ${prop.boundariesWest}
  * **North by**: ${prop.boundariesNorth}
  * **South by**: ${prop.boundariesSouth}

**Property Schedule Description**: ${prop.scheduleDescription || "Detailed layout and boundaries as per parent deed document."}

---

### IN WITNESS WHEREOF the Parties hereto have signed and executed this Agreement on the day, month, and year first above written, in the presence of the following witnesses:

**WITNESS ONE:**
Name: ${data.witnessOne?.name || "______________________"}
Father/Husband: ${data.witnessOne?.fatherHusbandName || "______________________"}
Address: ${data.witnessOne?.address || "______________________"}

**WITNESS TWO:**
Name: ${data.witnessTwo?.name || "______________________"}
Father/Husband: ${data.witnessTwo?.fatherHusbandName || "______________________"}
Address: ${data.witnessTwo?.address || "______________________"}

\n\n
**SELLER / FIRST PARTY**
${comp.companyLegalName}
Represented by: ${p1.name} (Authorized Signatory)
Signature: __________________________

\n\n
**BUYER / SECOND PARTY**
Represented by: ${p2.name}
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

// Simple helper to convert number to words for Indian Rupees
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
  
  // Format into Indian numbering system: Crores, Lakhs, Thousands, Hundreds
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

