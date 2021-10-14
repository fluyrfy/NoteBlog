<template>
  <div>
    <div v-if="this.articleInfo.length == 0">No Article</div>
    <div v-else>
      <div class="card mb-3" style="max-width: 862px;"  v-for="(a, index) of articleInfo" :key="index" id="card">
        <routerLink :to="'/read/'+a.aid">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="" class="card-img" alt="">
            </div>
            <div class="col-md-8">
              <div class="card-body" >
                <h5 class="card-title">{{ a.title }}</h5><p>{{$store.getters.getTopic}}</p>
                <p class="card-text">{{ a.content | striptags }}</p>
                <p class="card-text" id="countview"><small class="text-muted">瀏覽數：{{ a.viewcount ? a.viewcount : 0 }}</small></p>
              </div>
            </div>
          </div>
        </routerLink>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        articleInfo: [],
        data: 0,
      }
    },
    mounted() {
      this.loadMore();
    },
    watch: {
      '$store.state.topic':  function () {
        console.log('監聽到變動', this.$store.getters.getTopic)
        let topic = this.$store.getters.getTopic;
        this.loadMore(topic);
      }
    },
    methods: {
      loadMore(topic = 0) {
        let obj = { topic: topic }
        let url = 'list';
        this.axios.get(url, { params: obj }).then((res) => {
          let code = res.data.code;
          console.log(code)
          if (code == -1) {
            this.data == code;
            this.articleInfo = [];
          }else{
            this.articleInfo = res.data.data;
            console.log(this.articleInfo)
          }
        });
      },
    },
    filters: {
      striptags(value) {
        let strippedString = value.replace(/(<([^>]+)>)/gi, "");
        return strippedString;
      }
    }
  }
</script>
<style>
  #countview {
    text-align: right;
  }
</style>
