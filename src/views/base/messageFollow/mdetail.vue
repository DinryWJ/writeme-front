<template>
  <div>
    <header>
      <div style="float:left;"><el-button icon="el-icon-back" round @click="$router.push('/message')">返回消息列表</el-button></div>
      <div style="text-align: center;">与<el-button type="text" @click="redirect()">{{userName}}</el-button>的会话</div>
    </header>
    <div style="margin-top:50px;" v-for="m in messages" :key="m.id">
      <div v-if="m.user.userId == $route.params.id" class="sender">
        
          <div>
              <img :src="m.user.userImage" height="462" width="427" style="border-radius: 100%;"/>
          </div>
          <span class="bottom">{{m.createTime}}</span>
          <div style="max-width:300px">
              <div class="left_triangle"></div>
              <span>{{m.message}}</span>
          </div>
          
      </div>
      <!-- Right -->
      <div v-if="m.user.userId != $route.params.id" class="receiver">
         
          <div>
              <img :src="m.user.userImage" height="640" width="640" style="border-radius: 100%;"/>
          </div>
          
          <div style="max-width:300px">
              <div class="right_triangle"></div>
              <span>{{m.message}}</span>
          </div>
         <span class="bottom" style="float:right;">{{m.createTime}}</span>
      </div>
    </div>
    

  </div>
</template>
<script>
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      messages: [],
      userName: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      axion
        .getUserInfoById({
          userId: this.$route.params.id
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.userName = d.data.data.userName;
        });
      axion
        .getMessageRecord({
          token: this.$cookieStore.getCookie("token"),
          guestId: this.$route.params.id
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          if(d.data.data.list.length<4){
            this.messages = d.data.data.list;
          }else{
            for(let i=d.data.data.list.length-4;i<d.data.data.list.length;i++){
              this.messages.push(d.data.data.list[i]);
            }
          }
          
        });
    },
    redirect(){
      const { href } = this.$router.resolve({
        name: "userPage",
        params: {
          id: this.$route.params.id
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped>
.bottom {
  color: #999;
  line-height: 40px;
  font-size: 12px;
}
/* bubble style */
.sender {
  clear: both;
}
.sender div:nth-of-type(1) {
  float: left;
}
.sender div:nth-of-type(2) {
  background-color: aquamarine;
  float: left;
  margin: 0 20px 10px 15px;
  padding: 10px 10px 10px 0px;
  border-radius: 7px;
}

.receiver div:first-child img,
.sender div:first-child img {
  width: 50px;
  height: 50px;
}

.receiver {
  clear: both;
}
.receiver div:nth-child(1) {
  float: right;
}
.receiver div:nth-of-type(2) {
  float: right;
  background-color: gold;
  margin: 0 10px 10px 20px;
  padding: 10px 0px 10px 10px;
  border-radius: 7px;
}

.left_triangle {
  height: 0px;
  width: 0px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent aquamarine transparent transparent;
  position: relative;
  left: -16px;
  top: 3px;
}

.right_triangle {
  height: 0px;
  width: 0px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent gold;
  position: relative;
  right: -16px;
  top: 3px;
}
</style>
