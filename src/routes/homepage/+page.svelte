<script>
    export let data
    import Header from '$lib/Header.svelte';
    import Navigation from '$lib/Navigation.svelte';
    console.log(data);
    let stock_profiles = data.stock_profiles
    let search_text = ''
    let filtered_stock_profiles = stock_profiles
    function handle_search(){
        filtered_stock_profiles = stock_profiles.filter(stock_profile => stock_profile.name.toLowerCase().includes(search_text.toLowerCase()))
    }
</script>

<Header/>
<div class="search_outer">
    <div class="search_box_container">
        <div class="search_icon">
            <i class="fa fa-search" aria-hidden="true" />
        </div>
        <input type="text" placeholder="Search Stocks"  bind:value={search_text} on:input={handle_search}/>
    </div>
</div>
<div class="stock_cards">
    {#if filtered_stock_profiles.length === 0}
    <p>No Stocks Found</p>
    {:else}
    {#each filtered_stock_profiles as stock_profile}
    <div class="stock_card" on:click={() => location.href = '/stock_info/'+stock_profile.id}>
        <img src="{stock_profile.image}" alt="">
        <h6>{stock_profile.name}</h6>
        <p>{stock_profile.description}</p>
    </div>
    {/each}
    {/if}
</div>
<Navigation/>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    .search_outer{
		display: flex;
		justify-content: center;
		align-items: center;
		padding-block: 10px;
        padding-top: 25px;
	}
	.search_box_container{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50%;
		margin: 0 auto;
		padding-top: 15px;
	}
	.search_outer .search_box_container{
		margin: 0;
		padding: 0;
	}
	.search_box_container input{
		width: 100%;
		padding: 7px;
		border: none;
		outline: none;
		border-radius: 15px;
		font-family: "Montserrat", sans-serif;
		padding-left: 15px;
	}
	.search_icon{
		background-color: #fff;
		border-radius: 50%;
		padding: 6px 10px;
		margin-right: 10px;
	}
	.search_outer .search_box_container .search_icon{
		background-color: #dde2f5;
	}
	.search_outer .search_box_container input{
		background-color: #dde2f5;
	}
    .stock_cards{
        display: flex;
        font-family: 'Poppins', sans-serif;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-top: 20px;
    }

    .stock_card{    
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        gap: 30px;
        /* padding: 10px 20px; */
        border-radius: 5px;
        cursor: pointer;
        max-width: 300px;
        min-height: 435px;
        border: 2px solid #80808036;
        box-shadow: 1px 1px 2px #80808052;
        transition: all 0.3s ease-in-out;
    }
    .stock_card:hover{
        transform: scale(1.05) translateY(-5px);

    }
    .stock_card img{
        width: 300px;
        height: 200px;
        object-fit: cover;
    }
    .stock_card h6{
        margin: 0;
        text-align: center;
        font-size: 18px;
        font-family: 'Poppins', sans-serif;
    }
    .stock_card p{
        margin: 0;
        padding-inline: 15px;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
    }
</style>