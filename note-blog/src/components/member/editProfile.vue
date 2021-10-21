<template>
  <div>

    <div class="container bootstrap snippets bootdey">
    <div class="row container">

        <!-- edit form column -->
        <div class="col-md-9 personal-info">
          <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a>
            <i class="fa fa-coffee"></i>
            This is an <strong>.alert</strong>. Use this to show important messages to the user.
          </div>
          <h3>Personal info</h3>

          <div class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-lg-3 control-label" >暱稱:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" placeholder="新暱稱" v-model="uname">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">新密碼:</label>
              <div class="col-lg-8">
                <input class="form-control" type="password" placeholder="新密碼" v-model="upwd">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">確認新密碼:</label>
              <div class="col-lg-8">
                <input class="form-control" type="password" placeholder="確認新密碼" v-model="cfupwd">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">個人簡介:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" v-model="selfIntro" placeholder="留下你的自我介紹">
              </div>
            </div>
            <button type="" @click="updateUser" class="btn btn-primary">修改</button>
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
