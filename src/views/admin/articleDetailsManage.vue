<template>
<div>
<el-row :gutter="20">
  <el-col :span="5">
    <div class="grid-content">
        <h3>作者</h3>
        <div style="padding: 20px;">
            <div style="float:left;height:50px;margin-right:10px;">
            <img :src="page.author.userImage" style="height:100%;border-radius:50px;" />
          </div>
          <div>
            <span>{{page.author.userName}}</span><el-button round class="button" v-show="page.concernStatus==0 &&flag ==0" @click="handleConcern(1)">关注TA</el-button><el-button round class="button" v-show="page.concernStatus==1 &&flag ==0" @click="handleConcern(0)">取消关注</el-button>
            <div class="bottom clearfix">
              <span>{{page.createTime}}</span>
            </div>
          </div>
        </div>

        <div id="operator">
          <el-card class="box-card" shadow="hover">
            <p>操作</p>
            <el-tooltip class="item" effect="dark" content="返回" placement="top-start">
              <el-button icon="el-icon-arrow-left" circle @click="$router.go(-1);"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="通过" placement="top-start" v-show="page.status == 0">
              <el-button type="success" icon="el-icon-check" circle @click="operate(1);"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="不通过" placement="top-start" v-show="page.status == 0">
              <el-button type="danger" icon="el-icon-close" circle @click="operate(2);"></el-button>
            </el-tooltip>      
          </el-card>
        </div>
      </div>
  </el-col>
  <el-col :span="16">
    <div class="grid-content">
      <h1>{{page.title}}</h1>
      <p v-html='page.articleContent'></p>
    </div>
  </el-col>
  <el-col :span="3"><div class="grid-content"></div></el-col>
</el-row>
</div>
</template>

<script>
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      page: {
        articleId: 0,
        title: "",
        createTime: "",
        corpusId: 0,
        userId: 0,
        articleContent: "",
        author: {
          userId: 0,
          userName: "",
          userImage: ""
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.page.articleId = this.$route.params.id;
      axion
        .getArticleById({
          articleId: this.page.articleId
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.page = d.data.data;
          if(this.page.status == 1 || this.page.status == 2){
            this.$alert('文章已审核');
            this.$router.push('/articleConfirmManage');
          }
        });
    },
    operate(status) {
      axion
        .articlePassInfo({
          token: this.$cookieStore.getCookie("token"),
          articleId: this.page.articleId,
          status: status,
          msg: ""
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.$router.push('/articleConfirmManage');
        });
    }
  }
};
</script>

<style scoped>
#operator {
  position: fixed;
  margin-top: 50px;
}
.box-card {
  width: 300px;
}
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