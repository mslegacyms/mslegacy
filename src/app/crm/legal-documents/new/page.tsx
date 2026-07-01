import React from "react";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { redirect } from "next/navigation";
import { isCrmUser } from "@/lib/auth/roles";
import NewDocumentWizard from "@/components/legal-documents/NewDocumentWizard";

export default async function CrmNewLegalDocumentPage() {
  const profile = await getCurrentUserProfile();

  if (!profile || !isCrmUser(profile.role)) {
    redirect("/login");
  }

  return <NewDocumentWizard userProfile={profile} />;
}

