import { ServiceDetail } from "@/components/public/PublicComponents";
import { pageMetadata, publicServices } from "@/lib/publicSite";
const service = publicServices.find(
  (item) => item.slug === "turnkey-construction",
)!;
export const metadata = pageMetadata(
  service.title,
  service.summary,
  "/services/turnkey-construction",
);
export default function ServicePage() {
  return <ServiceDetail service={service} />;
}
