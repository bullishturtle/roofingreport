export function getVerificationEmailTemplate(name: string, verificationUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verify Your Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 5px;
          padding: 20px;
          border: 1px solid #ddd;
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #f59e0b;
        }
        .content {
          padding: 20px 0;
        }
        .button {
          display: inline-block;
          background-color: #f59e0b;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">RoofFax</div>
        </div>
        <div class="content">
          <h2>Verify Your Email Address</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering with RoofFax. To complete your registration, please verify your email address by clicking the button below:</p>
          <p style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </p>
          <p>If you didn't create an account with RoofFax, you can safely ignore this email.</p>
          <p>This verification link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} RoofFax. All rights reserved.</p>
          <p>Thomas Roofing & Repair Inc.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function getWelcomeEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to RoofFax</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 5px;
          padding: 20px;
          border: 1px solid #ddd;
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #f59e0b;
        }
        .content {
          padding: 20px 0;
        }
        .button {
          display: inline-block;
          background-color: #f59e0b;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">RoofFax</div>
        </div>
        <div class="content">
          <h2>Welcome to RoofFax!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for verifying your email address. Your account is now fully activated!</p>
          <p>RoofFax is the World's Smartest Roof & Property Report platform, bringing together roof measurement, storm tracking, skip tracing, code lookups, proposals, and instant outreach.</p>
          <p style="text-align: center;">
            <a href="https://rooffax.report" class="button">Visit Dashboard</a>
          </p>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} RoofFax. All rights reserved.</p>
          <p>Thomas Roofing & Repair Inc.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function getPasswordResetEmailTemplate(name: string, resetUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 5px;
          padding: 20px;
          border: 1px solid #ddd;
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #f59e0b;
        }
        .content {
          padding: 20px 0;
        }
        .button {
          display: inline-block;
          background-color: #f59e0b;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">RoofFax</div>
        </div>
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>Hello ${name},</p>
          <p>We received a request to reset your password for your RoofFax account. Click the button below to set a new password:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
          <p>This password reset link will expire in 1 hour for security reasons.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} RoofFax. All rights reserved.</p>
          <p>Thomas Roofing & Repair Inc.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
