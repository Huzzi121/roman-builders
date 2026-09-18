'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ProjectsTab from './components/ProjectsTab'
import UsersTab from './components/UsersTab'
import SettingsTab from './components/SettingsTab'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'users' | 'settings'>('projects')
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [debugError, setDebugError] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email || null)
        const { data, error } = await supabase.from('user_roles').select('role').eq('id', user.id).single()
        if (error) {
          console.error("Error fetching user role:", error.message)
          setDebugError(error.message)
        }
        setUserRole(data?.role || 'admin')
      }
      setLoading(false)
    }
    fetchUserRole()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-xl sticky top-28">
          <div className="mb-8">
            <h1 className="text-xl font-serif text-[#161f18]">Admin Panel</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{userRole?.replace('_', ' ')}</p>
            {userEmail && <p className="text-[10px] text-gray-400 mt-1 truncate">{userEmail}</p>}
            {debugError && <p className="text-[10px] text-red-500 mt-2">Err: {debugError}</p>}
          </div>
          
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-[#4a5240] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <i className="fa-solid fa-building w-5"></i> Projects
            </button>
            
            {userRole === 'super_admin' && (
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-[#4a5240] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fa-solid fa-users w-5"></i> Users
              </button>
            )}
            
            <button 
              onClick={() => setActiveTab('settings')}
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
      <div className="flex-grow">
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'users' && userRole === 'super_admin' && <UsersTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
      
    </main>
  )
}
