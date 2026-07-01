# CRM Project Publishing Control QA

This report outlines the access controls, visibility filters, and database triggers that protect client data and prevent drafts from leaking to the public site.

---

## 1. Access Controls Matrix

| Zone / Route | Public Access | Authenticated Admin | Sourcing Controls |
| :--- | :--- | :--- | :--- |
| `/projects` | Visible (published only) | Full CRUD | Filtered by RERA status |
| `/projects/[slug]` | Visible (published only) | Full CRUD | Disclaimer check active |
| `/crm/*` | **Blocked** (Redirects to `/login`) | Full Access | RLS active |
| `/crm/project-verification` | **Blocked** | Full Access | Priority filtering |
| `/crm/data-import` | **Blocked** | Full Access | Default visibility: draft |

---

## 2. Publishing Rules

1.  **Draft Leak Protections**: The public API queries `public_visibility = 'published'` and `status = 'active'` only. All mock/demo entries remain in `draft` mode and are hidden from public showrooms.
2.  **Private media paths**: Sourced storage buckets are protected by PostgreSQL RLS triggers.
3.  **RLS Policies**: Project enquiries table insert matches public permission (`true`), but selection/read rights are gated strictly to `founder` and `sales` users.
