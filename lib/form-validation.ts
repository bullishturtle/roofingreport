// Form validation rules
export type ValidationRule = {
  test: (value: string) => boolean
  message: string
}

export const createValidationRule = (testFn: (value: string) => boolean, message: string): ValidationRule => ({
  test: testFn,
  message,
})

export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    test: (value) => value.trim() !== "",
    message,
  }),

  email: (message = "Please enter a valid email address"): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  phoneNumber: (message = "Please enter a valid phone number"): ValidationRule => ({
    test: (value) => {
      if (!value) return true // Optional field passes if empty
      return /^(\+\d{1,2}\s)?(($$\d{3}$$)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
    },
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

  matches: (pattern: RegExp, message = "Invalid format"): ValidationRule => ({
    test: (value) => pattern.test(value),
    message,
  }),

  zipCode: (message = "Please enter a valid ZIP code"): ValidationRule => ({
    test: (value) => {
      if (!value) return true // Optional field passes if empty
      return /^\d{5}(-\d{4})?$/.test(value)
    },
    message,
  }),

  address: (message = "Please enter a valid address"): ValidationRule => ({
    test: (value) => value.trim().length >= 5,
    message,
  }),
}

export const validateField = (value: string, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.message
    }
  }
  return null
}

export const validateForm = (
  values: Record<string, string>,
  fieldRules: Record<string, ValidationRule[]>,
): Record<string, string | null> => {
  const errors: Record<string, string | null> = {}

  Object.keys(fieldRules).forEach((fieldName) => {
    const value = values[fieldName] || ""
    const rules = fieldRules[fieldName]
    errors[fieldName] = validateField(value, rules)
  })

  return errors
}

export const hasErrors = (errors: Record<string, string | null>): boolean => {
  return Object.values(errors).some((error) => error !== null)
}
