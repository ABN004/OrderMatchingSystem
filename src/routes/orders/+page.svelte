<script>
    import Header from '$lib/Header.svelte';
    import Navigation from '$lib/Navigation.svelte';
    export let data

    let pending_orders = data.pending_orders
    let completed_orders = data.completed_orders
    let stock_profiles = data.stock_profiles

    let active_tab = 'open_orders'
</script>

<div class="orders_container">
    <Header/>
    <h1>Orders</h1>
    <div class="tab_container">
        <ul>
            <li on:click={() => active_tab = 'open_orders'} class:active={active_tab === 'open_orders'}>Open Orders</li>
            <li on:click={() => active_tab = 'history'} class:active={active_tab === 'history'}>History</li>
        </ul>
    </div>
    {#if active_tab === 'open_orders'}
        <div class="open_orders_container">
            {#if pending_orders.length === 0}
                <div class="nothing_to_show">
                    <p>Nothing to show</p>
                </div>
            {:else}
                {#each pending_orders as order}
                    <div class="order">
                        <img src="{stock_profiles.filter(stock=>stock.id === order.stock_id)[0].image}" alt="">
                        <div class="order_details">
                            <h3>{stock_profiles.filter(stock=>stock.id === order.stock_id)[0].name}</h3>
                            <p>Quantity : {order.quantity}</p>
                            <p>Price : {order.price}</p>
                            <p>Order Type : {order.order_type}</p>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {:else if active_tab === 'history'}
        <div class="history_container">
            {#if completed_orders.length === 0}
                <div class="nothing_to_show">
                    <p>Nothing to show</p>
                </div>
            {:else}
                {#each completed_orders as order}
                    <div class="order">
                        <img src="{stock_profiles.filter(stock=>stock.id === order.stock_id)[0].image}" alt="">
                        <div class="order_details">
                            <h3>{stock_profiles.filter(stock=>stock.id === order.stock_id)[0].name}</h3>
                            <p>Quantity : {order.quantity}</p>
                            <p>Price : {order.price}</p>
                            <p>Order Type : {order.order_type}</p>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
    <Navigation/>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .orders_container{
        font-family: "Poppins", sans-serif;
    }
    .orders_container h1{
        text-align: center;
        padding-bottom: 25px;
    }
    .tab_container{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
    }
    .tab_container ul{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 0;
    }
    .tab_container ul li{
        cursor: pointer;
        list-style-type: none;
        font-weight: 500;
    }
    .tab_container ul li.active{
        text-decoration: underline 5px #b2a103;
        text-underline-offset: 5px;
    }
    .order{
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #b2a103;
        border-radius: 12px;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 15px;
    }
    .order img{
        width: 100px;
        height: 100px;
    }
    .order_details{
        padding-left: 20px;
    }
    .nothing_to_show{
       min-height: 300px;
       display: flex;
       align-items: center;
       justify-content: center;
       font-weight: 500;
       font-size: 20px
    }
</style>