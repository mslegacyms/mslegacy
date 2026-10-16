import React from "react";
import { Metadata } from "next";
import { RentalYieldDetailedCalculator } from "@/components/calculators/RentalYieldDetailedCalculator";

export const metadata: Metadata = {
  title: "Rental Yield Calculator | MS Legacy",
  description: "Analyze gross and net rental yields, vacancy losses, maintenance costs, and cash flow margins. Planning estimates only."
};

export default function RentalYieldPage() {
  return <RentalYieldDetailedCalculator />;
}
