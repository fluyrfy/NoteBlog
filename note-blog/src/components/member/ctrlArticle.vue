<template>
  <div>
    <div class="card mb-3" style="max-width: 862px;"  v-for="(a, index) of articleInfo" :key="index" id="card">
      <routerLink :to="'/read/'+a.aid">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="" class="card-img" alt="">
          </div>
          <div class="col-md-8">
            <div class="card-body" >
              <h5 class="card-title">{{ a.title }}</h5><p>{{$store.getters.getTopic}}</p>
              <p class="card-text" v-html="a.content"></p>
              <p class="card-text" id="countview"><small class="text-muted">瀏覽數：123456</small></p>
            </div>
          </div>
        </div>
      </routerLink>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        articleInfo: [],
      }
    },
    mounted() {

    },
    methods: {
      loadMore(topic = 0) {
        // let uid = 0;
        let obj = { topic: topic }
        let url = 'list';
        this.axios.get(url, { params: obj }).then((res) => {
          console.log(res);
          this.articleInfo = res.data;
        });
      }
    },
  }
</script>
<style scoped>

</style>
