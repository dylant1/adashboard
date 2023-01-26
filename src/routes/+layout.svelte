<script>

  import { SupabaseClient } from "$lib/db";
  import { invalidate, invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";
  import {page} from '$app/stores';

  onMount(() => {
    if ($page.data.session) {
      console.log("session exists");
      //return;
    }
    else {
      console.log("session does not exist");
    }
    const {
      data: { subscription },
    } = SupabaseClient.auth.onAuthStateChange(() => {
      //invalidate('supabase:auth')
      invalidateAll();
    })
    console.log("mounted");
    return () => subscription.unsubscribe()
  });

</script>

<slot />
