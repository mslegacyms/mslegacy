import React from "react";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { redirect } from "next/navigation";
import { isCrmUser } from "@/lib/auth/roles";
import TemplatesLibraryPage from "@/components/legal-documents/TemplatesLibraryPage";

export default async function CrmTemplatesPage() {
  const profile = await getCurrentUserProfile();

  if (!profile || !isCrmUser(profile.role)) {
    redirect("/login");
  }

  return <TemplatesLibraryPage />;
}

