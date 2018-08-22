<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="18"><div class="grid-content">
                <h1  style="text-align:center">{{page.title}}</h1>
                <span>{{page.createTime}}</span>
                <p v-html='page.articleContent'></p>
            </div></el-col>
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
        articleContent: ""
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
        });
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
</style>
