import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
export const metadata = {
  title: "Share Your Property Requirement",
  robots: { index: false, follow: true },
};
export default function PostRequirementPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Property requirement"
        title="Share your requirement directly."
        description="The public exchange is not accepting posts here. Prepare an enquiry to discuss your requirement with the team."
      />
      <PublicCTA />
    </>
  );
}
