'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsTab() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      // 1. Get current user email
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user?.email) throw new Error("Could not get user session")

      // 2. Verify old password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPassword,
      })

      if (signInError) {
        throw new Error("Incorrect old password")
      }

      // 3. Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        throw updateError
      }

      setSuccess(true)
      setOldPassword('')
      setNewPassword('')
    } catch (err: any) {
      setError(err.message || 'An error occurred while changing password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-serif text-[#161f18]">System Settings</h2>
        <p className="text-gray-600 text-sm mt-1">Manage global website configuration.</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-white p-8 md:p-12 rounded-[2rem] shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#4a5240]/10 text-[#4a5240] rounded-full flex items-center justify-center">
            <i className="fa-solid fa-lock text-xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-serif text-[#161f18]">Change Password</h3>
            <p className="text-sm text-gray-500">Update your administrator account password</p>
          </div>
        </div>
        
        <form onSubmit={handlePasswordChange} className="max-w-md space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex gap-3 items-start">
              <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-sm flex gap-3 items-start">
              <i className="fa-solid fa-circle-check mt-0.5"></i>
              <span>Password successfully changed! You can use your new password next time you log in.</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5240]/50 transition-all placeholder:text-gray-400"
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5240]/50 transition-all placeholder:text-gray-400"
              placeholder="Enter new password (min. 6 characters)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4a5240] text-white py-3.5 rounded-xl hover:bg-[#3d4435] transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-sm flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                <span>Updating...</span>
              </>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
