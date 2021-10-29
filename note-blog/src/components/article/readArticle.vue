<template>
  <div>
    <div class="container mt-5">
      <div class="row">
          <div class="">
              <!-- Post content-->
              <article>
                  <!-- Post header-->
                  <header class="mb-4">
                      <!-- Post title-->
                      <h1 class="fw-bolder mb-1">{{ title }}</h1>
                      <!-- Post meta content-->
                      <div class="text-muted fst-italic mb-2">Posted on {{ ctime }}</div>
                      <!-- Post categories-->
                      <routerLink class="badge bg-secondary text-decoration-none link-light" to="/"><span @click="keyWord">{{category}}</span></routerLink>
                  </header>
                  <!-- Preview image figure-->
                  <figure class="mb-4"><img class="img-fluid rounded" :src="src" alt="..." v-if="img !== null" width="900px" height="400px" style="box-shadow:3px 3px 12px gray;padding:3px;"></figure>
                  <!-- Post content-->
                  <section class="mb-5" v-html="content">
                      <!-- <p class="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind. Because it transforms who we are, how we live, and it gives us an understanding of our place in the universe.</p>
                      <p class="fs-5 mb-4">The universe is large and old, and the ingredients for life as we know it are everywhere, so there's no reason to think that Earth would be unique in that regard. Whether of not the life became intelligent is a different question, and we'll see if we find that.</p>
                      <p class="fs-5 mb-4">If you get asteroids about a kilometer in size, those are large enough and carry enough energy into our system to disrupt transportation, communication, the food chains, and that can be a really bad day on Earth.</p>
                      <h2 class="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                      <p class="fs-5 mb-4">For me, the most fascinating interface is Twitter. I have odd cosmic thoughts every day and I realized I could hold them to myself or share them with people who might be interested.</p>
                      <p class="fs-5 mb-4">Venus has a runaway greenhouse effect. I kind of want to know what happened there because we're twirling knobs here on Earth without knowing the consequences of it. Mars once had running water. It's bone dry today. Something bad happened there as well.</p> -->
                  </section>
              </article>

              <div id="thumbs" class="row pb-2 pl-2">
                <a href="javascript:void(0);" @click="likeArticle" class="d-flex col-sm-1">
                  <div>
                    <template v-if="thumbsActive == 1">
                  <div>
                    <i class="far fa-thumbs-up"></i>
                  </div>
                  </template>
                  <template>
                    <div v-if="thumbsActive == 2"><i class="fas fa-thumbs-up"></i></div>
                  </template>
                  </div>
                <span v-if="isNumOfLikeAlive" class="ms-2">{{numOfLike}}</span>
                </a>
                <div class="col-sm-10"></div>
              </div>


              <!-- Comments section-->
              <section class="mb-5">
                  <div class="card bg-light">
                      <div class="card-body" v-if="isRouterAlive">
                          <!-- Comment form-->
                          <div class="mb-4 d-flex flex-column"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!" v-model="comment"></textarea><button type="" class="btn btn-primary mt-1 align-self-lg-end" @click="addComment">留言</button></div>
                          <!-- Comment with nested comments-->
                          <div v-for="(item1, index1) of aInfo" :key="index1">
                            <div v-if="item1.parentcmtid == 0" class="d-flex mb-4 row" >
                              <!-- Parent comment-->
                              <div class="flex-shrink-0 col-lg-1 ms-3"><img width="50px" height="50px" class="rounded-circle" :src="item1.permission == 6 ? item1.cmtavatar : item1.cmtavatar ? avatar+item1.cmtavatar : './img/defaultUser.png'" alt="..." /></div>
                              <div class=" col-lg-10 " >
                                  <div class="fw-bold">{{item1.cmtuname}}</div>
                                  <div class="d-flex justify-content-lg-between">{{item1.cmtcontent}}<a @click="showCommentTextArea(item1.commentid)" href="javascript:void(0)" class="text-muted ">回覆</a></div>
                                  <div class="mb-4 d-flex flex-column" v-if="show==item1.commentid"><textarea class="form-control align-self-stretch" rows="3" placeholder="請友善回覆" v-model="childComment"></textarea><button type="" class="btn btn-primary mt-1 align-self-lg-end" @click="addChildComment(item1.commentid)">留言</button></div>
                                  <!-- Child comment 1-->
                                  <div v-for="(item2, index2) of aInfo" :key="index2">
                                    <div v-if="item2.parentcmtid == item1.commentid" class="d-flex mt-4" >
                                      <div class="flex-shrink-0"><img width="50px" height="50px" class="rounded-circle" :src="item2.permission == 6 ? item2.cmtavatar : item2.cmtavatar ? avatar+item2.cmtavatar : './img/defaultUser.png'" alt="..." /></div>
                                      <div class="ms-3">
                                          <div class="fw-bold">{{item2.cmtuname}}</div>
                                          {{item2.cmtcontent}}
                                      </div>
                                    </div>
                                  </div>
                                  <!-- Child comment 2
                                  <div class="d-flex mt-4">
                                      <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                      <div class="ms-3">
                                          <div class="fw-bold">Commenter Name</div>
                                          When you put money directly to a problem, it makes a good headline.
                                      </div>
                                  </div> -->
                              </div>
                            </div>
                          </div>
                          <!-- Single comment-->
                          <!-- <div class="d-flex">
                              <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                              <div class="ms-3">
                                  <div class="fw-bold">Commenter Name</div>
                                  When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                              </div>
                          </div> -->
                      </div>
                  </div>
              </section>
          </div>
          <!-- Side widgets-->

      </div>
    </div>
  </div>
