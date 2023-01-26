import type { Actions, PageServerLoad } from './$types';
 

export const load = (async () => {
  //const user = await db.getUserFromSession(cookies.get('sessionid'));
  //return { user };
  //get the access token 
  
  //test the canvas lms api
  const tmp = "7641~KOPgl7vXz0soEFBahEaIhiLVQCu7Dh6HQz3dGx6yQj8VWAaFENyd7AyGSJbh0nYu";
  const response = await fetch('https://canvas.instructure.com/api/v1/users/self/profile', {
    headers: {
      authorization: `Bearer ${tmp}`
    }
  });
  const data = await response.json();
  console.log(data);


  return data
}) satisfies PageServerLoad;

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const access_token = data.get('access_token');

    return {
      status: 302,
      token: access_token
    }
  },
} satisfies Actions;
