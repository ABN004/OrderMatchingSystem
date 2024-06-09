export async function load({locals}){
    let user_id = locals.user_id || 'user_1'
    let result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/get_all_completed_order_info')
    let result_data = await result.json()
    let completed_orders = result_data.completed_orders.filter(order=>order.user_id === user_id)
    let result_2 = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/get_all_pending_order_info')
    let result_data_2 = await result_2.json()
    let pending_orders = result_data_2.pending_orders.filter(order=>order.user_id === user_id)
    let result_3 = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/get_all_stock_profiles')
    let result_data_3 = await result_3.json()
    console.log(result_data_3)
    let stock_profiles = result_data_3.stock_profiles
    return {completed_orders,pending_orders,stock_profiles} 
}