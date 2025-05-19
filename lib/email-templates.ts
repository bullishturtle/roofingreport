/**
 * Get a basic HTML email template for roof reports
 */
export function getReportEmailTemplate({
  recipientName,
  address,
  roofAge,
  roofType,
  roofCondition,
  estimatedLife,
  issues = [],
  recommendations = [],
  message = "",
  reportUrl,
}: {
  recipientName: string
  address: string
  roofAge?: number
  roofType?: string
  roofCondition?: string
  estimatedLife?: number
  issues?: Array<{ severity: string; description: string }>
  recommendations?: string[]
  message?: string
  reportUrl: string
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">RoofFax Report</h1>
      </div>
      
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hello ${recipientName},</p>
        
        <p>Your RoofFax report for <strong>${address}</strong> is ready to view.</p>
        
        ${message ? `<p>${message}</p>` : ""}
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${reportUrl}" style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
            View Full Report
          </a>
        </div>
        
        <p>This report includes information about your roof's condition, estimated age, and recommendations for maintenance.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        
        <p style="font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} RoofFax.Report. All rights reserved.<br />
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </div>
  `
}

/**
 * Get a basic verification email template
 */
export function getVerificationEmailTemplate(userName: string, verificationLink: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Verify Your Email</h1>
      </div>
      
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hello ${userName},</p>
        
        <p>Thank you for creating an account with RoofFax. We're excited to have you on board!</p>
        
        <p>Please verify your email address by clicking the button below:</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${verificationLink}" style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
            Verify Email
          </a>
        </div>
        
        <p>If you did not create this account, you can safely ignore this email.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        
        <p style="font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} RoofFax.Report. All rights reserved.<br />
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </div>
  `
}

/**
 * Get a basic password reset email template
 */
export function getResetPasswordEmailTemplate(userName: string, resetLink: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Reset Your Password</h1>
      </div>
      
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hello ${userName},</p>
        
        <p>We received a request to reset your password for your RoofFax account.</p>
        
        <p>Click the button below to reset your password:</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${resetLink}" style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
            Reset Password
          </a>
        </div>
        
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        
        <p style="font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} RoofFax.Report. All rights reserved.<br />
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </div>
  `
}

/**
 * Get a basic welcome email template
 */
export function getWelcomeEmailTemplate(userName: string, verificationLink: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Welcome to RoofFax</h1>
      </div>
      
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hello ${userName},</p>
        
        <p>Thank you for creating an account with RoofFax. We're excited to have you on board!</p>
        
        <p>Please verify your email address by clicking the button below:</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${verificationLink}" style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
            Verify Email
          </a>
        </div>
        
        <p>If you did not create this account, you can safely ignore this email.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        
        <p style="font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} RoofFax.Report. All rights reserved.<br />
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </div>
  `
}
