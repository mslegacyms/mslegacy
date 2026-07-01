import React from "react";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { redirect } from "next/navigation";
import { isCrmUser } from "@/lib/auth/roles";
import DraftDetailsPage from "@/components/legal-documents/DraftDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CrmLegalDocumentDetailsPage({ params }: PageProps) {
  const profile = await getCurrentUserProfile();
  const { id } = await params;

  if (!profile || !isCrmUser(profile.role)) {
    redirect("/login");
  }

  return <DraftDetailsPage documentId={id} userProfile={profile} />;
}
