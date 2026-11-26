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
ALTER TABLE projects ADD COLUMN IF NOT EXISTS publication_status TEXT DEFAULT 'Published';

-- ============================================================================
-- 3. Team Categories & Team Members Backend
-- ============================================================================

CREATE TABLE IF NOT EXISTS team_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'fa-users',
  tag TEXT,
  title TEXT,
  subtitle TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE team_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on team_categories" ON team_categories;
DROP POLICY IF EXISTS "Allow admin full access on team_categories" ON team_categories;

CREATE POLICY "Allow public read access on team_categories" ON team_categories FOR SELECT USING (true);
CREATE POLICY "Allow admin full access on team_categories" ON team_categories FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_slug TEXT NOT NULL REFERENCES team_categories(slug) ON UPDATE CASCADE ON DELETE RESTRICT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  tag TEXT,
  email TEXT DEFAULT 'info@romanbuilders.pk',
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  bullets_header TEXT DEFAULT 'Leadership & Services',
  bullets JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  publication_status TEXT DEFAULT 'Published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on team_members" ON team_members;
DROP POLICY IF EXISTS "Allow admin full access on team_members" ON team_members;

CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow admin full access on team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');

-- 4. Team Storage Bucket Setup (Idempotent)
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('team', 'team', true)
    ON CONFLICT (id) DO NOTHING;
END
$$;

DROP POLICY IF EXISTS "Team Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Team Auth Insert" ON storage.objects;
DROP POLICY IF EXISTS "Team Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Team Auth Delete" ON storage.objects;

CREATE POLICY "Team Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'team' );
CREATE POLICY "Team Auth Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'team' AND auth.role() = 'authenticated' );
CREATE POLICY "Team Auth Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'team' AND auth.role() = 'authenticated' );
CREATE POLICY "Team Auth Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'team' AND auth.role() = 'authenticated' );

-- 5. Seed existing categories (Idempotent)
INSERT INTO team_categories (slug, label, icon, tag, title, subtitle, display_order)
VALUES
  ('founders', 'Founders', 'fa-users', 'OUR FOUNDERS', 'The Founders', 'The Visionaries Behind Roman Builders & Developers', 1),
  ('directors', 'Directors', 'fa-user-tie', 'OUR DIRECTORS', 'The Directors', 'Driving Strategic Execution & Operational Excellence', 2),
  ('advisory', 'Advisory & compliance', 'fa-scale-balanced', 'ADVISORY & COMPLIANCE', 'Advisory, Compliance & Financial Management', 'Ensuring rigorous institutional governance, statutory compliance, and strategic fiscal discipline.', 3),
  ('engineers', 'Engineers & development', 'fa-helmet-safety', 'ENGINEERS & DEVELOPMENT', 'Engineers and Development', 'Translating architectural master plans into solid, enduring ground realities.', 4),
  ('marketing', 'Marketing and Sales Partner', 'fa-bullhorn', 'MARKETING & SALES', 'Marketing and Sales Partner', 'Driving commercial success, investor relations, and strategic market expansion.', 5),
  ('software', 'Software Developers & Engineers', 'fa-laptop-code', 'SOFTWARE DEVELOPERS & ENGINEERS', 'Software Developers and Engineers', 'Architecting modern digital infrastructure, scalable systems, and intelligent experiences.', 6)
ON CONFLICT (slug) DO NOTHING;
