import Vue from 'vue'
import Router from 'vue-router'
import layout from "./views/layout.vue";
import follow from "./views/base/follow.vue";
import messageFollow from "./views/base/message.vue";
import search from "./views/base/search.vue"
import manageLayout from "./views/admin/layout.vue"
Vue.use(Router)


const routerMap = [{
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
    meta: {
      title: "搜索"
    },
    component: search,
    children: [{
      path: '/:searchkey/search/article',
      name: "searcharticle",
      meta: {
        title: "搜索文章"
      },
      component: () =>
        import('./views/base/search/search.vue')
    },{
      path: '/:searchkey/search/user',
      name: "searchuser",
      meta: {
        title: "搜索用户"
      },
      component: () =>
        import('./views/base/search/suser.vue')
    }]
  }, {
    path: '/follow',
    meta: {
      title: "推荐关注"
    },
    component: follow,
    children: [{
    //   path: '/follow',
    //   name: "follow",
    //   meta: {
    //     title: "推荐文章"
    //   },
    //   component: () =>
    //     import('./views/base/follow/farticle.vue')
    // }, {
      path: '/follow',
      name: "follow",
      meta: {
        title: "推荐用户"
      },
      component: () =>
        import('./views/base/follow/fuser.vue')
    }]
  }, {
    path: '/message',
    meta: {
      title: "消息中心"
    },
    component: messageFollow,
    children: [{
      path: '/message',
      name: 'message',
      meta: {
        title: "消息中心"
      },
      component: () =>
        import('./views/base/messageFollow/msys.vue')
    }, {
      path: '/mdetail/:id',
      name: 'mdetail',
      meta: {
        title: "消息中心"
      },
      component: () =>
        import('./views/base/messageFollow/mdetail.vue')
    }, {
      path: '/mcomment',
      name: 'mcomment',
      meta: {
        title: "消息中心"
      },
      component: () =>
        import('./views/base/messageFollow/mcomment.vue')
    }, {
      path: '/mcollect',
      name: 'msmcollectys',
      meta: {
        title: "消息中心"
      },
      component: () =>
        import('./views/base/messageFollow/mconcern.vue')
    }, {
      path: '/mlike',
      name: 'mlike',
      meta: {
        title: "消息中心"
      },
      component: () =>
        import('./views/base/messageFollow/mlike.vue')
    }]
  }, {
    path: '/write',
    name: "write",
    meta: {
      title: "写文章"
    },
    component: () =>
      import('./views/base/write.vue')
  }, {
    path: '/edit/:id',
    name: "edit",
    meta: {
      title: "编辑文章"
    },
    component: () =>
      import('./views/base/edit.vue')
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
  }, {
    path: '/404',
    name: '404',
    meta: {
      title: "404"
    },
    component: () =>
      import('./views/base/404.vue')
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

const sideRoutes=[{
  path: "/admin/login",
  name: "adminlogin",
  meta: {
    title: "登录"
  },
  component: () =>
    import('./views/admin/login.vue')
},{
  path: '/manage',
  meta: {
    title: "管理"
  },
  component: manageLayout,
  children: [{
    path: '/manage',
    name: 'manage',
    meta: {
      title: "控制面板"
    },
    component: () =>
      import('./views/admin/manage.vue')
  }, {
    path: '/articleListManage',
    name: 'articleListManage',
    meta: {
      title: '文章列表',
    },
    component: () =>
      import('./views/admin/articleListManage.vue')
  },{
    path: '/articleConfirmManage',
    name: 'articleConfirmManage',
    meta:{
      title:'文章审核',
    },
    component:() => 
      import('./views/admin/articleConfirmManage.vue')
  },{
    path: '/articleBanListManage',
    name: 'articleBanListManage',
    meta:{
      title:'文章封禁管理',
    },
    component:() => 
      import('./views/admin/articleBanListManage.vue')
  }, {
    path: '/articleDetails/:id',
    name: 'articleDetails',
    meta: {
      title: '文章详情',
    },
    component: () =>
      import('./views/admin/articleDetailsManage.vue')
  }, {
    path: '/userManage',
    name: 'userManage',
    meta: {
      title: '用户管理',
    },
    component: () =>
      import('./views/admin/userManage.vue')
  },{
    path: '/userBanManage',
    name: 'userBanManage',
    meta: {
      title: '封禁管理',
    },
    component: () =>
      import('./views/admin/userBanManage.vue')
  }]
}]
const routes = [...routerMap, ...sideRoutes]
var router = new Router({
  routes
})
export default router;
export {sideRoutes}