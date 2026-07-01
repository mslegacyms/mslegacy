/**
 * Validation utilities for Leads onboarding.
 */

export interface LeadValidationError {
  fullName?: string;
  phone?: string;
  email?: string;
  interestType?: string;
  buyerType?: string;
  budgetRange?: string;
}

/**
 * Validates lead inputs and returns errors if any.
 */
export function validateLead(data: {
  fullName: string;
  phone?: string;
  email?: string;
  interestType?: string;
  buyerType?: string;
  budgetRange?: string;
}): { isValid: boolean; errors: LeadValidationError } {
  const errors: LeadValidationError = {};
  
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  
  if (data.phone && !/^\+?[1-9]\d{1,14}$/.test(data.phone.replace(/[\s-()]/g, ""))) {
    errors.phone = "Please enter a valid phone number.";
  }
  
  if (!data.interestType) {
    errors.interestType = "Primary interest division is required.";
  }
  
  if (!data.buyerType) {
    errors.buyerType = "Profile type is required.";
  }
  
  if (!data.budgetRange) {
    errors.budgetRange = "Budget allocation is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
