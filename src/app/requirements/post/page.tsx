import { Metadata } from "next";
import PostRequirementClient from "./PostRequirementClient";

export const metadata: Metadata = {
  title: "Post Your Property Requirement | MS Legacy",
  description: "Submit your apartment, plot, villa, farmland, rental, land, or Joint Development requirement to MS Legacy's demand exchange board.",
};

export default function PostRequirementPage() {
  return <PostRequirementClient />;
}
