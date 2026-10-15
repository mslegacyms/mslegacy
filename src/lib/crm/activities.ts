"use server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { type LeadActivity } from "@/lib/types/crm";
import { isUuid, text } from "@/lib/validation/intake";
const types = ["call", "email", "whatsapp", "site_visit", "document_review", "note"];
export async function getLeadActivities(leadId: string): Promise<LeadActivity[]> {
  const profile=await getCurrentUserProfile();
  if (!profile || !["founder","admin","sales","legal"].includes(profile.role) || !isUuid(leadId)) throw new Error("Activity access is unavailable.");
  const db=await createClient();
  const {data,error}=await db.from("lead_activities").select("id,lead_id,activity_type,title,notes,created_by,created_at").eq("lead_id",leadId).order("created_at",{ascending:false});
  if(error)throw new Error("Activity history could not be loaded.");
  return (data||[]).map(row=>({id:row.id,leadId:row.lead_id,activityType:row.activity_type as LeadActivity["activityType"],title:row.title,notes:row.notes||"",createdBy:row.created_by===profile.id ? profile.fullName || "You" : "Team member",createdDate:row.created_at}));
}
export async function createLeadActivity(input: Omit<LeadActivity,"id"|"createdDate">): Promise<{success:boolean;error?:string}> {
  try{
    const profile=await getCurrentUserProfile();
    if(!profile || !["founder","admin","sales"].includes(profile.role) || !isUuid(input.leadId) || !types.includes(input.activityType)) return {success:false,error:"This activity cannot be saved by your account."};
    const db=await createClient();
    const {data,error}=await db.from("lead_activities").insert({lead_id:input.leadId,activity_type:input.activityType,title:text(input.title,200),notes:text(input.notes,8000),created_by:profile.id}).select("id").single();
    return error||!data ? {success:false,error:"Activity was not saved. Please retry."} : {success:true};
  }catch{return {success:false,error:"Activity was not saved. Please retry."};}
}
