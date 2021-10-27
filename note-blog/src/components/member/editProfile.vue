<template>
  <div>

    <div class="container bootstrap snippets bootdey mt-2">
    <div class=" ">

        <!-- edit form column -->
        <div class=" personal-info">
          <!-- <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a>
            <i class="fa fa-coffee"></i>
            This is an <strong>.alert</strong>. Use this to show important messages to the user.
          </div> -->
          <!-- <h3>Personal info</h3> -->

          <div class="row justify-content-lg-around" role="form">
            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2" >電子郵件:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" placeholder="新電郵" v-model="uname">
              </div>
            </div>
            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2" >暱稱:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" placeholder="新暱稱" v-model="uname">
              </div>
            </div>
            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2">新密碼:</label>
              <div class="col-lg-8">
                <input class="form-control" type="password" placeholder="新密碼" v-model="upwd">
              </div>
            </div>
            <div class="col-6 row">
              <label class="col-lg-4 control-label py-2 pr-0">確認新密碼:</label>
              <div class="col-lg-8 align-items-lg-start pl-0">
                <input class="form-control" type="password" placeholder="確認新密碼" v-model="cfupwd">
              </div>
            </div>
            <div class="">
              <label class="col-lg-3 control-label">個人簡介:</label>
              <div class="col-lg-8">
                <textarea class="form-control" type="text" v-model="selfIntro" placeholder="留下你的自我介紹"></textarea>
              </div>
            </div>
            <button type="" @click="updateUser" class="btn btn-primary mt-2 w-25">修改</button>
          </div>
        </div>
    </div>
    <hr>
  </div>

  </div>
</template>
<script>
  export default {
    inject: ['dataReload'],
    data() {
      return {
        uname: '',
        upwd: '',
        cfupwd: '',
        selfIntro: '',
      }
    },
    components: {
    },
    methods: {
      updateUser() {
        let u = this.uname;
        let p = this.upwd;
        let cfp = this.cfupwd;
        let s = this.selfIntro;
        let url = 'updateUser'
        let obj = { uname: u, upwd: p, selfIntro: s }
        console.log(obj)
        if (p == cfp) {
          this.axios.post(url, (obj)).then(res => {
            console.log(res)
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

      }
    },
  }
</script>
<style>

</style>
