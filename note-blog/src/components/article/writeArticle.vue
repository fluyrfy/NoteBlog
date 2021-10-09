<template>
  <div class="container">
    <div>
      <top-bar></top-bar>
    </div>
    <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>撰寫文章</h1>
    <div class="row">
        <!-- left column -->
        <!-- edit form column -->
        <div>
          <h3 class="col-3">標題</h3><input type="" name="" value="" class="form form-control" placeholder="">
          <h3>內容</h3>
        </div>
    </div>
    <hr>

    <div id="wangeditor"></div>
  </div>
</template>
<script>
  import E from "wangeditor"
  import topBar from '../bar/topBar.vue'
  export default {
    data() {
      return {
        text: '1234',
      }
    },
    components: {
      "topBar": topBar,
    },
    mounted() {
      const editor = new E("#wangeditor")
      // editor.customConfig.onchange = (html) => {
      //   this.bulletconcent = html;
      // }
      // editor.config.height = 500
      editor.config.onchange = function (html) {
        console.log(html);
    }
      editor.create()
      // $text1.val(editor.txt.html())
    },

    }

</script>
<style>

</style>
