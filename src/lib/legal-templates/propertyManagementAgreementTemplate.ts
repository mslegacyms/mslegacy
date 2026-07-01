import { LegalDocumentTemplate, LegalDocumentDraft } from "../types/legalDocuments";

export const propertyManagementAgreementTemplate: LegalDocumentTemplate = {
  templateId: "property-management",
  templateName: "Property Management Agreement",
  category: "Property Rental & Management",
  version: "1.0",
  jurisdiction: "Karnataka",
  legalReviewStatus: "reviewed",
  requiredFields: ["partyTwo.name", "propertyDetails.surveyNumber"],
  optionalFields: ["commercialTerms.monthlyRent"],
  clauses: [
    { title: "Engagement of Manager", body: "The Owner appoints the Property Manager to manage, market, maintain, and rent out the Scheduled Property on behalf of the Owner." },
    { title: "Management Fees", body: "The Owner shall pay the Manager a percentage of monthly rents or a fixed monthly care fee as compensation for services." },
    { title: "Maintenance & Repairs", body: "The Manager is authorized to carry out routine repairs and maintenance up to a specified limit, charging the costs to the Owner." }
  ],
  renderDocument: (data: Partial<LegalDocumentDraft>): string => {
    const today = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    const p1 = (data.partyOne || { name: "[Owner Name]", address: "[Owner Address]", pan: "[Owner PAN]" }) as any;
    const p2 = (data.partyTwo || { name: "[Property Manager / MS Legacy]", address: "[Manager Address]", pan: "[Manager PAN]" }) as any;
    const prop = (data.propertyDetails || { surveyNumber: "[Survey No]", extentArea: "[Area]", boundariesEast: "[East]", boundariesWest: "[West]", boundariesNorth: "[North]", boundariesSouth: "[South]", scheduleDescription: "[Full Schedule]" }) as any;
    const comm = (data.commercialTerms || {}) as any;

    return `
# PROPERTY MANAGEMENT AGREEMENT

**This Property Management Agreement** is executed on this **${today}** at Bangalore, Karnataka.

### BY AND BETWEEN:

**${p1.name}** ("Owner"), residing at ${p1.address}, PAN: **${p1.pan}**;

**AND**

**${p2.name}** ("Property Manager" / "Agent"), residing/having registered office at ${p2.address}, PAN: **${p2.pan}**.

---

### 1. APPOINTMENT AND SCOPE
The Owner appoints the Property Manager to manage the Scheduled Property. The Manager's duties include:
* Sourcing, vetting, and managing tenants.
* Collecting monthly rents and security deposits.
* Handling plumbing, electrical, and routine building maintenance.
* Paying property taxes and utility bills on behalf of the Owner.

### 2. COMPENSATION AND FEES
* The Owner shall pay the Manager a monthly management fee of **₹${(comm.monthlyRent || 0).toLocaleString("en-IN")}** or a commission percentage on collected rent as mutually agreed.

### 3. MAINTENANCE LIMIT
The Manager is authorized to spend up to **₹${(comm.maintenanceCharges || 5000).toLocaleString("en-IN")}** per incident on repairs without prior approval from the Owner.

---

### SCHEDULE OF THE PROPERTY
* **Location**: ${prop.flatNumber || prop.siteNumber || "[Door No]"}, Survey No: ${prop.surveyNumber}, Locality: ${prop.villageOrLocality}

---

**OWNER (FIRST PARTY)**
Signature: __________________________

**PROPERTY MANAGER (SECOND PARTY)**
Signature: __________________________

---
**LEGAL DRAFT DISCLAIMER WARNING**
*Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, local laws, title documents, and transaction-specific terms before execution.*
`;
  }
};

