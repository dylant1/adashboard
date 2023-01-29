import type { PageServerLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { scrape } from "$lib/efcmsScrape";
//import the assignment interface
import { IAssignment } from "lib/efcmsScrape";
export const load: PageServerLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    return {
      status: 401,
      error: "Unauthorized",
    };
  }

  //get the users profile data
  const { data: profile, error } = await supabaseClient
  .from("profiles")
  .select("*")
  .eq("id", session.user.id)
  .single();

  if (error) {
    return {
      status: 500,
      error: error.message,
    };
  }

  if (!profile) {
    return {
      status: 500,
      error: "No profile found",
    }
  }

  //get the ut_netid and ut_password from the users profile
  const { ut_netid, ut_password } = profile;

  if (!ut_netid || !ut_password) {
    return {
      status: 500,
      error: "No ut_netid or ut_password found in profile",
    }
  }



  //this is an array of objects with the following properties
  const efcms_assignments: IAssignment[] = await scrape(ut_netid, ut_password, "152", "2023", "01");


  //create the interface for the assignments


  //insert the assignments into the database
  //create table public.efcms (
  //id uuid not null references auth.users on delete cascade,
  //assignment text not null,

  //primary key (id)
//);
  //const { data, error } = await supabaseClient
  //.from("efcms")
  //.insert(
    //efcms_assignments
  //)
  //.eq("id", session.user.id)


  return {
    status: 200,
    body: {
      efcms_assignments,
    },
  };
}




