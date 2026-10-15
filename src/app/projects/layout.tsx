import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Property Information & Research",
  "Browse property information, compare options and discuss current details with MS LEGACY. Confirm price, availability and evidence for each property.",
  "/projects",
);
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
