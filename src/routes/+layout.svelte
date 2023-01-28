<script>

  import { SupabaseClient } from "$lib/db";
  import { invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    const { data: { subscription } } = SupabaseClient
      .auth
      .onAuthStateChange(() => {
      invalidateAll();
    })
    return () => subscription.unsubscribe()
  });

</script>

<slot />
