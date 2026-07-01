import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const saleDeedTemplate: LegalDocumentTemplate = {
  templateId: "sale-deed",
  templateName: "Sale Deed",
  category: "Property Sale",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "propertyDetails.surveyNumber", "commercialTerms.considerationAmount"],
  optionalFields: ["witnessOne.name", "witnessTwo.name"],
  clauses: [
    { title: "Conveyance of Title", body: "The Vendor hereby sells, transfers, and conveys all rights, title, and interest in the Scheduled Property to the Vendee absolutely and forever." },
    { title: "Receipt of Consideration", body: "The Vendor acknowledges full receipt of the Sale Consideration as detailed." },
    { title: "Indemnity", body: "The Vendor covenants to indemnify the Vendee against any future title disputes or losses arising from prior encumbrances." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Vendor Name]", address: "[Vendor Address]", pan: "[Vendor PAN]", entityType: "individual", fatherHusbandOrRep: "" }) as any;
    const p2 = (data.partyTwo || { name: "[Vendee Name]", address: "[Vendee Address]", pan: "[Vendee PAN]", entityType: "individual", fatherHusbandOrRep: "" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]", flatNumber: "[Flat No]", siteNumber: "[Site No]", khataNumber: "[Khata No]", villageOrLocality: "[Locality]", hobliOrTaluk: "[Hobli]", district: "[District]", builtUpArea: "[Built-up]", undividedShare: "[UDS]" }) as any;
    const comm = data.commercialTerms || { considerationAmount: 0, AdvanceTokenAmount: 0 };
    const comp = data.companyDetails || { companyLegalName: "MS Legacy Developers Pvt Ltd" };

    return `
# DEED OF ABSOLUTE SALE

**This Deed of Absolute Sale** ("Sale Deed") is made and executed on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}**, ${p1.entityType === 'company' ? 'a Company incorporated under the Companies Act' : 'an individual'}, represented by its Authorized Signatory, residing/having registered office at ${p1.address}, PAN: **${p1.pan}** (hereinafter referred to as the **"VENDOR"** / **"FIRST PARTY"**, which expression shall unless repugnant to the context include its successors-in-office and permitted assigns);

**AND**

**${p2.name}**, ${p2.entityType === 'company' ? 'a Company incorporated under the Companies Act' : 'an individual'}, ${p2.fatherHusbandOrRep ? `represented by / son/daughter/wife of ${p2.fatherHusbandOrRep},` : ''} residing/having registered office at ${p2.address}, PAN: **${p2.pan}** (hereinafter referred to as the **"VENDEE"** / **"SECOND PARTY"**, which expression shall unless repugnant to the context include its heirs, executors, administrators, and permitted assigns).

*(The Vendor and the Vendee are hereinafter collectively referred to as "Parties" and individually as "Party".)*

---

### RECITALS:

1. **WHEREAS** the Vendor is the sole and absolute owner of the immovable property bearing Survey No. ${prop.surveyNumber}, flat/site/plot No. ${prop.siteNumber || prop.flatNumber || "[Plot No]"} and more fully described in the Schedule hereunder (hereinafter referred to as the **"Scheduled Property"**);
2. **WHEREAS** the Vendor represents that the Scheduled Property was acquired by them through lawful title and they have paid all municipal taxes and statutory charges up to date;
3. **WHEREAS** the Vendor has agreed to sell and convey the Scheduled Property to the Vendee for a total Sale Consideration of **₹${comm.considerationAmount.toLocaleString("en-IN")}** (Rupees ${numberToWords(comm.considerationAmount)} Only) and the Vendee has agreed to purchase the same;
4. **WHEREAS** the Vendee has paid the entire Sale Consideration to the Vendor and the Vendor has acknowledged receipt of the same;

---

### NOW THIS DEED OF SALE WITNESSETH AS FOLLOWS:

#### 1. CONVEYANCE
In pursuance of the agreement and in consideration of the sum of **₹${comm.considerationAmount.toLocaleString("en-IN")}** paid by the Vendee, the Vendor hereby sells, transfers, conveys, and assigns unto the Vendee all piece, parcel, and title of the Scheduled Property, together with all rights, easements, liberties, and appurtenances attached thereto.

#### 2. VENDOR'S COVENANTS
* The Vendor hereby confirms that they have delivered peaceful, vacant, and physical possession of the Scheduled Property to the Vendee on this day.
* The Vendor assures that the Scheduled Property is free from all mortgages, charges, liens, litigations, tax demands, and encumbrances.
* The Vendor covenants to execute any further deeds of rectification or confirmation if any defects are found in the description or title of the property in the future.

#### 3. INDEMNITY
The Vendor hereby agrees to indemnify and keep indemnified the Vendee against any loss, damage, or expense that the Vendee may suffer or incur due to any defect in the title of the Vendor or any claims made by third parties.

#### 4. STAMP DUTY AND JURISDICTION
This Sale Deed shall be registered before the jurisdictional Sub-Registrar. The stamp duty, registration charges, and scanning fees have been borne by the Vendee. Any dispute arising under this Deed shall be subject to the courts of Bangalore.

---

### SCHEDULE OF THE PROPERTY
*(The property hereby sold and conveyed)*

All that piece and parcel of land/property bearing:
* **Property ID / Survey No**: ${prop.surveyNumber} ${prop.flatNumber ? `, Flat No: ${prop.flatNumber}` : ''} ${prop.siteNumber ? `, Site No: ${prop.siteNumber}` : ''}
* **Khata No**: ${prop.khataNumber || "[To be provided]"}
* **Location**: Village/Locality: ${prop.villageOrLocality}, Hobli/Taluk: ${prop.hobliOrTaluk || "[To be provided]"}, District: ${prop.district || "[To be provided]"}
* **Extent / Area**: ${prop.extentArea} ${prop.builtUpArea ? `, Built-up Area: ${prop.builtUpArea}` : ''} ${prop.undividedShare ? `, Undivided Share: ${prop.undividedShare}` : ''}
* **Boundaries**:
  * **East by**: ${prop.boundariesEast}
  * **West by**: ${prop.boundariesWest}
  * **North by**: ${prop.boundariesNorth}
  * **South by**: ${prop.boundariesSouth}

---

### IN WITNESS WHEREOF the Vendor and the Vendee have signed this Deed on the day, month, and year first above written:

**WITNESS ONE:**
Name: ${data.witnessOne?.name || "______________________"}
Address: ${data.witnessOne?.address || "______________________"}

**WITNESS TWO:**
Name: ${data.witnessTwo?.name || "______________________"}
Address: ${data.witnessTwo?.address || "______________________"}

\n\n
**VENDOR (SELLER)**
Signature: __________________________

\n\n
**VENDEE (BUYER)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution. Sale deed format must be finalized by an advocate and executed/registered as per applicable law.*
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

