<script lang='ts'>
  import {onMount} from 'svelte';
  export let data: any;
  
  onMount(async() => {
    console.log(data);
  })


</script>

<a href="/dashboard/apps">Add an app</a>





