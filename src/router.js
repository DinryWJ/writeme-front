import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'

Vue.use(Router)


const routes = [{
    path: "/",
    component: login
  },
]

var router = new Router({
  routes
})
export default router;
