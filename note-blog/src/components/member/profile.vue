<template>
  <div>
    <div class="layout-content">

      <!-- Content -->
      <div class="container flex-grow-1 container-p-y">

        <!-- Header -->
        <div class="container-m-nx container-m-ny theme-bg-white mb-4" >
          <div class="media col-md-10 col-lg-8 col-xl-7 py-5 mx-auto">
            <img :src="src" alt="" class="rounded-circle img-thumbnail" width="110px" height="110px" v-if="isAlive">
            <div class="media-body ml-5" >
              <h4 class="font-weight-bold mb-4">{{ userInfo.uname }}</h4>

              <div class="text-muted mb-4">
                Lorem ipsum dolor sit amet, nibh suavitate qualisque ut nam. Ad harum primis electram duo, porro principes ei has.
                {{ userInfo.selfintro }}
              </div>

              <a href="javascript:void(0)" class="d-inline-block text-body">
                <strong>{{post}}</strong>
                <span class="text-muted">posts</span>
              </a>
              <a href="javascript:void(0)" class="d-inline-block text-body ml-3">
                <strong>{{gainLikeNum}}</strong>
                <span class="text-muted">likes</span>
              </a>
            </div>
          </div>
          <hr class="m-0">
        </div>
        <ul class="nav nav-tabs justify-content-center">
          <li class="nav-item">
            <a :class="tab1"  href="#/profile/ctrlArticle" @click="changeLeft">管理文章</a>
          </li>
          <li class="nav-item">
            <a :class="tab2" href="#/profile/editProfile" @click="changeMiddle">修改資料</a>
          </li>
          <li class="nav-item">
            <a :class="tab3" href="#/profile/profilePhoto" @click="changeRight">新增頭像</a>
          </li>
        </ul>
        <div class="container">
          <article-list v-if="isActive == 1"></article-list>
          <edit-profile v-else-if="isActive == 2"></edit-profile>
          <profile-photo v-else></profile-photo>
        </div>

        <!-- Header -->
            <!-- / Info -->

            <!-- Posts -->

            <!-- <div class="card mb-4">
              <div class="card-body">
                <p>
                  Aliquam varius euismod lectus, vel consectetur nibh tincidunt vitae. In non dignissim est. Sed eu ligula metus. Vivamus eget quam sit amet risus venenatis laoreet ut vel magna. Sed dui ligula, tincidunt in nunc eu, rhoncus iaculis nisi.
                </p>
                <p>
                  Sed et convallis odio, vel laoreet tellus. Vivamus a leo eu metus porta pulvinar. Pellentesque tristique varius rutrum.
                </p>
                <div class="ui-bordered">
                  <a href="javascript:void(0)" class="ui-rect ui-bg-cover text-white" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');">
                    <div class="d-flex justify-content-start align-items-end ui-rect-content p-2">
                      <div class="bg-dark rounded text-white small py-1 px-2">
                        <i class="ion ion-md-link"></i> &nbsp; external.com/some/page
                      </div>
                    </div>
                  </a>
                  <div class="p-4">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h5>
                    Duis ut quam nec mi bibendum finibus et id tortor. Maecenas tristique dolor enim, sed tristique sem cursus et. Etiam tempus iaculis blandit. Vivamus a justo a elit bibendum pulvinar ut non erat. Cras in purus sed leo mattis consequat viverra id arcu.
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <a href="javascript:void(0)" class="d-inline-block text-muted">
                  <small class="align-middle">
                    <strong>123</strong> Likes</small>
                </a>
                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                  <small class="align-middle">
                    <strong>12</strong> Comments</small>
                </a>
                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                  <i class="ion ion-md-share align-middle"></i>&nbsp;
                  <small class="align-middle">Repost</small>
                </a>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus commodo bibendum. Vivamus laoreet blandit odio, vel finibus quam dictum ut.
                </p>
                <a href="javascript:void(0)" class="ui-rect ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></a>
              </div>
              <div class="card-footer">
                <a href="javascript:void(0)" class="d-inline-block text-muted">
                  <small class="align-middle">
                    <strong>123</strong> Likes</small>
                </a>
                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                  <small class="align-middle">
                    <strong>12</strong> Comments</small>
                </a>
                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                  <i class="ion ion-md-share align-middle"></i>&nbsp;
                  <small class="align-middle">Repost</small>
                </a>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-body">
                <p>
                  Aliquam viverra ornare tincidunt. Vestibulum sit amet vestibulum quam. Donec eu est non velit rhoncus interdum eget vel lorem.
                </p>

                <div class="border-top-0 border-right-0 border-bottom-0 ui-bordered pl-3 mt-4 mb-2">
                  <div class="media mb-3">
                    <img src="https://bootdey.com/img/Content/avatar/avatar4.png" class="d-block ui-w-40 rounded-circle" alt="">
                    <div class="media-body ml-3">
                      Kenneth Frazier
                      <div class="text-muted small">3 days ago</div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus commodo bibendum. Vivamus laoreet blandit odio, vel finibus quam dictum ut.
                  </p>
                  <a href="javascript:void(0)" class="ui-rect ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></a>
                </div>
                <a href="javascript:void(0)" class="text-muted small">Reposted from @kfrazier/posts/123</a>
              </div>
              <div class="card-footer">
                <a href="javascript:void(0)" class="d-inline-block text-muted">
                  <small class="align-middle">
                    <strong>123</strong> Likes</small>
                </a>
                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                  <small class="align-middle">
                    <strong>12</strong> Comments</small>
                </a>
                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                  <i class="ion ion-md-share align-middle"></i>&nbsp;
                  <small class="align-middle">Repost</small>
                </a>
              </div>
            </div> -->
            <!-- / Posts -->



            <!-- Side info -->
            <!-- <div class="card mb-4">
              <div class="card-body">
                <a href="javascript:void(0)" class="btn btn-primary rounded-pill">+&nbsp; Follow</a>
                &nbsp;
                <a href="javascript:void(0)" class="btn icon-btn btn-default md-btn-flat rounded-pill">
                  <span class="ion ion-md-mail"></span>
                </a>
              </div>
              <hr class="border-light m-0">
              <div class="card-body">
                <p class="mb-2">
                  <i class="ion ion-md-desktop ui-w-30 text-center text-lighter"></i> UI/UX Designer</p>
                <p class="mb-2">
                  <i class="ion ion-ios-navigate ui-w-30 text-center text-lighter"></i> London, United Kingdom</p>
                <p class="mb-0">
                  <i class="ion ion-md-globe ui-w-30 text-center text-lighter"></i>
                  <a href="javascript:void(0)" class="text-body">website.com</a>
                </p>
              </div>
              <hr class="border-light m-0">
              <div class="card-body">
                <a href="javascript:void(0)" class="d-block text-body mb-2">
                  <i class="ion ion-logo-twitter ui-w-30 text-center text-twitter"></i> @nmaxwell
                </a>
                <a href="javascript:void(0)" class="d-block text-body mb-2">
                  <i class="ion ion-logo-facebook ui-w-30 text-center text-facebook"></i> nmaxwell
                </a>
                <a href="javascript:void(0)" class="d-block text-body mb-0">
                  <i class="ion ion-logo-instagram ui-w-30 text-center text-instagram"></i> nmaxwell
                </a>
              </div>
            </div> -->
            <!-- / Side info -->

            <!-- Skills -->
            <!-- <div class="card mb-4">
              <div class="card-header">Skills</div>
              <div class="card-body">

                <div class="mb-1">HTML - <small class="text-muted">80%</small></div>
                <div class="progress mb-3" style="height: 4px;">
                  <div class="progress-bar bg-secondary" style="width: 80%;"></div>
                </div>

                <div class="mb-1">CSS - <small class="text-muted">95%</small></div>
                <div class="progress mb-3" style="height: 4px;">
                  <div class="progress-bar bg-success" style="width: 95%;"></div>
                </div>

                <div class="mb-1">Javascript - <small class="text-muted">90%</small></div>
                <div class="progress mb-3" style="height: 4px;">
                  <div class="progress-bar bg-warning" style="width: 90%;"></div>
                </div>

                <div class="mb-1">UI/UX - <small class="text-muted">80%</small></div>
                <div class="progress" style="height: 4px;">
                  <div class="progress-bar bg-danger" style="width: 80%;"></div>
                </div>

              </div>
              <a href="javascript:void(0)" class="card-footer d-block text-center text-body small font-weight-semibold">SHOW ALL SKILLS</a>
            </div> -->
            <!-- / Skills -->

            <!-- Friends -->
            <!-- <div class="card mb-4">
              <div class="card-header with-elements">
                <span class="card-header-title">Friends &nbsp;
                  <small class="text-muted">591</small>
                </span>
                <div class="card-header-elements ml-md-auto">
                  <a href="javascript:void(0)" class="btn btn-default md-btn-flat btn-xs">Show All</a>
                </div>
              </div>
              <div class="row no-gutters row-bordered row-border-light">
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Leon Wilson</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Allie Rodriguez</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Kenneth Frazier</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Nellie Maxwell</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Mae Gibson</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Alice Hampton</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Belle Ross</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Arthur Duncan</div>
                </a>
                <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <img src="https://bootdey.com/img/Content/avatar/avatar9.png" alt="" class="d-block ui-w-40 rounded-circle mb-2">
                  <div class="text-center small">Amanda Warner</div>
                </a>
              </div>
            </div> -->
            <!-- / Friends -->

            <!-- Photos -->
            <!-- <div class="card mb-4">
              <div class="card-header with-elements">
                <span class="card-header-title">Photos</span>
                <div class="card-header-elements ml-2">
                  <small class="text-muted">54</small>
                </div>
                <div class="card-header-elements ml-md-auto">
                  <a href="javascript:void(0)" class="btn btn-default md-btn-flat btn-xs">Show More</a>
                </div>
              </div>
              <div class="row no-gutters align-items-start pt-1 pl-1">

                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
                <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
                  <span class="d-block ui-square ui-bg-cover" style="background-image: url('https://via.placeholder.com/350x180/E6E6FA/000000');"></span>
                </a>
              </div>
            </div> -->
            <!-- / Photos -->
          <!-- </div>
        </div>
      </div> -->
      <!-- / Content -->

      <!-- Layout footer -->
      <!-- <nav class="layout-footer footer bg-footer-theme">
        <div class="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
          <div class="pt-3">
            <span class="footer-text font-weight-bolder">Appwork</span> ©
          </div>
          <div>
            <a href="javascript:void(0)" class="footer-link pt-3">About Us</a>
            <a href="javascript:void(0)" class="footer-link pt-3 ml-4">Help</a>
            <a href="javascript:void(0)" class="footer-link pt-3 ml-4">Contact</a>
            <a href="javascript:void(0)" class="footer-link pt-3 ml-4">Terms &amp; Conditions</a>
          </div>
        </div>
      </nav> -->
      <!-- / Layout footer -->
      </div>
    </div>
  </div>
