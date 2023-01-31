import type { RequestHandler } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

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
 
export const POST = (async (event) => {
  const access_token = event.request.headers.get('Authorization');

  if (!access_token || access_token.length === 0) {
    return new Response(JSON.stringify([]), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const res = await fetch('https://utk.instructure.com/api/v1/courses', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();

  if (data.errors) {
    return new Response(JSON.stringify([]), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  console.log(data);
  const courseIds = data.map((course: { id: number; }) => course.id);
  const courseNames = data.map((course: { name: string; }) => course.name);
  const courseCodes = data.map((course: { course_code: string; }) => course.course_code);
  const dueAssignments = await Promise.all(courseIds.map(async (id: number) => {
    //The bucket=upcoming parameter only returns assignments due in the future (supposedly)
    const res = await fetch(`https://utk.instructure.com/api/v1/courses/${id}/assignments?bucket=upcoming&per_page=100`, {
      method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
    });
    return await res.json();
  }));
  const filteredAssignments = dueAssignments.filter((assignment: any) => assignment.length > 0);
  const assignments = filteredAssignments.map((assignment: any) => {
    const courseName = courseNames[courseIds.indexOf(assignment[0].course_id)];
    const courseCode = courseCodes[courseIds.indexOf(assignment[0].course_id)];
    return assignment.map((a: any) => {
      return {
        id: a.id,
        name: a.name,
        due_at: a.due_at,
        points_possible: a.points_possible,
        html_url: a.html_url,
        course_id: a.course_id,
        course_name: courseName,
        course_code: courseCode,
      }
    })
  });

  //console.log(assignments);
  return new Response(JSON.stringify(assignments), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}) as RequestHandler;




