import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const gpaTemplate: LegalDocumentTemplate = {
  templateId: "gpa",
  templateName: "General Power of Attorney / GPA",
  category: "Power of Attorney",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name"],
  optionalFields: ["commercialTerms.powersGranted"],
  clauses: [
    { title: "Appointment", body: "The Principal hereby appoints the Attorney Holder to manage and represent the Principal in all matters concerning the Scheduled Property." },
    { title: "Powers Conferred", body: "The Attorney is authorized to apply for approvals, pay taxes, sign applications, and manage municipal correspondence." },
    { title: "Validity & Revocation", body: "This GPA is revocable at the option of the Principal and shall remain valid unless revoked in writing or upon death of the Principal." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Principal Name]", address: "[Principal Address]", pan: "[Principal PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Attorney Holder Name]", address: "[Attorney Address]", pan: "[Attorney PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    const formattedPowers = comm.powersGranted && comm.powersGranted.length > 0
      ? comm.powersGranted.map((p: any, idx: number) => `${idx + 1}. ${p}`).join("\n")
      : "1. To manage, lease, and maintain the Scheduled Property.\n2. To sign and submit applications before BBMP, BDA, BESCOM, BWSSB, and other authorities.\n3. To represent the Principal in municipal disputes and pay property taxes.";

    return `
# GENERAL POWER OF ATTORNEY (GPA)

**TO ALL TO WHOM THESE PRESENTS SHALL COME, I, ${p1.name}** ("Principal"), residing at ${p1.address}, PAN: **${p1.pan}**, DO HEREBY SEND GREETINGS:

**WHEREAS** I am the absolute owner of the property described in the Schedule below; and since I am unable to personally manage, supervise, and attend to the affairs of the said property, I desire to appoint a fit and proper person to manage the same on my behalf.

**NOW KNOW YE ALL THAT I DO HEREBY APPOINT, CONSTITUTE, AND ORDAIN, ${p2.name}** ("Attorney Holder"), residing at ${p2.address}, PAN: **${p2.pan}**, as my lawful General Attorney in my name and on my behalf to do and execute all or any of the following acts, deeds, and things:

---

### POWERS GRANTED:
${formattedPowers}

---

### SCHEDULE OF THE PROPERTY
*(The property referred to in this GPA)*

* **Location / Address**: Survey No: ${prop.surveyNumber}, Flat/Site: ${prop.siteNumber || prop.flatNumber || "[Plot No]"}, Locality: ${prop.villageOrLocality}

---

**IN WITNESS WHEREOF I have signed and executed this GPA on this day:**

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

