<script lang="ts">

  import {navigating} from '$app/stores';

</script>


{#if $navigating}
  <h1>Loading</h1>
{/if}
{#if !$navigating}
  <h1>Loaded</h1>
{/if}
