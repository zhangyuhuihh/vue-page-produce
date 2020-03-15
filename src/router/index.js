import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
  routes
})

export default router
