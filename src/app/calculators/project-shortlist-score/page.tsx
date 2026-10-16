import React from "react";
import { Metadata } from "next";
import { ProjectShortlistScoreDetailedCalculator } from "@/components/calculators/ProjectShortlistScoreDetailedCalculator";

export const metadata: Metadata = {
  title: "Project Shortlist Score Calculator | MS Legacy",
  description: "Score and compare multiple layout or apartment prospects objectively on key statutory metrics. Planning estimates only."
};

export default function ProjectShortlistScorePage() {
  return <ProjectShortlistScoreDetailedCalculator />;
}
