<template>
  <div class="container">
    <div class="text-center">
      <div class="form-signin">
        <img class="mb-4" src="bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div class="alert alert-danger alert-dismissable text-center" v-if="showAlert">
          <button type="button" class="close" data-dismiss="alert"
              aria-hidden="true" @click="showAlert = false">
            &times;
          </button>
          <i class="fas fa-exclamation-circle"></i>&nbsp;帳號或密碼錯誤
        </div>
        <label for="inputEmail" class="sr-only" >Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="upwd">
        <div class="text-right"><routerLink to="" id="a1" class="text-decoration-underline ">忘記密碼?</routerLink></div>
        <button class="btn btn-lg btn-primary btn-block mt-2 mb-2" type="submit" @click.prevent="signin">Sign in</button>
        <a @click="googleSignIn" href="#"><img src="../../../public/img/btn_google_signin_light_focus_web.png" alt="" class="rounded"></a>
        <div id="divspan"><span>還沒有帳號嗎?<router-link to="/signup" class="text-decoration-underline">註冊</router-link></span></div>
        <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { firebase } from '@firebase/app';
  import 'firebase/auth';
  export default {
    data() {
      return {
        email: '',
        upwd: '',
        showAlert: false,
      }
    },
    components: {
    },
    created() {
      const firebaseConfig = {
        apiKey: "AIzaSyAbzIkKbHWWFcIiJ7Xww7001ZzGdAS9Wk0",
        authDomain: "noteblog-a49ac.firebaseapp.com",
        projectId: "noteblog-a49ac",
        storageBucket: "noteblog-a49ac.appspot.com",
        messagingSenderId: "915726178166",
        appId: "1:915726178166:web:721a7dfa9c499222c14c57",
        measurementId: "G-GESSWKRTEC"
      };
      firebase.initializeApp(firebaseConfig);

    },
    methods: {
      signin() {
        let e = this.email;
        let p = this.upwd;
        let url = 'signin';
        let obj = { email: e, upwd: p }
        this.axios.get(url, {params:obj}).then(res => {
          let code = res.data.code;
          // let session = res.data.session;
          if (code == 1) {
            let uid = res.data.session.uid;
            let permission = res.data.session.permission;
            this.$store.commit('updatesUid', uid);
            this.$store.commit('updatePermission', permission);
            sessionStorage.setItem("uid", uid)
            sessionStorage.setItem('permission', permission);
            this.$router.push('/');
          } else {
            this.showAlert = true;
            return;
          }
        })
      },
      googleSignIn() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
                .auth()
                .signInWithPopup(provider)
                .then((result) => {

                  // let token = result.credential.accessToken;
                  let user = result.user;
                  // console.log(token) // Token
                  // console.log(result)
                  // console.log(user) // User that was authenticated
                  // console.log(user.displayName, user.uid)
                  // let uname = user.displayName;
                  // let upwd = user.uid;
                  // let
                  let obj = { email: user.uid, upwd: user.uid, uname: user.displayName, avatar: user.photoURL }
                  this.axios.get('googleSignup', { params: obj}).then(res => {
                    let code = res.data.code;
                    if (code == 1) {
                      let uid = res.data.data.uid;
                      let permission = res.data.data.permission;
                      this.$store.commit('updatesUid', uid);
                      this.$store.commit('updatePermission', permission);
                      sessionStorage.setItem("uid", uid)
                      sessionStorage.setItem("permission", permission)
                      this.$router.push('/')
                    }
                  })

                })
                .catch((err) => {
                  console.log(err); // This will give you all the information needed to further debug any errors
                });
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
  }
  div span {
    font-size: 12px;
  }
  #divspan {
    margin-top: 20px;
  }
</style>

