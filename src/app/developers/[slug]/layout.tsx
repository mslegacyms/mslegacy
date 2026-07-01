import { Metadata } from "next";
import { getDeveloperBySlug } from "@/lib/developers/developers";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const developer = await getDeveloperBySlug(slug);
  
  if (!developer) {
    return {
      title: "Real Estate Developer | MS Legacy",
    };
  }

  return {
    title: `${developer.name} Projects in Karnataka | MS Legacy`,
    description: `Explore layouts, apartments, and plotting assets developed by ${developer.name}. Audited for RERA registration compliance.`,
  };
}

export default async function DeveloperSlugLayout({ params, children }: Props) {
  // Await params to satisfy Next.js asynchronous route parameters constraint
  await params;
  return <>{children}</>;
}
