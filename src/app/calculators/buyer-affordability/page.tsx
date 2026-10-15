import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Buyer Affordability Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/buyer-affordability",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Buyer Affordability Planning" />;
}
