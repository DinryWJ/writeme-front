<template>
  <div>
    <header>
      <div style="float:left;">返回消息列表</div>
      <div style="text-align: center;">与{{userName}}的会话</div>
    </header>
    <div v-for="m in messages" :key="m.id">
      
      <div v-if="$route.params.id == m.fromUserId" style="float:left;height:40px;">
        <img style="margin-right: 20px;" :src="m.user.userImage"/>
        <div class="message1">{{m.message}}</div>
        <span style="color:#999;font-size:12px;">{{m.createTime}}</span>
      </div>
      <div v-if="$route.params.id != m.fromUserId" style="float:right;height:40px;">
        <span style="color:#999;font-size:12px;">{{m.createTime}}</span>
        <div class="message2">{{m.message}}</div>
        <img style="margin-left: 20px;" :src="m.user.userImage"/>
      </div>
      <div style="height:50px;"></div>
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
          this.messages = d.data.data.list;
        });
    }
  }
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.message1,.message2 {
  display: inline-block;
  height: 40px;
  background-color: green;
  border-bottom-color:green;/*为了给after伪元素自动继承*/
  color: #fff;
  font-size: 12px;
  font-family: Arial;
  line-height: 40px;
  padding: 5px 12px 5px 12px;
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;
  word-break: break-all;
  padding: 0 10px;
}
.message1::before {
  content: '';
  width: 10px; 
  height: 10px;
  background-color: inherit;
  left: -5px; /*向左侧外部延伸箭头box的一半宽度*/
  position: absolute;
  transform: rotate(45deg); /*旋转45度*/
  top:50%; /*箭头在数值方向上居中*/
  margin-top: -5px;
}
.message2::before {
  content: '';
  width: 10px; 
  height: 10px;
  background-color: inherit;
  right: -5px; /*向左侧外部延伸箭头box的一半宽度*/
  position: absolute;
  transform: rotate(45deg); /*旋转45度*/
  top:50%; /*箭头在数值方向上居中*/
  margin-top: -5px;
}

</style>
