<template>
  <div>

    <div class="container bootstrap snippets bootdey">
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Edit Profile</h1>
        <hr>
    <div class="row">
        <!-- left column -->
        <div class="col-md-3">
          <div class="text-center">
            <img src="//placehold.it/100" class="avatar img-circle" alt="avatar">
            <h6>Upload a different photo...</h6>

            <input type="file" class="form-control">
          </div>
        </div>

        <!-- edit form column -->
        <div class="col-md-9 personal-info">
          <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a>
            <i class="fa fa-coffee"></i>
            This is an <strong>.alert</strong>. Use this to show important messages to the user.
          </div>
          <h3>Personal info</h3>

          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-lg-3 control-label">暱稱:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" placeholder="新暱稱">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">密碼:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" placeholder="新密碼">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">確認密碼:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" placeholder="確認新密碼">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">個人簡介:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text">
              </div>
            </div>

          </form>
        </div>
    </div>
    <hr>
  </div>

  </div>
</template>
<script>
  export default {
    components: {
    }
  }
</script>
<style>

</style>