</template>
<script>
  import Articlelist from '../article/articleList.vue'
  import Editprofile from './editProfile.vue'
  import Profilephoto from './profilePhoto.vue'
  export default {
    data() {
      return {
        userInfo: [],
        post: 0,
        gainLikeNum: 0,
        src:"",
        isActive: 1,
        tab1: {
          'nav-link': true,
          'active': true,
        },
        tab2: {
          'nav-link': true,
          'active': false,
        },
        tab3: {
          'nav-link': true,
          'active': false,
        },
        uid: 0,
        isAlive: true,
      }
    },
    provide () {
      return {
        dataReload: this.dataReload,
      }
    },
    components: {
      "articleList": Articlelist,
      "editProfile": Editprofile,
      "profilePhoto": Profilephoto,
    },
    mounted() {
      this.loadMore();
    },
    methods: {
      loadMore() {
        let url = 'queryUser'
        this.axios.get(url).then((res) => {
          let code = res.data.code;
          console.log(res)
          if (code == -1) {
            this.$router.push('/signin')
            return;
          }else if (code == -2) {
            console.log('查詢錯誤')
          }else {
            this.userInfo = res.data[0];
            console.log(this.userInfo)
            this.$store.commit("updateUid", this.userInfo.uid)
            if (this.userInfo.avatar == null) {
              this.src = "./img/defaultUser.png"
            } else {
              this.src = `http://127.0.0.1:520/img/avatar/${this.userInfo.avatar}`
            }
            // 查詢po文數
            this.axios.get('listUser').then((res) => {
              let code = res.data.code;
              if (code == 1) {
                this.post = res.data.data.length;
                console.log('個人po文',this.post);
              }
            })
            // 查詢獲讚數
            this.axios.get('gainLikeNum').then((res) => {
              let code = res.data.code;
              if (code == 1) {
                console.log('發送查詢獲讚數請求')
                this.gainLikeNum = res.data.data;
              }
            })
          }
        })
      },
      changeLeft() {
        this.isActive = 1;
        this.tab1.active = true;
        this.tab2.active = false;
        this.tab3.active = false;
      },
      changeMiddle() {
        this.isActive = 2;
        this.tab1.active = false;
        this.tab2.active = true;
        this.tab3.active = false;
      },
      changeRight() {
        this.isActive = 3;
        this.tab1.active = false;
        this.tab2.active = false;
        this.tab3.active = true;
      },
      dataReload() {
        this.isAlive = false;
        this.loadMore();
        this.$nextTick(function() {
          this.isAlive = true;
        })
      },
      // dataReload() {
      //   this.loadMore();
      //   this.isDataAlive = false;
      //   this.$nextTick(function() {
      //     this.isDataAlive = true;
      //   })
      // }
    },
  }
