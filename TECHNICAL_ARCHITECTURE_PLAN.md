# MS Legacy — Technical Architecture Plan

This document defines the technical stack, folder structures, database architecture, and deployment pipeline for the MS Legacy platform. It separates the public-facing corporate website from the private, role-based CRM dashboard.

---

## 1. Core Technology Stack

```
   ┌─────────────────────────────────────────────────────────────┐
   │                       CLIENT LAYER                          │
   │   Next.js App Router (React 19) + TypeScript + Tailwind     │
   └───────────────┬─────────────────────────────┬───────────────┘
                   │                             │
                   ▼                             ▼
   ┌───────────────────────────────┐     ┌───────────────────────┐
   │       PUBLIC WEB PAGES        │     │  PRIVATE CRM PORTAL   │
   │  Static Generation (SSG) / ISR │     │ Dynamic Rendering(SSR)│
   └───────────────┬───────────────┘     └───────────────┬───────┘
                   │                             │
                   └───────────────┬─────────────┘
                                   ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                       DATABASE LAYER                        │
   │        Supabase (PostgreSQL, Auth, Storage, Edge Functions) │
   └─────────────────────────────────────────────────────────────┘
```

*   **Frontend & Application Framework**: **Next.js App Router** (React 19, TypeScript).
    *   *Public Web*: Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) to ensure peak SEO performance and instantaneous load speeds.
    *   *Private CRM*: Single-Page Application (SPA) style routing under a `/crm` middleware barrier, prioritizing secure client-side interactions and real-time database subscription syncs.
*   **Styling & UI Library**: **Tailwind CSS** + **Shadcn UI** (Radix UI primitives). Enables sleek, gold-and-navy corporate styling with minimal styling overhead.
*   **Backend as a Service (BaaS)**: **Supabase**
    *   *Authentication*: Email/Password logins, magic links, JWT management, and Session tracking.
    *   *PostgreSQL Database*: Relational tables with strict Row-Level Security (RLS).
    *   *Storage Buckets*: Encrypted buckets for client KYC, land deeds, and property media files.
    *   *Edge Functions*: Used for sending transactional emails, processing WhatsApp notifications, and generating PDF Wealth Score reports.

---

## 2. Directory Structure Recommendation

```
mslegacy/
├── supabase/                       # Supabase Local Development Files
│   ├── config.toml
│   ├── migrations/                 # PostgreSQL Version Control Migrations
│   └── seed.sql                    # Initial Roles, Users, and Sample Listings
├── src/
│   ├── app/                        # Next.js App Router Pages
│   │   ├── (public)/               # Layout & routes for public marketing site
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── about/
│   │   │   ├── properties/
│   │   │   ├── investments/
│   │   │   └── contact/
│   │   ├── (auth)/                 # Login, Reset Password routes
│   │   ├── crm/                    # Private Dashboard pages
│   │   │   ├── layout.tsx          # Dashboard layout (Sidebar, Navbar)
│   │   │   ├── page.tsx            # Dashboard home (Metrics overview)
│   │   │   ├── leads/              # Lead management board
│   │   │   ├── properties/         # Property listings and Wealth Score tool
│   │   │   └── settings/
│   │   ├── layout.tsx              # Root HTML & body wrapper
│   │   └── middleware.ts           # Next.js JWT Session Verification Middleware
│   ├── components/                 # Reusable UI Component System
│   │   ├── ui/                     # Shadcn base primitives (Button, Dialog, Table)
│   │   ├── public/                 # Marketing elements (Hero, Footers, Navbars)
│   │   └── crm/                    # Dashboard specific blocks (LeadCard, MetricsChart)
│   ├── hooks/                      # Custom React hooks (useAuth, useProperties)
│   ├── lib/                        # Shared utility modules
│   │   ├── supabase/               # Supabase Client and Server SDK setups
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   └── utils.ts                # Tailwind styling merges (clsx, tailwind-merge)
│   └── types/                      # TypeScript definitions (database.types.ts)
├── public/                         # Static assets (logos, vectors, icons)
├── package.json
└── tailwind.config.ts
```

