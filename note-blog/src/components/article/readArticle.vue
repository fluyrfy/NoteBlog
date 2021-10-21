<template>
  <div>
    <div class="container mt-5">
      <div class="row">
          <div class="col-lg-8">
              <!-- Post content-->
              <article>
                  <!-- Post header-->
                  <header class="mb-4">
                      <!-- Post title-->
                      <h1 class="fw-bolder mb-1">{{ title }}</h1>
                      <!-- Post meta content-->
                      <div class="text-muted fst-italic mb-2">Posted on {{ ctime }}</div>
                      <!-- Post categories-->
                      <a class="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                      <a class="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                  </header>
                  <!-- Preview image figure-->
                  <figure class="mb-4"><img class="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
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
              <!-- Comments section-->
              <section class="mb-5">
                  <div class="card bg-light">
                      <div class="card-body" v-if="isRouterAlive">
                          <!-- Comment form-->
                          <div class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!" v-model="comment"></textarea><button type="" class="btn btn-primary" @click="addComment">留言</button></div>
                          <!-- Comment with nested comments-->
                          <div v-for="(item1, index1) of aInfo" :key="index1">
                            <div v-if="item1.parentcmtid == 0" class="d-flex mb-4" >
                              <!-- Parent comment-->
                              <div class="flex-shrink-0"><img width="50px" height="50px" class="rounded-circle" :src="axios.defaults.baseURL+'/img/avatar/'+item1.cmtavatar" alt="..." /></div>
                              <div class="ms-3" >
                                  <div class="fw-bold">{{item1.cmtuname}}</div>
                                  {{item1.cmtcontent}}
                                  <a @click="show=item1.commentid" href="javascript:void(0)" class="text-muted">回覆</a>
                                  <div class="mb-4" v-if="show==item1.commentid"><textarea class="form-control" rows="3" placeholder="請友善回覆" v-model="childComment"></textarea><button type="" class="btn btn-primary" @click="addChildComment(item1.commentid)">留言</button></div>
                                  <!-- Child comment 1-->
                                  <div v-for="(item2, index2) of aInfo" :key="index2">
                                    <div v-if="item2.parentcmtid == item1.commentid" class="d-flex mt-4" >
                                      <div class="flex-shrink-0"><img width="50px" height="50px" class="rounded-circle" :src="axios.defaults.baseURL+'/img/avatar/'+item2.cmtavatar" alt="..." /></div>
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
        isRouterAlive: true
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
        let aid = this.aid;
        let obj = { aid: aid };
        let url = 'read';
        this.axios.get(url, { params: obj } ).then((res) => {
          console.log(res);
          this.aInfo = res.data.sort((a, b) => {
            return b.commentid - a.commentid;
          });
          this.title = this.aInfo[0].title;
          this.content = this.aInfo[0].content;
          this.ctime = this.aInfo[0].ctime;
        })
        this.$store.commit("updateTopic", 0);
        console.log('點進文章後監聽到變動', this.$store.getters.getTopic);
        this.viewCount();
      },
      viewCount() {
        let aid = this.aid;
        let obj = { aid: aid };
        let url = 'viewCount';
        this.axios.get(url, { params: obj } ).then((res) => {
          console.log(res)
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
          console.log(res);
          let code = res.data.code;
          if (code == 1) {
            this.reloadComment();
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
      }
    },
  }
</script>
<style scoped>
</style>
