import { MetadataRoute } from "next";

/**
 * Generates the robots.txt file dynamically in Next.js App Router.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mslegacy.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/crm/",
        "/partner/",
        "/client/",
        "/login",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
