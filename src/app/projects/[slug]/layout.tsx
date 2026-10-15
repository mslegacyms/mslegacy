import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/developers/projects";
import { isPublicProject, isResearchProject } from "@/lib/projectPresentation";
import { pageMetadata } from "@/lib/publicSite";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || !isPublicProject(project))
    return {
      title: "Property Information",
      robots: { index: false, follow: true },
    };
  return {
    ...pageMetadata(
      `${project.name} — Property Information`,
      `Research ${project.name} and discuss current details with MS LEGACY. Confirm price, availability and property-specific evidence.`,
      `/projects/${slug}`,
    ),
    ...(isResearchProject(project)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
