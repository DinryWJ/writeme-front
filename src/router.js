import Vue from 'vue'
import Router from 'vue-router'
import layout from "./views/layout.vue";
Vue.use(Router)


const routes = [{
  path: "/",
  component: layout,
  children: [{
    path: '/',
    name: "home",
    component: () =>
      import ('./views/base/home.vue')
  }, {
    path: '/:searchkey/search',
    name: 'search',
    component: () =>
      import ('./views/base/search.vue')
  }, {
    path: '/follow',
    name: 'follow',
    component: () =>
      import ('./views/base/follow.vue')
  }, {
    path: '/message',
    name: 'message',
    component: () =>
      import ('./views/base/message.vue')
  }, {
    path: '/write',
    name: "write",
    component: () =>
      import ('./views/base/write.vue')
  }, {
    path: '/myHomePage',
    name: 'myHomePage',
    component: () =>
      import ('./views/my/myHomePage.vue')
  }, {
    path: '/myCollection',
    name: 'myCollection',
    component: () =>
      import ('./views/my/myCollection.vue')
  }, {
    path: '/setting',
    name: 'setting',
    component: () =>
      import ('./views/my/setting.vue')
  }]
}, {
  path: "/login",
  name: "login",
  component: () =>
    import ('./views/login/login.vue')
}, {
  path: "/register",
  name: "register",
  component: () =>
    import ('./views/login/register.vue')
}, {
  path: "*",
  redirect:'/'
}]

var router = new Router({
  routes
})
export default router;