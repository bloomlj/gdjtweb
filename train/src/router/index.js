import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    text: '首页',
    meta: { // 表示需要登录
      requireAuth: 'true'
    }
  },
  {
    path: '/device',
    name: 'Device',
    component: () => import('../views/Device.vue'),
    text: '高架图片',
    meta: { // 表示需要登录
      requireAuth: 'true'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    text: '登录'
  },
  {
    path: '/orange',
    name: 'Orange',
    component: () => import('../views/Orange.vue'),
    text: '橙色',
    meta: { // 表示需要登录
      requireAuth: 'true'
    }
  },
  {
    path: '/operate',
    name: 'Operate',
    component: () => import('../views/Operate.vue'),
    text: '任务操作',
    meta: { // 表示需要登录
      requireAuth: 'true'
    }
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue'),
    text: '评价结果',
    meta: { // 表示需要登录
      requireAuth: 'true'
    }
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('../views/Task.vue'),
    text: '任务查询',
    meta: { // 表示需要登录
      requireAuth: 'true'
    }
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import('../views/Check.vue'),
    text: '任务查询',
    meta: { // 表示需要登录
      requireAuth: 'true'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
