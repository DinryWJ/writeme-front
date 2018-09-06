<template>
    <el-container>
    <el-aside width="300px">    
    <ul class="menu">
        <li class="active" margin-top="10px;">
            <el-badge :value="12" :max="99" class="item">
                <el-button icon="el-icon-document" class="asideBtn" @click="go('/message')">评论</el-button>
            </el-badge>
        </li>
        <li class="">
              <el-badge :value="12" :max="99" class="item">
            <el-button icon="el-icon-service" class="asideBtn" @click="go('/msys')">系统消息</el-button>
              </el-badge>
        </li>
        <li class="">
              <el-badge :value="12" :max="99" class="item">
            <el-button icon="el-icon-search" class="asideBtn" @click="go('/mcollect')">关注</el-button>
              </el-badge>
        </li>
        <li class="">
              <el-badge :value="12" :max="99" class="item">
            <el-button icon="el-icon-search" class="asideBtn" @click="go('/mlike')">点赞</el-button>
              </el-badge>
        </li>
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
.el-aside,.el-main{
 overflow: hidden;
}
    ul,li{
       padding-top: 15px;
        margin:0;

    }
    .menu{
        list-style:none;
        width: 100%;
    }
    .asideBtn{~
        height: 50px;
        width: 150px;
        border: none;
    }
    
</style>
