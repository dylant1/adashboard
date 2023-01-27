import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

export const load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    //throw redirect(303, '/')
    console.log("not logged in")
    return {
      user: null,
      tableData: null
    }
  }

  //TODO: Maybe create this in a PageServerLoad function?
  // or even in teh layout.server.ts or something i forgot what its called
  const { data: profileData } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
  if (!profileData || profileData.length === 0) {
    await supabaseClient
      .from('profiles')
      .insert([{ id: session.user.id, email: session.user.email }])
    console.log('created profile')
  }
  const { data: tableData } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)

  if (!tableData || tableData.length === 0) {
    return {
      user: session.user,
      tableData: null
    }
  }

  return {
    user: session.user,
    tableData: tableData[0]
  }
}
