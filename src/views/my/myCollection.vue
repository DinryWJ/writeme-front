<template>
    <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content"></div></el-col>
    <el-col :span="16">
        <div class="grid-content">
            <h1>收藏的文章</h1>
            <br/>
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
        </div></el-col>
    <el-col :span="4"><div class="grid-content"></div></el-col>
    </el-row>
</template>
<script>
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      logo: logo,
      currentPage: 4,
      total: 120
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    //分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
};
</script>


<style scoped>
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
</style>