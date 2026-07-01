import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Verification Queue | CRM | MS Legacy",
  description: "Monitor and manage developer RERA clearances, logo permissions, and legal checklist approvals."
};

export default function ProjectVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

