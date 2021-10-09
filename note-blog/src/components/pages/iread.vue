<template>
  <div class="container" id='d1'>
    <top-bar></top-bar>
    <div id='d2'>
      <left-bar></left-bar>
      <div>
        <read-article></read-article>
      </div>
    </div>

  </div>
</template>
<script>
  import topBar from '../bar/topBar.vue'
  import leftBar from '../bar/leftBar.vue'
  import readArticle from '../article/readArticle.vue'
  export default {
    data() {
      return {

      }
    },
    components: {
      'topBar': topBar,
      'leftBar': leftBar,
      'readArticle': readArticle,
    }
  }
</script>
<style scoped>
  #d2 {
    display: flex;
    justify-content: space-between;
  }
</style>
