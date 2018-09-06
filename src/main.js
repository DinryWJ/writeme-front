import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import { changeTitle } from '@/util'
import './plugins/element.js'
import './util/normalize.css'
import { addCookie, getCookie, delCookie } from './util/cookie.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.afterEach(route => {
  changeTitle(route.meta.title)
})

//全局调用cookie方法 this.$cookieStore.addCookie( 'name' , 1)
Vue.prototype.$cookieStore = {
  addCookie,
  getCookie,
  delCookie
}