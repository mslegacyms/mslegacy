import { Metadata } from "next";
import { getCrmRequirements } from "@/lib/requirements/requirements";
import RequirementDetailsClient from "./RequirementDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Since requirements data contains fallback states, we fetch all crm requirements
  // to retrieve the specific record securely on compile time for metadata.
  const allReqs = await getCrmRequirements();
  const req = allReqs.find((r) => r.slug === slug);
  
  if (!req) {
    return {
      title: "Requirement Not Found | MS Legacy Sourcing Board",
    };
  }

  return {
    title: `${req.title} | MS Legacy Sourcing Board`,
    description: req.requirementSummary 
      ? req.requirementSummary.slice(0, 160) 
      : "MS Legacy Sourcing Board. Verified client demand profile matching.",
  };
}

export default async function Page() {
  return <RequirementDetailsClient />;
}
