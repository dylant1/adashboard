<script lang='ts'>
  import { SupabaseClient } from '$lib/db'
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  export let data: PageData;

  //TOOD: I DONT KNOW HOW SAFE THIS IS, BUT IT WORKS
  async function loginWithGoogle() {
    const { data, error } = await SupabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
  }
  //TOOD: IF THE USER IS LOGGED IN MAKE SURE THEY HAVE AN ENTRY IN THE PROFILES TABLE
  async function logout() {
    const { error } = await SupabaseClient.auth.signOut()
  }

</script>

{#if $page.data.session} 
  <p>Logged in as {$page.data.session.user.email}</p>
  <p>return to dashboard</p>
<a href="/dashboard">Dashboard</a>
<form on:submit|preventDefault={logout}>
    <button type="submit">Logout</button>
  </form>
{/if}
{#if !$page.data.session} 
  <button on:click={loginWithGoogle}>Login with Google</button>
{/if}



