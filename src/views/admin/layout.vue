<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container >
      <el-header>
        <!-- 导航栏 -->
          
      </el-header>
    <el-container>
      <el-aside width="250px">
        <!-- 侧边栏 -->
        <el-row class="tac"> 
          <el-col>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
 
<style scoped>
</style>
