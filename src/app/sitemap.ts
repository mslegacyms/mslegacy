import { MetadataRoute } from "next";
import { mockDevelopers } from "@/lib/data/mockDevelopers";
import { mockDeveloperProjects } from "@/lib/data/mockDeveloperProjects";
import { mockNewsUpdates } from "@/lib/data/mockNewsUpdates";

/**
 * Generates the sitemap.xml dynamically in Next.js App Router.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mslegacy.in";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/land-sourcing",
    "/services/turnkey-construction",
    "/services/property-management",
    "/services/legal-due-diligence",
    "/project-participation",
    "/property-wealth-score",
    "/opportunities",
    "/resources",
    "/contact",
    "/channel-partners",
    "/developers",
    "/projects",
    "/calculators",
    "/news",
    "/project-disclaimer",
  ];

  const sitemapEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Append developer slugs
  mockDevelopers.forEach((dev) => {
    if (dev.status === "active") {
      sitemapEntries.push({
        url: `${baseUrl}/developers/${dev.slug}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    }
  });

  // Append project slugs
  mockDeveloperProjects.forEach((proj) => {
    if (proj.publicVisibility === "published") {
      sitemapEntries.push({
        url: `${baseUrl}/projects/${proj.slug}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    }
  });

  // Append news article slugs
  mockNewsUpdates.forEach((news) => {
    if (news.isPublished) {
      sitemapEntries.push({
        url: `${baseUrl}/news/${news.slug}`,
        lastModified: news.lastCheckedDate,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      });
    }
  });

  return sitemapEntries;
}
