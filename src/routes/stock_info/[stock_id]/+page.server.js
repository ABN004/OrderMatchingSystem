export async function load({locals,params}){
    let user_id = locals.user_id || 'user_1'
    let stock_id = params.stock_id
    let result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/get_all_stock_profiles')
    let result_data = await result.json()
    let stock_profiles = result_data.stock_profiles
    let stock_profile = stock_profiles.find(stock_profile => stock_profile.id === stock_id)
    let result_2 = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/get_all_pending_order_info')
    let result_data_2 = await result_2.json()
    let pending_orders = result_data_2.pending_orders
    pending_orders = pending_orders.filter(pending_order => pending_order.stock_id === stock_id)
    console.log(pending_orders);
    return {stock_profile,pending_orders,stock_id,user_id}
}