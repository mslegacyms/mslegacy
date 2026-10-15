import { PublicIntro } from "@/components/public/PublicComponents";
import { ProjectEnquiryForm } from "@/components/projects/ProjectEnquiryForm";
import { enquiryContext, type EnquirySearch } from "@/lib/enquiryPresentation";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = {
  ...pageMetadata(
    "Discuss Your Property Requirement",
    "Prepare a service or property enquiry for MS LEGACY and choose your preferred contact channel.",
    "/project-enquiry",
  ),
  robots: { index: false, follow: true },
};
export default async function EnquiryPage({
  searchParams,
}: {
  searchParams: Promise<EnquirySearch>;
}) {
  const context = enquiryContext(await searchParams);
  return (
    <>
      <PublicIntro
        eyebrow="Let’s talk"
        title="What are you planning?"
        description="A property search, a build, local property care or a document review. Tell us where you need support."
      />
      <section className="site-section site-section-ivory">
        <div className="site-container site-enquiry-wrap">
          <ProjectEnquiryForm key={JSON.stringify(context)} {...context} />
        </div>
      </section>
    </>
  );
}
