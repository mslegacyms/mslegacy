import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const jdaBasicTemplate: LegalDocumentTemplate = {
  templateId: "jda-basic",
  templateName: "Joint Development Agreement (JDA) Basic Draft",
  category: "Construction & Development",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "propertyDetails.surveyNumber"],
  optionalFields: ["commercialTerms.considerationAmount"],
  clauses: [
    { title: "Joint Development Scheme", body: "The Owner grants license and development rights of the Scheduled Property to the Developer for constructing a residential/commercial layout or apartment complex." },
    { title: "Sharing Ratio & Allocation", body: "The built-up area and undivided share of land (UDS) shall be shared between the Owner and Developer in the agreed sharing ratio." },
    { title: "Developer Obligations", body: "The Developer shall obtain all approvals, bear the cost of construction, and complete the project within the agreed timeframe." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Landowner Name]", address: "[Owner Address]", pan: "[Owner PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Developer Name / MS Legacy]", address: "[Developer Address]", pan: "[Developer PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;

    return `
# JOINT DEVELOPMENT AGREEMENT (BASIC DRAFT)

**This Joint Development Agreement** ("JDA") is executed on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}** ("Landowner"), residing at ${p1.address}, PAN: **${p1.pan}**;

**AND**

**${p2.name}** ("Developer"), residing/having registered office at ${p2.address}, PAN: **${p2.pan}**.

---

### 1. SCHEME OF JOINT DEVELOPMENT
The Landowner is the absolute owner of the land described in the Schedule. The Landowner hereby grants permission and licenses to the Developer to enter, plan, obtain approvals, and construct a multi-story building/residential layout on the Scheduled Property.

### 2. SHARING RATIO
The Parties agree that the built-up area, car parking spaces, and common areas constructed on the Scheduled Property shall be allocated and shared in the following ratio:
* **Landowner's Share**: [X]% of constructed area.
* **Developer's Share**: [Y]% of constructed area.

### 3. DEVELOPMENT COST
All costs towards architect fees, layout approvals, BBMP/RERA licenses, structural designs, material purchase, labor charges, and marketing shall be borne exclusively by the Developer. The Landowner shall not be liable to pay any construction expenses.

---

### SCHEDULE OF THE PROPERTY
* **Address / Location**: Survey No: ${prop.surveyNumber}, Locality: ${prop.villageOrLocality}, Extent: ${prop.extentArea}
* **Boundaries**: East: ${prop.boundariesEast}, West: ${prop.boundariesWest}, North: ${prop.boundariesNorth}, South: ${prop.boundariesSouth}

---

**LANDOWNER (FIRST PARTY)**
Signature: __________________________

**DEVELOPER (SECOND PARTY)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

