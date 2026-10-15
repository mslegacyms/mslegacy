import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { isCrmUser } from "@/lib/auth/roles";
import LegalDocumentPrint from "@/components/legal-documents/LegalDocumentPrint";
export default async function LegalDocumentPrintPage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await getCurrentUserProfile();
  if (!profile || !isCrmUser(profile.role)) redirect("/login");
  const { id } = await params;
  return <LegalDocumentPrint id={id} ownerId={profile.id} />;
}
