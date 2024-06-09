export async function handle({ event, resolve }) {
    
    let user_id = event.cookies.get('user_data')
    console.log(user_id);
    if(!user_id){
        return await resolve(event)
    }

    event.locals.user_id = user_id
    console.log(event.locals); 
    return await resolve(event)

}