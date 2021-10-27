<template>
  <div class="container align-items-center">
    <div class="container">
      <div class="text-center">
        <img :src="dataURL" class="avatar img-circle mt-5 mb-3 rounded-circle" alt="avatar">
        <p>{{filename}}</p>
        <img-cutter @cutDown="cutDown" :cutWidth="100" :cutHeight="100" :sizeChange="false" class="mt-4"></img-cutter>
      </div>
      <div class="text-center mt-3">
        <button type="" class="btn btn-outline-success" :disabled="disabled" @click="avatar">確定送出</button>
      </div>
    </div>
  </div>
</template>
<script>
  import ImgCutter from 'vue-img-cutter'
  export default {
    inject: ['dataReload'],
    data() {
      return {
        disabled: true,
        file: '',
        filename: '',
        dataURL: '../img/defaultEditAvatar.png',
      }
    },
    components: {
      ImgCutter,
    },
    methods: {
      cutDown(res) {
        this.disabled = false;
        this.file = res.file;
        this.filename = `<${res.fileName}>`;
        this.dataURL = res.dataURL;
      },
      avatar() {
        let formData = new FormData();
        formData.append('file', this.file)
        this.axios({
          method: "post",
          url: "avatar",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          console.log(res)
          let code = res.data.code;
          if (code == 1) {
            this.dataURL = '//placehold.it/100';
            this.filename = '';
            this.dataReload();
          }
        })
      }
    }
  }
</script>
<style scoped>

</style>
