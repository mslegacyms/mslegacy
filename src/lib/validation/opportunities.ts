/**
 * Validation utilities for Opportunities/Properties onboarding.
 */

export interface OpportunityValidationError {
  title?: string;
  location?: string;
  landArea?: string;
  priceRange?: string;
  reraStatus?: string;
  wealthScore?: string;
}

export function validateOpportunity(data: {
  title: string;
  location?: string;
  landArea?: string;
  priceRange?: string;
  reraStatus?: string;
  wealthScore?: string;
}): { isValid: boolean; errors: OpportunityValidationError } {
  const errors: OpportunityValidationError = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = "Property title must be at least 3 characters.";
  }

  if (!data.location || data.location.trim().length < 2) {
    errors.location = "Corridor/Location is required.";
  }

  if (data.wealthScore && (isNaN(Number(data.wealthScore)) || Number(data.wealthScore) < 0 || Number(data.wealthScore) > 10)) {
    errors.wealthScore = "Wealth Score must be a number between 0 and 10.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
