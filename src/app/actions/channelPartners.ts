"use server";

import { submitChannelPartnerForm as baseSubmit } from "@/app/channel-partners/actions";

/**
 * Re-export channel partner submission form handler to match actions structure.
 */
export async function submitChannelPartnerForm(formData: {
  name: string;
  company: string;
  phone: string;
  email: string;
  reraId: string;
}) {
  return await baseSubmit(formData);
}
