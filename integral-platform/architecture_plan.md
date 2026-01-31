
# Integral Labs Platform - System Architecture & Implementation Plan

## 1. System Architecture

### **Frontend (The "Head")**
*   **Public Site (`index.html` / `work.html`):** Remains high-performance static HTML/JS/GSAP.
    *   **Integration:** Fetches dynamic content (Portfolio, Content) via Supabase JS Client.
    *   **Tracking:** Sends analytics events (Pageview, Clicks) to Supabase.
*   **Admin Dashboard (Next.js):**
    *   **Framework:** Next.js 14 (App Router).
    *   **Styling:** TailwindCSS + Lucide Icons.
    *   **State:** React Hooks + Supabase Realtime.
    *   **Protection:** Middleware-based route protection (Supabase Auth).

### **Backend (The "Brain")**
*   **Database:** Supabase (PostgreSQL).
*   **Auth:** Supabase Auth (Email/Password).
*   **Storage:** Supabase Storage (for Portfolio Images, OG Images).
*   **API:** Auto-generated REST API via Supabase + Next.js Server Actions for complex logic.

---

## 2. Database Schema (Tables & Relations)

We will upgrade the database to `v2`.

### **1. Auth & Profiles**
*   **`profiles`**: Links to `auth.users`.
    *   `id` (UUID, PK), `role` (admin/editor), `full_name`.

### **2. Content Management (CMS)**
*   **`portfolio_items`** (Enhanced):
    *   Existing fields + `images` (array), `case_study` (JSONB), `featured` (bool), `status` (enum: draft, published, archived).
*   **`pages`**:
    *   `id`, `slug` (e.g., 'home', 'about'), `title`, `meta_title`, `meta_description`, `og_image`, `is_indexed`.
*   **`page_sections`**:
    *   `id`, `page_id` (FK), `section_key` (e.g., 'hero', 'pricing'), `content` (JSONB - stores text, headings, arrays for flexible content).

### **3. Leads & CRM**
*   **`leads`**:
    *   `id`, `name`, `email`, `phone`, `message`, `source_page`, `traffic_source`, `status` (new, contacted, closed, lost), `tags` (array).
*   **`lead_notes`**:
    *   `id`, `lead_id` (FK), `content`, `created_at`, `created_by` (profile_id).

### **4. Custom Analytics**
*   **`analytics_visits`**:
    *   `id`, `session_id`, `visitor_id` (cookie), `source`, `medium`, `country`, `city`, `device_type`, `os`, `browser`.
*   **`analytics_events`**:
    *   `id`, `visit_id` (FK), `event_name` (page_view, form_submit, click), `page_path`, `metadata` (JSONB).

---

## 3. Folder Structure (Next.js Admin)

```
integral-platform/
├── app/
│   ├── (admin)/              # Protected Routes
│   │   ├── admin/
│   │   │   ├── layout.tsx    # Sidebar & Auth Check
│   │   │   ├── page.tsx      # Dashboard Overview
│   │   │   ├── portfolio/    # CRUD
│   │   │   ├── content/      # Page CMS
│   │   │   ├── leads/        # CRM Pipeline
│   │   │   ├── analytics/    # Charts
│   │   │   ├── settings/     # SEO & Global Config
│   ├── login/                # Admin Login Page
│   ├── auth/callback/        # OAuth Callback
├── components/
│   ├── ui/                   # Reusable UI (Cards, Inputs)
│   ├── admin/                # Sidebar, Charts, DataTables
├── lib/
│   ├── supabase.ts           # Client
│   ├── analytics.ts          # Tracking Logic
├── middleware.ts             # Route Protection
```

---

## 4. Implementation Steps

1.  **Database Upgrade**: Run `schema_v2.sql` to create all necessary tables.
2.  **Auth Setup**: Create Login page and protect `/admin` routes.
3.  **CMS Build**: Create the interface to edit "Pages" and "Section Content".
4.  **Analytics Tracker**: Write a small JS script to embed in `index.html` that feeds the `analytics_xxx` tables.
5.  **Dashboard Integration**: Connect the charts to the new Analytics tables.

