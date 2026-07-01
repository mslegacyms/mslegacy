import { Metadata } from "next";
import RequirementsBoardClient from "./RequirementsBoardClient";

export const metadata: Metadata = {
  title: "Property Requirements Board | MS Legacy",
  description: "Post and discover property requirements for apartments, plots, villas, land, farmland, rentals, and developer mandates. MS Legacy reviews and matches requirements with developers and agents.",
};

export default function RequirementsBoardPage() {
  return <RequirementsBoardClient />;
}
