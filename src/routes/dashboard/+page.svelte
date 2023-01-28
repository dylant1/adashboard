<script lang='ts'>
  //TODO: Change this type
  export let data: any;
</script>

{#if !data.tableData}
<h1>No apps added, add an app:</h1>
{/if}
<a href="/dashboard/apps">Add an app</a>
{#if data.tableData}
  {#if data.tableData.canvas_token}
    <h1>Canvas</h1>

  {/if}
  {#if !data.tableData.canvas_token}
    <h1>token does not exist</h1>
  {/if}
{/if}





