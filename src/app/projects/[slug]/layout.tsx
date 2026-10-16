import { Metadata } from "next";
import { getProjectBySlug } from "@/lib/developers/projects";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Layout Profile | MS Legacy",
    };
  }

  return {
    title: `${project.name} Review, Location & Details | MS Legacy`,
    description: `Inspect technical specifications, RERA status, and legal title trails for ${project.name} in ${project.locality}, ${project.city}.`,
  };
}

export default async function ProjectSlugLayout({ params, children }: Props) {
  // Await params to satisfy Next.js asynchronous route parameters constraint
  await params;
  return <>{children}</>;
}
