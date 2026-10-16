import { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";
import { getProjects } from "@/lib/developers/projects";
import { getDevelopers } from "@/lib/developers/developers";
import { mockNewsUpdates } from "@/lib/data/mockNewsUpdates";
/** Uses the same catalog adapters as public pages; build time is not a modification date. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteOrigin();
  const routes: string[] = ["", "/about", "/services", "/services/land-sourcing", "/services/turnkey-construction", "/services/property-management", "/services/legal-due-diligence", "/project-participation", "/property-wealth-score", "/opportunities", "/resources", "/contact", "/channel-partners", "/developers", "/projects", "/calculators", "/news", "/project-disclaimer", "/requirements", "/project-enquiry", "/privacy", "/terms", "/calculators/project-shortlist-score", "/calculators/nri-ownership", "/calculators/land-plot-cost", "/calculators/layout-development", "/calculators/home-loan-emi", "/calculators/construction-cost", "/calculators/buyer-affordability", "/calculators/apartment-development", "/calculators/rental-yield", "/calculators/stamp-duty-registration"];
  const [projects, developers] = await Promise.all([getProjects(), getDevelopers()]);
  return [
    ...routes.map(path => ({ url: base + path })),
    ...projects.filter(project => project.publicVisibility === "published").map(project => ({ url: base + "/projects/" + project.slug })),
    ...developers.filter(developer => developer.status === "active").map(developer => ({ url: base + "/developers/" + developer.slug })),
    ...mockNewsUpdates.filter(news => news.isPublished).map(news => ({ url: base + "/news/" + news.slug, ...(news.lastCheckedDate ? { lastModified: news.lastCheckedDate } : {}) })),
  ];
}
