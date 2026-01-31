
-- Enable RLS on blogs table
alter table public.blogs enable row level security;

-- Policy to allow READ access to everyone (public)
create policy "Public blogs are viewable by everyone"
on public.blogs for select
using ( true );

-- Policy to allow INSERT/UPDATE/DELETE access to authenticated users only
create policy "Authenticated users can manage blogs"
on public.blogs for all
to authenticated
using ( true )
with check ( true );
