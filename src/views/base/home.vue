<template>
  <div class="home">

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="userOperator">
          <h2>快速开始</h2>
          <br/>
          <el-button type="danger" icon="el-icon-edit" round>写文章</el-button>
          <el-button type="warning" icon="el-icon-edit" round>写想法</el-button>
          <br/>
        </div>

        <h2>推荐内容</h2>
        <br/>
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
      <el-col :span="8"><div class="grid-content" >
          <template>
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </template>
          <br/>
          <el-card class="box-card">
            <p> Write Me协议    隐私政策</p>
            <p> 侵权举报   网上有害信息举报专区</p>
            <p> 违法和不良信息举报：010-82716601</p>
            <p> 儿童色情信息举报专区</p>
            <p> 联系我们 © 2018 Write Me</p>
          </el-card>
      </div></el-col>
    </el-row>

  </div>
</template>
<style scoped>
.userOperator{
  padding: 20px 0;
  border: 1px solid rgb(252, 252, 252);
}
.imgbtn{
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
  height: 100%;
  display: block;
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
/* 走马灯 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 栅格 */
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      pic: logo,
      currentDate: new Date()
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>
