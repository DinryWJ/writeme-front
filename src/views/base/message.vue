<template>
    <el-container>
    <el-aside width="300px">    
    <ul class="menu">
        <li class="active"><el-button icon="el-icon-document" class="asideBtn" @click="go('/messageFollow')">评论</el-button></li>
        <li class=""><el-button icon="el-icon-service" class="asideBtn" @click="go('/msys')">系统消息</el-button></li>
        <li class=""><el-button icon="el-icon-search" class="asideBtn" @click="go('/mcollect')">关注</el-button></li>
        <li class=""><el-button icon="el-icon-search" class="asideBtn" @click="go('/mlike')">点赞</el-button></li>
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
