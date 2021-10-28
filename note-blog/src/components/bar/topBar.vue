<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary rounded-top">
      <div class="container d-flex flex-nowrap" id="top-left">
        <a class="navbar-brand" href="#/" id="blog">部落格</a>
        <div class="d-flex">
          <input class="form-control me-2" type="search" placeholder="搜尋關鍵字" aria-label="Search" v-model='searchWords' v-if="$store.getters.getListActive !== true">
          <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
        </div>
        <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupported" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

      </div>
      <div class="collapse navbar-collapse row mr-3" id="navbarSupported">
        <div class=" mb-2 mb-lg-0 col-8">
          <routerLink class="" to="/write">撰寫<i class="fas fa-pencil-alt"></i></routerLink>
        </div>
        <div class="dropdown col-3" >
          <a href="javascript:void(0)" class="dropdown-toggle"  role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="auth">
            <i class="far fa-user-circle"></i>
          </a>
          <ul class="dropdown-menu ml-3" aria-labelledby="user">
            <template v-if="$store.getters.getsUid == 0">
              <li><routerLink class="dropdown-item" to="/signin" >登入</routerLink></li>
              <li><routerLink class="dropdown-item" to="/signup" >註冊</routerLink></li>
            </template>
            <template v-if="$store.getters.getPermission == 1">
              <li><routerLink class="dropdown-item" to="/category">主題管理</routerLink></li>
            </template>
            <template v-if="$store.getters.getsUid !== 0">
              <li><routerLink class="dropdown-item" to="/profile">用戶管理</routerLink></li>
              <li><button class="dropdown-item"  @click="signout">登出</button></li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
  import fontawesome from '@fortawesome/fontawesome'
  import { faCaretDown } from '@fortawesome/fontawesome-free-solid'
  import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
  import { faPlus } from '@fortawesome/fontawesome-free-solid'
  import { faUserCircle } from '@fortawesome/fontawesome-free-regular'
  fontawesome.library.add(faCaretDown);
  fontawesome.library.add(faUserCircle);
  fontawesome.library.add(faPencilAlt);
  fontawesome.library.add(faPlus);
  export default {
    data() {
      return {
        searchWords: '',
      }
    },
    component: {

    },
    mounted() {
      this.auth();
    },
    watch: {
      searchWords() {
        this.$store.commit('updateSearchWords', this.searchWords);
      },
      '$store.state.searchWords':  function () {
        this.searchWords = this.$store.getters.getSearchWords;
      },
    },
    methods: {
      auth() {
        this.axios.get('auth').then(res => {
          let code = res.data.code;
          if (code == 0) {
            this.$store.commit('updatesUid', 0);
          } else if (code == 1) {
            this.$store.commit('updatesUid', res.data.session)
          }
        })
      },
      signout() {
        let url = 'signout';
        this.axios.get(url).then(() => {
          this.$store.commit('updatesUid', 0);
          this.$store.commit('updatePermission', 0);

        })
        sessionStorage.clear();
        this.$router.push('/index');
      }
    },
  }
</script>
<style scoped>
  #top-left {
    display: flex;
    justify-content: space-between;
  }
  #top-right {
    display: flex;
    justify-content: space-between;
  }
  svg {
    margin-right: 20px;
  }

  #blog {
    width: 80px;
    border-right: .05em solid;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 6s steps(4), caret 1s steps(1);
    animation-iteration-count: infinite;
  }
  @keyframes typing { from { width: 0; } to {width: 100}}
  @keyframes caret {
    50% { border-color: transparent; }
  }
</style>
