<template>
 <el-row :gutter="20">
      <el-col :span="24" margin-bottom="20px">
      <span>全部消息</span>
      <hr/>
      <div :span="8" v-for="m in message" :key="m.id">
        <el-container height="100px" >
            <el-aside width="100px" height="100px" style="padding:18px;"> 
              <img :src="m.user.userImage" class="image"/>
            </el-aside>
            <el-main>
              <div v-on:click="go(m.user.userId)" style="cursor: pointer;">
                <div style="font-size: 20px;margin-top: 20px;">{{m.user.userName}} <span style="float:right;font-size:12px;">{{m.createTime}}</span></div>
                <div><span class="messagebox">{{m.message}}</span></div>
              </div>
            </el-main>
        </el-container>
      </div>
      </el-col>
 </el-row>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      message:[]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getMessageList();
    },
    getMessageList() {
      axion
        .getUserMessageList({
          token: this.$cookieStore.getCookie("token"),
          status: 1
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.message = d.data.data.list;
          console.log(this.message)
        });
    },
    go(id){
      this.$router.push('/mdetail/'+id)      
    }
  }
};
</script>
<style scoped>
.messagebox{
    font-size: 12px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
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
.el-main {
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
  width: 100%;
  border-radius: 100%;
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