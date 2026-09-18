'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2rem] shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#161f18] mb-2">Admin Login</h1>
          <p className="text-gray-600 text-sm">Secure access for authorized personnel only.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#4a5240] transition-all"
              placeholder="admin@romanbuilders.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#4a5240] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4a5240] text-white py-3 rounded-xl font-medium hover:bg-[#3d4435] transition-all shadow-md flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
