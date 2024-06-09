<script>
  
    let user_data = {
        username: '',
        password: ''
    }
    let is_login_failed = false
    async function handle_sign_in(e){
        e.preventDefault();
        if(user_data.username === ''){
            alert('Please enter your Username')
            return
        }
        if(user_data.password === ''){
            alert('Please enter your passkey')
            return
        }

        let request = await fetch('/api/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
        })
        let result = await request.json()  
        // localStorage.setItem('logged_in_user_info',JSON.stringify(result.user_data))
        localStorage.setItem('logged_in_user_info',JSON.stringify(result.user_data))
        
        if(result.success){
            alert(`${result.message} 🤩🤩🤩🤩`)
            location.href = '/homepage'
        }else{
            is_login_failed = true
            user_data.username = ''
            user_data.password = ''
            return
        }
    }

</script>

<div class="sign_in_container">
    <div class="overlay_container">
        <div class="greeting">
        </div>
        <form class="form">
            <img src="https://ik.imagekit.io/ABN/logo.png" alt="">
            <p class="title">Sign in</p>
            <input placeholder="Enter Username" type="text" class="email" bind:value={user_data.username} on:click={()=>{is_login_failed = false}}>
            <input placeholder="Enter Passkey" type="text" class="email" bind:value={user_data.password} on:click={()=>{is_login_failed = false}}>
            {#if is_login_failed}
            <p class="error">Invalid Credentials</p>
            {/if}
          
            <div class="button_row">
              <button class="button primary_button" on:click={handle_sign_in}>Sign In</button>
            </div>
        </form>
    </div>
</div>


<style>
    
.sign_in_container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('https://ik.imagekit.io/ABN/stock.webp');
    background-position: top center;
    background-size: cover;
    font-family: 'Poppins', sans-serif;
}
.overlay_container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(1px);
}

.form {
  scale: 0.8;
  background-color: #ffffffdc;
  height: 300px;
  width: 65%;
  max-width: 352px;
  box-sizing: content-box;
  padding: 44px;
  border-radius: 12px;
}

.form .title {
  color: #1b1b1b;
  font-size: 25px;
  font-weight: 600;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 12px;
  font-family: "Segoe UI","Helvetica Neue","Lucida Grande","Roboto","Ebrima","Nirmala UI","Gadugi","Segoe Xbox Symbol","Segoe UI Symbol","Meiryo UI","Khmer UI","Tunga","Lao UI","Raavi","Iskoola Pota","Latha","Leelawadee","Microsoft YaHei UI","Microsoft JhengHei UI","Malgun Gothic","Estrangelo Edessa","Microsoft Himalaya","Microsoft New Tai Lue","Microsoft PhagsPa","Microsoft Tai Le","Microsoft Yi Baiti","Mongolian Baiti","MV Boli","Myanmar Text","Cambria Math";
}
.form img{
    width: 180px;
    align-self: center;
    display: block;
    margin: 0 auto;
}

.form .email {
  width: 100%;
  padding: 6px 10px 6px 0px;
  border-style: solid;
  border-width: 0px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.6);
  height: 36px;
  outline: none;
  background-color: transparent;
  padding-left: 0;
  color: #000000;
  margin-bottom: 6px;
}

.form .email {
  border-color: rgba(0, 0, 0, 0.8);
}
.error{
    margin: 0;
    font-size: 10px;
    color: red;
    font-size: 800;
}


.form .button_row {
  width: 100%;
  display: flex;
  justify-content: center;
  height: fit-content;
  gap: 4px;
  padding-top: 15px;
}

.form .button_row .button {
  width: 108px;
  height: 32px;
  box-sizing: content-box;
  padding: 4 12 4 12;
  border: none;
  font-size: 15px;
}



.form .button_row .primary_button {
  background-color: #162dc5;
  color: #ffffff;
  cursor: pointer;
}

.form .button_row .primary_button:hover {
  background-color: #3145ca;
}
    
</style>
