import React from "react";
import { Metadata } from "next";
import { LandPlotCostDetailedCalculator } from "@/components/calculators/LandPlotCostDetailedCalculator";

export const metadata: Metadata = {
  title: "Land & Plot Cost Calculator | MS Legacy",
  description: "Proportion base land rates, registration duties, survey sketch costs, and boundary fencing expenses. Planning estimates only."
};

export default function LandPlotCostPage() {
  return <LandPlotCostDetailedCalculator />;
}
