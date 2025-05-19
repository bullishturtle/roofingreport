// Form validation utility functions

type ValidationRule = (value: string) => string | null

export const validationRules = {
  required:
    (message: string): ValidationRule =>
    (value) => {
      return value.trim() ? null : message
    },

  email:
    (message: string): ValidationRule =>
    (value) => {
      if (!value) return null // Skip if empty (use required rule for this)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) ? null : message
    },

  phoneNumber:
    (message: string): ValidationRule =>
    (value) => {
      if (!value) return null // Skip if empty (use required rule for this)
      // Basic phone validation - allows various formats
      const phoneRegex = /^(\+\d{1,3}[- ]?)?$$?(\d{3})$$?[- ]?(\d{3})[- ]?(\d{4})$/
      return phoneRegex.test(value) ? null : message
    },

  minLength:
    (length: number, message: string): ValidationRule =>
    (value) => {
      return value.length >= length ? null : message
    },

  maxLength:
    (length: number, message: string): ValidationRule =>
    (value) => {
      return value.length <= length ? null : message
    },

  matches:
    (pattern: RegExp, message: string): ValidationRule =>
    (value) => {
      return pattern.test(value) ? null : message
    },

  address:
    (message: string): ValidationRule =>
    (value) => {
      if (!value) return null // Skip if empty (use required rule for this)
      // Basic address validation - at least 5 characters with numbers and letters
      return value.length >= 5 && /\d/.test(value) && /[a-zA-Z]/.test(value) ? null : message
    },
}

export function validateField(value: string, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    const error = rule(value)
    if (error) {
      return error
    }
  }
  return null
}

export function validateForm(
  formData: Record<string, string>,
  validationRules: Record<string, ValidationRule[]>,
): Record<string, string | null> {
  const errors: Record<string, string | null> = {}

  for (const [field, rules] of Object.entries(validationRules)) {
    const value = formData[field] || ""
    errors[field] = validateField(value, rules)
  }

  return errors
}

export function hasErrors(errors: Record<string, string | null>): boolean {
  return Object.values(errors).some((error) => error !== null)
}
