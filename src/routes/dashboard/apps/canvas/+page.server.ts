import type { Actions } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const actions: Actions = {
  default: async (event) => {
    const { session, supabaseClient } = await getSupabase(event)
    if (!session) {
      return {
        status: 401,
      }
    }
    const id = session.user.id;

    const form_data = await event.request.formData();
    const accessToken = form_data.get('access_token');
    const { error } = await supabaseClient
    .from('profiles')
    .update({
      canvas_token: accessToken,
    })
    .eq('id', id)
    .select()
    if (error) {
      return {
        status: 500,
        error: error.message,

      }
    }


    return {
      status: 200,
      user: session.user,
    }
  }
}

