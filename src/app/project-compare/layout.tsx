import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Compare Property Information",
  "Compare selected property research entries and carry all selections into an MS LEGACY enquiry.",
  "/project-compare",
);
export default function ComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
