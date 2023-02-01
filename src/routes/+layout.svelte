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

<style>
  :global(html) {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #10172a;
  }
  :global(h2) {
    color: white;
  }
  :global(p) {
    color: #94A3b8;
  }
  :global(a) {
    color: #38BDF8;
  }
  :global(h3) {
    color: white;
  }
</style>
