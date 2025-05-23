// Client-safe utility for getting request information
// This provides alternatives to next/headers functionality

export function getClientIP(req?: Request): string {
  if (!req) return "unknown"
  return req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
}

export function getUserAgent(req?: Request): string {
  if (!req) return "unknown"
  return req.headers.get("user-agent") || "unknown"
}

// Safe version that works on both client and server
export function getRequestInfo(req?: Request) {
  return {
    ip: getClientIP(req),
    userAgent: getUserAgent(req),
    timestamp: new Date().toISOString(),
  }
}
