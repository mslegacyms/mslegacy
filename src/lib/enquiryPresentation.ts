import { mockDeveloperProjects } from "@/lib/data/mockDeveloperProjects";

export type EnquirySearch = Record<string, string | string[] | undefined>;
export function enquiryContext(search: EnquirySearch) {
  const first = (value: string | string[] | undefined) =>
    typeof value === "string" ? value : value?.[0] || "";
  const references = [first(search.project), ...first(search.ids).split(",")]
    .filter(Boolean)
    .filter((ref) => /^[a-zA-Z0-9_-]{1,120}$/.test(ref));
  const selectedProjects = [...new Set(references)].slice(0, 3).map((ref) => {
    const item = mockDeveloperProjects.find(
      (project) => project.slug === ref || project.id === ref,
    );
    return { id: ref, name: item?.name || ref.replace(/[-_]/g, " ") };
  });
  return {
    initialInterestType:
      first(search.interestType) || first(search.service) || "general_advisory",
    selectedProjects,
  };
}
