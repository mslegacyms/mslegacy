"use server";

// Server action to handle project marketplace enquiries securely

import { createProjectEnquiry } from "@/lib/developers/projectEnquiries";

interface SubmitEnquiryInput {
  fullName: string;
  phone: string;
  email: string;
  interestType: string;
  message: string;
  projectId?: string;
  developerId?: string;
}

export async function submitProjectEnquiry(input: SubmitEnquiryInput) {
  // 1. Basic validation
  if (!input.fullName || input.fullName.trim().length < 3) {
    return { success: false, error: "Please enter a valid full name (minimum 3 characters)." };
  }

  if (!input.phone || input.phone.trim().length < 8) {
    return { success: false, error: "Please enter a valid contact phone number." };
  }

  if (!input.email || !input.email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    // 2. Insert into DB
    const result = await createProjectEnquiry({
      fullName: input.fullName,
      phone: input.phone,
      email: input.email,
      interestType: input.interestType,
      message: input.message,
      projectId: input.projectId,
      developerId: input.developerId,
      enquirySource: "project_marketplace"
    });

    return result;
  } catch (err: any) {
    console.error("Enquiry action handler failed:", err);
    return { success: false, error: "Failed to record enquiry due to system timeout." };
  }
}
