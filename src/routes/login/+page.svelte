<script>
  import { SupabaseClient } from '$lib/db'
  import { page } from '$app/stores';

  //TOOD: I DONT KNOW HOW SAFE THIS IS, BUT IT WORKS
  async function loginWithGoogle() {
        const { data, error } = await SupabaseClient.auth.signInWithOAuth({
      provider: 'google',
    })
  } 

</script>

{#if $page.data.session} 
  <p>Logged in as {$page.data.session.user.email}</p>
  <p>return to dashboard</p>
{/if}
{#if !$page.data.session} 
  <button on:click={loginWithGoogle}>Login with Google</button>
{/if}

