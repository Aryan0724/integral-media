
-- Create PAGES table
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    content JSONB, 
    is_indexed BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public pages read access" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Auth pages write access" ON public.pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
