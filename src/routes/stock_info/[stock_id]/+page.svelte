<script>
    export let data
    import Header from '$lib/Header.svelte';
    import Navigation from '$lib/Navigation.svelte';
    let stock_profile = data.stock_profile
    let pending_orders = data.pending_orders

    let show_buy_popup = false
    let show_sell_popup = false
    let show_loading = false
    let buy_order = {
        price:'',
        quantity:'',
        order_type:'buy',
        stock_id:stock_profile.id,
        user_id: data.user_id
    }

    async function handle_buy_order(){
        show_buy_popup = true
    }

    function handle_sell_order(){
        show_sell_popup = true
    }

    function handle_cancel(){
        show_buy_popup = false
        buy_order = {
            price:'',
            quantity:'',
            order_type:'buy',
            stock_id:stock_profile.id,
            user_id: data.user_id
        }
    }

    function handle_check_price(){
        if(buy_order.price < stock_profile.min_price){
           
            alert('Price should be greater than base price')
            buy_order.price = ''
            return
        }
    }

    async function handle_submit_order(){
        if(buy_order.price === '' || buy_order.quantity === ''){
            alert('Please fill all the fields')
            return
        }
        show_loading = true
        let response = await fetch('/api/submit_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buy_order)
        })
        let result = await response.json()
        console.log(result);
        if(result.success){
            setTimeout(() => {
                show_loading = false
                show_buy_popup = false
                location.reload()
            },2000)
        }
    }


</script>

