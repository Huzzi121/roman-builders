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

-- Idempotent Policy Creation for projects
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on projects') THEN
        CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow admin full access on projects') THEN
        CREATE POLICY "Allow admin full access on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END
$$;

-- 2. Create the user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Idempotent Policy Creation for user_roles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own role') THEN
        CREATE POLICY "Users can read own role" ON user_roles FOR SELECT USING (auth.uid() = id);
    END IF;
END
$$;

-- 3. Storage Setup (Idempotent bucket creation)
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('projects', 'projects', true)
    ON CONFLICT (id) DO NOTHING;
END
$$;

-- Idempotent Storage bucket policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access') THEN
        create policy "Public Access" on storage.objects for select using ( bucket_id = 'projects' );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth Insert') THEN
        create policy "Auth Insert" on storage.objects for insert with check ( bucket_id = 'projects' AND auth.role() = 'authenticated' );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth Update') THEN
        create policy "Auth Update" on storage.objects for update using ( bucket_id = 'projects' AND auth.role() = 'authenticated' );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth Delete') THEN
        create policy "Auth Delete" on storage.objects for delete using ( bucket_id = 'projects' AND auth.role() = 'authenticated' );
    END IF;
END
$$;

-- SUPER ADMIN SETUP INSTRUCTION:
-- Replace 'YOUR-COPIED-USER-UID-HERE' with your actual User UID from Authentication -> Users
-- and run this specific line to give yourself access:
-- INSERT INTO user_roles (id, role) VALUES ('YOUR-COPIED-USER-UID-HERE', 'super_admin') ON CONFLICT (id) DO UPDATE SET role = 'super_admin';
