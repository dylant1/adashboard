import type { RequestHandler } from './$types';

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
 
export const POST = (async ({ request }) => {
  const access_token = request.headers.get('Authorization');
  const res = await fetch('https://utk.instructure.com/api/v1/courses', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();


  const courseIds = data.map((course: { id: number; }) => course.id);

  const dueAssignments = await Promise.all(courseIds.map(async (id: number) => {
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

  return new Response(JSON.stringify(filteredAssignments), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}) as RequestHandler;




