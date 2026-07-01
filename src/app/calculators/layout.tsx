import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property & Construction Cost Planning Calculators | MS Legacy",
  description: "Calculate home loan EMIs, budget affordability, stamp duty rates, construction costs, plot acquisition charges, and NRI forex outflow estimates."
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
