import type { MetadataRoute } from "next";
import { publicSite } from "@/lib/publicSite";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { isPublicProject } from "@/lib/projectPresentation";
import { mockNewsUpdates } from "@/lib/data/mockNewsUpdates";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/services",
    "/services/land-sourcing",
    "/services/turnkey-construction",
    "/services/property-management",
    "/services/legal-due-diligence",
    "/nri-support",
    "/projects",
    "/resources",
    "/contact",
    "/privacy",
    "/terms",
    "/project-disclaimer",
    "/channel-partners",
    "/project-participation",
    "/developers",
    "/calculators",
    "/government-links",
    "/news",
  ];
  const [projects, developers] = await Promise.all([getProjects(), getDevelopers()]);
  const staticPages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${publicSite.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  return [
    ...staticPages,
    ...projects.filter(isPublicProject).map((project) => ({ url: `${publicSite.url}/projects/${project.slug}` })),
    ...developers.filter((developer) => developer.status === "active").map((developer) => ({ url: `${publicSite.url}/developers/${developer.slug}` })),
    ...mockNewsUpdates.filter((news) => news.isPublished).map((news) => ({
      url: `${publicSite.url}/news/${news.slug}`,
      ...(news.lastCheckedDate ? { lastModified: news.lastCheckedDate } : {}),
    })),
  ];
}
