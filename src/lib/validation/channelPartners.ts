/**
 * Validation utilities for Channel Partner registrations.
 */

export interface PartnerValidationError {
  fullName?: string;
  phone?: string;
  email?: string;
  companyName?: string;
  reraId?: string;
}

export function validatePartner(data: {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  reraId: string;
}): { isValid: boolean; errors: PartnerValidationError } {
  const errors: PartnerValidationError = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Partner name is required.";
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = "Agency/Company name is required.";
  }

  if (!data.phone || !/^\+?[1-9]\d{1,14}$/.test(data.phone.replace(/[\s-()]/g, ""))) {
    errors.phone = "Valid phone number is required.";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Valid email address is required.";
  }

  if (!data.reraId || data.reraId.trim().length < 5) {
    errors.reraId = "Valid RERA ID is mandatory for onboarding.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
