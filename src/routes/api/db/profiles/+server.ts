import type { RequestEvent } from '@sveltejs/kit';
import {SupabaseClient} from '$lib/db';
//impor thte databa 

export async function POST({ request } : RequestEvent) 
{
  const body = await request.json();
  console.log(body);

  console.log("test")
  //return a response
  //return {
    //status: 200,
    //body: JSON.stringify({ message: 'Hello World' })
  //};

  //WHY DO I HAVE TO DO THIS
  return new Response(
    JSON.stringify({ message: 'success' }), { status: 200 });
}

