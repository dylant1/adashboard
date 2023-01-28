import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)
  return {
    session,
  }
}
