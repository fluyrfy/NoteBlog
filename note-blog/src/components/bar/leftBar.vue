<template>
  <div>
    <div class="d-flex flex-column flex-shrink-0 p-3 mr-0 bg-light" >
      <a href="#/" class=" mb-2 link-dark text-decoration-none text-center fs-4 fw-bolder">
        <!-- <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> -->
        主題
      </a>
      <hr class="mt-0">
      <router-link to="/">
      <ul class="nav nav-pills flex-lg-column flex-md-row mb-auto">
        <li v-for="(c, index) of category" :key="index" class="" >
          <a href="#" :class="{'nav-link': true, 'link-dark': true, 'active': index == $store.getters.getTopic }" @click="articleList(index)">
            <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> -->
            {{ c.cname }}
          </a>
        </li>
      </ul>
    </router-link>
      <hr>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        category: [],
        selected: '',
      }
    },
    mounted() {
      this.loadMore();
    },
    methods: {
      loadMore() {
        this.axios.get('category').then(res => {
          let code = res.data.code;
          if (code == 1) {
            this.category = res.data.data;
          }
        })
      },
      articleList(index) {
        this.$store.commit("updateTopic", index);
        this.selected = this.$store.getters.getTopic;
      }
    }
  }
</script>
<style scoped>
  li {
    display: flex;
    justify-content: space-between;
  }
  #bookmark {
    margin-top: 10px;
    margin-right: 20px;
  }
</style>
