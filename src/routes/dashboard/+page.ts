import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event)

  if (!session) {
    return {
      user: null,
      profile_table: null,
      canvas_assignments: null
    }
  }

  //TODO: Maybe create this in a PageServerLoad function or layout.ts?
  const { data: possible_profile_data } = await supabaseClient
    .from('profiles')
    .select('*')
    .limit(1)
    .eq('id', session.user.id);
  if (!possible_profile_data || possible_profile_data.length === 0) {
    await supabaseClient
      .from('profiles')
      .insert([{ id: session.user.id, email: session.user.email }]);
    console.log('Created new profile');
  }
  const { data: profile_table } = await supabaseClient
    .from('profiles')
    .select('*')
    .limit(1)
    .eq('id', session.user.id);


  if (!profile_table || profile_table.length === 0) {
    return {
      user: session.user,
      profile_table: null,
      canvas_assignments: null
    }
  }

  
  const token = profile_table[0].canvas_token;
  const canvas_assignments_response = await event.fetch(
    "/api/canvas",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
    }
  );
  const canvas_assignments = await canvas_assignments_response.json();
  //combine all the arrays inside the canvas_assignments object
  const all_assignments = Object.values(canvas_assignments).flat();
  console.log(all_assignments);



  return {
    user: session.user,
    profile_table: profile_table[0],
    canvas_assignments: all_assignments
  }
}
