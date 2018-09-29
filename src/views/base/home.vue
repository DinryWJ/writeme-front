<template>
  <div class="home">

    <el-row :gutter="20">
      <el-col :span="16">
        <div v-if="loginStatus==true" class="userOperator">
          <h2>快速开始</h2>
          <br/>
          <el-button type="danger" icon="el-icon-edit" @click="dowrite()" round>写文章</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="dialogVisible=true" round>写想法</el-button>
          <br/>
        </div>

        <h2>推荐内容</h2>
        <br/>
        <div :span="8" v-for="item in list" :key="item.userId" >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <el-row :gutter="20">
              <el-col :span="16">
              <div class="grid-content">
                  <div style="padding: 14px;">
                    <h3>{{item.title}}</h3>
                    <p>{{item.articlePreview}}</p>
                    <div class="bottom clearfix">
                      <el-button type="text">{{item.author.userName}}</el-button>
                      <el-button type="text" icon="el-icon-message">1</el-button>
                      <el-button type="text" icon="el-icon-star-on">1</el-button>
                      <el-button type="text" class="button" @click="readFullText(item.articleId)">阅读全文</el-button>
                    </div>
                  </div>
              </div></el-col>
              <el-col :span="8"><div class="grid-content"><img :src="item.coverImg" class="image" /></div></el-col>
            </el-row>
          </el-card>
          <br/>
        </div>
       <!-- 分页 -->
    <section class="margintop20 textAlignRight">
      <el-pagination 
      @current-change="handleCurrentChange" 
      :current-page.sync="pageNum" 
      :page-size="5" 
      :total="total">
      </el-pagination>
    </section>

      </el-col>
      <el-col :span="8"><div class="grid-content" >
          <template>
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in carouselList" :key="item.id">
                <img :src="item.pic" width="100%" height="100%" @click="open(item.address)"/>
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


    <!-- 写想法 -->
    <el-dialog title="新想法" :visible.sync="dialogVisible">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="100"
          v-model="textarea">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axion from "@/util/http_url.js"; //接口文件
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      pic: logo,
      currentDate: new Date(),
      loginStatus: false,
      dialogVisible: false,
      textarea: "",
      carouselList: [],
      currentId: 0,
      list: [],
      pageNum: 1,
      total: 0
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
        this.getDate();
      } else {
        this.loginStatus = false;
      }
      this.getCarouselList();
    },
    getDate() {
      axion
        .getMyRecommentArticleList({
          userId: this.$cookieStore.getCookie("userId"),
          status:1,
          pageNum: this.pageNum,
          pageSize: 5
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.list = d.data.data.list;
          this.total = d.data.data.total;
          this.currentPage = d.data.data.pageNum;
        });
    },
    handleCurrentChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = val;
      this.getDate();
    },
    readFullText(articleId) {
      const { href } = this.$router.resolve({
        name: "page",
        params: {
          id: articleId
        }
      });
      window.open(href, "_blank");
    },
    dowrite() {
      this.$router.push("/write");
    },
    domind() {},
    getCarouselList() {
      axion
        .getCarouselList({
          pageNum: 1,
          pageSize: 4
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.carouselList = d.data.data.list;
        });
    },
    open(address) {
      const { href } = this.$router.resolve({
        name: "page",
        params: {
          id: address
        }
      });
      window.open(href, "_blank");
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