<template>
  <div>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">主題{{ $store.getters.getTopic }}</span>
      </a>
      <hr>
      <router-link to="/">
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="#" class="nav-link active" aria-current="page">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
            JavaScript
          </a>
        </li>
        <li v-for="(t, index) of topic" :key="index">
          <a href="#" class="nav-link link-dark" @click="articleList(index)">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
            {{ t }}
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16" id="bookmark">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          </svg>
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
        topic: ['all', '1', '2', '3', '4', '5', '6', '7'],
      }
    },
    methods: {
      articleList(index) {
        console.log(index);
        this.$store.commit("updateTopic", index);
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
