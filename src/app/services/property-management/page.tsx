import { ServiceDetail } from "@/components/public/PublicComponents";
import { pageMetadata, publicServices } from "@/lib/publicSite";
const service = publicServices.find(
  (item) => item.slug === "property-management",
)!;
export const metadata = pageMetadata(
  service.title,
  service.summary,
  "/services/property-management",
);
export default function ServicePage() {
  return <ServiceDetail service={service} />;
}
