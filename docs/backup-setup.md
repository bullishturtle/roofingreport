# RoofFax Database Backup System

This document explains how to set up and configure the automated database backup system for RoofFax.

## Overview

The RoofFax backup system provides:

- Automated daily and weekly backups
- Manual backup capability through the admin interface
- Backup retention policies (30 days for daily, 90 days for weekly)
- Backup verification and monitoring

## Setup Instructions

### 1. Environment Variables

Add the following environment variable to your project:

\`\`\`
CRON_SECRET=your-secure-random-string
\`\`\`

This secret is used to authenticate cron job requests.

### 2. Setting Up Cron Jobs

#### Using Vercel Cron Jobs

If you're hosting on Vercel, you can use Vercel Cron:

1. Add the following to your `vercel.json` file:

\`\`\`json
{
  "crons": [
    {
      "path": "/api/cron/backup",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/backup",
      "schedule": "0 0 * * 0"
    }
  ]
}
\`\`\`

2. Deploy your application to Vercel.

#### Using External Cron Service

If you're using an external cron service like cron-job.org or GitHub Actions:

1. Set up a daily job to call:
   \`\`\`
   curl -X POST https://your-domain.com/api/cron/backup \
     -H "Authorization: Bearer your-cron-secret" \
     -H "Content-Type: application/json" \
     -d '{"jobType":"daily"}'
   \`\`\`

2. Set up a weekly job to call:
   \`\`\`
   curl -X POST https://your-domain.com/api/cron/backup \
     -H "Authorization: Bearer your-cron-secret" \
     -H "Content-Type: application/json" \
     -d '{"jobType":"weekly"}'
   \`\`\`

### 3. Initialize the Backup System

1. Navigate to the Admin Dashboard at `/admin`
2. Click "Initialize Backup System" to set up the necessary database tables

## Backup Management

### Manual Backups

1. Navigate to the Admin Dashboard at `/admin`
2. Click "Create Manual Backup" to trigger an immediate backup

### Viewing Backups

1. Navigate to the Admin Dashboard at `/admin`
2. The backup list shows recent backups with their status, size, and creation date

### Cleaning Up Old Backups

1. Navigate to the Admin Dashboard at `/admin`
2. Click "Clean Up Old Backups" to remove backups older than the retention period

## Monitoring

The backup system logs all activities. Check your application logs for entries with the following prefixes:

- `[SYSTEM EVENT]` - Normal backup operations
- `[ERROR]` - Backup failures or issues

## Troubleshooting

If backups are failing:

1. Check that the database connection is working
2. Verify that the cron jobs are running correctly
3. Check the application logs for specific error messages
4. Ensure the backup system has been initialized

For persistent issues, contact the RoofFax development team.
