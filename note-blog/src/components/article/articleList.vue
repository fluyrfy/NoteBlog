<template>
  <div class="container">
    <div v-if="this.articleInfo.length == 0 ">No Article</div>
    <div v-else-if="isAlive == true">
      <select class="form-select mb-2" aria-label="Default select example" v-model="sort" style="max-width: 150px;">
        <option value="0" selected disabled>--文章排序--</option>
        <option value="1">最新</option>
        <option value="2">熱門</option>
      </select>
      <div class="card mb-3 mx-auto" style="max-width: 862px;"  v-for="(a, index) of pageOfItems" :key="index" id="card">
        <routerLink :to="'/read/'+a.aid">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img :src="a.img ? articleImg + a.img : '../img/defaultList.png'" class="card-img" alt="" width="294px" height="168px">
            </div>
            <div class="col-md-8">
              <div class="card-body" >
                <h5 class="card-title">{{ a.title }}</h5>
                <p class="card-text">{{ a.content | striptags }}</p>
                <!-- Button trigger modal -->
                <p class="card-text" id="countview"><small class="text-muted">瀏覽數：{{ a.viewcount ? a.viewcount : 0 }}</small></p>
              </div>
            </div>
          </div>
        </routerLink>
        <div v-if="$store.getters.getUid !== 0">
          <router-link :to="'/edit/'+a.aid">
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
                您將刪除 " {{deleteTitle}} " 這篇文章
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="deleteArticle" data-dismiss="modal">確定刪除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <jw-pagination  :items="filterSearch"  @changePage="onChangePage" :pageSize="pageSize" ></jw-pagination>
    </div>
  </div>
</template>
<script>
  import fontawesome from '@fortawesome/fontawesome'
  import { faEdit } from '@fortawesome/fontawesome-free-regular'
  fontawesome.library.add(faEdit)
  import JwPagination from 'jw-vue-pagination';
  export default {
    data() {
      return {
        articleInfo: [],
        data: 0,
        sort: 0,
        deleteAid: 0,
        deleteTitle: '',
        isAlive: true,
        img: '',
        searchWords: '',
        pageSize: 4,
        pageOfItems: []
      }
    },
    components: {
      JwPagination
    },
    mounted() {
     this.loadMore();
     console.log('現在uid', this.$store.getters.getUid);
     this.$store.commit('updateListActive', false);
    },
    destroyed() {
      this.$store.commit('updateSearchWords', '');
      this.searchWords = '';
      this.$store.commit('updateListActive', true);
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
      '$store.state.searchWords':  function () {
        console.log('監聽到搜尋關鍵字變動', this.$store.getters.getSearchWords)
        this.searchWords = this.$store.getters.getSearchWords;
        console.log('現在關鍵字', this.searchWords)
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
    computed: {
      filterSearch() {
        const set = new Set();
        let result1 = this.articleInfo.filter(searchResult => searchResult.title.match(this.searchWords));
        let result2 = this.articleInfo.filter(searchResult => searchResult.content.match(this.searchWords));
        let result3 = result1.concat(result2);
        const result = result3.filter(item => !set.has(item.aid) ? set.add(item.aid) : false);
        return result;
      }
    },
    methods: {
      onChangePage(pageOfItems) {
        console.log(pageOfItems)
        // this.reloadList();
        this.pageOfItems = pageOfItems;
      },
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
        const { convert } = require('html-to-text');
        // let strippedString = value.replace(/(<([^>]+)>)/gi, "");
        let strippedString = convert(value);
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
