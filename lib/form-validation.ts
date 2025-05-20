export type ValidationRule = {
  test: (value: string) => boolean
  message: string
}

export type FieldValidation = {
  [key: string]: ValidationRule[]
}

export const validateField = (value: string, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.message
    }
  }
  return null
}

export const validateForm = (values: Record<string, string>, validation: FieldValidation): Record<string, string> => {
  const errors: Record<string, string> = {}

  Object.keys(validation).forEach((field) => {
    const value = values[field] || ""
    const fieldRules = validation[field]
    const error = validateField(value, fieldRules)
    if (error) {
      errors[field] = error
    }
  })

  return errors
}

// Common validation rules
export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    test: (value) => value.trim() !== "",
    message,
  }),
  email: (message = "Please enter a valid email address"): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),
  minLength: (length: number, message = `Must be at least ${length} characters`): ValidationRule => ({
    test: (value) => value.length >= length,
    message,
  }),
  maxLength: (length: number, message = `Must be no more than ${length} characters`): ValidationRule => ({
    test: (value) => value.length <= length,
    message,
  }),
  zipCode: (message = "Please enter a valid ZIP code"): ValidationRule => ({
    test: (value) => /^\d{5}(-\d{4})?$/.test(value),
    message,
  }),
  phoneNumber: (message = "Please enter a valid phone number"): ValidationRule => ({
    test: (value) => /^(\+\d{1,2}\s)?$$?\d{3}$$?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value),
    message,
  }),
  address: (message = "Please enter a valid address"): ValidationRule => ({
    test: (value) => value.trim().length > 5,
    message,
  }),
}
