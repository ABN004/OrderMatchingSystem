<script>
    function handle_goto_page(route_name){
        location.href = '/' + route_name
    }
</script>

<div class="navigation_container">
    <div class="nav_button home" on:click={()=>{handle_goto_page('homepage')}}>
        <span><i class="fas fa-home"></i></span>
        <p>Home</p>
    </div>
    <div class="nav_button home" on:click={()=>{handle_goto_page('homepage')}}>
        <span><img src="https://ik.imagekit.io/ABN/logo.png" alt=""></span>
        
    </div>
    <div class="nav_button" on:click={()=>{handle_goto_page('orders')}} style="margin-right: 5px">
        <span><i class="fas fa-handshake"></i></span>
        <p>Orders</p>
    </div>
</div>


<style>
    .navigation_container{
        display: flex;
        justify-content: space-between;
        /* padding-inline: 30px; */
        background-color: #e1dcdcdd;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-top: 15px;
        border-top: 1px solid #9f9191f5;
        border-radius: 35px 35px 0 0;
    }
    .nav_button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 95px;
        cursor: pointer;
    }
    .nav_button i{
        color: #000;
        font-size: 25px;
    }
    .nav_button p{
        font-size: 12px;
    }
    .nav_button img{
        width: 90px;
    }
 
</style>