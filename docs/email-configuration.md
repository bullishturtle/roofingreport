# Email Configuration Guide

This guide explains how to configure email sending for the RoofFax application.

## Current Implementation

The RoofFax application uses [Resend](https://resend.com) as its email service provider. Resend is a modern email API that makes it easy to send emails from your application.

## Configuration Steps

1. **Sign up for Resend**
   - Go to [https://resend.com](https://resend.com) and create an account
   - Verify your email address

2. **Create an API Key**
   - In the Resend dashboard, go to the API Keys section
   - Create a new API key with appropriate permissions
   - Copy the API key

3. **Add the API Key to Environment Variables**
   - Add the API key to your environment variables as `EMAIL_API_KEY`
   - In Vercel, go to Project Settings > Environment Variables
   - Add a new environment variable with the name `EMAIL_API_KEY` and paste the API key as the value

4. **Verify Your Domain**
   - In the Resend dashboard, go to the Domains section
   - Add and verify your domain (e.g., rooffax.report)
   - Follow the DNS verification instructions provided by Resend

5. **Update From Email Address**
   - After verifying your domain, update the `EMAIL_FROM` environment variable
   - Use an email address from your verified domain (e.g., `noreply@rooffax.report`)

## Testing Email Functionality

After configuring the email service, you can test it using the Email Template Preview tool in the admin panel:

1. Go to Admin > Email Templates
2. Select a template to preview
3. Click "Send Test Email" and enter your email address
4. Check your inbox for the test email

## Placeholder Functionality

If the email service is not configured (no API key provided), the application will use placeholder functionality:

- Emails will not be sent
- Email content will be logged to the console
- All email-related functions will return success
- The admin panel will show a warning that email is not configured

This allows the application to function normally during development or when email sending is not required.

## Troubleshooting

If you encounter issues with email sending:

1. Check that the API key is correctly set in environment variables
2. Verify that your domain is properly verified in Resend
3. Check the application logs for any error messages
4. Test sending an email directly through the Resend dashboard
5. Ensure your `EMAIL_FROM` address uses a verified domain

## Email Templates

All email templates are defined in `lib/email-templates.ts`. If you need to modify the content or styling of emails, edit the appropriate template function in this file.
