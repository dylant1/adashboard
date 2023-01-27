<script lang='ts'>

  export let data: any;
  console.log(data);
</script>

<form action="/api/post/canvas_token" method="post">
  <input type="text" name="token">
  <input type="submit" value="Submit">
</form>

<h1>No apps added, add an app:</h1>
<a href="/dashboard/apps">Add an app</a>
