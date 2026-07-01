import React from "react";
import { Metadata } from "next";
import { BuyerAffordabilityDetailedCalculator } from "@/components/calculators/BuyerAffordabilityDetailedCalculator";

export const metadata: Metadata = {
  title: "Buyer Affordability Calculator | MS Legacy",
  description: "Assess safe purchasing power, down-payment parameters, and debt-to-income buffers. Planning estimates only."
};

export default function BuyerAffordabilityPage() {
  return <BuyerAffordabilityDetailedCalculator />;
}
