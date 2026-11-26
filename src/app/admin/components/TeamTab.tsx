'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { revalidateTeam } from '@/app/admin/actions'
import { STATIC_TEAM_CATEGORIES, STATIC_TEAM_MEMBERS } from '@/lib/team-data'

type TeamCategory = {
  id?: string
  slug: string
  label: string
  icon: string
  tag: string
  title: string
  subtitle: string
  display_order: number
}

type AmenityBullet = {
  text: string
  icon: string
}

type TeamMemberRow = {
  id: string
  category_slug: string
  name: string
  role: string
  tag: string
  email: string
  image_url: string
  description: string
  bullets_header: string
  bullets: AmenityBullet[]
  display_order: number
  publication_status: string
}

type ToastMessage = {
  id: string
  type: 'success' | 'error'
  message: string
}

const CATEGORY_ICON_OPTIONS = [
  { value: 'fa-users', label: 'Users / Team' },
  { value: 'fa-user-tie', label: 'Executive / Director' },
  { value: 'fa-scale-balanced', label: 'Advisory / Legal' },
  { value: 'fa-helmet-safety', label: 'Engineering / Construction' },
  { value: 'fa-bullhorn', label: 'Marketing / Sales' },
  { value: 'fa-laptop-code', label: 'Software / Tech' },
  { value: 'fa-building', label: 'Architecture / Real Estate' },
  { value: 'fa-briefcase', label: 'Management / Operations' },
]

