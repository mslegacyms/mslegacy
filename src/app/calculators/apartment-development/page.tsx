import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Apartment Development Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/apartment-development",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Apartment Development Planning" />;
}
