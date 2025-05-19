# Core Web Vitals Monitoring System

This document provides an overview of the Core Web Vitals monitoring system implemented for RoofFax.Report.

## Overview

The Web Vitals monitoring system collects real user metrics (RUM) to track the performance of the website as experienced by actual users. This data is used to identify performance issues, track improvements over time, and ensure the site meets Google's Core Web Vitals standards.

## Metrics Tracked

The system tracks the following Core Web Vitals metrics:

1. **Largest Contentful Paint (LCP)**: Measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.

2. **First Input Delay (FID)**: Measures interactivity. To provide a good user experience, pages should have a FID of 100 milliseconds or less.

3. **Cumulative Layout Shift (CLS)**: Measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1 or less.

4. **Time to First Byte (TTFB)**: Measures server response time. To provide a good user experience, TTFB should be less than 800 milliseconds.

5. **Interaction to Next Paint (INP)**: Measures responsiveness. To provide a good user experience, INP should be less than 200 milliseconds.

## Implementation Details

### Data Collection

- The system uses the `web-vitals` JavaScript library to collect metrics from real users.
- Metrics are collected on all pages of the website.
- Data is sent to the server using the `navigator.sendBeacon` API when available, falling back to `fetch` for older browsers.
- The system respects user privacy and does not collect any personally identifiable information.

### Data Storage

- Metrics are stored in a PostgreSQL database in the `web_vitals` table.
- Each metric includes:
  - Metric name (LCP, FID, CLS, etc.)
  - Metric value
  - Rating (good, needs-improvement, poor)
  - URL
  - User agent
  - Timestamp

### Monitoring and Alerting

- The system includes a dashboard for visualizing metrics over time.
- Alerts are sent when metrics exceed defined thresholds.
- A daily job checks metrics and sends alerts if necessary.

## Dashboard

The Web Vitals dashboard provides:

1. Current values for all Core Web Vitals metrics
2. Historical trends over time
3. Distribution of good, needs improvement, and poor ratings
4. Problematic pages that need attention
5. Insights and recommendations for improving performance

## Recommendations for Maintaining Good Web Vitals

### Improving LCP

- Optimize and properly size images
- Implement critical CSS
- Remove render-blocking resources
- Use a CDN for faster content delivery

### Improving CLS

- Always include size attributes on images and videos
- Ensure ads, embeds, and iframes have reserved space
- Avoid inserting content above existing content
- Use transform animations instead of animations that trigger layout changes

### Improving FID/INP

- Break up long tasks
- Optimize JavaScript execution
- Minimize main thread work
- Keep request counts low and transfer sizes small

### Improving TTFB

- Use a CDN
- Optimize server response time
- Implement caching
- Use server-side rendering or static generation where appropriate

## Maintenance

The Web Vitals monitoring system requires minimal maintenance:

- Check the dashboard regularly to identify performance issues
- Review and act on alerts when metrics degrade
- Update thresholds as Google's recommendations change
- Periodically clean up old data to manage database size

## Troubleshooting

If you encounter issues with the Web Vitals monitoring system:

1. Check that the `web-vitals.ts` script is properly loaded
2. Verify that the API endpoint is receiving data
3. Check the database connection and schema
4. Review browser console for any JavaScript errors
