
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (For Admin RBAC)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'editor' check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PORTFOLIO (Enhanced)
-- Note: You might already have this table. This adds missing columns safely.
alter table public.portfolio_items 
add column if not exists case_study jsonb default '{}'::jsonb,
add column if not exists images text[] default '{}',
add column if not exists is_featured boolean default false,
add column if not exists view_count integer default 0;

-- 3. PAGES (For SEO & Structural Content)
create table public.pages (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    title text not null,
    meta_title text,
    meta_description text,
    og_image text,
    is_indexed boolean default true,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. PAGE SECTIONS (For dynamic content blocks)
create table public.page_sections (
    id uuid default uuid_generate_v4() primary key,
    page_id uuid references public.pages(id) on delete cascade,
    section_key text not null, -- e.g., 'hero', 'about_text', 'pricing_cards'
    content jsonb not null default '{}'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()),
    unique(page_id, section_key)
);

-- 5. LEADS (Enhanced CRM)
-- Adding columns to your existing leads table
alter table public.leads 
add column if not exists phone text,
add column if not exists message text,
add column if not exists source_page text,
add column if not exists traffic_source text,
add column if not exists tags text[] default '{}',
add column if not exists last_contacted_at timestamp with time zone;

-- 6. LEAD NOTES
create table public.lead_notes (
    id uuid default uuid_generate_v4() primary key,
    lead_id uuid references public.leads(id) on delete cascade,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 7. ANALYTICS VISITS (Sessions)
create table public.analytics_visits (
    id uuid default uuid_generate_v4() primary key,
    visitor_id text not null, -- Persistent cookie ID
    session_id text not null, -- Short-term session ID
    source text, -- stored from utm_source or referrer
    medium text,
    country text,
    city text,
    device_type text, -- mobile, desktop
    os text,
    browser text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 8. ANALYTICS EVENTS (Pageviews, Clicks)
create table public.analytics_events (
    id uuid default uuid_generate_v4() primary key,
    visit_id uuid references public.analytics_visits(id) on delete cascade,
    event_name text not null, -- 'page_view', 'click', 'form_submit'
    page_path text not null,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ENABLE RLS (Row Level Security) - BASIC POLICY
alter table public.profiles enable row level security;
alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.analytics_visits enable row level security;
alter table public.analytics_events enable row level security;

-- ALLOW PUBLIC READ for Portfolio & Pages (so the website works)
create policy "Public Portfolio Read" on public.portfolio_items for select using (true);
create policy "Public Pages Read" on public.pages for select using (true);
create policy "Public Sections Read" on public.page_sections for select using (true);

-- ALLOW ANON INSERT for Analytics & Leads (so the website can track/submit)
create policy "Public Analytics Insert" on public.analytics_visits for insert with check (true);
create policy "Public Events Insert" on public.analytics_events for insert with check (true);
create policy "Public Leads Insert" on public.leads for insert with check (true);

-- Functions needed?
-- Simple function to handle new user sign up (for Auth)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin'); -- Defaulting first user to admin for ease
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to creating profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

