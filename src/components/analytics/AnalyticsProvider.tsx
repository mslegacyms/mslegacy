import type { ReactNode } from "react";
/** Tracking stays disabled until consent, route exclusions and event minimization are implemented. */
export default function AnalyticsProvider({ children }: { children: ReactNode }) { return <>{children}</>; }
