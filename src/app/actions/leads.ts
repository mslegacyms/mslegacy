"use server";

import { submitContactForm as baseSubmit } from "@/app/contact/actions";

/**
 * Re-export contact submission form handler to match actions structure.
 */
export async function submitContactForm(formData: {
  name: string;
  phone: string;
  email: string;
  location: string;
  interestType: string;
  buyerType: string;
  budgetRange: string;
  message: string;
}) {
  return await baseSubmit(formData);
}
