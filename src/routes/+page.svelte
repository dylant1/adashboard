
<svelte:head>
  <title>Home</title>
</svelte:head>

<script lang='ts'>
  import type { PageData } from './$types';
  export let data: PageData;
  let name = 'world';

</script>

<p>Visit {name} to read the documentation</p>
  <h1> {data.hello} </h1>




