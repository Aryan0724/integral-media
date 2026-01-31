
-- 1. Create BLOGS table
create table public.blogs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text unique not null,
    thumbnail_url text, 
    excerpt text, -- Short summary for the list
    content text, -- Full article content (HTML/Markdown)
    status text default 'draft' check (status in ('draft', 'published', 'archived')),
    published_at timestamp with time zone default timezone('utc'::text, now()),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. RLS Policies
alter table public.blogs enable row level security;

-- Public Read
create policy "Public Blogs Read" on public.blogs 
for select using (status = 'published');

-- Admin Full Access
create policy "Admin Blogs All" on public.blogs
for all using ( auth.role() = 'authenticated' );

-- 3. Cleanup Old Vlogs Table (Optional, if you want to keep it clean)
drop table if exists public.vlogs;
