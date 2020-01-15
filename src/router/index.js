import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'partComponent',
    component: () => import('@/views/partComponent')
  }
]

const router = new VueRouter({
  routes
})

export default router