</template>
<script>
  import fontawesome from '@fortawesome/fontawesome'
  import { faThumbsUp } from '@fortawesome/fontawesome-free-regular'
  // import { faThumbsUp } from '@fortawesome/fontawesome-free-solid'
  fontawesome.library.add(faThumbsUp)
  export default {
    inject: ['reload'],
    data() {
      return {
        aInfo: [],
        title: '',
        content: '',
        ctime: '',
        comment: '',
        childComment: '',
        show: 0,
        isRouterAlive: true,
        isNumOfLikeAlive: true,
        img: '',
        src: '',
        cid: '',
        category: '',
        thumbsActive: 1,
        numOfLike: 0,
      }
    },
    props: ['aid'],
    mounted() {
      this.loadMore();
    },
    watch: {
      show() {
        this.childComment = "";
      }
    },
    methods: {
      loadMore() {
        // console.log(this.$store.getters.getPermission)
        let aid = this.aid;
        let obj = { aid: aid };
        let url = 'read';
        this.axios.get(url, { params: obj } ).then((res) => {
          this.aInfo = res.data.data.sort((a, b) => {
            return b.commentid - a.commentid;
          });
          this.title = this.aInfo[0].title;
          this.content = this.aInfo[0].content;
          this.ctime = new Date(this.aInfo[0].ctime);
          // console.log(JSON.parse(JSON.stringify(this.ctime)))
          this.img = this.aInfo[0].img;
          this.cid = this.aInfo[0].cid;
          this.src = this.articleImg + this.img;
          this.$store.commit("updateTopic", this.cid);
          this.viewCount();
          let url = 'category';
          let obj = { cid: this.cid };
          this.axios.get(url, { params: obj }).then(res => {
            let code = res.data.code;
            if (code == 1) {
              this.category = res.data.data[0].cname;
            }
          })
          let url2 = 'queryLikeArticle'
          let obj2 = { aid }
          this.axios.get(url2, { params: obj2 } ).then(res => {
            let code = res.data.code;
            if (code == 1) {
              this.thumbsActive = 1;
            } else if (code == -1) {
              this.thumbsActive = 2;
            }
            this.numOfLikeArticle();
          })
        })

      },
      viewCount() {
        let aid = this.aid;
        let obj = { aid: aid };
        let url = 'viewCount';
        this.axios.get(url, { params: obj } ).then(() => {
        })
      },
      addComment() {
        let aid = this.aid;
        let content = this.comment;
        let obj = { aid: aid, content: content };
        let url = 'addComment';
        this.axios.post(url, obj).then(res => {
          let code = res.data.code;
          if (code == 0) {
            this.$router.push('/signin')
          } else if (code == 1) {
              this.comment = '';
              this.reloadComment();
          }
        })
      },
      addChildComment(commentid) {
        let obj = { aid: this.aid, childComment: this.childComment, parentcmtid: commentid };
        let url = 'addChildComment'
        this.axios.post(url, obj).then(res => {
          let code = res.data.code;
          if (code == 1) {
            this.reloadComment();
          } else if (code == 0) {
            this.$router.push('/signin');
          }
        })
        this.show = 0;
      },
      reloadComment() {
        this.isRouterAlive = false;
        this.loadMore();
        this.$nextTick(function() {
          this.isRouterAlive = true;
        })
      },
      keyWord() {
        this.$store.commit('updateTopic', this.cid);
      },
      likeArticle() {
        let aid = this.aid;
        let obj = { aid }
        let url = 'queryLikeArticle'
        this.axios.get(url, { params: obj } ).then(res => {
          let code = res.data.code;
          if (code == 1) {
            let url = 'likeArticle'
            this.axios.get(url, { params: obj } ).then(res => {
              let code = res.data.code;
              if (code == 0) {
                this.$router.push('/signin');
                return;
              } else if (code == 1) {
                this.thumbsActive = 2;
                this.numOfLikeArticleReload();
              }
            })
          } else if (code == -1) {
            this.thumbsActive = 2;
            let url = 'cancelLikeArticle';
            this.axios.get(url, { params: obj } ).then(res => {
              let code = res.data.code;
              if (code == 1) {
                this.thumbsActive = 1;
                this.numOfLikeArticleReload();
              }
            })
          }
        });
      },
      numOfLikeArticleReload() {
        this.isNumOfLikeAlive = false;
        this.numOfLikeArticle();
        this.$nextTick(function() {
          this.isNumOfLikeAlive = true;
        })
      },
      numOfLikeArticle() {
        let aid = this.aid;
        let obj = { aid };
        let url = 'numOfLikeArticle';
        this.axios.get(url, { params: obj } ).then(res => {
          let code = res.data.code;
          if (code == 1) {
            this.numOfLike = res.data.data[0]["COUNT(*)"];
          }
        })
      },
      showCommentTextArea(commentid) {
        if (this.show == 0) {
          this.show = commentid;
        } else if (this.show !== 0){
          this.show = 0;
        }
      }
    },
  }
</script>
<style scoped>
</style>
