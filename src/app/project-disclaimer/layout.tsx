import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace Legal Disclaimer | MS Legacy",
  description: "Review legal disclosures, RERA compliance statements, and due diligence requirements for developers and project catalogs listed on MS Legacy."
};

export default function ProjectDisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