</script>
<style scoped>
  body{margin-top:20px;
  background: #f5f5f5;
  }
  .theme-bg-white {
      background-color: #fff !important;
  }
  .ui-w-100 {
      width: 100px !important;
      height: auto;
  }
  .ui-w-40 {
      width: 40px !important;
      height: auto;
  }
  .row-bordered>.col::before, .row-bordered>[class^="col-"]::before, .row-bordered>[class*=" col-"]::before, .row-bordered>[class^="col "]::before, .row-bordered>[class*=" col "]::before, .row-bordered>[class$=" col"]::before, .row-bordered>[class="col"]::before {
      content: "";
      position: absolute;
      right: 0;
      bottom: -1px;
      left: 0;
      display: block;
      height: 0;
      border-top: 1px solid rgba(24,28,33,0.06);
  }
  .row-bordered>.col::after, .row-bordered>[class^="col-"]::after, .row-bordered>[class*=" col-"]::after, .row-bordered>[class^="col "]::after, .row-bordered>[class*=" col "]::after, .row-bordered>[class$=" col"]::after, .row-bordered>[class="col"]::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1px;
      display: block;
      width: 0;
      border-left: 1px solid rgba(24,28,33,0.06);
  }

  .ui-bg-cover {
      background-color: rgba(0,0,0,0);
      background-position: center center;
      background-size: cover;
  }

  .ui-square {
      padding-top: 100% !important;
  }
  .ui-square, .ui-rect, .ui-rect-30, .ui-rect-60, .ui-rect-67, .ui-rect-75 {
      position: relative !important;
      display: block !important;
      padding-top: 100% !important;
      width: 100% !important;
  }
</style>
