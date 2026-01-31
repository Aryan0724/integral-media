# System Architecture: Integral Labs V2 (Next.js + Supabase)

## 1. High-Level Overview
The application is a monolith Next.js app.
- **Client**: React Server Components (RSC) for performance + Client Components for interactivity.
- **Server**: Next.js Server Actions for secure database mutations (Leads, CMS updates).
- **Database**: Supabase (PostgreSQL) linked via `supabase-js`.

## 2. Folder Structure
```
/app
  /(public)             # The public facing website
    /page.tsx           # Home
    /work/page.tsx      # Portfolio Listing
    /work/[slug]/page.tsx # Project Details
    /contact/page.tsx   # Contact form
  
  /(admin)              # Protected Admin Route Group
    /admin
      /layout.tsx       # Sidebar + Auth Check
      /dashboard        # Analytics Overview
      /portfolio        # Create/Edit/Delete Projects
      /leads            # CRM (Kanban or Table)
      /content          # Edit static site text (About/Services)
      /settings         # SEO & Config
      
  /api                  # API Routes (Optional, mostly using Server Actions)
    /og                 # Dynamic OpenGraph Image Generation
    
  /components
    /ui                 # Reusable UI (Buttons, Inputs - Shadcn/ui inspiration)
    /admin              # Admin-specific components (Charts, Sidebar)
    /website            # Public site components (Hero, Navbar)
    
  /lib
    supabase.ts         # Supabase Client
    analytics.ts        # Custom tracking logic
    utils.ts            # Helper functions
```

## 3. Data Flow & Security
- **Authentication**: Usage of `middleware.ts` to protect `/admin/*` routes. Only users with `role: 'admin'` in the `profiles` table can access.
- **CMS**: Content is fetched at build time (or request time) from Supabase.
- **Images**: Uploaded to Supabase Storage buckets (`portfolio-assets`).
- **SEO**: Next.js `generateMetadata` function will fetch SEO tags from the DB dynamically for every page.

## 4. Analytics Implementation
Instead of heavy scripts like Google Analytics, we use a middleware approach:
1. User requests page.
2. Middleware extracts: `path`, `referrer`, `geo (country/city from Vercel headers)`, `device type`.
3. Asynchronously inserts a row into the `analytics_traffic` table.
4. Admin Dashboard aggregates this data into charts.

## 5. Automation Logic
- **New Lead**: On form submission (Server Action) -> Insert to DB -> Trigger `sendEmail` (via Resend or Nodemailer) to Admin.
- **Notifications**: Simple "Unread" badges in the Admin Dashboard.
