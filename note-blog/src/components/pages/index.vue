<template>
  <div class="container" id='d1'>
    <top-bar></top-bar>
    <div id='d2'>
      <left-bar></left-bar>
      <div>
        <article-List></article-List>
        <article-List></article-List>
        <article-List></article-List>
        <article-List></article-List>
        <article-List></article-List>
      </div>
    </div>

    <!-- <h1>首頁</h1> -->
  </div>
</template>
<script>
  import topBar from '../bar/topBar.vue'
  import leftBar from '../bar/leftBar.vue'
  import articleList from '../article/articleList.vue'
  export default {
    data() {
      return {

      }
    },
    components: {
      'topBar': topBar,
      'leftBar': leftBar,
      'articleList': articleList,
    }
  }
</script>
<style scoped>
  #d2 {
    display: flex;
    justify-content: space-between;
  }
</style>
