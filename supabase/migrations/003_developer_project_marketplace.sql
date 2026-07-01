-- 003_developer_project_marketplace.sql
-- Database schema for Developer & Project Discovery Marketplace

-- 1. DEVELOPERS TABLE
CREATE TABLE IF NOT EXISTS public.developers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    legal_name TEXT,
    developer_type TEXT,
    headquarters TEXT,
    website_url TEXT,
    logo_path TEXT,
    logo_permission_status TEXT DEFAULT 'pending_permission',
    description TEXT,
    established_year INTEGER,
    total_projects_count INTEGER DEFAULT 0,
    completed_projects_count INTEGER DEFAULT 0,
    ongoing_projects_count INTEGER DEFAULT 0,
    upcoming_projects_count INTEGER DEFAULT 0,
    verification_status TEXT DEFAULT 'pending_verification',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. DEVELOPER PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.developer_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID REFERENCES public.developers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    project_type TEXT NOT NULL, -- apartment, plotted, villa, farmland, etc.
    project_status TEXT DEFAULT 'under_verification', -- ongoing, completed, upcoming, sold_out
    city TEXT,
    micro_market TEXT,
    locality TEXT,
    address TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    rera_number TEXT,
    rera_status TEXT DEFAULT 'pending_verification',
    possession_status TEXT,
    possession_date DATE,
    launch_status TEXT,
    land_area TEXT,
    total_units INTEGER,
    towers_or_phases TEXT,
    configuration_summary TEXT,
    price_range TEXT,
    starting_price NUMERIC,
    max_price NUMERIC,
    currency TEXT DEFAULT 'INR',
    amenities TEXT[],
    approvals_summary TEXT,
    legal_status TEXT,
    construction_status TEXT,
    mslegacy_verification_status TEXT DEFAULT 'pending_verification',
    public_visibility TEXT DEFAULT 'draft', -- draft, published
    enquiry_enabled BOOLEAN DEFAULT true,
    disclaimer TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. PROJECT UNIT TYPES TABLE
CREATE TABLE IF NOT EXISTS public.project_unit_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.developer_projects(id) ON DELETE CASCADE,
    unit_label TEXT, -- e.g. "3 BHK Type A"
    unit_type TEXT, -- e.g. "apartment"
    bedrooms NUMERIC,
    bathrooms NUMERIC,
    built_up_area TEXT,
    carpet_area TEXT,
    plot_area TEXT,
    price_label TEXT,
    starting_price NUMERIC,
    floor_plan_path TEXT,
    floor_plan_permission_status TEXT DEFAULT 'pending_permission',
    availability_status TEXT DEFAULT 'check_with_developer',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PROJECT MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.project_media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.developer_projects(id) ON DELETE CASCADE,
    asset_type TEXT, -- logo, hero_image, floor_plan, master_plan, brochure, rera_certificate
    title TEXT,
    storage_path TEXT,
    external_url TEXT,
    permission_status TEXT DEFAULT 'pending_permission',
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PROJECT VERIFICATION RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.project_verification_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.developer_projects(id) ON DELETE CASCADE,
    verification_type TEXT, -- rera, legal_document, mslegacy_internal
    source_name TEXT,
    source_url TEXT,
    verified_value TEXT,
    verification_status TEXT DEFAULT 'pending',
    verified_by UUID REFERENCES public.profiles(id),
    verified_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PROJECT ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.project_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.developer_projects(id) ON DELETE SET NULL,
    developer_id UUID REFERENCES public.developers(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    interest_type TEXT,
    message TEXT,
    enquiry_source TEXT DEFAULT 'project_marketplace',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. PROJECT COMPARISONS TABLE
CREATE TABLE IF NOT EXISTS public.project_comparisons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    session_id TEXT,
    project_ids UUID[],
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_unit_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_comparisons ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR DEVELOPERS
CREATE POLICY "Public read for active developers" 
    ON public.developers FOR SELECT 
    USING (status = 'active');

CREATE POLICY "Founder manage developers" 
    ON public.developers FOR ALL 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'founder'));

-- RLS POLICIES FOR PROJECTS
CREATE POLICY "Public read for published projects" 
    ON public.developer_projects FOR SELECT 
    USING (public_visibility = 'published');

CREATE POLICY "Founder manage projects" 
    ON public.developer_projects FOR ALL 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'founder'));

-- RLS POLICIES FOR UNIT TYPES
CREATE POLICY "Public read for unit types" 
    ON public.project_unit_types FOR SELECT 
    USING (exists (select 1 from public.developer_projects where developer_projects.id = project_unit_types.project_id and developer_projects.public_visibility = 'published'));

CREATE POLICY "Founder manage unit types" 
    ON public.project_unit_types FOR ALL 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'founder'));

-- RLS POLICIES FOR MEDIA ASSETS
CREATE POLICY "Public read for permitted media assets" 
    ON public.project_media_assets FOR SELECT 
    USING (permission_status = 'approved' AND exists (select 1 from public.developer_projects where developer_projects.id = project_media_assets.project_id and developer_projects.public_visibility = 'published'));

CREATE POLICY "Founder manage media assets" 
    ON public.project_media_assets FOR ALL 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'founder'));

-- RLS POLICIES FOR VERIFICATION RECORDS
CREATE POLICY "Founder and legal read verification records" 
    ON public.project_verification_records FOR SELECT 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role in ('founder', 'legal')));

CREATE POLICY "Founder manage verification records" 
    ON public.project_verification_records FOR ALL 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'founder'));

-- RLS POLICIES FOR ENQUIRIES
CREATE POLICY "Public insert enquiries" 
    ON public.project_enquiries FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Founder and sales read enquiries" 
    ON public.project_enquiries FOR SELECT 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role in ('founder', 'sales')));

CREATE POLICY "Founder manage enquiries" 
    ON public.project_enquiries FOR ALL 
    TO authenticated
    USING (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'founder'));

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_developers_updated_at
    BEFORE UPDATE ON public.developers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_developer_projects_updated_at
    BEFORE UPDATE ON public.developer_projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_project_unit_types_updated_at
    BEFORE UPDATE ON public.project_unit_types
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
