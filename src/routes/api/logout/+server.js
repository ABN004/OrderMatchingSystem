
import { json } from '@sveltejs/kit'
export async function POST({ cookies,request }) {
    cookies.set('user_data', '', { path: '/', httpOnly: true, expires: new Date(0) })
    return json({ success: true })
}