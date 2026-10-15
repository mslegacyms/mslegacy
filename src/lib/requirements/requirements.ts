import { submitContactForm } from "@/app/contact/actions";
// requirements.ts
// Data actions for Property Requirements Exchange with Supabase & Mock Fallback

import { createClient } from "../supabase/client";
import { isSupabaseConfigured } from "../env";
import { PropertyRequirement, RequirementMatch, RequirementResponse, RequirementActivityLog } from "../types/propertyRequirements";

// Helper mapper for property_requirements (DB -> TS)
function mapRequirementToTS(dbReq: any): PropertyRequirement {
  return {
    id: dbReq.id,
    requirementCode: dbReq.requirement_code,
    title: dbReq.title,
    slug: dbReq.slug,
    sourceType: dbReq.source_type,
    requirementType: dbReq.requirement_type,
    propertyCategory: dbReq.property_category,
    buyerProfile: dbReq.buyer_profile,
    preferredCity: dbReq.preferred_city,
    preferredLocations: dbReq.preferred_locations || [],
    microMarket: dbReq.micro_market,
    budgetMin: Number(dbReq.budget_min),
    budgetMax: Number(dbReq.budget_max),
    budgetCurrency: dbReq.budget_currency,
    landSizeMin: dbReq.land_size_min ? Number(dbReq.land_size_min) : undefined,
    landSizeMax: dbReq.land_size_max ? Number(dbReq.land_size_max) : undefined,
    landSizeUnit: dbReq.land_size_unit,
    builtupAreaMin: dbReq.builtup_area_min ? Number(dbReq.builtup_area_min) : undefined,
    builtupAreaMax: dbReq.builtup_area_max ? Number(dbReq.builtup_area_max) : undefined,
    bedrooms: dbReq.bedrooms,
    possessionTimeline: dbReq.possession_timeline,
    purchaseTimeline: dbReq.purchase_timeline,
    roadWidthRequirement: dbReq.road_width_requirement,
    approvalRequirement: dbReq.approval_requirement,
    reraRequired: !!dbReq.rera_required,
    loanRequired: !!dbReq.loan_required,
    legalDueDiligenceRequired: !!dbReq.legal_due_diligence_required,
    siteVisitRequired: !!dbReq.site_visit_required,
    nriSupportRequired: !!dbReq.nri_support_required,
    requirementSummary: dbReq.requirement_summary,
    mustHaveFeatures: dbReq.must_have_features || [],
    niceToHaveFeatures: dbReq.nice_to_have_features || [],
    restrictions: dbReq.restrictions,
    publicVisibility: dbReq.public_visibility,
    verificationStatus: dbReq.verification_status,
    priority: dbReq.priority,
    assignedTo: dbReq.assigned_to,
    createdBy: dbReq.created_by,
    contactName: dbReq.contact_name,
    contactPhone: dbReq.contact_phone,
    contactEmail: dbReq.contact_email,
    contactCity: dbReq.contact_city,
    consentToContact: !!dbReq.consent_to_contact,
    consentToShareSanitized: !!dbReq.consent_to_share_sanitized,
    internalNotes: dbReq.internal_notes,
    publishedAt: dbReq.published_at,
    createdAt: dbReq.created_at,
    updatedAt: dbReq.updated_at,
  };
}

// In-Memory Fallbacks for mock data mutations

// 1. Fetch public sanitized requirements
export async function getPublicRequirements(): Promise<PropertyRequirement[]> {
  // Publication remains disabled until a safe public/private schema split is deployed.
  return [];
}

// 2. Fetch single requirement by slug (sanitized or full)
export async function getRequirementBySlug(slug: string, isCrmUser: boolean = false): Promise<PropertyRequirement | null> {
  if (!isCrmUser) return null;
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("property_requirements")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error(`Error fetching requirement slug ${slug}:`, error.message);
      return null;
    }

    const requirement = mapRequirementToTS(data);
    if (isCrmUser) return requirement;

    // Sanitize for public views
    return {
      ...requirement,
      contactName: undefined,
      contactPhone: undefined,
      contactEmail: undefined,
      contactCity: undefined,
      internalNotes: undefined
    };
  } catch (err) {
    console.error(`Failed to fetch requirement slug ${slug}:`, err);
    return null;
  }
}

