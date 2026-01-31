-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Users & Roles)
create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  role text default 'editor' check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- 2. PORTFOLIO ITEMS
create table portfolio_items (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  category text not null, -- 'Business', 'Education', 'Food'
  tier text, -- 'Easy', 'Medium', 'Ultra'
  description text,
  tech_stack text[],
  thumbnail_url text,
  images text[], -- Array of image URLs
  live_url text,
  is_featured boolean default false,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. SITE CONTENT (Dynamic Text for pages)
create table site_content (
  key text primary key, -- e.g., 'home_hero_title', 'about_bio'
  content jsonb not null, -- Flexible content structure
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. LEADS (Enquiries)
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  message text,
  company_name text,
  services_interested text[],
  status text default 'new' check (status in ('new', 'contacted', 'closed', 'lost')),
  source text, -- 'contact_form', 'whatsapp_click'
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. ANALYTICS (Privacy-friendly)
create table analytics_traffic (
  id uuid default uuid_generate_v4() primary key,
  path text not null,
  visitor_id text, -- Hashed IP + UserAgent for unique visitor count (daily rotation)
  referrer text,
  device_type text, -- 'mobile', 'desktop', 'tablet'
  country text,
  city text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ROW LEVEL SECURITY (RLS) POLICIES
-- Secure the data so only admins can write
alter table profiles enable row level security;
alter table portfolio_items enable row level security;
alter table leads enable row level security;
alter table site_content enable row level security;
alter table analytics_traffic enable row level security;

-- Policies
-- Public Read Access for Portfolio & Content
create policy "Public items are viewable by everyone" on portfolio_items
  for select using (status = 'published');

create policy "Site content is viewable by everyone" on site_content
  for select using (true);

-- Admin Full Access
create policy "Admins can do everything" on portfolio_items
  for all using (auth.uid() in (select id from profiles where role = 'admin'));

create policy "Admins can do everything with leads" on leads
  for all using (auth.uid() in (select id from profiles where role = 'admin'));

-- Leads Insert (Public can submit forms)
create policy "Public can insert leads" on leads
  for insert with check (true);

-- Analytics Insert (Public traffic)
create policy "Public traffic logging" on analytics_traffic
  for insert with check (true);
create policy "Admins view analytics" on analytics_traffic
  for select using (auth.uid() in (select id from profiles where role = 'admin'));
