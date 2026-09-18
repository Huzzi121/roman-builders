'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

type Project = {
  id: string
  title: string
  location: string
  status: string
  description: string
  features: string[]
  image_url: string
  link: string
  display_order: number
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({})
  const [featuresInput, setFeaturesInput] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
    
    if (data) setProjects(data)
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
      description: currentProject.description || '',
      image_url: currentProject.image_url || '',
      link: currentProject.link || '#',
      display_order: currentProject.display_order || 0
    }

    if (currentProject.id) {
      await supabase.from('projects').update(projectData).eq('id', currentProject.id)
    } else {
      await supabase.from('projects').insert([projectData])
    }

    setIsEditing(false)
    setCurrentProject({})
    setFeaturesInput('')
    fetchProjects()
  }

  const handleEdit = (project: Project) => {
    setCurrentProject(project)
    setFeaturesInput(project.features.join(', '))
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id)
      fetchProjects()
    }
  }

  const handleAddNew = () => {
    setCurrentProject({ status: 'Upcoming', display_order: projects.length + 1 })
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
    } catch (error: any) {
      alert('Error uploading image: ' + error.message)
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
    return <div className="py-20 text-center">Loading projects...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-serif text-[#161f18]">Projects Dashboard</h2>
          <p className="text-gray-600 text-sm mt-1">Manage your real estate portfolio</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[#4a5240] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#3d4435] transition-all shadow-md flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add New Project
        </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white/70 backdrop-blur-md border border-white p-5 rounded-[2rem] shadow-sm flex flex-col group hover:shadow-md transition-shadow">
            <div className="h-48 rounded-xl overflow-hidden mb-4 relative bg-gray-100">
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm text-gray-700">
                {project.status}
              </div>
            </div>
            <h3 className="font-serif text-xl mb-1 line-clamp-1 text-[#161f18]">{project.title}</h3>
            <p className="text-sm text-gray-500 mb-4 flex-grow"><i className="fa-solid fa-location-dot mr-1"></i> {project.location}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100/50">
              <span className="text-xs text-gray-400 font-medium">Order: {project.display_order}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="w-8 h-8 rounded-full bg-blue-50/50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <i className="fa-solid fa-pen text-xs"></i>
                </button>
                <button onClick={() => handleDelete(project.id)} className="w-8 h-8 rounded-full bg-red-50/50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors">
                  <i className="fa-solid fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && !loading && (
          <div className="col-span-full text-center py-16 bg-white/30 rounded-[2rem] border border-white/50 text-gray-500">
            <i className="fa-regular fa-folder-open text-4xl mb-3 text-gray-400"></i>
            <p>No projects found. Add your first project!</p>
          </div>
        )}
      </div>
    </div>
  )
}
