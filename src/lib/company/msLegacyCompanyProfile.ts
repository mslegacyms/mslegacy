import { CompanyProfile } from "../types/legalDocuments";

export const msLegacyCompanyProfile: CompanyProfile = {
  companyLegalName: "MS Legacy Developers Private Limited",
  brandName: "MS LEGACY",
  registeredOfficeAddress: "No. 45, 2nd Floor, Gold Hill Mansion, Koramangala Outer Ring Road, Bangalore - 560034, Karnataka, India",
  branchOfficeAddress: "No. 12, Legacy Plaza, Devanahalli Bypass Road, Bangalore rural - 562110, Karnataka, India",
  cin: "U45201KA2024PTC184732",
  gstin: "29AAFCM2345K1Z8",
  pan: "AAFCM2345K",
  representedBy: "Muzzamil Ahmad",
  designation: "Managing Director & Founder",
  email: "legal@mslegacy.in",
  phone: "+91 98765 43210",
  website: "www.mslegacy.in",
  bankDetails: {
    bankName: "HDFC Bank Ltd",
    accountNumber: "50200084732910",
    ifscCode: "HDFC0000053",
    branch: "Koramangala 3rd Block Branch, Bangalore"
  },
  standardDisclaimer: "Draft for review only. This document must be reviewed by a qualified advocate/legal advisor and verified for applicable stamp duty, registration, local laws, title documents, and transaction-specific terms before execution.",
  standardJurisdictionClause: "This Agreement shall be governed by, and construed in accordance with, the laws of India. Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.",
  authorizedSignatoryBlock: "For MS Legacy Developers Private Limited\n\n\n\n\n___________________________________\nAuthorized Signatory (Muzzamil Ahmad, Managing Director)"
};

/**
 * Returns a profile with placeholders for any missing or undefined fields.
 */
export function getCompanyProfileWithDefaults(profile: Partial<CompanyProfile>): CompanyProfile {
  const defaults = {
    companyLegalName: "[TO BE UPDATED BY ADMIN]",
    brandName: "[TO BE UPDATED BY ADMIN]",
    registeredOfficeAddress: "[TO BE UPDATED BY ADMIN]",
    representedBy: "[TO BE UPDATED BY ADMIN]",
    designation: "[TO BE UPDATED BY ADMIN]",
    email: "[TO BE UPDATED BY ADMIN]",
    phone: "[TO BE UPDATED BY ADMIN]",
    website: "[TO BE UPDATED BY ADMIN]",
    standardDisclaimer: msLegacyCompanyProfile.standardDisclaimer,
    standardJurisdictionClause: msLegacyCompanyProfile.standardJurisdictionClause,
    authorizedSignatoryBlock: "[TO BE UPDATED BY ADMIN]"
  };

  return {
    ...defaults,
    ...msLegacyCompanyProfile,
    ...profile
  } as CompanyProfile;
}
