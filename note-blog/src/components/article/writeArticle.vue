<template>
  <div class="container">
    <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>撰寫文章</h1>
    <select class="form-select" aria-label="Default select example" v-model="category">
      <option selected>選擇主題</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
    </select>
    <div class="row">
        <!-- left column -->
        <!-- edit form column -->
        <div>
          <h3 class="col-3">標題</h3><input type="" name="" value="" class="form form-control" placeholder="" v-model="topic">
          <h3>內容</h3>
        </div>
    </div>
    <hr>
    <div id="wangeditor"></div>
    <button class="btn btn-lg btn-primary"  @click="postArticle">發布文章</button>
  </div>
</template>
<script>
  import Editor from "wangeditor"
  export default {
    data() {
      return {
        topic: '',
        category: '',
        content: '',
      }
    },
    components: {
    },
    mounted() {
      // let url = 'write'
      // this.$axios.get(url).then((res) => {
      //   let code = res.data.code;
      //   if (code == -1) {
      //     this.$router.push('/signin');
      //     return;
      //   }
      // })
      const editor = new Editor("#wangeditor")
      // editor.customConfig.onchange = (html) => {
      //   this.bulletconcent = html;
      // }
      // editor.config.height = 500
      editor.create()
      editor.config.onchange = (text) => {
        console.log(text);
        this.content = text;
      }
      // $text1.val(editor.txt.html())
    },
    methods: {
      postArticle() {
        let t = this.topic;
        let cg = this.category;
        let ct = this.content;
        let obj = { topic: t, category: cg, content: ct };
        let url = 'write';
        this.axios.get(url, { params: obj } ).then((res) => {
          let code = res.data.code;
          console.log(code);
          this.$router.push('/')
        })
      }
    },
  }

</script>
<style>

</style>
