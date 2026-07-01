import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Projects in Karnataka | Apartments, Plots & Farmlands | MS Legacy",
  description: "Explore catalogued gated communities, high-rise apartments, and managed farm plots. Backed by 30-year mother deed title clearance checks."
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
