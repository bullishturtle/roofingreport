export function getVerificationEmailTemplate(name: string, verificationUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verify Your Email</title>
    </head>
    <body>
      <div>
        <h2>Verify Your Email Address</h2>
        <p>Hello ${name},</p>
        <p>Thank you for registering with RoofFax. To complete your registration, please verify your email address by clicking the link below:</p>
        <p><a href="${verificationUrl}">Verify Email Address</a></p>
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
    </head>
    <body>
      <div>
        <h2>Reset Your Password</h2>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Click the link below to create a new password:</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
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
    </head>
    <body>
      <div>
        <h2>Welcome to RoofFax!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for joining RoofFax - The World's Smartest Roof & Property Report.</p>
      </div>
    </body>
    </html>
  `
}

export function getRoofReportEmailTemplate(
  recipientName: string,
  address: string,
  reportData: any,
  viewReportUrl: string,
  additionalMessage = "",
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your RoofFax Report</title>
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
          background-color: #1a365d;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .logo {
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
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
          background-color: #f1f1f1;
          border-radius: 0 0 8px 8px;
          border: 1px solid #ddd;
          border-top: none;
        }
        .section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1a365d;
          margin-bottom: 10px;
        }
        .property {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .property-label {
          font-weight: bold;
          color: #555;
        }
        .property-value {
          text-align: right;
        }
        .issues-list, .recommendations-list {
          margin: 0;
          padding-left: 20px;
        }
        .issues-list li, .recommendations-list li {
          margin-bottom: 8px;
        }
        .address-bar {
          background-color: #f0b429;
          color: #000;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        .additional-message {
          margin-top: 20px;
          padding: 15px;
          background-color: #f5f5f5;
          border-left: 4px solid #1a365d;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">RoofFax Report</div>
        </div>
        
        <div class="content">
          <p>Hello ${recipientName},</p>
          
          <p>Your RoofFax report for the following property is ready:</p>
          
          <div class="address-bar">${address}</div>
          
          <div class="section">
            <div class="section-title">Roof Overview</div>
            <div class="property">
              <span class="property-label">Estimated Age:</span>
              <span class="property-value">${reportData.roofAge}</span>
            </div>
            <div class="property">
              <span class="property-label">Condition:</span>
              <span class="property-value">${reportData.condition}</span>
            </div>
            <div class="property">
              <span class="property-label">Est. Remaining Life:</span>
              <span class="property-value">${reportData.estimatedLifespan}</span>
            </div>
            <div class="property">
              <span class="property-label">Materials:</span>
              <span class="property-value">${reportData.materials}</span>
            </div>
            <div class="property">
              <span class="property-label">Square Footage:</span>
              <span class="property-value">${reportData.squareFootage}</span>
            </div>
            <div class="property">
              <span class="property-label">Slope:</span>
              <span class="property-value">${reportData.slope}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Identified Issues</div>
            <ul class="issues-list">
              ${reportData.issues.map((issue: string) => `<li>${issue}</li>`).join("")}
            </ul>
          </div>
          
          <div class="section">
            <div class="section-title">Recommendations</div>
            <ul class="recommendations-list">
              ${reportData.recommendations.map((rec: string) => `<li>${rec}</li>`).join("")}
            </ul>
          </div>
          
          ${
            additionalMessage
              ? `
          <div class="additional-message">
            ${additionalMessage}
          </div>
          `
              : ""
          }
          
          <p>To view the complete report with images and additional details, please click the button below:</p>
          
          <p style="text-align: center;">
            <a href="${viewReportUrl}" class="button">View Full Report</a>
          </p>
          
          <p>If you have any questions about this report or would like to schedule a professional inspection, please don't hesitate to contact us.</p>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} RoofFax.Report. All rights reserved.</p>
          <p>The World's Smartest Roof & Property Report</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export default {
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
  getWelcomeEmailTemplate,
  getRoofReportEmailTemplate,
}
