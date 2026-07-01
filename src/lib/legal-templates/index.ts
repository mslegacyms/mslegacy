import { LegalDocumentTemplate } from "../types/legalDocuments";
import { agreementToSellTemplate } from "./agreementToSellTemplate";
import { saleDeedTemplate } from "./saleDeedTemplate";
import { constructionAgreementTemplate } from "./constructionAgreementTemplate";
import { rentalAgreementTemplate } from "./rentalAgreementTemplate";
import { leaveAndLicenseTemplate } from "./leaveAndLicenseTemplate";
import { leadReferralAgreementTemplate } from "./leadReferralAgreementTemplate";
import { brokerAgreementTemplate } from "./brokerAgreementTemplate";
import { gpaTemplate } from "./gpaTemplate";
import { spaTemplate } from "./spaTemplate";
import { propertyManagementAgreementTemplate } from "./propertyManagementAgreementTemplate";
import { dueDiligenceEngagementTemplate } from "./dueDiligenceEngagementTemplate";
import { mouTemplate } from "./mouTemplate";
import { jdaBasicTemplate } from "./jdaBasicTemplate";
import { siteVisitUndertakingTemplate } from "./siteVisitUndertakingTemplate";
import { nriPropertyAdvisoryTemplate } from "./nriPropertyAdvisoryTemplate";
import { contractorWorkOrderTemplate } from "./contractorWorkOrderTemplate";
import {
  developmentManagementTemplate,
  landAggregationMandateTemplate,
  projectAdvisoryMandateTemplate,
  constructionWorkOrderTemplatePending
} from "./remainingTemplates";

// The full list of 20 legal document templates
export const legalTemplates: LegalDocumentTemplate[] = [
  agreementToSellTemplate,
  saleDeedTemplate,
  constructionAgreementTemplate,
  jdaBasicTemplate,
  developmentManagementTemplate,
  rentalAgreementTemplate,
  leaveAndLicenseTemplate,
  propertyManagementAgreementTemplate,
  brokerAgreementTemplate,
  leadReferralAgreementTemplate,
  gpaTemplate,
  spaTemplate,
  mouTemplate,
  siteVisitUndertakingTemplate,
  dueDiligenceEngagementTemplate,
  landAggregationMandateTemplate,
  constructionWorkOrderTemplatePending,
  contractorWorkOrderTemplate,
  nriPropertyAdvisoryTemplate,
  projectAdvisoryMandateTemplate
];

// Helper map for direct lookups
export const legalTemplatesMap: Record<string, LegalDocumentTemplate> = legalTemplates.reduce(
  (acc, template) => {
    acc[template.templateId] = template;
    return acc;
  },
  {} as Record<string, LegalDocumentTemplate>
);

