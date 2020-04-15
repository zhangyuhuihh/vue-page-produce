/* eslint-disable no-undef */
// 生产环境使用cdn线上组件库

// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$PlantformEventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
