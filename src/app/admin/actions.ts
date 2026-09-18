'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function createAdminUser(email: string, password: string) {
  try {
    const supabaseUserClient = await createClient()
    const { data: { user }, error: userError } = await supabaseUserClient.auth.getUser()
    
    if (userError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    const adminClient = createAdminClient()
    
    // Check if the current user is a super_admin
    const { data: roleData, error: roleError } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (roleError || roleData?.role !== 'super_admin') {
      return { success: false, error: 'Only Super Admins can create new users.' }
    }

    // Create the user in Auth
    const { data: newUserData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password: password,
      email_confirm: true,
    })

    if (createError) {
      return { success: false, error: createError.message }
    }

    const newUserId = newUserData.user.id

    // Assign admin role to the new user
    const { error: insertRoleError } = await adminClient
      .from('user_roles')
      .insert([{ id: newUserId, role: 'admin' }])

    if (insertRoleError) {
      // Rollback user creation if role assignment fails
      await adminClient.auth.admin.deleteUser(newUserId)
      return { success: false, error: 'Failed to assign role to new user.' }
    }

    return { 
      success: true, 
      message: 'Admin user created successfully.'
    }

  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred.' }
  }
}

export async function deleteUser(userId: string) {
  try {
    const supabaseUserClient = await createClient()
    const { data: { user }, error: userError } = await supabaseUserClient.auth.getUser()
    
    if (userError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    const adminClient = createAdminClient()
    
    const { data: roleData, error: roleError } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (roleError || roleData?.role !== 'super_admin') {
      return { success: false, error: 'Only Super Admins can delete users.' }
    }

    // Deleting from auth.users will cascade delete the user_roles entry
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId)

    if (deleteError) {
      return { success: false, error: deleteError.message }
    }

    return { success: true, message: 'User deleted successfully.' }
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred.' }
  }
}

export async function getUsers() {
  try {
    const supabaseUserClient = await createClient()
    const { data: { user }, error: userError } = await supabaseUserClient.auth.getUser()
    
    if (userError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    const adminClient = createAdminClient()
    
    // Check if super_admin
    const { data: roleData, error: roleError } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (roleError || roleData?.role !== 'super_admin') {
      return { success: false, error: 'Only Super Admins can view users.' }
    }

    // Fetch users and roles
    const { data: usersData, error: usersError } = await adminClient.auth.admin.listUsers()
    if (usersError) return { success: false, error: usersError.message }

    const { data: rolesData, error: rolesErr } = await adminClient.from('user_roles').select('*')
    if (rolesErr) return { success: false, error: rolesErr.message }

    const mappedUsers = usersData.users.map(u => ({
      id: u.id,
      email: u.email || '',
      created_at: u.created_at,
      role: rolesData.find(r => r.id === u.id)?.role || 'unknown'
    }))

    return { success: true, users: mappedUsers }
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred.' }
  }
}
