<script lang='ts'>
  import {onMount} from 'svelte';
  export let data: any;
  
  interface ICanvasAssignment {
    id: number;
    name: string;
    due_at: string;
    points_possible: number;
    html_url: string;
    course_id: number;
    course_name: string;
    course_code: string;
    course_html_url: string;
  }

  let canvas_assignments: ICanvasAssignment[] | undefined;

  onMount(async () => {
    canvas_assignments = await data.canvas_assignments;
  });

  function convertDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  function daysFromNow(date: string): number {
    const d = new Date(date);
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  function timeTillMidnight(): string {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    return new Date(diff).toISOString().substr(11, 8);
  }


</script>

<div>EFCMS Scraper will run in approximately {timeTillMidnight()} to update data. Working on better alternatives</div>
<a href="/dashboard/apps">Add an app</a>

<h2>Assignments</h2>
{#if canvas_assignments}
  {#each Object.entries(canvas_assignments) as [key, value]}
    <h4>{value.name}</h4>
    <p>Due Date: {convertDate(value.due_at)} --- {daysFromNow(value.due_at)} days from now</p>
  {/each}
{/if}





