/**
 * Validation utilities for CRM Tasks.
 */

export interface TaskValidationError {
  title?: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: string;
}

export function validateTask(data: {
  title: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: string;
}): { isValid: boolean; errors: TaskValidationError } {
  const errors: TaskValidationError = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = "Task title must be at least 3 characters.";
  }

  if (data.dueDate && isNaN(Date.parse(data.dueDate))) {
    errors.dueDate = "Please select a valid date.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
