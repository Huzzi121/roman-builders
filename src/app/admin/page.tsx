'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ProjectsTab from './components/ProjectsTab'
import SettingsTab from './components/SettingsTab'
import DashboardTab from './components/DashboardTab'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'settings'>('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email || null)
      } else {
        router.push('/admin/login')
      }
      setLoading(false)
    }

    fetchUser()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 relative">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white/70 backdrop-blur-md border border-white p-4 rounded-2xl shadow-sm z-30">
        <h1 className="text-xl font-serif text-[#161f18]">Admin Panel</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-10 h-10 bg-[#4a5240] text-white rounded-xl flex items-center justify-center shadow-md transition-transform active:scale-95"
        >
          <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-28 left-4 right-4 md:left-auto md:right-auto z-30 w-[calc(100%-2rem)] md:w-64 flex-shrink-0 transition-all duration-300 transform ${isSidebarOpen ? 'translate-y-0 opacity-100 mt-4 md:mt-0' : '-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto'}`}>
        <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-xl sticky top-28">
          <div className="mb-8">
            <h1 className="text-xl font-serif text-[#161f18]">Admin Panel</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">ADMINISTRATOR</p>
            {userEmail && <p className="text-[10px] text-gray-400 mt-1 truncate">{userEmail}</p>}
          </div>
          
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-[#4a5240] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <i className="fa-solid fa-chart-line w-5"></i> Dashboard
            </button>
            <button 
              onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-[#4a5240] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <i className="fa-solid fa-building w-5"></i> Projects
            </button>
            
            <button 
              onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-[#4a5240] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <i className="fa-solid fa-gear w-5"></i> Settings
            </button>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all"
            >
              <i className="fa-solid fa-arrow-right-from-bracket w-5"></i> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow w-full max-w-full overflow-hidden">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
      
    </main>
  )
}