---

## 3. Database Schema Implementation (PostgreSQL DDL)
We will implement the relational tables with strict foreign keys and triggers inside Supabase:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Profiles Table (Linked to Supabase Auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role text not null check (role in ('superadmin', 'sales_manager', 'legal_officer', 'property_manager', 'partner')),
  phone varchar(20),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

-- 2. Create Properties Table
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  location text not null,
  price numeric(15, 2) not null,
  dimensions varchar(50) not null,
  category varchar(50) not null, -- 'residential_plot', 'bda_site', 'villa', 'apartment', 'commercial_plot', 'office_space', 'farm_land'
  rera_number varchar(100),
  wealth_score numeric(3, 1) default 0.0,
  score_location numeric(3, 1) default 0.0,
  score_legal numeric(3, 1) default 0.0,
  score_infrastructure numeric(3, 1) default 0.0,
  score_connectivity numeric(3, 1) default 0.0,
  status text default 'available'::text check (status in ('available', 'reserved', 'sold', 'under_management')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.properties enable row level security;

-- 3. Create Leads Table
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email varchar(255) not null,
  phone varchar(20) not null,
  nri_status boolean default false not null,
  lead_source varchar(100) default 'website'::text,
  lead_stage varchar(100) default 'new'::text,
  budget_min numeric(15, 2),
  budget_max numeric(15, 2),
  preferred_asset_type varchar(100),
  assigned_to uuid references public.profiles(id) on delete set null,
  partner_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.leads enable row level security;

-- 4. Create Interactions Table
create table public.interactions (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id) on delete cascade not null,
  interaction_type varchar(50) not null, -- 'call', 'email', 'whatsapp', 'site_visit', 'meeting'
  notes text not null,
  logged_by uuid references public.profiles(id) on delete set null,
  next_follow_up timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.interactions enable row level security;

-- 5. Create Documents Table
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  doc_name text not null,
  doc_type varchar(100) not null, -- 'kyc_pan', 'kyc_aadhaar', 'sale_deed', 'mother_deed', 'encumbrance_cert', 'khata'
  file_url text not null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.documents enable row level security;
```

---

## 4. Auth & Security Strategy

### A. Next.js Middleware Verification
To prevent unauthorized users from accessing the CRM dashboard, the Next.js `middleware.ts` will verify the token on every request to `/crm/*`:
*   If a session exists and is valid, decode the JWT metadata.
*   If the session token does not exist, redirect immediately to `/login`.
*   Verify roles in the profile table to prevent a `partner` role from typing `/crm/leads` in the URL (unauthorized routes redirect to `/crm` home).

### B. Row Level Security (RLS) Rules on Supabase
All tables are protected by default. Access policies are defined as follows:
*   *Public Access*: Read-only policies on the `properties` table (allowing public website visitors to view active listings).
*   *CRM Internal roles (`sales_manager`, `legal_officer`, `property_manager`)*: Full select/insert/update access to `leads`, `properties`, and `interactions`.
*   *SuperAdmin*: Full access to override any database entry, delete documents, and view user audit logs.
*   *Partners*: Restricted select access to only view leads where `partner_id = auth.uid()`.

---

## 5. Security & Deployment Strategy

*   **Hosting**: Next.js app hosted on **Vercel** with global CDN caching.
*   **Database Hosting**: Supabase Database Cloud in the **AWS Mumbai (ap-south-1)** region to keep query latencies under 20ms for local Indian users.
*   **HTTPS & SSL**: Automatic certificate provisioning by Vercel; HTTP Strict Transport Security (HSTS) enabled.
*   **Backup Policy**: 
    *   Daily automated snapshots of Supabase PostgreSQL database.
    *   GitHub repository with branch protection on `main` and `develop`. Code builds must pass TypeScript verification and lint checks before merging.
*   **KYC Document Encryption**: Storage buckets containing Aadhaar/PAN cards will require signed URLs that expire after 10 minutes to prevent credential leakage.
