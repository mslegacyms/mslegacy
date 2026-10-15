import { CompanyProfile } from "../types/legalDocuments";
import { businessContact } from "./contact";
/** No registration, bank, signatory or legal-entity facts are invented. */
export const msLegacyCompanyProfile: CompanyProfile = {
  companyLegalName: "[ENTER VERIFIED LEGAL NAME]", brandName: businessContact.brand,
  registeredOfficeAddress: "[ENTER VERIFIED REGISTERED OFFICE]", branchOfficeAddress: "",
  cin: "", gstin: "", pan: "", representedBy: "", designation: "",
  email: businessContact.email, phone: businessContact.phone, website: "",
  bankDetails: { bankName: "", accountNumber: "", ifscCode: "", branch: "" },
  standardDisclaimer: "Working draft only. A qualified advocate must verify the parties, authority, title, applicable law and transaction terms before execution.",
  standardJurisdictionClause: "[ENTER TRANSACTION-SPECIFIC JURISDICTION AFTER LEGAL REVIEW]",
  authorizedSignatoryBlock: "[ENTER VERIFIED SIGNATORY AND AUTHORITY]",
};
export function getCompanyProfileWithDefaults(profile: Partial<CompanyProfile>): CompanyProfile {
  return { ...msLegacyCompanyProfile, ...profile, bankDetails: { bankName: "", accountNumber: "", ifscCode: "", branch: "", ...profile.bankDetails } };
}
