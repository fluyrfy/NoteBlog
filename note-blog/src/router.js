import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/pages/index.vue'
import Write from './components/article/writeArticle.vue'
import Read from './components/article/readArticle.vue'
// import Read from './components/article/readArticle.vue'
// import iread from './components/pages/iread.vue'
// import List from './components/article/articleList.vue'
import Signin from './components/member/signin.vue'
import Signup from './components/member/signup.vue'
import Profile from './components/member/profile.vue'
import Editprofile from './components/member/editProfile.vue'
import Ctrlarticle from './components/member/ctrlArticle.vue'

Vue.use(Router)

export default new Router({
    routes: [
      {path:'/',component:Index},
      { path: '/write', component: Write },
      { path: '/read/:aid', component: Read, props: true },
      // { path: '/list', component: List },
      { path: '/signin', component: Signin },
      { path: '/signup', component: Signup },
      { path: '/profile', component: Profile, redirect: '/profile/ctrlArticle', children: [
        {
          path: 'ctrlArticle', component: Ctrlarticle
        },
        {
          path: 'editProfile', component: Editprofile
        },
      ] },
      // { path: '/editprofile', component: Editprofile },
    ]
})
