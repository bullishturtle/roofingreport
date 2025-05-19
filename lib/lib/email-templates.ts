export function getVerificationEmailTemplate(name: string, verificationUrl: string): string {
  return `
    <h1>Verify Your Email</h1>
    <p>Hello ${name},</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `
}

export function getPasswordResetEmailTemplate(name: string, resetUrl: string): string {
  return `
    <h1>Reset Your Password</h1>
    <p>Hello ${name},</p>
    <p>Please reset your password by clicking the link below:</p>
    <a href="${resetUrl}">Reset Password</a>
  `
}

export function getWelcomeEmailTemplate(name: string): string {
  return `
    <h1>Welcome to RoofFax</h1>
    <p>Hello ${name},</p>
    <p>Thank you for joining RoofFax!</p>
  `
}

export default { getVerificationEmailTemplate, getPasswordResetEmailTemplate, getWelcomeEmailTemplate }
