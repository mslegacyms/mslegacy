import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const spaTemplate: LegalDocumentTemplate = {
  templateId: "spa",
  templateName: "Special Power of Attorney / SPA",
  category: "Power of Attorney",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name"],
  optionalFields: ["commercialTerms.powersGranted"],
  clauses: [
    { title: "Special Purpose", body: "The Principal appoints the Attorney Holder for the sole specific purpose of executing and registering a Sale Deed or Lease Agreement for the Scheduled Property." },
    { title: "Limited Authority", body: "The Attorney's powers are strictly confined to the specified transaction and shall automatically expire upon registration completion." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Principal Name]", address: "[Principal Address]", pan: "[Principal PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Attorney Holder Name]", address: "[Attorney Address]", pan: "[Attorney PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;

    return `
# SPECIAL POWER OF ATTORNEY (SPA)

**KNOW ALL MEN BY THESE PRESENTS THAT I, ${p1.name}** ("Principal"), residing at ${p1.address}, PAN: **${p1.pan}**, DO HEREBY APPOINT **${p2.name}** ("Attorney Holder"), residing at ${p2.address}, PAN: **${p2.pan}**, as my Special Attorney.

### SPECIAL PURPOSE:
The Special Attorney is appointed for the sole, specific purpose of executing and registering the **Sale Deed / Agreement** for the property detailed in the Schedule below before the Sub-Registrar of Bangalore, and to do all acts required for such registration (e.g. paying stamp duty, presenting ID cards, signing register entries).

This Power of Attorney is strictly limited to the transaction mentioned above and shall automatically stand revoked and cancelled upon the successful registration of the transaction.

---

### SCHEDULE OF THE PROPERTY
* **Location / Address**: Survey No: ${prop.surveyNumber}, Flat/Site: ${prop.siteNumber || prop.flatNumber || "[Plot No]"}, Locality: ${prop.villageOrLocality}

---

**IN WITNESS WHEREOF I have signed and executed this SPA on this day:**

\n\n
**PRINCIPAL (FIRST PARTY)**
Signature: __________________________

\n\n
**ATTORNEY HOLDER (SECOND PARTY)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution. Power of Attorney may require registration/notarization depending on powers granted and applicable law. Verify with legal advisor.*
`;
  }
};

