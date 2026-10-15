import type { MetadataRoute } from "next";
import { publicSite } from "@/lib/publicSite";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/crm/",
        "/partner/",
        "/client/",
        "/login",
        "/project-enquiry",
        "/requirements/",
      ],
    },
    sitemap: `${publicSite.url}/sitemap.xml`,
  };
}