// 3. Fetch CRM list
export async function getCrmRequirements(): Promise<PropertyRequirement[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("property_requirements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching CRM requirements:", error.message);
      return [];
    }

    return (data || []).map(mapRequirementToTS);
  } catch (err) {
    console.error("Failed to fetch CRM requirements:", err);
    return [];
  }
}

// 4. Create Public Submission Form entry
export async function createPublicRequirementSubmission(
  req: Omit<PropertyRequirement, "id" | "requirementCode" | "slug" | "createdAt" | "updatedAt" | "verificationStatus" | "publicVisibility" | "sourceType" | "priority">
): Promise<{ success: boolean; error?: string; reference?: string }> {
  if (!req || !req.consentToContact || !Number.isFinite(req.budgetMin) || !Number.isFinite(req.budgetMax) || req.budgetMin < 0 || req.budgetMax < req.budgetMin) {
    return { success: false, error: "Check your budget range and permission to contact you." };
  }
  return submitContactForm({
    name: req.contactName || "", phone: req.contactPhone || "", email: req.contactEmail || "",
    location: req.preferredCity, interestType: "property_requirement", buyerType: req.buyerProfile,
    budgetRange: String(req.budgetMin) + " - " + String(req.budgetMax),
    message: JSON.stringify({ title: req.title, category: req.propertyCategory, type: req.requirementType,
      locations: req.preferredLocations, summary: req.requirementSummary, mustHave: req.mustHaveFeatures,
      niceToHave: req.niceToHaveFeatures, purchaseTimeline: req.purchaseTimeline, consentToShareSanitized: req.consentToShareSanitized }),
  });
}

// 5. Create Company Requirement inside CRM

