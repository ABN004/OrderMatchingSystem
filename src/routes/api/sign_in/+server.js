import { json } from '@sveltejs/kit';
export async function POST({ cookies, request }) {
    let data = await request.json();
    console.log(data)
    let result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/validate_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result_data = await result.json()
    if(result_data.success){
        cookies.set('user_data',result_data.user_data.id,{
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60*60*24*7
        })
        console.log('cookies set');
    }
    console.log(result_data)
  
    return json(result_data);
}