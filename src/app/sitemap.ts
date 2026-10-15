import type { MetadataRoute } from "next";
import { publicSite } from "@/lib/publicSite";
export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
  return routes.map((path) => ({
    url: `${publicSite.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
