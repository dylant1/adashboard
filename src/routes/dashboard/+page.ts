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
  if (!canvas_assignments || canvas_assignments.length === 0) {
    return {
      user: session.user,
      profile_table: profile_table[0],
      canvas_assignments: []
    }
  }
  const all_assignments = Object.values(canvas_assignments).flat();
  //if the user has no assignments, return an empty array
  if (!all_assignments || all_assignments.length === 0) {
    return {
      user: session.user,
      profile_table: profile_table[0],
      canvas_assignments: []
    }
  }


  //get the efcms data from the database
  let efcms_assignments_string = "";
  const { data: efcms_data, error: efcms_error } = await supabaseClient
    .from('efcms')
    .select('*')
    .limit(1)
    .eq('id', session.user.id);
  if (!efcms_error && efcms_data && efcms_data.length > 0) {
    efcms_assignments_string = (efcms_data[0].assignments);
  }

  //convert to json
  if (!efcms_assignments_string) {
    return {
      user: session.user,
      profile_table: profile_table[0],
      canvas_assignments: all_assignments,
      efcms_assignments: []
    }
  }
  const efcms_assignments = JSON.parse(efcms_assignments_string);
  //console.log('efcms_assignments', efcms_assignments);

  //the efcms assignments are an array of objects with the following structure:
  // {
  // name: string,
  // learning_page_data: {
  // due_date: string,
  // grade: number | null,
  // },
  // prep_questions_data: {
  // due_date: string,
  // grade: number | null,
  // },
  // practice_questions_data: {
  // due_date: string,
  // grade: number | null,
  // },
  // }
  //

  //get the due dates from the efcms assignments and only return the upcoming assigments a week from now
  //The due date format is DAY-OF-WEEK, MONTH, DAY
  const today = new Date();
  const months = {
    'Jan': 0,
    'Feb': 1,
    'Mar': 2,
    'Apr': 3,
    'May': 4,
    'Jun': 5,
    'Jul': 6,
    'Aug': 7,
    'Sep': 8,
    'Oct': 9,
    'Nov': 10,
    'Dec': 11,
  }

  // the assignment was due 2 days ago or is due in the next week
   const upcoming_efcms_assignments = efcms_assignments.filter((assignment: any) => {
    const due_date = assignment.learning_page_data.due_date;
    const month_tmp: string = due_date.split(' ')[1];
    const due_data_month: number = months[month_tmp as keyof typeof months];
    const due_data_day = Number(due_date.split(' ')[2]);
    const due_date_year = today.getFullYear();

    const due_date_date = new Date(due_date_year, due_data_month, due_data_day);
    const one_week_from_now = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const two_days_ago = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);

    return due_date_date > two_days_ago && due_date_date < one_week_from_now;
  });

  return {
    user: session.user,
    profile_table: profile_table[0],
    canvas_assignments: all_assignments,
    efcms_assignments: upcoming_efcms_assignments
  }
}
