<template>
  <div class="container">
    <div>
      <top-bar></top-bar>
    </div>
    <div class="text-center">
      <div class="form-signin">
        <img class="mb-4" src="bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
        <label for="inputEmail" class="sr-only" >uname</label>
        <input type="" id="inputUname" class="form-control" placeholder="uname" required="" autofocus="" v-model="uname" name="uname">
        <label for="inputEmail" class="sr-only" >Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email" name="email" @input="verifyEmail"><span style="background: red;">{{ emailWarn }}</span>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="upwd" name="upwd">
        <label for="inputPassword" class="sr-only">confirm Password</label>
        <input type="password" id="inputConfirmPassword" class="form-control" placeholder="Confirm Password" required="" v-model="cfupwd">
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> I'm not robot
          </label>
        </div>
        <button :class="btnClass"  @click="recaptcha">Sign up</button>
        <div id="divspan"><span>已經是會員了嗎?<router-link to="/signin">登入</router-link></span></div>
        <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
      </div>
    </div>
  </div>
</template>
<script>
  import topBar from '../bar/topBar.vue'
  export default {
    data() {
      return {
        uname: '',
        email: '',
        upwd: '',
        cfupwd: '',
        token: '',
        emailWarn: '',
        upwdWarn: '',
        emailReg: false,
        upwdReg: false,
        btnClass: {
          btn: true,
          "btn-lg": true,
          "btn-block": true,
          "btn-primary": true,
          disabled: false
        }
      }
    },
    components: {
      'topBar': topBar,
    },
    methods: {
      verifyEmail() {
        let emailRule = /^\w+((-\w+)|(.\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z]+$/;
        if (this.email.search(emailRule) !== -1 ) {
          this.emailReg = true;
          this.emailWarn = '電郵地址格式正確';
        }else {
          this.emailWarn = '電郵地址格式錯誤';
        }
      },
      verifyPwd() {
        // let upwdRule = /^$/;
      },
      // google 機器人驗證 recaptcha v.3 for vue 2.
      recaptcha() {
        console.log("recaptcha clicked");
          this.$recaptchaLoaded().then(() => {
            console.log("recaptcha loaded");
            this.$recaptcha("signup").then((token) => {
              console.log({token}); // Will print the token
              let u = this.uname;
              let e = this.email;
              let p = this.upwd;
              let url = 'signup';
              this.axios.post(url, ( { uname: u, email: e, upwd: p, token: token } )).then(res => {
                console.log(res);
                let code = res.data.code;
                if (code == 1) {
                  this.$router.push('/signup');
                }
              })
            });
          });
      },
      // POST註冊資料及憑證
      // signup() {
      //   // 獲取用戶名、電郵地址、密碼、確認密碼
      //   let u = this.uname;
      //   let e = this.email;
      //   let p = this.upwd;
      //   // let p2 = this.cfupwd;
      //   // 創建正則表達式檢查格式
      //   // 發送 axios(ajax)
      //   let url = 'signup';
      //   this.axios.post(url, ({ uname: u, email: e, upwd: p } ).then(res => {
      //     console.log(res);
      //     // let code = res.data.code;
      //     // if(code == 1){
      //     //   console.log('註冊成功');
      //     //   this.$router.push("/");
      //     // }else if(code == -1){
      //     //   console.log('電郵已被註冊')
      //     // }else {
      //     //   console.log('註冊失敗')
      //     // }
      //   })
      //   )}
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

