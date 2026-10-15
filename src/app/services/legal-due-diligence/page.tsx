import { ServiceDetail } from "@/components/public/PublicComponents";
import { pageMetadata, publicServices } from "@/lib/publicSite";
const service = publicServices.find(
  (item) => item.slug === "legal-due-diligence",
)!;
export const metadata = pageMetadata(
  service.title,
  service.summary,
  "/services/legal-due-diligence",
);
export default function ServicePage() {
  return <ServiceDetail service={service} />;
}
