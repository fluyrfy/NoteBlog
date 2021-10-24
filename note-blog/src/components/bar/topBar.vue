<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid" id="top-left">
        <a class="navbar-brand" href="#">部落格</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">
              <routerLink class="nav-link active" aria-current="page" to="/">熱門</routerLink>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link" href="#">最新</a>
            </li> -->
            <li class="nav-item">
              <routerLink class="nav-link active" to="/write">撰寫<i class="fas fa-pencil-alt"></i></routerLink>
            </li>
            <!-- <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li> -->
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="搜尋關鍵字" aria-label="Search" v-model='searchWords' :disabled="$store.getters.getListActive">
            <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
          </form>
        </div>
      </div>
      <div id="top-right">
        <div class="dropdown" >
          <a href="javascript:void(0)" class="dropdown-toggle"  role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="auth">
            <i class="far fa-user-circle"></i>
          </a>
            <ul class="dropdown-menu" aria-labelledby="user">
              <li v-if="$store.getters.getsUid == 0"><routerLink class="dropdown-item" to="/signin" >登入</routerLink></li>
              <template v-else>
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
            console.log('身分驗證', res.data.session)
            this.$store.commit('updatesUid', res.data.session)
          }
        })
      },
      signout() {
        let url = 'signout';
        console.log('做刪除動作')
        this.axios.get(url).then(() => {
        })
        this.$store.commit('updatesUid', 0);
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
</style>
