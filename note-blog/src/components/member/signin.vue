<template>
  <div class="container">
    <div class="text-center">
      <form class="form-signin">
        <img class="mb-4" src="bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only" >Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="upwd">
        <a href="" id="a1">忘記密碼?</a>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click="signin">Sign in</button>
        <div id="divspan"><span>還沒有帳號嗎?<router-link to="/signup">註冊</router-link></span></div>
        <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        email: '',
        upwd: '',
      }
    },
    components: {
    },
    methods: {
      signin() {
        let e = this.email;
        let p = this.upwd;
        let url = 'signin';
        let obj = { email: e, upwd: p }
        this.axios.get(url, {params:obj}).then(res => {
          console.log(res.data);
          let code = res.data.code;
          let session = res.data.session;
          if (code == 1) {
            this.$store.commit('updatesUid', session);
            this.$router.push('/');
          }
        })
      }
    },
  }
</script>
<style scoped>
  html,body {height: 100%;}
  body {display: -ms-flexbox;display: -webkit-box;display: flex;-ms-flex-align: center;-ms-flex-pack: center;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;padding-top: 40px;padding-bottom: 40px;background-color: #f5f5f5;}
  .form-signin {width: 100%;max-width: 330px;padding: 15px;margin: 0 auto;}
  .form-signin .checkbox {font-weight: 400; margin-top: 20px;}
  .form-signin .form-control {position: relative;box-sizing: border-box;height: auto;padding: 10px;font-size: 16px;}
  .form-signin .form-control:focus {z-index: 2;}
  .form-signin input[type="email"] {margin-bottom: -1px;border-bottom-right-radius: 0;border-bottom-left-radius: 0;}
  .form-signin input[type="password"] {margin-bottom: 10px;border-top-left-radius: 0;border-top-right-radius: 0;}
  form {
    position: relative;
  }
  #a1 {
    font-size: 12px;
    position: absolute;
    right: 20px;
    margin: 0;
  }
  div span {
    font-size: 12px;
  }
  #divspan {
    margin-top: 20px;
  }
</style>

