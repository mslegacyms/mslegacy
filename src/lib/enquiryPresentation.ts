import { mockDeveloperProjects } from "@/lib/data/mockDeveloperProjects";

export type EnquirySearch = Record<string, string | string[] | undefined>;
export function enquiryContext(search: EnquirySearch) {
  const first = (value: string | string[] | undefined) =>
    typeof value === "string" ? value : value?.[0] || "";
  const references = [first(search.project), ...first(search.ids).split(",")]
    .filter(Boolean)
    .filter((ref) => /^[a-zA-Z0-9_-]{1,120}$/.test(ref));
  const resolvedProjects = references.map((ref) => {
    const item = mockDeveloperProjects.find(
      (project) => project.slug === ref || project.id === ref,
    );
    return { id: item?.id || ref, name: item?.name || ref.replace(/[-_]/g, " ") };
  });
  const selectedProjects = [...new Map(resolvedProjects.map((item) => [item.id, item])).values()].slice(0, 3);
  return {
    initialInterestType:
      first(search.interestType) || first(search.service) || "general_advisory",
    selectedProjects,
    initialMessage: first(search.message).slice(0, 4000),
  };
}
