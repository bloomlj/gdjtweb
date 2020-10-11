import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置css
import './assets/css/reset.css'
// element-ui
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// 视频vue-video-player
import VideoPlayer from 'vue-video-player'
// axios
import axios from '@/api/api.js'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

// 使用
Vue.use(ElementUI)
Vue.use(VideoPlayer)
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 路由的钩子函数 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 检测是否需要拦截
    if (localStorage.token) { // 已经登陆
      next() // 正常跳转
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }

  /* 如果已登陆不允许直接跳转到 登录页面 */
  const fullPath = to.fullPath.substring(0, 6)
  if (fullPath === '/login') {
    if (localStorage.token) {
      // 已经登录的，不能调到首页而是跳到from即将离开的页面
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
