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
    meta: {
      title: "首页"
    },
    component: () =>
      import('./views/base/home.vue')
  }, {
    path: '/:searchkey/search',
    name: 'search',
    meta: {
      title: "搜索"
    },
    component: () =>
      import('./views/base/search.vue')
  }, {
    path: '/follow',
    name: 'follow',
    meta: {
      title: "推荐关注"
    },
    component: () =>
      import('./views/base/follow.vue')
  }, {
    path: '/message',
    name: 'message',
    meta: {
      title: "消息中心"
    },
    component: () =>
      import('./views/base/message.vue')
  }, {
    path: '/write',
    name: "write",
    meta: {
      title: "写文章"
    },
    component: () =>
      import('./views/base/write.vue')
  }, {
    path: '/:id/userPage',
    name: 'userPage',
    meta: {
      title: "个人空间"
    },
    component: () =>
      import('./views/my/userPage.vue')
  }, {
    path: '/:id/page',
    name: 'page',
    meta: {
      title: "文章"
    },
    component: () =>
      import('./views/my/page.vue')
  }, {
    path: '/myCollection',
    name: 'myCollection',
    meta: {
      title: "我的收藏"
    },
    component: () =>
      import('./views/my/myCollection.vue')
  }, {
    path: '/setting',
    name: 'setting',
    meta: {
      title: "设置"
    },
    component: () =>
      import('./views/my/setting.vue')
  }]
}, {
  path: "/login",
  name: "login",
  meta: {
    title: "登录"
  },
  component: () =>
    import('./views/login/login.vue')
}, {
  path: "/register",
  name: "register",
  meta: {
    title: "注册"
  },
  component: () =>
    import('./views/login/register.vue')
}, {
  path: "*",
  redirect: '/'
}]

var router = new Router({
  routes
})
export default router;