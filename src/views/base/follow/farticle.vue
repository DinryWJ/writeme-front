<template>
<el-row>
      <el-col :span="24">
   <div :span="8" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <el-row :gutter="20">
              <el-col :span="16">
              <div class="grid-content">
                  <div style="padding: 14px;">
                    <h3>好吃的汉堡</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste optio iure ut odit nihil voluptatibus officiis nemo nesciunt mollitia ea molestiae laboriosam in, quae asperiores beatae quisquam expedita! Cum, fugit!</p>
                    <div class="bottom clearfix">
                      <el-button type="text">鲁迅</el-button>
                      <el-button type="text" icon="el-icon-message">1</el-button>
                      <el-button type="text" icon="el-icon-star-on">1</el-button>
                      <el-button type="text" class="button">阅读全文</el-button>
                    </div>
                  </div>
              </div></el-col>
              <el-col :span="8"><div class="grid-content"><img :src="pic" class="image" /></div></el-col>
            </el-row>
          </el-card>
          <br/>
    </div>
      </el-col>
</el-row>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      pic: logo,
      currentDate: new Date(),
      loginStatus: false,
      dialogVisible: false,
      textarea:''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let name = this.$cookieStore.getCookie("token");
      if (name != null) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    },
    dowrite(){
      this.$router.push('/write');
    },
    domind(){

    }
  }
};
</script>
<style scoped>
.userOperator {
  padding: 20px 0;
  border: 1px solid rgb(252, 252, 252);
}
.imgbtn {
  width: 100%;
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
  height: 150px;
  width: 150px;
  padding-top: 30px;
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