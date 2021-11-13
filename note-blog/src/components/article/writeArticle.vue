<template>
  <div class="">
    <div class="row px-3 mt-2">
      <select
        class="form form-select col py-0"
        aria-label="Default select example"
        v-model="category"
        style="height: 38px"
      >
        <option value="-1" selected disabled>--選擇主題--</option>
        <option
          v-for="(c, index) of initCategory"
          :key="index"
          :value="index + 1"
        >
          {{ c.cname }}
        </option>
      </select>
      <div
        class="col d-flex flex-nowrap justify-content-around align-items-center"
      >
        <ImgCutter
          @cutDown="cutDown"
          :boxWidth="1000"
          :boxHeight="500"
          :cutWidth="900"
          :cutHeight="400"
          :sizeChange="false"
          class="col-3"
        >
        </ImgCutter>
        <p class="py-1 m-0">{{ filename }}</p>
      </div>
    </div>
    <!-- left column -->
    <!-- edit form column -->
    <div class="mt-2">
      <h3 class="">標題</h3>
      <input
        type=""
        name=""
        value=""
        class="form form-control"
        placeholder="想個好標題吧！"
        v-model="title"
      />
    </div>
    <div class="d-flex flex-wrap mt-2">
      <h4>內容</h4>
      <div id="wangeditor" class=""></div>
    </div>

    <button
      class="btn btn-lg btn-primary mt-2"
      @click="postArticle"
      :disabled="submitDisable"
    >
      發布文章
    </button>
  </div>
</template>
<script>
import Editor from "wangeditor";
import ImgCutter from "vue-img-cutter";
export default {
  data() {
    return {
      initCategory: [],
      title: "",
      category: -1,
      content: "",
      filename: "",
      submitDisable: true,
    };
  },
  components: {
    ImgCutter,
  },
  mounted() {
    this.loadMore();
  },
  watch: {},
  updated() {
    if (this.category !== -1 && this.content !== null && this.title !== "") {
      this.submitDisable = false;
    } else {
      this.submitDisable = true;
    }
  },
  methods: {
    loadMore() {
      let url = "auth";
      this.axios.get(url).then((res) => {
        let code = res.data.code;
        if (code == 0) {
          this.$router.push("/signin");
          return;
        } else if (code == 1) {
          let url = "category";
          this.axios.get(url).then((res) => {
            let code = res.data.code;
            if (code == 1) {
              this.initCategory = res.data.data;
              this.initCategory.shift();
              const editor = new Editor("#wangeditor");
              // editor.customConfig.onchange = (html) => {
              //   this.bulletconcent = html;
              // }
              // editor.config.height = 500
              editor.create();
              editor.config.onchange = (text) => {
                // console.log(text);
                this.content = text;
              };
            }
          });
        }
      });
    },
    cutDown(res) {
      this.file = res.file;
      this.filename = `<${res.fileName}>`;
    },
    postArticle() {
      let formData = new FormData();
      let t = this.title;
      let cg = this.category;
      let ct = this.content;
      let obj = { title: t, category: cg, content: ct };
      formData.append("data", JSON.stringify(obj));
      formData.append("file", this.file);
      this.axios({
        method: "post",
        url: "write",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        let code = res.data.code;
        if (code == 0) {
          this.$router.push("/signin");
        } else if (code == 1) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<style></style>
