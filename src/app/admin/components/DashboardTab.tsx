'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type ProjectStats = {
  total: number
  published: number
  archived: number
  active: number
}

export default function DashboardTab() {
  const [stats, setStats] = useState<ProjectStats>({
    total: 0,
    published: 0,
    archived: 0,
    active: 0
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('status, publication_status')
      
      if (data) {
        setStats({
          total: data.length,
          published: data.filter(p => p.publication_status === 'Published' || !p.publication_status).length,
          archived: data.filter(p => p.publication_status === 'Archived').length,
          active: data.filter(p => p.status === 'Now Selling' && p.publication_status !== 'Archived').length
        })
      }
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="py-20 text-center">Loading statistics...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-[#161f18]">Dashboard Statistics</h2>
        <p className="text-gray-600 text-sm mt-1">Overview of your real estate portfolio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-building text-xl"></i>
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Projects</p>
          <h3 className="text-3xl font-serif text-[#161f18] mt-1">{stats.total}</h3>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-earth-americas text-xl"></i>
          </div>
          <p className="text-sm text-gray-500 font-medium">Published</p>
          <h3 className="text-3xl font-serif text-[#161f18] mt-1">{stats.published}</h3>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-tags text-xl"></i>
          </div>
          <p className="text-sm text-gray-500 font-medium">Now Selling</p>
          <h3 className="text-3xl font-serif text-[#161f18] mt-1">{stats.active}</h3>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-box-archive text-xl"></i>
          </div>
          <p className="text-sm text-gray-500 font-medium">Archived</p>
          <h3 className="text-3xl font-serif text-[#161f18] mt-1">{stats.archived}</h3>
        </div>
      </div>
    </div>
  )
}
