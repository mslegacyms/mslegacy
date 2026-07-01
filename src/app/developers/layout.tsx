import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Developers in Karnataka | MS Legacy",
  description: "Browse verified profiles, ongoing layours, and completed projects of major property developers in Karnataka under unified legal due diligence frameworks."
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
