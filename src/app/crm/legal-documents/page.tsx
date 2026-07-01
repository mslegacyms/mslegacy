import React from "react";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { redirect } from "next/navigation";
import { isCrmUser } from "@/lib/auth/roles";
import LegalDocumentsDashboard from "@/components/legal-documents/LegalDocumentsDashboard";

export default async function CrmLegalDocumentsPage() {
  const profile = await getCurrentUserProfile();

  if (!profile || !isCrmUser(profile.role)) {
    redirect("/login");
  }

  return <LegalDocumentsDashboard userProfile={profile} />;
}

