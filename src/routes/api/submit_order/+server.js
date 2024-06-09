import { json } from '@sveltejs/kit';
import shortid from "shortid";
shortid.characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
)
export async function POST({ cookies, request }) {
    let unique_id = shortid.generate();
    let data = await request.json();
    data.id = 'buy_' + unique_id;
    let result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/submit_buy_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result_data = await result.json()

    console.log(result_data)
  
    return json(result_data);
}