<script lang='ts'>
  import {onMount} from 'svelte';
  import {convertDate, daysFromNow } from '$lib/timeFunctions'
  import {getEFCMSAssignmentDaysFromNow} from '$lib/efcmsFunctions'
  import type { ICanvasAssignment} from '$lib/canvasFunctions'
  import type {IEFCMSAssignments} from '$lib/efcmsFunctions'
  import { getCourseCodes } from '$lib/canvasFunctions'

  interface IPageData {
    canvas_assignments: ICanvasAssignment[];
    efcms_assignments: IEFCMSAssignments[];
  }
  export let data: IPageData;

  let course_codes: string[] = [];

  onMount(async () => {
    course_codes = getCourseCodes(data.canvas_assignments);
  });


</script>

<div class="course_wrapper">
  {#if !data}
    <h2>Loading...</h2>
  {:else}
  {#each course_codes as code}
    <div class="course_container">
      <h2>{code}</h2>
      {#each data.canvas_assignments as assignment}
        {#if assignment.course_code == code}
          <p>{assignment.name}</p>
          <p>Due Date: {convertDate(assignment.due_at)} ({daysFromNow(assignment.due_at)} days left)</p>
          <p>Points Possible: {assignment.points_possible}</p>
          <a href ={assignment.html_url}>Open in Canvas</a>
        {/if}
      {/each}
    </div>
  {/each}
  <div class="course_container">
    <h2>EF152</h2>
    {#each data.efcms_assignments as assignment}
      <h3>{assignment.name}</h3>
      <p>LP Grade: {assignment.learning_page_data.grade} ({
        getEFCMSAssignmentDaysFromNow(assignment.learning_page_data.due_date)} days left)</p>
      <p>Prep Grade: {assignment.prep_questions_data.grade} ({
        getEFCMSAssignmentDaysFromNow(assignment.prep_questions_data.due_date)} days left)</p>
      <p>Practice Grade: {assignment.practice_questions_data.grade} ({
        getEFCMSAssignmentDaysFromNow(assignment.practice_questions_data.due_date)} days left)</p>
    {/each}
  </div>
  {/if}
</div>


<style>
  .course_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .course_container {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    height: fit-content;

  }
</style>



