<template>
<div>
    <el-card :body-style="{ padding: '0px' }">
      <el-container>
        <el-aside><img :src="logo" class="img"/></el-aside>
        <el-container>
          <el-header>
                <br/>
                <el-row :gutter="20">
                    <el-col :span="6" :offset="18"><div class="grid-content">
                        <el-button type="primary">上传新头像<i class="el-icon-upload el-icon--right"></i></el-button>  
                    </div></el-col>
                </el-row>
          </el-header>
          <el-main>
              <h1>鲁迅</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui culpa debitis est quidem architecto non fugiat, aliquam a mollitia eos facere quos repudiandae cum. Fugiat quasi in veritatis eos iusto.</p>
          </el-main>
        </el-container>
      </el-container>
    </el-card>
    <br/>
    <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
            <el-tabs type="border-card" @tab-click="tabClick" :value="selectedTag">
            <el-tab-pane label="文章">
                    <!-- 文章列表 -->
                    <h2>我的文章</h2>
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
                        <el-col :span="8"><div class="grid-content"><img :src="logo" class="image" /></div></el-col>
                        </el-row>
                    </el-card>
                    <br/>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    :total="total">
                    </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="我关注的人">
                    <!-- 我关注的人列表 -->
                    <h2>关注人列表</h2>
                    <br/>
                    <div :span="8" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <el-row>
                        <el-col :span="6"><div class="grid-content">
                            <img :src="logo" class="img"/>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content">
                            <h3>老舍</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis quo amet beatae dolore nisi sapiente iure quisquam, asperiores, ad aspernatur maxime labore! Dignissimos, voluptates. Harum officiis culpa explicabo nesciunt earum.</p> 
                            <div class="bottom clearfix">
                                <span>12</span><span>篇文章,</span><span>13</span><span>个关注</span>
                            </div>
                        </div></el-col>
                        <el-col :span="6"><div class="grid-content"><el-button class="followBtn">未关注</el-button></div></el-col>
                        </el-row>
                    </el-card>
                    <br/>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    :total="total">
                    </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="关注我的人">

            </el-tab-pane>
            <el-tab-pane label="收藏">

            </el-tab-pane>
            </el-tabs>    
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
            <el-card class="box-card">
               <div>关注了 <el-button type="text"><h1>1</h1></el-button> 个人</div>
            </el-card>
            <br />
            <el-card class="box-card">
               <div>关注者 <el-button type="text"><h1>1</h1></el-button> 个人</div>
            </el-card>
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
<style>
.followBtn {
  width: 150px;
  display: block;
  margin: 0 auto;
  margin-top: 70px;
}
.el-aside {
  padding: 50px 100px;
}
.img {
  height: 150px;
  width: 150px;
  padding-top: 30px;
  display: block;
  margin: 0 auto;
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
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      logo: logo,
      currentDate: new Date(),
      selectedTag: "0",
      currentPage: 4,
      total: 120
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    // 标签页方法
    tabClick(targetName) {
      // console.log(targetName);
    },
    //分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>