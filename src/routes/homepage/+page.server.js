export async function load(){
    let result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kycypke/endpoint/get_all_stock_profiles')
    let result_data = await result.json()
    console.log(result_data)
    let stock_profiles = result_data.stock_profiles
    return {stock_profiles}
}