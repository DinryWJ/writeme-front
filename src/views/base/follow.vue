<template>
    <el-container>
    <el-aside width="300px">    
    <ul class="menu">
        <li class="active"><el-button icon="el-icon-document" class="asideBtn" @click="go('/follow')">推荐文章</el-button></li>
        <li class=""><el-button icon="el-icon-service" class="asideBtn" @click="go('/fuser')">推荐用户</el-button></li>
        <li class=""><el-button icon="el-icon-search" class="asideBtn">专题</el-button></li>
        <li class=""><el-button icon="el-icon-search" class="asideBtn">文集</el-button></li>
    </ul>
    </el-aside>
    <el-container>
        <el-main><router-view></router-view></el-main>
    </el-container>
    </el-container>
</template>
<script>
export default {
   data() {
    return {
    };
  },
  mounted(){

  },
  methods:{
      go(url){
          this.$router.push(url);
      }
  }   
}
</script>

<style scoped>
    ul,li{
        padding: 0;
        margin:0;
    }
    .menu{
        list-style:none;
        width: 100%;
    }
    .asideBtn{
        height: 50px;
        width: 100%;
        border: none;
    }
</style>
