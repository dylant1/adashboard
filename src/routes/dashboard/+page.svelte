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
  }
  interface IEfcmsAssignment {

  }

  let canvas_assignments: ICanvasAssignment[] | undefined;
  let efcms_assignments: any[] | undefined;
  let courses = [];
  let course_codes: string[] = [];

  onMount(async () => {
    canvas_assignments = await data.canvas_assignments;
    efcms_assignments = await data.efcms_assignments;


    if (canvas_assignments) {
      courses = getCourses(canvas_assignments);
      course_codes = getCourseCodes(canvas_assignments);
    }
    console.log(efcms_assignments);

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

  function getCourses(assignments: ICanvasAssignment[]): any[] {
    const courses: any = [];
    assignments.forEach((assignment) => {
      if (!courses.includes(assignment.course_name)) {
        courses.push(assignment.course_name);
      }
    });
    return courses;
  }
  function getCourseCodes(assignments: ICanvasAssignment[]): any[] {
    const courses: any = [];
    assignments.forEach((assignment) => {
      if (!courses.includes(assignment.course_code)) {
        courses.push(assignment.course_code);
      }
    });
    return courses;
  }

  function sortAssignmentsByCourse(assignments: ICanvasAssignment[]): ICanvasAssignment[] {
    return assignments.sort((a, b) => {
      if (a.course_name < b.course_name) {
        return -1;
      }
      if (a.course_name > b.course_name) {
        return 1;
      }
      return 0;
    });
  }
  const today = new Date();
  const months = {
    'Jan': 0,
    'Feb': 1,
    'Mar': 2,
    'Apr': 3,
    'May': 4,
    'Jun': 5,
    'Jul': 6,
    'Aug': 7,
    'Sep': 8,
    'Oct': 9,
    'Nov': 10,
    'Dec': 11,
  }

  function convertDateToString(date: string): string {
    const month_tmp = date.split(' ')[1];
    const month = months[month_tmp as keyof typeof months];
    const day_tmp = date.split(' ')[2];
    const day = parseInt(day_tmp);
    const year = today.getFullYear();

    const d = new Date(year, month, day);
    return d.toLocaleDateString();
  }

  function getEFCMSAssignmentDaysFromNow(date: string) {
    const d = new Date(convertDateToString(date));
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }


</script>

<span>
  <a href="/dashboard/apps">Add an app</a>
</span>
<span>
  <a href="/dashboard/apps/efcms/sync">Sync EFCMS</a>
</span>

<div class="course_wrapper">
{#if canvas_assignments}
  {#each course_codes as code}
    <div class="course_container">
    <h2>{code}</h2>
    {#each canvas_assignments as assignment}
      {#if assignment.course_code == code}
        <p>{assignment.name}</p>
        <p>Due Date: {convertDate(assignment.due_at)} ({daysFromNow(assignment.due_at)} days left)</p>
        <p>Points Possible: {assignment.points_possible}</p>
        <a href ={assignment.html_url}>Open in Canvas</a>
      {/if}
    {/each}
    </div>
  {/each}
{/if}
{#if efcms_assignments}
  <div class="course_container">
  <h2>EF152</h2>
  {#each efcms_assignments as assignment}
    <h2>{assignment.name}</h2>
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



