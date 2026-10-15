import LeadPipeline from "@/components/crm/LeadPipeline";
import { getLeads } from "@/lib/crm/leads";
export default async function PipelinePage() { return <LeadPipeline initialLeads={await getLeads()} />; }
