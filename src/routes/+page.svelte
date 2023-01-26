<svelte:head>
  <title>Home</title>
</svelte:head>

<script lang='ts'>
  import type { PageData } from './$types';
  export let data: PageData;
  import { SupabaseClient } from '$lib/db';
  import { page } from '$app/stores';


async function signInWithGoogle() {
  const { data, error } = await SupabaseClient.auth.signInWithOAuth({
    provider: 'google',
  })
}


</script>

<div>
  TODO:
  1. Allow user to paste canvas token
  2. Allow user to enter netid and password
  3. Setup Canvas API
  4. Scrap EF website
</div>

{#if !$page.data.session}
  <button on:click={signInWithGoogle}>Sign in with Google</button>
{:else}
  <button on:click={() => SupabaseClient.auth.signOut()}>Sign out</button>
{/if}
