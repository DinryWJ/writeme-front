<template>
    <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content"></div></el-col>
    <el-col :span="16">
        <div class="grid-content">
            <h1>点赞的文章</h1>
            <br/>
            <br/>
            <div :span="8" v-for="o in articleClickList" :key="o.articleId">
            <el-card :body-style="{ padding: '0px' }" shadow="never">
                <el-row :gutter="20">
                <el-col :span="16">
                <div class="grid-content">
                    <div style="padding: 14px;">
                        <h3>{{o.article.title}}</h3>
                        <p>{{o.article.articlePreview}}</p>
                        <div class="bottom clearfix">
                        <el-button type="text" @click="openUser(o.userId)">{{o.user.userName}}</el-button>
                        <el-button type="text" class="button" @click="openPage(o.articleId)">阅读全文</el-button>
                        </div>
                    </div>
                </div></el-col>
                <el-col :span="8"><div class="grid-content"><img :src="o.article.coverImg" class="image" /></div></el-col>
                </el-row>
            </el-card>
            <br/>
            </div>
            <!-- 分页 -->
            <el-pagination
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
import axion from "@/util/http_url.js"; //接口文件
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      logo: logo,
      currentPage: 1,
      total: 0,
      articleClickList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getFavourArticleList();
    },
    getFavourArticleList() {
      axion
        .getFavourArticleList({
          token: this.$cookieStore.getCookie("token"),
          pageNum: this.currentPage,
          pageSize: 10
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.articleClickList = d.data.data.list;
          this.total = d.data.data.total;
        });
    },
    //分页方法
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFavourArticleList();
    },
    openUser(id) {
      const { href } = this.$router.resolve({
        name: "userPage",
        params: {
          id: id
        }
      });
      window.open(href, "_blank");
    },
    openPage(id) {
      const { href } = this.$router.resolve({
        name: "page",
        params: {
          id: id
        }
      });
      window.open(href, "_blank");
    }
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