export const enquiryInterests = ["general_advisory", "apartment_enquiry", "plot_enquiry", "villa_enquiry", "farmland_enquiry", "project_comparison", "project_due_diligence", "nri_advisory", "site_visit_support", "construction_support", "property_management"];
export function getEnquiryIntent(value: string | null | undefined, hasProject: boolean) {
  return value && enquiryInterests.includes(value) ? value : hasProject ? "project_due_diligence" : "general_advisory";
}
