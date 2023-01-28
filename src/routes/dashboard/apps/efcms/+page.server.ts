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
    const ut_netid = form_data.get('ut_netid');
    const ut_password = form_data.get('ut_password');
    const { error } = await supabaseClient
    .from('profiles')
    .update({
      ut_netid: ut_netid,
      ut_password: ut_password,
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
