import type { RequestHandler } from './$types';
import type { ICanvasAssignment } from '$lib/canvasFunctions';

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
  const courseIds = data.map((course: { id: number; }) => course.id);
  const canvas_course_names = data.map((course: { name: string; }) => course.name);
  const canvas_course_codes = data.map((course: { course_code: string; }) => course.course_code);
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
  const filteredAssignments = dueAssignments.filter((assignment: ICanvasAssignment[]) => assignment.length > 0);
  const assignments = filteredAssignments.map((assignment: ICanvasAssignment[]) => {
    const canvas_course_name = canvas_course_names[courseIds.indexOf(assignment[0].course_id)];
    const canvas_course_code = canvas_course_codes[courseIds.indexOf(assignment[0].course_id)];
    return assignment.map((a: ICanvasAssignment) => {
      return {
        id: a.id,
        name: a.name,
        due_at: a.due_at,
        points_possible: a.points_possible,
        html_url: a.html_url,
        course_id: a.course_id,
        course_name: canvas_course_name,
        course_code: canvas_course_code,
      }
    })
  });

  return new Response(JSON.stringify(assignments), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}) as RequestHandler;




