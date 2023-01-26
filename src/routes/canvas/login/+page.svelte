<script lang="ts">
  import type { PageData, ActionData } from './$types';

  export let data: PageData;

  export let form: ActionData;
  console.log(data);
</script>
<form method="POST" action="?/login">
  <input type="text" name="access_token" placeholder="access-token"/>
  <button>Authenicate</button>
</form>

{#if form}
  <div>
    <h2>Form data</h2>
    <pre>{JSON.stringify(form, null, 2)}</pre>
    <div>Successfully logged into canvas</div>
  </div>
{/if}

