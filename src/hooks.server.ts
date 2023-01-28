import '$lib/db'
import type { RequestHandler } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'	
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect, error } from '@sveltejs/kit'


// Check login on /dashboard routes
export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/dashboard')) {
    const { session, supabaseClient } = await getSupabase(event)
    if (!session) {
      throw redirect(303, '/')
    }
  }

  return resolve(event)
}

