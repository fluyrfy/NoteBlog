<template>
  <div class="container" id='d1'>
      <div>
        <article-List></article-List>
      </div>
    <!-- <h1>首頁</h1> -->
  </div>
</template>
<script>
  import articleList from '../article/articleList.vue'
  export default {
    data() {
      return {

      }
    },
    components: {
      'articleList': articleList,
    },
    mounted() {
      this.$store.commit("updateUid", 0)
    },
    beforeDestroy() {
      this.$store.commit("updateTopic", 0);
    }
  }
</script>
<style scoped>
  #d2 {
    display: flex;
    justify-content: space-between;
  }
</style>
