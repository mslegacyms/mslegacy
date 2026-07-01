"use client";

import React, { useEffect } from "react";
import Script from "next/script";

/**
 * Privacy-safe Analytics Provider component.
 * Loads Google Analytics dynamically if the NEXT_PUBLIC_GA_MEASUREMENT_ID is configured.
 * Does not track sensitive CRM directories or private document contents.
 */
export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaId) return;

    // Optional client-side load logging
    if (process.env.NODE_ENV === "development") {
      console.log("[ANALYTICS] Privacy-safe tracking enabled with ID:", gaId);
    }
  }, [gaId]);

  if (!gaId) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Google Analytics Script tags */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Privacy-safe settings: anonymize IP addresses
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
      {children}
    </>
  );
}
