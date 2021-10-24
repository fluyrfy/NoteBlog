<template>
  <div class="container">
    <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>撰寫文章</h1>
    <select class="form-select" aria-label="Default select example" v-model="category">
      <option selected>選擇主題</option>
      <option :value="c.cid" v-for="(c, index) of initCategory" :key="index">{{c.cname}}</option>
    </select>
    <div class="row">
        <!-- left column -->
        <!-- edit form column -->
        <div>
          <h3 class="col-3">標題</h3><input type="" name="" value="" class="form form-control" placeholder="" v-model="title">
          <h3>內容</h3>
        </div>
    </div>
    <hr>
    <div id="wangeditor"></div>
    <ImgCutter @cutDown="cutDown"
    :boxWidth="1000"
    :boxHeight="500"
    :cutWidth="900"
    :cutHeight="400"
    :sizeChange="false">
    </ImgCutter>
    <button class="btn btn-lg btn-primary"  @click="editArticle">修改文章</button>
  </div>
</template>
<script>
  import Editor from "wangeditor"
  import ImgCutter from 'vue-img-cutter'
  export default {
    data() {
      return {
        initCategory: [],
        title: '',
        category: '',
        initContent: '',
        content: '',
        aInfo: {},
        file: '',
        filename: '',
      }
    },
    props: ['aid'],
    components: {
      ImgCutter,
    },
    mounted() {
      this.loadMore();
    },
    methods: {
      loadMore() {
        let url = 'auth';
        this.axios.get(url).then((res) => {
          let code = res.data.code;
          if (code == 0) {
            this.$router.push('/signin');
            return;
          } else if (code == 1) {
            let url = 'category';
            this.axios.get(url).then((res) => {
              let code = res.data.code;
              if (code == 1) {
                this.initCategory = res.data.data;
                this.initCategory.shift();
                let url = 'read'
                let obj = { aid: this.aid };
                this.axios.get(url, { params: obj }).then(res => {
                  let code = res.data.code;
                  if (code == 1) {
                    console.log(res.data.data);
                    this.aInfo = res.data.data[0];
                    console.log(this.aInfo);
                    this.title = this.aInfo.title;
                    this.category = this.aInfo.cid;
                    this.initContent = this.aInfo.content;
                    console.log(this.initContent)
                    const editor = new Editor("#wangeditor")
                    // editor.customConfig.onchange = (html) => {
                    //   this.bulletconcent = html;
                    // }
                    // editor.config.height = 500
                    editor.create()
                    editor.txt.html(this.initContent);
                    editor.config.onchange = (text) => {
                      console.log(text);
                      this.content = text;
                    }
                  }
                })
              }
            })
          }
        })
      },
      cutDown(res) {
        this.file = res.file;
        this.filename = `<${res.fileName}>`;
      },
      editArticle() {
        let formData = new FormData();
        let t = this.title;
        let cg = this.category;
        let ct = this.content;
        let obj = { aid: this.aid, title: t, category: cg, content: ct };
        formData.append('data', JSON.stringify(obj));
        formData.append('file', this.file);
        this.axios({
          method: "post",
          url: "edit",
          data: formData,
          headers: {
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data"
          },
        }).then((res) => {
          let code = res.data.code;
          console.log(code);
          if (code == 0) {
            this.$router.push('/signin');
          }else if (code == 1) {
            this.$router.push('/')
          }
        })
      }
    },
  }
</script>
<style>
  .w-e-toolbar {
  z-index: 2!important;
}
  .w-e-menu {
    z-index: 2 !important;
  }
  .w-e-text-container {
    z-index: 1 !important;
  }
</style>
