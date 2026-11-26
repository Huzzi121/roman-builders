import { createClient } from '@supabase/supabase-js';
import {
  founders,
  directors,
  advisoryMember,
  engineeringMembers,
  marketingMembers,
  softwareEngineers,
  TeamMember,
} from '@/data/team';

export interface TeamCategoryItem {
  id?: string;
  slug: string;
  label: string;
  icon: string;
  tag: string;
  title: string;
  subtitle: string;
  display_order: number;
}

export const STATIC_TEAM_CATEGORIES: TeamCategoryItem[] = [
  {
    slug: 'founders',
    label: 'Founders',
    icon: 'fa-users',
    tag: 'OUR FOUNDERS',
    title: 'The Founders',
    subtitle: 'The Visionaries Behind Roman Builders & Developers',
    display_order: 1,
  },
  {
    slug: 'directors',
    label: 'Directors',
    icon: 'fa-user-tie',
    tag: 'OUR DIRECTORS',
    title: 'The Directors',
    subtitle: 'Driving Strategic Execution & Operational Excellence',
    display_order: 2,
  },
  {
    slug: 'advisory',
    label: 'Advisory & compliance',
    icon: 'fa-scale-balanced',
    tag: 'ADVISORY & COMPLIANCE',
    title: 'Advisory, Compliance & Financial Management',
    subtitle: 'Ensuring rigorous institutional governance, statutory compliance, and strategic fiscal discipline.',
    display_order: 3,
  },
  {
    slug: 'engineers',
    label: 'Engineers & development',
    icon: 'fa-helmet-safety',
    tag: 'ENGINEERS & DEVELOPMENT',
    title: 'Engineers and Development',
    subtitle: 'Translating architectural master plans into solid, enduring ground realities.',
    display_order: 4,
  },
  {
    slug: 'marketing',
    label: 'Marketing and Sales Partner',
    icon: 'fa-bullhorn',
    tag: 'MARKETING & SALES',
    title: 'Marketing and Sales Partner',
    subtitle: 'Driving commercial success, investor relations, and strategic market expansion.',
    display_order: 5,
  },
  {
    slug: 'software',
    label: 'Software Developers & Engineers',
    icon: 'fa-laptop-code',
    tag: 'SOFTWARE DEVELOPERS & ENGINEERS',
    title: 'Software Developers and Engineers',
    subtitle: 'Architecting modern digital infrastructure, scalable systems, and intelligent experiences.',
    display_order: 6,
  },
];

export const STATIC_TEAM_MEMBERS: TeamMember[] = [
  ...founders,
  ...directors,
  advisoryMember,
  ...engineeringMembers,
  ...marketingMembers,
  ...softwareEngineers,
];

function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getDynamicTeamCategories(): Promise<TeamCategoryItem[]> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) return STATIC_TEAM_CATEGORIES;

    const { data, error } = await supabase
      .from('team_categories')
      .select('id, slug, label, icon, tag, title, subtitle, display_order')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return STATIC_TEAM_CATEGORIES;
    }

    return data.map((row) => ({
      id: row.id,
      slug: row.slug,
      label: row.label,
      icon: row.icon || 'fa-users',
      tag: row.tag || row.label.toUpperCase(),
      title: row.title || row.label,
      subtitle: row.subtitle || '',
      display_order: row.display_order ?? 0,
    }));
  } catch {
    return STATIC_TEAM_CATEGORIES;
  }
}

export async function getDynamicTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) return STATIC_TEAM_MEMBERS;

    const { data, error } = await supabase
      .from('team_members')
      .select('id, category_slug, name, role, tag, email, image_url, description, bullets_header, bullets, display_order, publication_status')
      .or('publication_status.eq.Published,publication_status.is.null')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return STATIC_TEAM_MEMBERS;
    }

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      tag: row.tag || row.role,
      email: row.email || 'info@romanbuilders.pk',
      image: row.image_url,
      description: row.description,
      signature: row.name,
      category: row.category_slug,
      bulletsHeader: row.bullets_header || 'Leadership & Services',
      bullets: Array.isArray(row.bullets) ? row.bullets : [],
    }));
  } catch {
    return STATIC_TEAM_MEMBERS;
  }
}

