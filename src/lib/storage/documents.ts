import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
export async function getDocumentSignedUrl(storagePath: string): Promise<{url?:string;error?:string}> {
  const profile=await getCurrentUserProfile();
  if(!profile || !["founder","admin","legal"].includes(profile.role)) return {error:"Document access is not available for this account."};
  if(typeof storagePath!=="string" || !storagePath || storagePath.length>1000 || storagePath.includes("..") || storagePath.startsWith("/")) return {error:"Invalid document path."};
  try{
    const db=await createClient();
    const {data,error}=await db.storage.from("mslegacy-documents").createSignedUrl(storagePath,60);
    return error||!data?.signedUrl ? {error:"The document is unavailable."} : {url:data.signedUrl};
  }catch{return {error:"The document is unavailable."};}
}
