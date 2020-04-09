// 开发环境直接引入组件库

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import componentsStore from '../components/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(componentsStore)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
