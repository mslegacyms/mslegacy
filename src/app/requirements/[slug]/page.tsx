import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
export const metadata = {
  title: "Property Requirement Enquiries",
  robots: { index: false, follow: true },
};
export default function RequirementDetailPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Property requirement"
        title="This requirement is not available for public viewing."
        description="Contact MS LEGACY to discuss your own property requirement."
      />
      <PublicCTA />
    </>
  );
}