export async function createCompanyRequirement(
  req: Omit<PropertyRequirement, "id" | "requirementCode" | "slug" | "createdAt" | "updatedAt">
): Promise<{ success: boolean; data?: PropertyRequirement; error?: string }> {
  const code = "REQ-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
  const slug = req.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(100 + Math.random() * 900);

  if (!isSupabaseConfigured()) return { success: false, error: "This workflow is temporarily unavailable. Your changes were not saved." };

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("property_requirements")
      .insert([
        {
          requirement_code: code,
          title: req.title,
          slug: slug,
          source_type: req.sourceType,
          requirement_type: req.requirementType,
          property_category: req.propertyCategory,
          buyer_profile: req.buyerProfile,
          preferred_city: req.preferredCity,
          preferred_locations: req.preferredLocations,
          micro_market: req.microMarket,
          budget_min: req.budgetMin,
          budget_max: req.budgetMax,
          budget_currency: req.budgetCurrency,
          land_size_min: req.landSizeMin,
          land_size_max: req.landSizeMax,
          land_size_unit: req.landSizeUnit,
          builtup_area_min: req.builtupAreaMin,
          builtup_area_max: req.builtupAreaMax,
          bedrooms: req.bedrooms,
          possession_timeline: req.possessionTimeline,
          purchase_timeline: req.purchaseTimeline,
          road_width_requirement: req.roadWidthRequirement,
          approval_requirement: req.approvalRequirement,
          rera_required: req.reraRequired,
          loan_required: req.loanRequired,
          legal_due_diligence_required: req.legalDueDiligenceRequired,
          site_visit_required: req.siteVisitRequired,
          nri_support_required: req.nriSupportRequired,
          requirement_summary: req.requirementSummary,
          must_have_features: req.mustHaveFeatures,
          nice_to_have_features: req.niceToHaveFeatures,
          restrictions: req.restrictions,
          public_visibility: req.publicVisibility,
          verification_status: req.verificationStatus,
          priority: req.priority,
          assigned_to: req.assignedTo,
          created_by: req.createdBy,
          contact_name: req.contactName,
          contact_phone: req.contactPhone,
          contact_email: req.contactEmail,
          contact_city: req.contactCity,
          consent_to_contact: req.consentToContact,
          consent_to_share_sanitized: req.consentToShareSanitized,
          internal_notes: req.internalNotes,
          published_at: req.publicVisibility === 'public_sanitized' ? new Date().toISOString() : null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating company requirement:", error.message);
      return { success: false, error: error.message };
    }

    const parsed = mapRequirementToTS(data);
    await logRequirementActivity(parsed.id, "created_company_posted", `Requirement manually created in CRM and assigned to ${req.assignedTo || 'Unassigned'}.`);

    return { success: true, data: parsed };
  } catch (err: any) {
    console.error("Failed to create company requirement:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// 6. Update status / visibility of requirement
export async function updateRequirementStatus(
  id: string,
  updates: Partial<Pick<PropertyRequirement, "verificationStatus" | "publicVisibility" | "priority" | "assignedTo" | "internalNotes">>
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: "This workflow is temporarily unavailable. Your changes were not saved." };

  try {
    const supabase = createClient();
    
    // Map updates to snake_case for DB
    const dbUpdates: any = {};
    if (updates.verificationStatus !== undefined) dbUpdates.verification_status = updates.verificationStatus;
    if (updates.publicVisibility !== undefined) {
      dbUpdates.public_visibility = updates.publicVisibility;
      if (updates.publicVisibility === 'public_sanitized') {
        dbUpdates.published_at = new Date().toISOString();
      }
    }
    if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
    if (updates.assignedTo !== undefined) dbUpdates.assigned_to = updates.assignedTo;
    if (updates.internalNotes !== undefined) dbUpdates.internal_notes = updates.internalNotes;

    const { error } = await supabase
      .from("property_requirements")
      .update(dbUpdates)
      .eq("id", id);

    if (error) {
      console.error(`Error updating requirement ${id}:`, error.message);
      return { success: false, error: error.message };
    }

    await logRequirementActivity(id, "status_updated", `Requirement parameters updated in CRM: ${Object.keys(updates).join(", ")}.`);

    return { success: true };
  } catch (err: any) {
    console.error(`Failed to update requirement ${id}:`, err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// 7. Get matches for a requirement
export async function getRequirementMatches(requirementId: string): Promise<RequirementMatch[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("requirement_matches")
      .select("*")
      .eq("requirement_id", requirementId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching matches for ${requirementId}:`, error.message);
      return [];
    }

    return (data || []).map(d => ({
      id: d.id,
      requirementId: d.requirement_id,
      matchedProjectId: d.matched_project_id,
      matchedDeveloperId: d.matched_developer_id,
      matchedPropertyTitle: d.matched_property_title,
      matchType: d.match_type,
      matchScore: d.match_score ? Number(d.match_score) : undefined,
      matchReason: d.match_reason,
      matchStatus: d.match_status,
      createdBy: d.created_by,
      createdAt: d.created_at
    }));
  } catch (err) {
    console.error(`Failed to get matches for ${requirementId}:`, err);
    return [];
  }
}

// 8. Add a Match Suggestions entry
export async function createRequirementMatch(
  match: Omit<RequirementMatch, "id" | "createdAt">
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: "This workflow is temporarily unavailable. Your changes were not saved." };

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("requirement_matches")
      .insert([
        {
          requirement_id: match.requirementId,
          matched_project_id: match.matchedProjectId,
          matched_developer_id: match.matchedDeveloperId,
          matched_property_title: match.matchedPropertyTitle,
          match_type: match.matchType,
          match_score: match.matchScore,
          match_reason: match.matchReason,
          match_status: match.matchStatus,
          created_by: match.createdBy
        }
      ]);

    if (error) {
      console.error("Error creating requirement match:", error.message);
      return { success: false, error: error.message };
    }

    await logRequirementActivity(
      match.requirementId, 
      "match_added", 
      `Matched property suggestion '${match.matchedPropertyTitle || 'Unnamed match'}' (${match.matchType}) added with score ${match.matchScore || 0}%.`
    );

    return { success: true };
  } catch (err: any) {
    console.error("Failed to create requirement match:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// 9. Update Match status
export async function updateMatchStatus(
  matchId: string,
  requirementId: string,
  newStatus: RequirementMatch["matchStatus"]
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: "This workflow is temporarily unavailable. Your changes were not saved." };

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("requirement_matches")
      .update({ match_status: newStatus })
      .eq("id", matchId);

    if (error) {
      console.error(`Error updating match status for ${matchId}:`, error.message);
      return { success: false, error: error.message };
    }

    // Get match name for notes
    const { data: matchData } = await supabase
      .from("requirement_matches")
      .select("matched_property_title")
      .eq("id", matchId)
      .single();

    await logRequirementActivity(
      requirementId, 
      "match_status_updated", 
      `Match suggestion status for '${matchData?.matched_property_title || 'property'}' updated to '${newStatus}'.`
    );

    return { success: true };
  } catch (err: any) {
    console.error(`Failed to update match status for ${matchId}:`, err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// 10. Fetch responder responses for a requirement
export async function getRequirementResponses(requirementId: string): Promise<RequirementResponse[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("requirement_responses")
      .select("*")
      .eq("requirement_id", requirementId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching responses for requirement ${requirementId}:`, error.message);
      return [];
    }

    return (data || []).map(d => ({
      id: d.id,
      requirementId: d.requirement_id,
      responderType: d.responder_type,
      responderName: d.responder_name,
      responderCompany: d.responder_company,
      responderPhone: d.responder_phone,
      responderEmail: d.responder_email,
      propertyTitle: d.property_title,
      propertyLocation: d.property_location,
      propertyCategory: d.property_category,
      offeredPrice: Number(d.offered_price),
      propertyDetails: d.property_details,
      documentLinks: d.document_links || [],
      mediaLinks: d.media_links || [],
      responseStatus: d.response_status,
      internalNotes: d.internal_notes,
      createdAt: d.created_at
    }));
  } catch (err) {
    console.error(`Failed to get responses for ${requirementId}:`, err);
    return [];
  }
}

// 11. Add a response from partner/agent/developer
export async function createRequirementResponse(
  res: Omit<RequirementResponse, "id" | "createdAt" | "responseStatus">
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: "This workflow is temporarily unavailable. Your changes were not saved." };

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("requirement_responses")
      .insert([
        {
          requirement_id: res.requirementId,
          responder_type: res.responderType,
          responder_name: res.responderName,
          responder_company: res.responderCompany,
          responder_phone: res.responderPhone,
          responder_email: res.responderEmail,
          property_title: res.propertyTitle,
          property_location: res.propertyLocation,
          property_category: res.propertyCategory,
          offered_price: res.offeredPrice,
          property_details: res.propertyDetails,
          document_links: res.documentLinks,
          media_links: res.mediaLinks,
          response_status: "new"
        }
      ]);

    if (error) {
      console.error("Error creating requirement response:", error.message);
      return { success: false, error: error.message };
    }

    await logRequirementActivity(
      res.requirementId, 
      "response_received", 
      `Response proposal received from ${res.responderName} (${res.responderType}): offered '${res.propertyTitle}' at INR ${res.offeredPrice.toLocaleString()}.`
    );

    return { success: true };
  } catch (err: any) {
    console.error("Failed to create requirement response:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// 12. Update Response status
export async function updateResponseStatus(
  responseId: string,
  requirementId: string,
  newStatus: RequirementResponse["responseStatus"],
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: "This workflow is temporarily unavailable. Your changes were not saved." };

  try {
    const supabase = createClient();
    const updates: any = { response_status: newStatus };
    if (notes !== undefined) updates.internal_notes = notes;

    const { error } = await supabase
      .from("requirement_responses")
      .update(updates)
      .eq("id", responseId);

    if (error) {
      console.error(`Error updating response ${responseId}:`, error.message);
      return { success: false, error: error.message };
    }

    const { data: resData } = await supabase
      .from("requirement_responses")
      .select("responder_name")
      .eq("id", responseId)
      .single();

    await logRequirementActivity(
      requirementId, 
      "response_status_updated", 
      `Response status from '${resData?.responder_name || 'partner'}' updated to '${newStatus}'.`
    );

    return { success: true };
  } catch (err: any) {
    console.error(`Failed to update response ${responseId}:`, err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// 13. Get Activity Logs for requirement
export async function getRequirementActivityLogs(requirementId: string): Promise<RequirementActivityLog[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("requirement_activity_logs")
      .select("*")
      .eq("requirement_id", requirementId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching activity logs for ${requirementId}:`, error.message);
      return [];
    }

    return (data || []).map(d => ({
      id: d.id,
      requirementId: d.requirement_id,
      action: d.action,
      actorId: d.actor_id,
      notes: d.notes,
      createdAt: d.created_at
    }));
  } catch (err) {
    console.error(`Failed to get activity logs for ${requirementId}:`, err);
    return [];
  }
}

// 14. Log activity helper
export async function logRequirementActivity(
  requirementId: string,
  action: string,
  notes?: string,
  actorId?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: "Activity was not saved because this workflow is unavailable." };

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("requirement_activity_logs")
      .insert([
        {
          requirement_id: requirementId,
          action,
          notes,
          actor_id: actorId
        }
      ]);

    if (error) {
      console.error("Error creating activity log:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Failed to log activity:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}
