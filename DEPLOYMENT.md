# RoofFax Deployment Guide

This document provides comprehensive instructions for deploying the RoofFax application to production environments.

## Prerequisites

- Node.js 18.x or later
- Vercel account
- Supabase account
- Environment variables configured

## Environment Variables

Ensure the following environment variables are set in your Vercel project:

### Required Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: Full URL of your application
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

### Optional Variables

- `NEXT_PUBLIC_APP_URL`: Public URL of your application
- `NEXT_PUBLIC_APP_VERSION`: Application version
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `CRON_SECRET`: Secret for cron job authentication
- `CI`: Set to "true" for CI/CD environments

## Deployment Steps

### 1. Prepare for Deployment

\`\`\`bash
# Install dependencies
npm install

# Build the application
npm run build
\`\`\`

### 2. Deploy to Vercel

The easiest way to deploy is directly through Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy the application

Alternatively, use the Vercel CLI:

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
\`\`\`

### 3. Database Setup

Ensure your database is properly set up:

\`\`\`bash
# Run database migrations
npx prisma migrate deploy
\`\`\`

### 4. Post-Deployment Verification

After deployment, verify the following:

- Application loads correctly
- Authentication works
- Database connections are successful
- API endpoints are functioning
- Error monitoring is active

## Monitoring and Maintenance

### Health Checks

Monitor the application health endpoint:

\`\`\`
GET /api/health
\`\`\`

### Error Monitoring

We use Sentry for error monitoring. Ensure it's properly configured in your environment.

### Performance Monitoring

Monitor Core Web Vitals through:

1. Google Search Console
2. Lighthouse reports
3. Our built-in performance monitoring at `/admin/performance`

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL is correct
   - Check network access to database

2. **Authentication Issues**
   - Verify NEXTAUTH_SECRET and NEXTAUTH_URL
   - Check user permissions in database

3. **Build Failures**
   - Check build logs for specific errors
   - Verify all dependencies are installed

### Support

For additional support, contact:

- Email: support@rooffax.com
- Phone: (850) 879-9172

## Rollback Procedure

If deployment fails or critical issues are discovered:

1. In Vercel dashboard, go to Deployments
2. Find the last stable deployment
3. Click "..." and select "Promote to Production"
\`\`\`

Let's create a production-ready README:
