import type { PageServerLoad, Actions } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

//export const load: PageServerLoad = async (event) => {
  //const { session, supabaseClient } = await getSupabase(event)
  //if (!session) {
    //throw redirect(303, '/')
  //}

  //const { data: tableData, error } = await supabaseClient
    //.from('profiles')
    //.select('*')
    //.eq('id', session.user.id)

  //if (!tableData || tableData.length === 0) {
    //return {
      //user: session.user,
      //tableData: [],
    //}
  //}
//
  //return {
    //user: session.user,
    //tableData: tableData[0],
  //}
//}
export const actions: Actions = {
  default: async (event) => {
    console.log("tets")
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    //throw redirect(303, '/')
    return {
      status: 401,
    }
  }
  const id = session.user.id;

  const formData = await event.request.formData();
  const accessToken = formData.get('access_token');
  //add the access token to the databasejj
  const { data, error } = await supabaseClient
    .from('profiles')
    .update({
      canvas_token: accessToken,
    })
    .eq('id', id)
    .select()
  console.log(data)



    return {
      user: session.user,
    }
  }
}

