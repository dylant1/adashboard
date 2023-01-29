import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type {PageServerLoad} from '$lib/types'

export const load: PageServerLoad = async (event) => {
  const supabase = getSupabase(event)
}

