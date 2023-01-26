import '$lib/db'
import type { RequestHandler } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'	
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect, error } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // protect requests to all routes that start with /dashboard
  if (event.url.pathname.startsWith('/dashboard')) {
    const { session, supabaseClient } = await getSupabase(event)

    if (!session) {
      throw redirect(303, '/')
    }
  }

  return resolve(event)
}

