'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogoutWatcher() {
  const pathname = usePathname()
  const router = useRouter()
  const previousPath = useRef(pathname)
  const supabase = createClient()

  useEffect(() => {
    // 1. Detect if the user navigated away from the /admin area using client-side routing
    if (previousPath.current.startsWith('/admin') && !pathname.startsWith('/admin')) {
      supabase.auth.signOut().then(() => {
        // Force Next.js to clear its client-side route cache so if they hit "Back", 
        // it fetches from the server (hitting our middleware) instead of showing a cached page.
        router.refresh()
      })
    }
    previousPath.current = pathname
  }, [pathname, supabase, router])

  useEffect(() => {
    // 2. Detect if the user closes the tab or browser while on the admin page
    const handleUnload = () => {
      if (window.location.pathname.startsWith('/admin')) {
        // We use synchronous XMLHttpRequest or beacon to ensure it fires before tab closes
        // But supabase.auth.signOut() handles local storage clearing synchronously which is enough
        supabase.auth.signOut()
      }
    }
    
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [supabase])

  return null
}
