
-- VLOGS TABLE
create table public.vlogs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text unique not null,
    video_url text not null, -- YouTube or Vimeo link
    thumbnail_url text, -- Optional custom cover
    description text,
    status text default 'draft' check (status in ('draft', 'published', 'archived')),
    published_at timestamp with time zone default timezone('utc'::text, now()),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies
alter table public.vlogs enable row level security;

-- Public can Read published vlogs
create policy "Public Vlogs Read" on public.vlogs 
for select using (status = 'published');

-- Admin can Do Everything
-- If using Service Role, no policy needed, but for Client Client usage:
create policy "Admin Vlogs All" on public.vlogs
for all using ( auth.role() = 'authenticated' );
