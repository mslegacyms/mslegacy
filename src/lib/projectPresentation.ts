import type { DeveloperProject } from "@/lib/types/developerMarketplace";
import { mockDeveloperProjects } from "@/lib/data/mockDeveloperProjects";
import { formatINR } from "@/lib/utils";
const researchIds = new Set(mockDeveloperProjects.map((item) => item.id));
export function isResearchProject(project: DeveloperProject) {
  return (
    researchIds.has(project.id) ||
    project.publicVisibility === "public_information" ||
    /sample|simulat|demo/i.test(project.disclaimer || "")
  );
}
export function isPublicProject(project: DeveloperProject) {
  return (
    project.publicVisibility === "published" ||
    project.publicVisibility === "public_information"
  );
}
export function projectPrice(project: DeveloperProject) {
  if (isResearchProject(project)) return "Request current price";
  return project.startingPrice &&
    Number.isFinite(project.startingPrice) &&
    project.startingPrice > 0
    ? `From ${formatINR(project.startingPrice)}`
    : "Request current price";
}
export function projectSource(project: DeveloperProject) {
  try {
    const url = new URL(project.sourceUrl || "");
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function canShowProjectImage(project: DeveloperProject) {
  return (
    !isResearchProject(project) &&
    ["permission_received", "public_marketing_use_allowed"].includes(
      project.mediaPermissionStatus || "",
    )
  );
}
