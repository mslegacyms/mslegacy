import { ServiceDetail } from "@/components/public/PublicComponents";
import { pageMetadata, publicServices } from "@/lib/publicSite";
const service = publicServices.find((item) => item.slug === "land-sourcing")!;
export const metadata = pageMetadata(
  service.title,
  service.summary,
  "/services/land-sourcing",
);
export default function ServicePage() {
  return <ServiceDetail service={service} />;
}
