-- Run this script in the Supabase SQL Editor

-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Force recreate policies for projects
DROP POLICY IF EXISTS "Allow public read access on projects" ON projects;
DROP POLICY IF EXISTS "Allow admin full access on projects" ON projects;

CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow admin full access on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- 2. Storage Setup (Idempotent bucket creation)
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('projects', 'projects', true)
    ON CONFLICT (id) DO NOTHING;
END
$$;

-- Force recreate Storage bucket policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'projects' );
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'projects' AND auth.role() = 'authenticated' );
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'projects' AND auth.role() = 'authenticated' );
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'projects' AND auth.role() = 'authenticated' );
ALTER TABLE projects ADD COLUMN publication_status TEXT DEFAULT 'Published';