const AMENITY_ICON_OPTIONS = [
  { value: 'fa-circle-check', label: 'Check' },
  { value: 'fa-building', label: 'Building' },
  { value: 'fa-briefcase', label: 'Briefcase' },
  { value: 'fa-city', label: 'City / Planning' },
  { value: 'fa-chart-line', label: 'Growth / Analytics' },
  { value: 'fa-handshake', label: 'Partnership' },
  { value: 'fa-helmet-safety', label: 'Engineering' },
  { value: 'fa-map-location-dot', label: 'Land Survey' },
  { value: 'fa-layer-group', label: 'Topographic / Layers' },
  { value: 'fa-cube', label: '2D & 3D Design' },
  { value: 'fa-scale-balanced', label: 'Legal / Compliance' },
  { value: 'fa-shield-halved', label: 'Governance / Security' },
  { value: 'fa-code', label: 'Code / Development' },
  { value: 'fa-bullhorn', label: 'Marketing' },
]

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function TeamTab() {
  const [categories, setCategories] = useState<TeamCategory[]>([])
  const [members, setMembers] = useState<TeamMemberRow[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)

  // Member form state
  const [isEditingMember, setIsEditingMember] = useState(false)
  const [currentMember, setCurrentMember] = useState<Partial<TeamMemberRow>>({})
  const [amenities, setAmenities] = useState<AmenityBullet[]>([{ text: '', icon: 'fa-circle-check' }])
  const [uploadingImage, setUploadingImage] = useState(false)

  // Category modal/panel state
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Partial<TeamCategory>>({})

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const addToast = useCallback((type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const [catRes, memRes] = await Promise.all([
      supabase.from('team_categories').select('*').order('display_order', { ascending: true }),
      supabase.from('team_members').select('*').order('display_order', { ascending: true }),
    ])

    if (catRes.error) {
      addToast('error', 'Failed to load team categories. Make sure supabase_setup.sql has been run.')
    } else if (catRes.data) {
      setCategories(catRes.data)
    }

    if (memRes.error) {
      addToast('error', 'Failed to load team members.')
    } else if (memRes.data) {
      setMembers(
        memRes.data.map((m) => ({
          ...m,
          bullets: Array.isArray(m.bullets) ? m.bullets : [],
        }))
      )
    }
    setLoading(false)
  }, [supabase, addToast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Seed existing static categories & members into Supabase
  const handleSeedExisting = async () => {
    setSeeding(true)
    try {
      const catPayloads = STATIC_TEAM_CATEGORIES.map((c) => ({
        slug: c.slug,
        label: c.label,
        icon: c.icon,
        tag: c.tag,
        title: c.title,
        subtitle: c.subtitle,
        display_order: c.display_order,
      }))

      const { error: catErr } = await supabase
        .from('team_categories')
        .upsert(catPayloads, { onConflict: 'slug' })
      if (catErr) throw catErr

      if (members.length === 0) {
        const memberPayloads = STATIC_TEAM_MEMBERS.map((m, idx) => ({
          category_slug: m.category,
          name: m.name,
          role: m.role,
          tag: m.tag,
          email: m.email,
          image_url: m.image,
          description: m.description,
          bullets_header: m.bulletsHeader || 'Leadership & Services',
          bullets: m.bullets || [],
          display_order: idx + 1,
          publication_status: 'Published',
        }))

        const { error: memErr } = await supabase.from('team_members').insert(memberPayloads)
        if (memErr) throw memErr
      }

      addToast('success', 'Existing team categories and members imported successfully')
      await fetchData()
      await revalidateTeam()
    } catch (error: unknown) {
      addToast('error', error instanceof Error ? error.message : 'Failed to import existing team data')
    } finally {
      setSeeding(false)
    }
  }

  // --- Category CRUD ---
  const handleOpenNewCategory = () => {
    setCurrentCategory({
      label: '',
      slug: '',
      icon: 'fa-users',
      tag: '',
      title: '',
      subtitle: '',
      display_order: categories.length + 1,
    })
    setIsEditingCategory(true)
  }

  const handleEditCategory = (cat: TeamCategory) => {
    setCurrentCategory(cat)
    setIsEditingCategory(true)
  }

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    const label = (currentCategory.label || '').trim()
    const slug = slugify(currentCategory.slug || label)
    if (!label || !slug) {
      addToast('error', 'Category label is required')
      return
    }

    const payload = {
      label,
      slug,
      icon: currentCategory.icon || 'fa-users',
      tag: (currentCategory.tag || label).toUpperCase(),
      title: currentCategory.title?.trim() || label,
      subtitle: currentCategory.subtitle?.trim() || '',
      display_order: currentCategory.display_order ?? categories.length + 1,
    }

    try {
      if (currentCategory.id) {
        const { error } = await supabase
          .from('team_categories')
          .update(payload)
          .eq('id', currentCategory.id)
        if (error) throw error
        addToast('success', 'Category updated successfully')
      } else {
        const { error } = await supabase.from('team_categories').insert([payload])
        if (error) throw error
        addToast('success', 'Category created successfully')
        // If member form is open, auto-select the newly created category
        if (isEditingMember) {
          setCurrentMember((prev) => ({ ...prev, category_slug: slug }))
        }
      }

      setIsEditingCategory(false)
      setCurrentCategory({})
      await fetchData()
      await revalidateTeam()
    } catch (error: unknown) {
      addToast('error', error instanceof Error ? error.message : 'Failed to save category')
    }
  }

  const handleDeleteCategory = async (cat: TeamCategory) => {
    if (!cat.id) return
    const memberCount = members.filter((m) => m.category_slug === cat.slug).length
    if (memberCount > 0) {
      addToast('error', `Cannot delete "${cat.label}" while ${memberCount} member(s) are assigned to it.`)
      return
    }
    if (!confirm(`Delete category "${cat.label}"?`)) return

    try {
      const { error } = await supabase.from('team_categories').delete().eq('id', cat.id)
      if (error) throw error
      addToast('success', 'Category deleted')
      await fetchData()
      await revalidateTeam()
    } catch (error: unknown) {
      addToast('error', error instanceof Error ? error.message : 'Failed to delete category')
    }
  }

  // --- Member CRUD ---
  const handleAddNewMember = () => {
    const defaultCat = categories[0]?.slug || ''
    setCurrentMember({
      category_slug: defaultCat,
      email: 'info@romanbuilders.pk',
      bullets_header: 'Leadership & Services',
      publication_status: 'Published',
      display_order: members.length + 1,
    })
    setAmenities([{ text: '', icon: 'fa-circle-check' }])
    setIsEditingMember(true)
  }

  const handleEditMember = (member: TeamMemberRow) => {
    setCurrentMember(member)
    setAmenities(
      member.bullets && member.bullets.length > 0
        ? member.bullets
        : [{ text: '', icon: 'fa-circle-check' }]
    )
    setIsEditingMember(true)
  }

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMember.category_slug) {
      addToast('error', 'Please select or create a category first')
      return
    }
    if (!currentMember.image_url) {
      addToast('error', 'Please upload a portrait image or provide an image URL')
      return
    }

    const cleanAmenities = amenities
      .map((a) => ({ text: a.text.trim(), icon: a.icon || 'fa-circle-check' }))
      .filter((a) => a.text.length > 0)

    const payload = {
      category_slug: currentMember.category_slug,
      name: (currentMember.name || '').trim(),
      role: (currentMember.role || '').trim(),
      tag: (currentMember.tag || currentMember.role || '').trim().toUpperCase(),
      email: (currentMember.email || 'info@romanbuilders.pk').trim(),
      image_url: currentMember.image_url.trim(),
      description: (currentMember.description || '').trim(),
      bullets_header: (currentMember.bullets_header || 'Leadership & Services').trim(),
      bullets: cleanAmenities,
      display_order: currentMember.display_order ?? 0,
      publication_status: currentMember.publication_status || 'Published',
    }

    try {
      if (currentMember.id) {
        const { error } = await supabase
          .from('team_members')
          .update(payload)
          .eq('id', currentMember.id)
        if (error) throw error
        addToast('success', 'Team member updated successfully')
      } else {
        const { error } = await supabase.from('team_members').insert([payload])
        if (error) throw error
        addToast('success', 'Team member added successfully')
      }

      setIsEditingMember(false)
      setCurrentMember({})
      setAmenities([{ text: '', icon: 'fa-circle-check' }])
      await fetchData()
      await revalidateTeam()
    } catch (error: unknown) {
      addToast('error', error instanceof Error ? error.message : 'Failed to save team member')
    }
  }

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Permanently delete "${name}" from the team?`)) return
    try {
      const { error } = await supabase.from('team_members').delete().eq('id', id)
      if (error) throw error
      addToast('success', 'Team member deleted')
      await fetchData()
      await revalidateTeam()
    } catch (error: unknown) {
      addToast('error', error instanceof Error ? error.message : 'Failed to delete team member')
    }
  }

  // --- Image Upload ---
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('team')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('team').getPublicUrl(fileName)
      setCurrentMember((prev) => ({ ...prev, image_url: data.publicUrl }))
      addToast('success', 'Portrait uploaded successfully')
    } catch (error: unknown) {
      addToast('error', 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setUploadingImage(false)
    }
  }

  // --- Amenities Helpers ---
  const addAmenityRow = () => {
    setAmenities((prev) => [...prev, { text: '', icon: 'fa-circle-check' }])
  }

  const updateAmenityRow = (index: number, field: keyof AmenityBullet, value: string) => {
    setAmenities((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const removeAmenityRow = (index: number) => {
    setAmenities((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [{ text: '', icon: 'fa-circle-check' }]))
  }

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = categoryFilter === 'All' || m.category_slug === categoryFilter
    return matchesSearch && matchesCat
  })

  const getCategoryLabel = (slug: string) =>
    categories.find((c) => c.slug === slug)?.label || slug

  return (
    <div className="space-y-6 relative">
      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-5 py-3 rounded-xl shadow-lg border backdrop-blur-md flex items-center gap-3 text-sm font-medium transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-700'
                : 'bg-red-900/90 text-white border-red-700'
            }`}
          >
            <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-exclamation text-red-400'}`}></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#161f18]">Team Management</h2>
          <p className="text-sm text-gray-500">Manage team categories, members, descriptions, and amenities</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleOpenNewCategory}
            className="bg-white text-[#161f18] border border-gray-200 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 text-sm"
          >
            <i className="fa-solid fa-folder-plus text-[#4a5240]"></i> New Category
          </button>
          <button
            onClick={handleAddNewMember}
            className="bg-[#4a5240] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#3d4435] transition-all shadow-md flex items-center gap-2 text-sm"
          >
            <i className="fa-solid fa-user-plus"></i> Add Team Member
          </button>
        </div>
      </div>

      {/* Seed Banner if empty */}
      {!loading && members.length === 0 && (
        <div className="bg-amber-50/90 border border-amber-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-amber-900 text-sm">Import Existing Team Data</h4>
            <p className="text-xs text-amber-700 mt-0.5">
              Your database currently has no team members. Import the existing 6 categories and 12 members so you can edit or add to them directly here.
            </p>
          </div>
          <button
            onClick={handleSeedExisting}
            disabled={seeding}
            className="bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-amber-800 transition-colors shrink-0 disabled:opacity-60"
          >
            {seeding ? 'Importing...' : 'Import Existing Team Data'}
          </button>
        </div>
      )}

      {/* Category Modal / Form */}
      {isEditingCategory && (
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-6 sm:p-8 rounded-[2rem] shadow-2xl">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
            <h3 className="text-xl font-serif text-[#161f18]">
              {currentCategory.id ? 'Edit Category' : 'Add New Category'}
            </h3>
            <button onClick={() => setIsEditingCategory(false)} className="text-gray-400 hover:text-gray-600 p-2">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSaveCategory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category Name *</label>
                <input
                  required
                  type="text"
                  value={currentCategory.label || ''}
                  onChange={(e) => {
                    const label = e.target.value
                    setCurrentCategory((prev) => ({
                      ...prev,
                      label,
                      slug: prev.id ? prev.slug : slugify(label),
                    }))
                  }}
                  placeholder="e.g., Legal Advisors"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">URL Slug *</label>
                <input
                  required
                  type="text"
                  value={currentCategory.slug || ''}
                  onChange={(e) => setCurrentCategory((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
                  placeholder="e.g., legal-advisors"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Navbar Icon</label>
                <select
                  value={currentCategory.icon || 'fa-users'}
                  onChange={(e) => setCurrentCategory((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                >
                  {CATEGORY_ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Page Heading Title</label>
                <input
                  type="text"
                  value={currentCategory.title || ''}
                  onChange={(e) => setCurrentCategory((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Defaults to Category Name"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Page Subtitle</label>
                <input
                  type="text"
                  value={currentCategory.subtitle || ''}
                  onChange={(e) => setCurrentCategory((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Short description shown on /team"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={currentCategory.display_order ?? 0}
                  onChange={(e) => setCurrentCategory((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingCategory(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#4a5240] text-white rounded-xl text-sm font-medium hover:bg-[#3d4435] shadow-md"
              >
                {currentCategory.id ? 'Save Category' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add/Edit Member Form */}
      {isEditingMember && (
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-6 sm:p-8 rounded-[2rem] shadow-2xl">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h3 className="text-xl font-serif text-[#161f18]">
              {currentMember.id ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>
            <button onClick={() => setIsEditingMember(false)} className="text-gray-400 hover:text-gray-600 p-2">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSaveMember} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Category *</label>
                  <button
                    type="button"
                    onClick={handleOpenNewCategory}
                    className="text-xs font-semibold text-[#4a5240] hover:underline"
                  >
                    + Add New Category
                  </button>
                </div>
                <select
                  required
                  value={currentMember.category_slug || ''}
                  onChange={(e) => setCurrentMember((prev) => ({ ...prev, category_slug: e.target.value }))}
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  required
                  type="text"
                  value={currentMember.name || ''}
                  onChange={(e) => setCurrentMember((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Dr. Shakeel Ahmed"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Role / Designation *</label>
                <input
                  required
                  type="text"
                  value={currentMember.role || ''}
                  onChange={(e) => setCurrentMember((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g., Civil Engineer"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Tag (Uppercase)</label>
                <input
                  type="text"
                  value={currentMember.tag || ''}
                  onChange={(e) => setCurrentMember((prev) => ({ ...prev, tag: e.target.value }))}
                  placeholder="Defaults to Role (e.g., CIVIL ENGINEER)"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  value={currentMember.email || ''}
                  onChange={(e) => setCurrentMember((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="info@romanbuilders.pk"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Display Order</label>
                  <input
                    type="number"
                    value={currentMember.display_order ?? 0}
                    onChange={(e) => setCurrentMember((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                  <select
                    value={currentMember.publication_status || 'Published'}
                    onChange={(e) => setCurrentMember((prev) => ({ ...prev, publication_status: e.target.value }))}
                    className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Portrait Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Portrait Image *</label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0])
                    }
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploadingImage}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-3 bg-[#f8f7f4] border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2 shrink-0"
                >
                  <i className={`fa-solid ${uploadingImage ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'}`}></i>
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Portrait'}</span>
                </button>
                <input
                  type="text"
                  value={currentMember.image_url || ''}
                  onChange={(e) => setCurrentMember((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="Or paste image URL / path (e.g., /dr shakeel ahmed.jpeg)"
                  className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                />
              </div>
              {currentMember.image_url && (
                <div className="mt-3 w-24 h-28 rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <img src={currentMember.image_url} alt="Preview" className="w-full h-full object-cover object-top" />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description *</label>
              <textarea
                required
                rows={4}
                value={currentMember.description || ''}
                onChange={(e) => setCurrentMember((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter biography, role summary, or company affiliation..."
                className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
              />
            </div>

            {/* Amenities / Highlights Builder */}
            <div className="bg-[#f8f7f4] p-5 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-grow">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Amenities / Highlights Section Title
                  </label>
                  <input
                    type="text"
                    value={currentMember.bullets_header || ''}
                    onChange={(e) => setCurrentMember((prev) => ({ ...prev, bullets_header: e.target.value }))}
                    placeholder="Leadership & Services"
                    className="w-full sm:max-w-sm bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                  />
                </div>
                <button
                  type="button"
                  onClick={addAmenityRow}
                  className="bg-[#4a5240] text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#3d4435] transition-colors self-start sm:self-end flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus"></i> Add Amenity
                </button>
              </div>

              <div className="space-y-2.5">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                    <select
                      value={item.icon}
                      onChange={(e) => updateAmenityRow(idx, 'icon', e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 sm:w-44 focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                    >
                      {AMENITY_ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateAmenityRow(idx, 'text', e.target.value)}
                      placeholder="e.g., Land Survey, Town Planning & Designing..."
                      className="flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
                    />
                    <button
                      type="button"
                      onClick={() => removeAmenityRow(idx)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl text-xs font-medium transition-colors"
                      title="Remove"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditingMember(false)}
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-[#4a5240] text-white rounded-xl hover:bg-[#3d4435] font-medium text-sm shadow-md"
              >
                {currentMember.id ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Overview Bar */}
      <div className="bg-white/70 backdrop-blur-md border border-white p-5 rounded-[2rem] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categories ({categories.length})</h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-medium text-[#161f18] shadow-2xs"
            >
              <i className={`fa-solid ${cat.icon || 'fa-users'} text-[#4a5240]`}></i>
              <span>{cat.label}</span>
              <span className="text-[10px] text-gray-400">
                ({members.filter((m) => m.category_slug === cat.slug).length})
              </span>
              <button
                type="button"
                onClick={() => handleEditCategory(cat)}
                className="text-gray-400 hover:text-blue-600 ml-1"
                title="Edit Category"
              >
                <i className="fa-solid fa-pen text-[10px]"></i>
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCategory(cat)}
                className="text-gray-400 hover:text-red-600"
                title="Delete Category"
              >
                <i className="fa-solid fa-trash text-[10px]"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white/70 backdrop-blur-md border border-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search members by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4a5240] w-full sm:w-auto"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <div className="col-span-full py-12 text-center text-gray-500">Loading team members...</div>}

        {!loading && filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white/80 backdrop-blur-md border border-white rounded-3xl overflow-hidden shadow-md flex flex-col justify-between group hover:shadow-xl transition-all"
          >
            <div>
              <div className="h-52 w-full bg-gray-100 relative overflow-hidden">
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#161f18] shadow-sm">
                  {getCategoryLabel(member.category_slug)}
                </span>
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    member.publication_status === 'Draft' ? 'bg-gray-700 text-white' : 'bg-emerald-500 text-white'
                  }`}
                >
                  {member.publication_status || 'Published'}
                </span>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#9d783e] block mb-0.5">
                  {member.tag || member.role}
                </span>
                <h4 className="font-serif text-lg text-[#161f18] mb-1">{member.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{member.description}</p>
                {member.bullets && member.bullets.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {member.bullets.slice(0, 3).map((b, i) => (
                      <span key={i} className="text-[10px] bg-[#f8f7f4] border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {b.text}
                      </span>
                    ))}
                    {member.bullets.length > 3 && (
                      <span className="text-[10px] text-gray-400 px-1 py-0.5">+{member.bullets.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3.5 bg-gray-50/70 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-medium">Order: {member.display_order}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditMember(member)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Member"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id, member.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Member"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        {!loading && filteredMembers.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white/50 rounded-3xl border border-dashed border-gray-300">
            <i className="fa-solid fa-users text-4xl text-gray-300 mb-3"></i>
            <p className="text-gray-500 font-medium">No team members match your filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

