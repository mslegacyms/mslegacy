import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Home Loan EMI Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/home-loan-emi",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Home Loan EMI Planning" />;
}
