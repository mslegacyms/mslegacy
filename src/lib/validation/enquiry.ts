export const enquiryOptions = [
  ["general_advisory", "General property enquiry"],
  ["land_sourcing", "Land & property sourcing"],
  ["construction_support", "Construction & project management"],
  ["property_management", "Property management"],
  ["project_due_diligence", "Document review coordination"],
  ["nri_advisory", "NRI property support"],
  ["project_comparison", "Compare selected properties"],
  ["site_visit_support", "Request a site visit"],
  ["apartment_enquiry", "Apartment enquiry"],
  ["plot_enquiry", "Plot enquiry"],
  ["villa_enquiry", "Villa enquiry"],
  ["farmland_enquiry", "Land-use enquiry"],
  ["channel_partner", "Channel partner enquiry"],
  ["landowner_developer", "Landowner / developer collaboration"],
  ["apartment_feasibility_review", "Apartment feasibility discussion"],
  ["layout_feasibility_review", "Layout feasibility discussion"],
] as const;

export const enquiryInterests: readonly string[] = enquiryOptions.map(([value]) => value);
export function getEnquiryIntent(value: string | null | undefined, hasProject: boolean) {
  return value && enquiryInterests.includes(value) ? value : hasProject ? "project_due_diligence" : "general_advisory";
}

export interface EnquiryDraftError { field: "name" | "contact"; message: string }

/** Validate the reviewed message without submitting it or saving personal details. */
export function validateEnquiryDraft(input: { name: string; channel: string; contact: string }): EnquiryDraftError | null {
  const name = input.name.trim();
  if (name.length < 2 || name.length > 100 || /[\u0000-\u001f\u007f]/.test(name)) {
    return { field: "name", message: "Please enter your name using 2 to 100 characters." };
  }
  const contact = input.contact.trim();
  if (input.channel === "email") {
    return contact.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
      ? null : { field: "contact", message: "Please enter a valid email address." };
  }
  if (input.channel !== "phone" && input.channel !== "whatsapp") {
    return { field: "contact", message: "Please choose a preferred contact method." };
  }
  const digits = contact.replace(/\D/g, "");
  return contact.length <= 30 && /^\+?[0-9(). -]+$/.test(contact) && digits.length >= 8 && digits.length <= 15
    ? null : { field: "contact", message: "Please enter a phone number with 8 to 15 digits. Include the country code where needed." };
}
