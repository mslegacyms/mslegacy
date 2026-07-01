import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const siteVisitUndertakingTemplate: LegalDocumentTemplate = {
  templateId: "site-visit-undertaking",
  templateName: "Site Visit Confirmation / Client Undertaking",
  category: "Business Advisory & Partnerships",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name"],
  optionalFields: [],
  clauses: [
    { title: "Confirmation of Visit", body: "The Client confirms visiting the project site accompanied by the Company representative on the specified date." },
    { title: "Source Introduction", body: "The Client declares that they were introduced to this property/project solely by the Company / Channel Partner listed." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Developer Name / MS Legacy]", address: "[Company Address]" }) as any;
    const p2 = (data.partyTwo || { name: "[Client Name]", address: "[Client Address]", phone: "[Client Phone]", email: "[Client Email]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", villageOrLocality: "[Project/Site Locality]" }) as any;

    return `
# SITE VISIT CONFIRMATION & CLIENT UNDERTAKING

**Date of Visit: ${today}**

### CLIENT DETAILS:
* **Client Name**: ${p2.name}
* **Address**: ${p2.address}
* **Phone / Email**: ${p2.phone} / ${p2.email || "[Email]"}

### PROJECT / PROPERTY VISITED:
* **Project Name / Locality**: ${prop.villageOrLocality} (Survey No: ${prop.surveyNumber})

---

### UNDERTAKING BY THE CLIENT:

1. I hereby confirm that I have visited the above-mentioned project site/property on this day, accompanied by the executive/representative of **${p1.name}**.
2. I certify that this property/project was first introduced and shown to me by the Company / representative, and I have not visited or been introduced to this property by any other broker, agent, or intermediary prior to this date.
3. I agree that in the event I purchase, lease, or enter into any joint development agreement regarding this property within the next 12 months, the transaction shall be routed and recognized through **${p1.name}** as the sourcing broker/advisor.

---

**Client Name: ${p2.name}**
Signature: __________________________

**Company Executive / Representative:**
Name: __________________________
Signature: __________________________
`;
  }
};

