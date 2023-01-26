import type { Actions } from './$types'
import { SupabaseClient } from '$lib/db'


//TOOD: THESE ACTIONS ARE USELESS RIGHT NOW LMAO IM CARRIED BY THE CLIENT SIDE
//FUNCTION RIP MY SECURITY
//
export const actions: Actions = {
  login: async (event) => {
    const { data, error } = await SupabaseClient.auth.signInWithOAuth({
      provider: 'google',
    })



    return {
            status: 302,
            redirect: "/"
        };
  }
}


