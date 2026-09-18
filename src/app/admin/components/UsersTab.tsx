'use client'

import { useState, useEffect } from 'react'
import { createAdminUser, deleteUser, getUsers } from '@/app/admin/actions'

type User = {
  id: string
  email: string
  role: string
  created_at: string
}

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    const result = await getUsers()
    if (result.success && result.users) {
      setUsers(result.users)
    } else {
      setError(result.error || 'Failed to fetch users')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    setError(null)
    setSuccessMessage(null)

    const result = await createAdminUser(newEmail, newPassword)

    if (result.success) {
      setSuccessMessage(`User created successfully!`)
      setNewEmail('')
      setNewPassword('')
      fetchUsers()
    } else {
      setError(result.error || 'Failed to create user')
    }

    setIsCreating(false)
  }

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      const result = await deleteUser(id)
      if (result.success) {
        fetchUsers()
      } else {
        alert(result.error)
      }
    }
  }

  if (loading && users.length === 0) {
    return <div className="py-20 text-center">Loading users...</div>
  }

  if (error && users.length === 0) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-[2rem] text-center border border-red-100 mt-10 shadow-sm">
        <i className="fa-solid fa-lock text-3xl mb-3"></i>
        <h3 className="text-xl font-medium mb-1">Access Denied</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-serif text-[#161f18]">User Management</h2>
        <p className="text-gray-600 text-sm mt-1">Add and manage administrator accounts.</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2rem] shadow-xl">
        <h3 className="text-lg font-serif mb-4">Create New Admin</h3>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 border border-red-100">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm mb-4 border border-emerald-100 font-medium">
            <i className="fa-solid fa-check-circle mr-2"></i>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleCreateUser} className="flex flex-col md:flex-row gap-4">
          <input 
            type="email" 
            required 
            value={newEmail} 
            onChange={(e) => setNewEmail(e.target.value)} 
            placeholder="new.admin@romanbuilders.com" 
            className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none" 
          />
          <input 
            type="password" 
            required 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="Secure Password" 
            minLength={6}
            className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#4a5240] outline-none" 
          />
          <button 
            type="submit" 
            disabled={isCreating || !newEmail || !newPassword} 
            className="bg-[#4a5240] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#3d4435] transition-all shadow-md disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2rem] shadow-xl">
        <h3 className="text-lg font-serif mb-6">Existing Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Created</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-100 last:border-0 hover:bg-white/50 transition-colors">
                  <td className="py-4 font-medium text-[#161f18]">{u.email}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      u.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-500">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right">
                    {u.role !== 'super_admin' && (
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors bg-red-50 px-3 py-1.5 rounded-lg"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
