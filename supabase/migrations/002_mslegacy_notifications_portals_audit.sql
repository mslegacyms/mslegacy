-- MS Legacy Portals, Notifications & Documents Migration
-- Created at: 2026-06-28
-- Description: Sets up portals databases, in-app notifications, and document storage checklists.

-- =========================================================================
-- 1. TABLES DEFINITIONS
-- =========================================================================

-- Table 1: In-App Notifications
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text,
  notification_type text default 'general' check (notification_type in ('general', 'new_lead', 'follow_up_due', 'document_requested', 'legal_review', 'partner_application', 'opportunity_update')),
  related_entity_type text,
  related_entity_id uuid,
  is_read boolean default false not null,
  created_at timestamptz default now() not null
);

-- Table 2: Client Request Dossiers
create table public.client_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles(id) on delete cascade not null,
  lead_id uuid references public.leads(id) on delete set null,
  request_type text check (request_type in ('site_visit', 'document_clearance', 'legal_consultation', 'general')),
  title text not null,
  message text,
  status text default 'open' check (status in ('open', 'in_progress', 'completed', 'closed')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table 3: Partner Lead Submissions
create table public.partner_lead_submissions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.profiles(id) on delete cascade not null,
  channel_partner_id uuid references public.channel_partners(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  client_name text not null,
  client_phone text,
  client_email text,
  interest_type text,
  notes text,
  status text default 'submitted' check (status in ('submitted', 'reviewed', 'approved', 'rejected')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table 4: Document Requests Checksheets
create table public.document_requests (
  id uuid primary key default gen_random_uuid(),
  related_entity_type text check (related_entity_type in ('lead', 'opportunity', 'partner')),
  related_entity_id uuid not null,
  requested_from uuid references public.profiles(id) on delete set null,
  requested_by uuid references public.profiles(id) on delete set null,
  document_name text not null,
  document_type text,
  status text default 'requested' check (status in ('requested', 'received', 'under_review', 'cleared', 'issue_found', 'not_applicable')),
  due_date timestamptz,
  notes text,
  storage_path text, -- Supabase Storage encrypted path
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- =========================================================================
-- 2. TRIGGERS ASSIGNMENT
-- =========================================================================
create trigger trigger_client_requests_updated_at before update on public.client_requests for each row execute procedure public.handle_updated_at();
create trigger trigger_partner_lead_submissions_updated_at before update on public.partner_lead_submissions for each row execute procedure public.handle_updated_at();
create trigger trigger_document_requests_updated_at before update on public.document_requests for each row execute procedure public.handle_updated_at();

-- =========================================================================
-- 3. ROW-LEVEL SECURITY (RLS) & POLICIES
-- =========================================================================

-- Enable RLS on all tables
alter table public.notifications enable row level security;
alter table public.client_requests enable row level security;
alter table public.partner_lead_submissions enable row level security;
alter table public.document_requests enable row level security;

-- 3A. Notifications Policies
create policy "Founder and Admin view/manage all notifications"
  on public.notifications for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Users read/update their own notifications"
  on public.notifications for all using (user_id = auth.uid());

-- 3B. Client Requests Policies
create policy "Founder and Admin view/manage all client requests"
  on public.client_requests for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Clients manage their own requests"
  on public.client_requests for all using (client_id = auth.uid());

-- 3C. Partner Lead Submissions Policies
create policy "Founder and Admin view/manage all partner submissions"
  on public.partner_lead_submissions for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Partners manage their own submissions"
  on public.partner_lead_submissions for all using (partner_id = auth.uid());

-- 3D. Document Requests Policies
create policy "Founder and Admin view/manage all doc requests"
  on public.document_requests for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Legal view and clear doc requests"
  on public.document_requests for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'legal')
  );

create policy "Users view documents requested from them"
  on public.document_requests for select using (requested_from = auth.uid());
