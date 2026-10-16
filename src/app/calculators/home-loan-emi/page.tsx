import React from "react";
import { Metadata } from "next";
import { HomeLoanEmiDetailedCalculator } from "@/components/calculators/HomeLoanEmiDetailedCalculator";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator | MS Legacy",
  description: "Analyze monthly outflows, interest splits, prepayment benefits, and debt-to-income limits. Planning estimates only."
};

export default function HomeLoanEmiPage() {
  return <HomeLoanEmiDetailedCalculator />;
}
