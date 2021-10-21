<template>
  <div>
    <div v-if="this.articleInfo.length == 0 ">No Article</div>
    <div v-else-if="isAlive == true">
      <select class="form-select" aria-label="Default select example" v-model="sort">
        <option value="1" selected>最新</option>
        <option value="2">熱門</option>
      </select>
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
                <!-- Button trigger modal -->
                <p class="card-text" id="countview"><small class="text-muted">瀏覽數：{{ a.viewcount ? a.viewcount : 0 }}</small></p>
              </div>
            </div>
          </div>
        </routerLink>
        <div v-if="$store.getters.getUid !== 0">
          <router-link to="/">
            <i class="far fa-edit"></i>
          </router-link>
          <a type="" @click="deleteAid=a.aid;deleteTitle=a.title" href="javascript:;" data-toggle="modal" data-target="#exampleModal"><i class="far fa-trash-alt"></i></a>
        </div>
          <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">注意！</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                您想刪除 " {{deleteTitle}} " 這篇文章嗎？
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="deleteArticle" data-dismiss="modal">確定刪除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import fontawesome from '@fortawesome/fontawesome'
  import { faEdit } from '@fortawesome/fontawesome-free-regular'
  fontawesome.library.add(faEdit)
  export default {
    data() {
      return {
        articleInfo: [],
        data: 0,
        sort: 1,
        deleteAid: 0,
        deleteTitle: '',
        isAlive: true,
      }
    },
    mounted() {
     this.loadMore();
     console.log('現在uid', this.$store.getters.getUid);
    },
    watch: {
      '$store.state.topic':  function () {
        console.log('監聽到變動', this.$store.getters.getTopic)
        let topic = this.$store.getters.getTopic;
        this.loadMore(topic);
      },
      '$store.state.uid':  function () {
        console.log('監聽到uid變動', this.$store.getters.getUid)
        this.loadMore();
      },
      sort (val) {
        console.log('現在排序方式', val)
        if (val == 2) {
          this.articleInfo.sort((a, b) => {
            return b.viewcount - a.viewcount;
          })
        } else if (val == 1) {
            this.articleInfo = this.articleInfo.sort((a, b) => {
              return b.aid - a.aid;
            })
        }
        console.log(this.articleInfo)
      }
    },
    methods: {
      loadMore(topic) {
        if(this.$store.getters.getUid == 0){
          console.log('現在topic', this.$store.getters.getTopic)
          if (topic == null) {
            topic = this.$store.getters.getTopic;
          }
          let obj = { topic: topic }
          let url = 'list';
          this.axios.get(url, { params: obj }).then((res) => {
            let code = res.data.code;
            if (code == -1) {
              this.data == code;
              this.articleInfo = [];
            }else{
              this.articleInfo = res.data.data.sort(function (a, b) {
                return b.aid -  a.aid;
              });
              console.log(this.articleInfo)
            }
          });
        }else {
          this.loadMoreUser();
        }
      },
      loadMoreUser() {
        let uid = this.$store.getters.getUid;
        let obj = { uid: uid };
        let url = 'listUser';
        this.axios.get(url, { params: obj }).then((res) => {
          let code = res.data.code;
          if (code == -1) {
            this.data == code;
            this.articleInfo = [];
          }else{
            this.articleInfo = res.data.data.sort(function (a, b) {
              return b.aid - a.aid;
            });
            console.log(this.articleInfo)
          }
        })
      },
      deleteArticle() {
        let aid = this.deleteAid;
        console.log(aid);
        let obj = { aid };
        let url = 'delete';
        this.axios.get(url, { params: obj } ).then(res => {
          console.log(res);
          let code = res.data.code;
          if (code == 1) {
            this.loadMore();
            this.reloadList();
          }
        })
      },
      reloadList() {
        this.isAlive = false;
        this.$nextTick(function() {
          this.isAlive = true;
        })
      }
    },
    filters: {
      striptags(value) {
        let strippedString = value.replace(/(<([^>]+)>)/gi, "");
        return strippedString;
      }
    }
  }
</script>
<style scoped>
  #countview {
    text-align: right;
  }

</style>
