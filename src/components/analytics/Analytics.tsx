import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Analytics + Speed Insights wired together. Server component —
 * the underlying SDKs ship their own client boundaries internally, so
 * there's no need to mark this file `'use client'`.
 *
 * Both packages no-op outside Vercel deployments, so they're safe to
 * keep mounted in development.
 */
export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
