'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function revalidateProjects() {
  revalidatePath('/projects')
}

export async function revalidateTeam() {
  revalidateTag('team', 'max')
  revalidatePath('/team')
  revalidatePath('/', 'layout')
}
