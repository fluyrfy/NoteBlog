<template>
  <div>

    <div class="container bootstrap snippets bootdey mt-2">
    <div class=" ">
        <!-- edit form column -->
          <!-- <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a>
            <i class="fa fa-coffee"></i>
            This is an <strong>.alert</strong>. Use this to show important messages to the user.
          </div> -->
          <!-- <h3>Personal info</h3> -->
          <div class="row justify-content-lg-around form-group" role="form" data-toggle="validator" ref="formValid">
            <div class="alert alert-danger alert-dismissable text-center" v-if="showAlert">
              <!-- <button type="button" class="close" data-dismiss="alert"
                  aria-hidden="true">
                &times;
              </button> -->
              <i class="fas fa-exclamation-circle"></i>&nbsp;{{warn}}
            </div>
          <template v-if="$store.getters.getPermission !== 6">
            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2" >暱稱:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" placeholder="新暱稱" v-model="uname">
              </div>
            </div>

            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2" >電子郵件:</label>
              <div class="col-lg-8">
                <input class="form-control" type="email" placeholder="新電郵" v-model="email" data-error="Bruh, that email address is invalid">
              </div>
            </div>

            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2">新密碼:</label>
              <div class="col-lg-8">
                <input class="form-control" type="password" placeholder="新密碼" v-model="upwd" id="inputPW"><div data-match-error="糟了！密碼並未吻合，請重新輸入~"></div>
              </div>
            </div>
            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2 pr-0">確認新密碼:</label>
              <div class="col-lg-8 align-items-lg-start pl-0">
                <input class="form-control" type="password" placeholder="確認新密碼" v-model="cfupwd" data-match="#inputPW" data-match-error="糟了！密碼並未吻合，請重新輸入~">
              </div>
            </div>
          </template>
            <div class="">
              <label class="col-lg-3 control-label">個人簡介:</label>
              <div class="col-lg-8">
                <textarea class="form-control" type="text" v-model="selfIntro" placeholder="留下你的自我介紹"></textarea>
              </div>
            </div>
            <button type="" @click="updateUser" class="btn btn-primary mt-2 w-25" :disabled="disable">修改</button>
          </div>
    </div>
    <hr>
  </div>

  </div>
</template>
<script>
  import fontawesome from '@fortawesome/fontawesome'
  import { faExclamationCircle } from '@fortawesome/fontawesome-free-solid'
  fontawesome.library.add(faExclamationCircle)
  export default {
    inject: ['dataReload'],
    data() {
      return {
        email: '',
        uname: '',
        upwd: '',
        cfupwd: '',
        selfIntro: '',
        disable: true,
        warn:'',
        showAlert: false,
      }
    },
    components: {
    },
    watch: {
      email() {
        this.verifyEmail();
        if (this.email == '') {
          this.showAlert = false;
        }
      },
      upwd() {
        this.verifyUpwd();
      },
      cfupwd() {
        this.verifyUpwd();
      }
    },
    mounted() {
      this.$store.commit("updatePermission", Number(sessionStorage.getItem("permission")));
    },
    updated() {
      if (this.uname !== '' || this.email !== '' || this.upwd !== '' || this.selfIntro !== '') {
        if (this.upwd == this.cfupwd) {
          this.disable = false;
        } else {
          this.disable = true;
        }
      } else {
        this.disable = true;
      }
    },
    methods: {
      updateUser() {
        let u = this.uname;
        let p = this.upwd;
        let cfp = this.cfupwd;
        let s = this.selfIntro;
        let url = 'updateUser'
        let obj = { uname: u, upwd: p, selfIntro: s }
        if (p == cfp) {
          this.axios.post(url, (obj)).then(res => {
            let code = res.data.code;
            if (code == 1) {
              this.uname = '';
              this.upwd = '',
              this.cfupwd = '',
              this.selfIntro = '',
              this.dataReload();
            }
          })
        }

      },
      verifyEmail() {
        let emailRule = /^\w+((-\w+)|(.\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z]+$/;
        if (this.email.search(emailRule) !== -1 ) {
          this.emailReg = true;
          this.warn = '電郵地址格式正確';
          this.showAlert = false;
        }else {
          this.warn = '電郵地址格式錯誤';
          this.showAlert = true;
          this.disabled = true;
        }
      },
      verifyUpwd() {
        if (this.upwd !== this.cfupwd) {
          this.showAlert = true;
          this.warn = '請確認密碼';
        } else {
          this.showAlert = false;
        }
      }
    },
  }
</script>
<style>

</style>
