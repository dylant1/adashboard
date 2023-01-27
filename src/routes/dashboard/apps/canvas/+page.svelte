<script lang="ts">
  import type { PageData } from "./$types";
  //TODO: THIS TYPING 
  export let data: any;
  //$: ({ user, tableData } = data)
  let user = data.user;
  let tableData = data.tableData;

</script>
<a href="/dashboard">Back to dashboard</a>

<form method="POST">
  <input type="text" name="access_token" placeholder="access_token">
  <input type="submit" value="Submit">
</form>

<div>Protected content for {user.email}</div>
<pre>{JSON.stringify(tableData, null, 2)}</pre>
<pre>{JSON.stringify(user, null, 2)}</pre>


