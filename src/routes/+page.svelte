<svelte:head>
  <title>Home</title>
</svelte:head>

<script lang='ts'>
  import type { PageData } from './$types';
  export let data: PageData;
  import { page } from '$app/stores';

</script>

<h1>Landing Page</h1>

{#if $page.data.session}
  <p>Logged in as {$page.data.session.user.email}</p>
{/if}

{#if !$page.data.session}
  <p>Not logged in</p>
{/if}

