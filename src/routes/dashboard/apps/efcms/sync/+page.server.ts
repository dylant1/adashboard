import type { PageServerLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { scrape } from "$lib/efcmsScrape";
import type { IAssignment } from "$lib/efcmsScrape";
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

  const { ut_netid, ut_password } = profile;

  if (!ut_netid || !ut_password) {
    return {
      status: 500,
      error: "No ut_netid or ut_password found in profile",
    }
  }

  const efcms_assignments: IAssignment[] = await scrape(ut_netid, ut_password, "152", "2023", "01");

  console.log(efcms_assignments);
  const {data: possible_efcms_assignments, error: possible_efcms_assignments_error} = await supabaseClient
  .from("efcms")
  .select("*")
  .eq("id", session.user.id)
  .single();

  if (possible_efcms_assignments_error) {
    console.log(possible_efcms_assignments_error);
  }
  if (!possible_efcms_assignments || possible_efcms_assignments.length == 0) {
    await supabaseClient
    .from("efcms")
    .insert(
      {
        id: session.user.id,
        assignments: JSON.stringify(efcms_assignments)
      }
    )
  } else {
    await supabaseClient
    .from("efcms")
    .update(
      {
        assignments: JSON.stringify(efcms_assignments)
      }
    )
    .eq("id", session.user.id)
  }

  return {
    status: 200,
    body: {
      efcms_assignments,
    },
  };
}




