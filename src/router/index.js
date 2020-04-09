import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: () => import('@/views/homePage')
  },
  {
    path: '/partComponent',
    name: 'partComponent',
    component: () => import('@/views/partComponent')
  },
  {
    path: '/partComponentPreview',
    name: 'partComponentPreview',
    component: () => import('@/views/partComponentPreview')
  }
]

const router = new VueRouter({
  base: '/vue-page-produce',
  mode: 'history', // 解决hash模式下跳回登录页面数据不刷新的问题
  routes
})

export default router
