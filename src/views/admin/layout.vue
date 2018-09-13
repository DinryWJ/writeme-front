<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container >
      <el-header class="navbar">
        <!-- 导航栏 -->
        <el-row>
          <el-col :span="2" :offset="20"><div class="grid-content">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                管理员<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">设置</el-dropdown-item>
                <el-dropdown-item command="b">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div></el-col>
        </el-row>
      </el-header>
    <el-container>
      <el-aside width="250px">
        <!-- 侧边栏 -->
        <el-row class="tac"> 
          <el-col>
          <el-menu 
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo">
            <el-menu-item index="/manage">
              <i class="el-icon-location"></i>
              <span>控制面板</span>
            </el-menu-item>
            <el-menu-item index="/userManage">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="/articleListManage">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/articleListManage">已发布文章列表</el-menu-item>
              <el-menu-item index="/articleConfirmManage">待审核</el-menu-item>
              <el-menu-item index="/articleBanListManage">封禁管理</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <!-- Body -->
         <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>
   </div>
</template>
 
<script>
export default {
  methods: {
    handleCommand(command) {
        this.$message('click on item ' + command);
      }
  }
};
</script>
 
<style scoped>
.navbar {
  background-color: slateblue;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
  .el-dropdown-link {
    line-height: 60px;
    cursor: pointer;
    color: #ffffff;

  }
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