<div class="outer_container">  
    <Header/>
    <div class="stock_info_container">
        <div class="stock_container">
            <div class="stock_details">
                <img src="{stock_profile.image}" alt="">
                <div class="stock_data">
                    <h1>{stock_profile.name}</h1>
                    <p>{stock_profile.description}</p>
                    <p class="price">Base Price : <span>{stock_profile.min_price}</span></p>
                    <div class="button_container">
                        <button class="button buy_button" on:click={handle_buy_order}><span>Buy</span></button>
                        
                        <button class="button sell_button" on:click={handle_sell_order}><span>Sell</span></button>
                    </div>
                </div>
            </div>
            <div class="market_data">
                <h6>Market Data</h6>
                <div class="data_statitics">
                    <div class="buyer_data">
                        <table id="buyer_table">
                                <tr>
                                    <th>Bid Price</th>
                                    <th>Quantity</th>
                                </tr>
                                <tbody>
                                    {#if pending_orders.length > 0}
                                        {#each pending_orders.filter(order=>order.order_type === 'buy') as order}
                                            <tr>
                                                <td>{order.price}</td>
                                                <td>{order.quantity}</td>
                                            </tr>
                                        {/each}
                                    {:else}
                                        <tr>
                                            <td colspan="2" style="text-align: center;">Nothing to show</td>
                                        </tr>
                                    {/if}
                                </tbody>
                        </table>
                    </div>
                    <div class="seller_data">
                        <table id="seller_table">
                                <tr>
                                    <th>Sell Price</th>
                                    <th>Quantity</th>
                                </tr>
                                <tbody>
                                    {#if pending_orders.length > 0}
                                        {#each pending_orders.filter(order=>order.order_type === 'sell') as order}
                                            <tr>
                                                <td>{order.price}</td>
                                                <td>{order.quantity}</td>
                                            </tr>
                                        {/each}
                                    {:else}
                                        <tr>
                                            <td colspan="2" style="text-align: center;">Nothing to show</td>
                                        </tr>
                                    {/if}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Navigation/>
    {#if show_buy_popup}
        <div class="popup_container">
            <div class="popup">
                <div class="close_container">
                    <i class="fa fa-times" aria-hidden="true" on:click={handle_cancel} />
                </div>
                <div class="buy_order">
                    <h3>{stock_profile.name}</h3>
                    <p>Base Price : <span>{stock_profile.min_price}</span></p>
                    <div class="input_container">
                        <label>Price : </label><input type="number" min="{stock_profile.min_price}" bind:value={buy_order.price} on:change={handle_check_price}/>
                    </div>
                    <div class="input_container">
                        <label>Quantity : </label><input type="number" min="1" bind:value={buy_order.quantity}/>
                    </div>
                    <div class="action_button_container">
                        <a class="button-3" on:click={handle_submit_order}>Buy</a>
                        <a class="button-3 cancel" on:click={handle_cancel}>Cancel</a>
                    </div>
                </div>
            {#if show_loading}
            <div class="loader">
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
            {/if}
            </div>
        </div>
    {/if}
    {#if show_sell_popup}
        <div class="popup_container">
            <div class="popup">
                <div class="close_container">
                    <i class="fa fa-times" aria-hidden="true" on:click={() => show_sell_popup = false} />
                </div>
                <div class="future_feature">
                    <p>This feature is not available for now</p>
                </div>
            </div>
        </div>
    {/if}
</div>




<style>
 @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
 .outer_container{
    position: relative;
 }
.stock_info_container{
    /* display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; */
    padding-top: 50px;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 150px;
}
.stock_container{
    width: 80%;
    margin: 0 auto;
    border: 1px solid black;
}
.stock_details{
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
}
.stock_details img{
    width: 150px;
    height: 150px;
    margin-right: 25px;
    margin: 10px 25px 0 10px;
    border-radius: 10px;
}
.stock_data p span{
    font-weight: 700;
}

button {
 outline: none;
 cursor: pointer;
 border: 3px solid green;
 padding: 0.9rem 2rem;
 margin: 0;
 font-family: inherit;
 font-size: inherit;
 position: relative;
 display: inline-block;
 letter-spacing: 0.05rem;
 font-weight: 700;
 font-size: 17px;
 border-radius: 500px;
 overflow: hidden;
 background: #66ff66;
 color: ghostwhite;
}

button span {
 position: relative;
 z-index: 10;
 transition: color 0.4s;
}

button:hover span {
 color: black;
}

button::before,
button::after {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 z-index: 0;
}

button::before {
 content: "";
 background: #000;
 width: 120%;
 left: -10%;
 transform: skew(30deg);
 transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

button:hover::before {
 transform: translate3d(100%, 0, 0);
}
.sell_button{
    background: rgb(255, 102, 102);
    border: 3px solid rgb(255, 102, 102);
}
.button_container{
    padding-bottom: 25px;
}
.market_data h6{
    background: blue;
    color: #fff;
    padding: 10px;
    font-size: 18px;
    margin: 0;
}
.data_statitics{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 10px;
}
.buyer_data, .seller_data{
    width: 49%;
    margin: 0 auto;
}
table{
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
table td, table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even){background-color: #f2f2f2;}

#buyer_table tr:hover {background-color: #75ef7d52;}
#seller_table tr:hover {background-color:rgba(234, 146, 146, 0.379);}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #0b630e ;
  color: white;
}
#seller_table th{
    background-color: rgb(234 35 20);
}
#buyer_table tbody tr{
    color: green;
}
#seller_table tbody tr{
    color: red;
}

.popup_container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.loader{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    background-color: #ffffff8d;
}
svg {
 width: 3.25em;
 transform-origin: center;
 animation: rotate4 2s linear infinite;
}

circle {
 fill: none;
 stroke: hsl(214, 97%, 59%);
 stroke-width: 2;
 stroke-dasharray: 1, 200;
 stroke-dashoffset: 0;
 stroke-linecap: round;
 animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
 100% {
  transform: rotate(360deg);
 }
}

@keyframes dash4 {
 0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
}


.popup{
    width: 40%;
    height: 500px;
    margin: auto;
    background-color: #fff;
    border-radius: 15px;
    position: relative;
}
.close_container{
    text-align: right;
    padding: 10px 10px 0 0;
}
.close_container i{
    cursor: pointer;
    font-size: 28px;
}
.future_feature{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-family: 'Poppins', sans-serif;
}
.buy_order{
    width: 60%;
    margin: 0 auto;
    padding: 10px;
    font-family: 'Poppins', sans-serif;

}
.buy_order h3{
    /* text-align: center; */
}
.input_container{
    display: flex;
    padding-bottom: 10px;
    flex-wrap: wrap;
}
.input_container label{
    width: 80px;
}

.button-3 {
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #2c974b;
}

.action_button_container{
    padding-top: 30px;
}


.cancel{
    margin-left: 10px;
    background-color: #ec1717;
}
.cancel:hover{
    background-color: #ec1717;
}


</style>