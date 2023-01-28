<script lang='ts'>
  import { SupabaseClient } from '$lib/db'
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  export let data: PageData;

  async function loginWithGoogle() {
    const { data, error } = await SupabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async function logout() {
    const { error } = await SupabaseClient.auth.signOut()
  }

</script>

{#if $page.data.session} 
  <form on:submit|preventDefault={logout}>
    <button type="submit">Logout</button>
  </form>
{/if}
{#if !$page.data.session} 
  <button on:click={loginWithGoogle}>Login with Google</button>
{/if}



