<template>
 <el-row :gutter="20">
      <el-col :span="24" margin-bottom="20px">
     <div :span="8" v-for="item in list" :key="item.name">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-container height="100px">
            <el-aside width="100px" height="70px">
               
                    <img :src="pic" class="image"/>
                
            </el-aside>
            <el-container>
                <el-header height="20px">{{item.name}}<span>点赞了你的文章</span>{{item.articleName}}</el-header>
            
                <el-main height="70px">    
                    <p>{{item.time}</p>                    
                </el-main>
               
            </el-container>
        </el-container>
        </el-card>
        <br>
    </div>
      </el-col>
 </el-row>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axion from "@/util/http_url.js"; //接口文件
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
     list:[]
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    getDate(){
      axion.getLikeList({ token: this.$cookieStore.getCookie("token")})
           .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.list=d.data.data;
        });
    }
    
  }
};
</script>
<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.userOperator {
  padding: 20px 0;
  border: 1px solid rgb(252, 252, 252);
}
.imgbtn {
  width: 100%;
}
.el-main{
    padding-left: 20px;
    padding-top: 0;
}

/* 卡片 */
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}
.image {
  height: 50px;
  width: 50px;
  display: block;
  margin: 0 auto;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
p {
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

</style>