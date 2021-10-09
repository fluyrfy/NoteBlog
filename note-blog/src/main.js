import Vue from 'vue'
import App from './App.vue'
import router from './router'//引入router
import { VueReCaptcha } from 'vue-recaptcha-v3'

//引入axios套件
import axios from 'axios'
//配置請求時保存session信息
axios.defaults.withCredentials=true;
//配置請求基礎路徑
axios.defaults.baseURL="http://127.0.0.1:8081/" //測試時地址欄不可輸入http://localhost:8080
// 在vue中註冊axios
// Vue.use(aios) axios不支持這種寫法
//註冊到原型
Vue.prototype.axios=axios

Vue.use(VueReCaptcha, {
  siteKey: '6Le57aQcAAAAAM8MNRlnB-rK3UdgNPyCgHINBRzz',
  loaderOptions: {
    useRecaptchaNet: true
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
