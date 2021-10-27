import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/pages/index.vue'

// 文章類
import Write from './components/article/writeArticle.vue'
import Edit from './components/article/editArticle.vue'
import Read from './components/article/readArticle.vue'
import List from './components/article/articleList.vue'
// import Read from './components/article/readArticle.vue'
// import iread from './components/pages/iread.vue'
// import List from './components/article/articleList.vue'

// 用戶類
import Signin from './components/member/signin.vue'
import Signup from './components/member/signup.vue'
import Profile from './components/member/profile.vue'
import Editprofile from './components/member/editProfile.vue'
import Profilephoto from './components/member/profilePhoto.vue'
// import Ctrlarticle from './components/member/ctrlArticle.vue'

// 管理類
import Category from './components/admin/category.vue'

Vue.use(Router)

// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default new Router({
    routes: [
      { path:'/',component:Index },
      { path:'/index',component:Index, redirect: '/' },
      { path: '/write', component: Write },
      { path: '/edit/:aid', component: Edit, props: true },
      { path: '/read/:aid', component: Read, props: true },
      // { path: '/list', component: List },
      { path: '/signin', component: Signin },
      { path: '/signup', component: Signup },
      { path: '/profile', component: Profile, redirect: '/profile/ctrlArticle', children: [
        {
          path: 'ctrlArticle', component: List
        },
        {
          path: 'editProfile', component: Editprofile
        },
        {
          path: 'profilePhoto', component: Profilephoto
        },
      ] },
      { path: '/category', component: Category },
      // { path: '/editprofile', component: Editprofile },
    ]
})
