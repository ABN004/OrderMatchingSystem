<script>
    

    function handle_goto_page(route_name){
        location.href = '/'+route_name
    }
    async function handle_logout(){
        localStorage.removeItem('logged_in_user_info')
        let request = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        })
        let result = await request.json()
        if(result.success){
            location.href = '/'
        }else{
            alert('Oops... 😥Try Again Later')
            return
        }
    }
</script>

<div class="header_container">
    <div class="greetings_with_username">
        <img src="https://ik.imagekit.io/ABN/logo.png" alt="" on:click={()=>handle_goto_page('homepage')}>
        <div class="user_icon" on:click={handle_logout}>
            <i class="fa fa-sign-out"></i>
        </div>
    </div>
</div>

<style>
    
    .greetings_with_username{
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
        align-items: center;
        background-color: #ffeb3b;
    }
    .greetings_with_username img{
        width: 130px;
        text-align: center;
        cursor: pointer;
        

    }
    .user_icon{
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .user_icon i{
        color: #000;

    }
</style>