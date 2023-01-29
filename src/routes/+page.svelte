<svelte:head>
  <title>Home</title>
</svelte:head>

<script lang='ts'>
  import type { PageData } from './$types';
  export let data: PageData;
  import { page } from '$app/stores';
  import {onMount} from 'svelte';
  //import {scrape} from '../lib/scrape';
  //import scrape 
  //import {scrape} from '$lib/efcmsScrape';



</script>

<h1>Landing Page</h1>
<div>
  <a href = "/login">Login/Logout</a>
</div>
<div>
  <a href= "/dashboard">Dashboard</a>
</div>

{#if $page.data.session}
  <p>Logged in as {$page.data.session.user.email}</p>
{/if}

{#if !$page.data.session}
  <p>Not logged in</p>
{/if}

