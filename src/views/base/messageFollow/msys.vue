<template>
 <el-row :gutter="20">
      <el-col :span="24" margin-bottom="20px">
    <div :span="8" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-container height="100px">
            <el-aside width="100px" height="70px">
                <el-badge :value="12" class="item">
                    <img :src="pic" class="image"/>
                </el-badge>
            </el-aside>
            <el-container>
                <el-header height="20px">鲁迅</el-header>
                <el-main height="70px">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste optio iureut 
                        odit nihil voluptatibus officiis nemo nesciunt mollitia ea molestiae 
                         laboriosam in, quae asperiores beatae quisquam expedita! Cum, fugit!
                    </p>
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