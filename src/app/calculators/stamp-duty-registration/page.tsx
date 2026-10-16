import React from "react";
import { Metadata } from "next";
import { StampDutyRegistrationDetailedCalculator } from "@/components/calculators/StampDutyRegistrationDetailedCalculator";

export const metadata: Metadata = {
  title: "Stamp Duty & Registration Calculator | MS Legacy",
  description: "Estimate statutory stamp duty, cess surcharges, sub-registrar fees, and registration costs. Planning estimates only."
};

export default function StampDutyRegistrationPage() {
  return <StampDutyRegistrationDetailedCalculator />;
}
