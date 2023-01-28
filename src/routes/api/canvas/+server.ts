import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
export const POST = (async ({ request }) => {
  //const access_token = '7641~KOPgl7vXz0soEFBahEaIhiLVQCu7Dh6HQz3dGx6yQj8VWAaFENyd7AyGSJbh0nYu';
  const access_token = request.headers.get('Authorization');
  console.log(access_token);
  //TOOD: Change variable names 

  //USER DATA
  const res = await fetch('https://utk.instructure.com/api/v1/courses', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  

  //COURSE DATA
  const courseIds = data.map((course: { id: number; }) => course.id);
  //TODO: only get the course ids for the courses currently being taught
  //const courseData = await Promise.all(courseIds.map(async (id: number) => {
    //const res = await fetch(`https://utk.instructure.com/api/v1/courses/${id}`, {
      //method: 'GET',
      //headers: {
        //'Authorization': `Bearer ${access_token}`,
        //'Content-Type': 'application/json'
      //}
    //});
    //return await res.json();
  //}));
  //console.log(courseData);

  //get the assignments for each course
  //const assignments = await Promise.all(courseIds.map(async (id: number) => {
    //const res = await fetch(`https://utk.instructure.com/api/v1/courses/${id}/assignments`, {
      //method: 'GET',
      //headers: {
        //'Authorization': `Bearer ${access_token}`,
        //'Content-Type': 'application/json'
      //}
    //});
    //return await res.json();
  //}));
  //remove all the assignments in which the unlock at date is in the future
  //console.log(assignments);
  //console.log(assignments);

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
  //console.log(filteredAssignments);

  //console log the names of the filtered assignments
  //filteredAssignments.forEach((assignments: any) => {
    //assignments.forEach((assignment: any) => {
      //console.log(assignment.name);
    //});
  //});



  return new Response(JSON.stringify(filteredAssignments), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}) as RequestHandler;




