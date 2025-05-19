export function getVerificationEmailTemplate(name: string, verificationUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #1a1a1a;
          padding: 20px;
          text-align: center;
        }
        .logo {
          color: #f0b429;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #f0b429;
          color: #000 !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
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
          <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p>${verificationUrl}</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} RoofFax. All rights reserved.</p>
          <p>The World's Smartest Roof & Property Report</p>
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #1a1a1a;
          padding: 20px;
          text-align: center;
        }
        .logo {
          color: #f0b429;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #f0b429;
          color: #000 !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
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
          <p>We received a request to reset your password for your RoofFax account. Click the button below to create a new password:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
          <p>This password reset link will expire in 1 hour.</p>
          <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p>${resetUrl}</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} RoofFax. All rights reserved.</p>
          <p>The World's Smartest Roof & Property Report</p>
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to RoofFax</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #1a1a1a;
          padding: 20px;
          text-align: center;
        }
        .logo {
          color: #f0b429;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #f0b429;
          color: #000 !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
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
          <p>Thank you for joining RoofFax - The World's Smartest Roof & Property Report.</p>
          <p>With RoofFax, you can:</p>
          <ul>
            <li>Get detailed roof measurements and condition reports</li>
            <li>Track storm history and potential damage</li>
            <li>Access property information and code compliance details</li>
            <li>Generate professional proposals and estimates</li>
          </ul>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} RoofFax. All rights reserved.</p>
          <p>The World's Smartest Roof & Property Report</p>
        </div>
      </div>
    </body>
    </html>
  `
}
