import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
    if(locals.admin_id){
        throw redirect(302, '/homepage');
    }
}