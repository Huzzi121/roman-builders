import { redirect } from 'next/navigation'
import AdminDashboardClient from './AdminDashboardClient'
import { getMyRole } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const result = await getMyRole()
  
  if (!result.success && result.role === 'admin' && result.email === null && !result.error) {
    // If the Server Action fails to find the user entirely, they must log in again
    redirect('/admin/login')
  }

  return (
    <AdminDashboardClient 
      initialRole={result.role} 
      initialEmail={result.email} 
      error={result.error} 
    />
  )
}
