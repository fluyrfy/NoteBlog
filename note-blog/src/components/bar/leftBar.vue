<template>
  <div>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 250px;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">主題</span>
      </a>
      <hr>
      <router-link to="/">
      <ul class="nav nav-pills flex-column mb-auto">
        <li v-for="(c, index) of category" :key="index">
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
        console.log(index);
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
