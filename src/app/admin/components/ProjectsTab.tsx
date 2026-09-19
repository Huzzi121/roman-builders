'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

type Project = {
  id: string
  title: string
  location: string
  status: string
  publication_status?: string
  description: string
  features: string[]
  image_url: string
  link: string
  display_order: number
}

// Toast types
type ToastMessage = {
  id: string
  type: 'success' | 'error'
  message: string
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({})
  const [featuresInput, setFeaturesInput] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  
  // Filtering and Sorting State
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [publicationFilter, setPublicationFilter] = useState('All')
  const [sortOption, setSortOption] = useState('display_order_asc')
  
  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
    
    if (error) {
      addToast('error', 'Failed to fetch projects')
    } else if (data) {
      setProjects(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const features = featuresInput.split(',').map(f => f.trim()).filter(f => f !== '')
    
    const projectData = {
      ...currentProject,
      features,
      title: currentProject.title || '',
      location: currentProject.location || '',
      status: currentProject.status || 'Upcoming',
      publication_status: currentProject.publication_status || 'Published',
      description: currentProject.description || '',
      image_url: currentProject.image_url || '',
      link: currentProject.link || '#',
      display_order: currentProject.display_order || 0
    }

    try {
      if (currentProject.id) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', currentProject.id)
        if (error) throw error
        addToast('success', 'Project updated successfully')
      } else {
        const { error } = await supabase.from('projects').insert([projectData])
        if (error) throw error
        addToast('success', 'Project created successfully')
      }

      setIsEditing(false)
      setCurrentProject({})
      setFeaturesInput('')
      fetchProjects()
    } catch (error: any) {
      addToast('error', error.message || 'Failed to save project')
    }
  }

  const handleEdit = (project: Project) => {
    setCurrentProject(project)
    setFeaturesInput(project.features.join(', '))
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this project? Consider archiving it instead.')) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (error) throw error
        addToast('success', 'Project deleted successfully')
        fetchProjects()
      } catch (error: any) {
        addToast('error', error.message || 'Failed to delete project')
      }
    }
  }

  const handleArchive = async (project: Project) => {
    if (confirm(`Are you sure you want to archive "${project.title}"?`)) {
      try {
        const { error } = await supabase.from('projects').update({ publication_status: 'Archived' }).eq('id', project.id)
        if (error) throw error
        addToast('success', 'Project archived successfully')
        fetchProjects()
      } catch (error: any) {
        addToast('error', error.message || 'Failed to archive project')
      }
    }
  }

  const handleAddNew = () => {
    setCurrentProject({ status: 'Upcoming', publication_status: 'Published', display_order: projects.length + 1 })
    setFeaturesInput('')
    setIsEditing(true)
  }

  // --- Image Upload Logic ---
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('projects').getPublicUrl(filePath)
      
      setCurrentProject(prev => ({ ...prev, image_url: data.publicUrl }))
      addToast('success', 'Image uploaded successfully')
    } catch (error: any) {
      addToast('error', 'Error uploading image: ' + error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  if (loading && projects.length === 0) {
    return <div className="py-20 text-center flex flex-col items-center"><i className="fa-solid fa-spinner animate-spin text-3xl text-[#4a5240] mb-4"></i>Loading projects...</div>
  }

  // Derived state for filtering and sorting
  const filteredAndSortedProjects = projects
    .filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter
      const pPubStatus = p.publication_status || 'Published' // default if missing
      const matchesPublication = publicationFilter === 'All' || pPubStatus === publicationFilter
      return matchesSearch && matchesStatus && matchesPublication
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'display_order_asc': return a.display_order - b.display_order
        case 'newest': return (b as any).created_at?.localeCompare((a as any).created_at || '') || 0
        case 'oldest': return (a as any).created_at?.localeCompare((b as any).created_at || '') || 0
        case 'name_asc': return a.title.localeCompare(b.title)
        default: return 0
      }
    })

  return (
    <div className="relative">
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium animate-in slide-in-from-right-8 fade-in ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            <i className={`fa-solid ${toast.type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}`}></i>
            {toast.message}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#161f18]">Projects Dashboard</h2>
          <p className="text-gray-600 text-sm mt-1">Manage your real estate portfolio</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[#4a5240] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#3d4435] transition-all shadow-md flex items-center gap-2 flex-shrink-0"
        >
          <i className="fa-solid fa-plus"></i> Add New Project
        </button>
      </div>

      {/* Filters and Controls Bar */}
      <div className="bg-white/70 backdrop-blur-md border border-white p-4 rounded-[1.5rem] shadow-sm mb-8 flex flex-col lg:flex-row gap-4">
        <div className="flex-grow flex items-center bg-white/50 border border-gray-200 rounded-xl px-3 py-2">
          <i className="fa-solid fa-search text-gray-400 mr-2"></i>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white/50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#4a5240] flex-grow sm:flex-grow-0 min-w-[120px]">
            <option value="All">All Statuses</option>
            <option value="Now Selling">Now Selling</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Planning Phase">Planning Phase</option>
            <option value="Completed">Completed</option>
          </select>
          <select value={publicationFilter} onChange={(e) => setPublicationFilter(e.target.value)} className="bg-white/50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#4a5240] flex-grow sm:flex-grow-0 min-w-[140px]">
            <option value="All">All Publications</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-white/50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#4a5240] flex-grow sm:flex-grow-0 min-w-[140px]">
            <option value="display_order_asc">Display Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name_asc">Project Name</option>
          </select>
        </div>
      </div>

      {isEditing && (
        <div className="bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2rem] shadow-xl mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-2xl font-serif mb-6">{currentProject.id ? 'Edit Project' : 'New Project'}</h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Image Upload Area */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    currentProject.image_url ? 'border-[#4a5240] bg-[#4a5240]/5' : 'border-gray-300 hover:border-[#4a5240] hover:bg-gray-50 cursor-pointer'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => !currentProject.image_url && fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                  />
                  
                  {uploadingImage ? (
                    <div className="flex flex-col items-center py-10">
                      <i className="fa-solid fa-spinner animate-spin text-3xl text-[#4a5240] mb-4"></i>
                      <p className="text-gray-500 font-medium">Uploading image...</p>
                    </div>
                  ) : currentProject.image_url ? (
                    <div className="relative inline-block group">
                      <img src={currentProject.image_url} alt="Preview" className="max-h-64 rounded-xl shadow-md object-cover" />
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setCurrentProject(p => ({...p, image_url: ''})) }}
                        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="py-10">
                      <div className="w-16 h-16 bg-[#4a5240]/10 text-[#4a5240] rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
                      </div>
                      <p className="text-gray-700 font-medium">Click or drag image here to upload</p>
                      <p className="text-gray-400 text-sm mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
                    </div>
                  )}
                </div>
                {/* Fallback manual URL input */}
                <div className="mt-2">
                  <input 
                    type="text" 
                    value={currentProject.image_url || ''} 
                    onChange={e => setCurrentProject({...currentProject, image_url: e.target.value})} 
                    placeholder="Or enter image URL manually (e.g. /images/project.jpg)" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" value={currentProject.title || ''} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input required type="text" value={currentProject.location || ''} onChange={e => setCurrentProject({...currentProject, location: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={currentProject.status || 'Upcoming'} onChange={e => setCurrentProject({...currentProject, status: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none">
                  <option value="Now Selling">Now Selling</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Planning Phase">Planning Phase</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publication Status</label>
                <select value={currentProject.publication_status || 'Published'} onChange={e => setCurrentProject({...currentProject, publication_status: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none">
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input type="number" value={currentProject.display_order || 0} onChange={e => setCurrentProject({...currentProject, display_order: parseInt(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows={3} value={currentProject.description || ''} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                <input required type="text" value={featuresInput} onChange={e => setFeaturesInput(e.target.value)} placeholder="e.g. Gated Community, Mountain Views" className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Link (use # for none)</label>
                <input required type="text" value={currentProject.link || ''} onChange={e => setCurrentProject({...currentProject, link: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none" />
              </div>
            </div>
            
            <div className="flex gap-4 justify-end mt-8 pt-4 border-t border-gray-100">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all font-medium">Cancel</button>
              <button type="submit" disabled={uploadingImage} className="bg-[#4a5240] text-white px-6 py-2.5 rounded-xl hover:bg-[#3d4435] transition-all shadow-md font-medium disabled:opacity-50">Save Project</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedProjects.map(project => (
          <div key={project.id} className="bg-white/70 backdrop-blur-md border border-white p-5 rounded-[2rem] shadow-sm flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="h-48 rounded-xl overflow-hidden mb-4 relative bg-gray-100">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300"><i className="fa-solid fa-image text-4xl"></i></div>
              )}
              
              <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                <div className="bg-white/95 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm text-gray-700 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${project.status === 'Now Selling' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  {project.status}
                </div>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <div className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm ${
                  (!project.publication_status || project.publication_status === 'Published') ? 'bg-blue-500 text-white' : 
                  project.publication_status === 'Draft' ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {project.publication_status || 'Published'}
                </div>
              </div>
            </div>
            
            <h3 className="font-serif text-xl mb-1 line-clamp-2 text-[#161f18] min-h-[56px] leading-tight">{project.title}</h3>
            <p className="text-sm text-gray-500 mb-4 flex-grow"><i className="fa-solid fa-location-dot mr-1"></i> {project.location}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100/50">
              <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">Order: {project.display_order}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} title="Edit Project" className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-sm">
                  <i className="fa-solid fa-pen text-xs"></i>
                </button>
                {project.publication_status !== 'Archived' && (
                  <button onClick={() => handleArchive(project)} title="Archive Project" className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors shadow-sm">
                    <i className="fa-solid fa-box-archive text-xs"></i>
                  </button>
                )}
                <button onClick={() => handleDelete(project.id)} title="Delete Permanently" className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-sm">
                  <i className="fa-solid fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredAndSortedProjects.length === 0 && !loading && (
          <div className="col-span-full text-center py-16 bg-white/30 rounded-[2rem] border border-white/50 text-gray-500 shadow-sm backdrop-blur-sm">
            <i className="fa-regular fa-folder-open text-5xl mb-4 text-gray-400/70"></i>
            <p className="text-lg font-medium text-gray-600">No projects found matching your criteria.</p>
            <button onClick={() => {setSearchQuery(''); setStatusFilter('All'); setPublicationFilter('All')}} className="mt-4 text-sm text-[#4a5240] hover:underline">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
