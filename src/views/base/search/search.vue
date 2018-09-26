<template>
    <el-row :gutter="20">
    <el-col :span="24">
        <div class="grid-content">       
             <div :span="8" v-for="item in list" :key="item.articleId">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-row :gutter="20">
                <el-col :span="16">
                <div class="grid-content">
                    <div style="padding: 14px;">
                        <h3>{{item.title}}</h3>
                        <p>{{item.content}}</p>
                        <div class="bottom clearfix">
                        <el-button type="text" @click="gotoUserPage(item.userId)">{{item.author.userName}}</el-button>
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
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      logo: logo,

      currentId:0,
      list:[],
      pageNum: 1,
      total:0
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
      getDate() {
      axion
        .getArticleListByCondition({
         value: this.$route.params.searchkey,
         flag:1,
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
    //分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum=val;
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
    }, gotoUserPage(id) {
      const { href } = this.$router.resolve({
        name: "userPage",
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