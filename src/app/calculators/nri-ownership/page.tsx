import React from "react";
import { Metadata } from "next";
import { NriOwnershipDetailedCalculator } from "@/components/calculators/NriOwnershipDetailedCalculator";

export const metadata: Metadata = {
  title: "NRI Property Ownership Calculator | MS Legacy",
  description: "Map forex conversion rates, holding costs, tax adjustments, and local property management fees. Planning estimates only."
};

export default function NriOwnershipPage() {
  return <NriOwnershipDetailedCalculator />;
}
