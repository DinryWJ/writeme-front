<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="18"><div class="grid-content">
                <h1 style="text-align:center">{{page.title}}</h1>

                <div style="padding: 20px;">
                  <div style="float:left;height:50px;margin-right:10px;">
                    <img :src="page.author.userImage" style="height:100%;border-radius:50px;" />
                  </div>
                  <div>
                    <span>{{page.author.userName}}</span><el-button round class="button">关注</el-button>
                    <div class="bottom clearfix">
                      <span>{{page.createTime}}</span>
                      <span> 阅读 </span><span>{{page.readNum}}</span>
                      <span> 评论 </span><span>{{page.commentNum}}</span>
                      <span> 喜欢 </span><span>{{page.likeNum}}</span>
                    </div>
                  </div>
                </div>

                <p v-html='page.articleContent'></p>
                <hr/>
                <div style="height:100px;width:100px;margin:0 auto;">
                  <img :src="starOn" v-if="starStatus" @click="starchange()" style="width:100%"/>
                  <img v-else :src="starOff"  @click="starchange()" style="width:100%"/>
                </div>
                <h2>写一条评论</h2>
                <div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    :focus="isShow=true"
                    v-model="textarea">
                  </el-input>
                  <div style="float:right;margin-top:20px;" v-show="isShow">
                    <el-button type="text" @click="comBtn=false">取消</el-button>
                    <el-button type="success" round>发送</el-button>
                  </div>
                </div>
                <h2>评论</h2>
                <hr/>

                <div>
                  <div style="float:left;height:50px;margin-right:10px;">
                    <img :src="page.author.userImage" style="height:100%;border-radius:50px;" />
                  </div>
                  <div>
                    <span>{{page.author.userName}}</span>
                    <div class="bottom clearfix">
                      <span>{{page.createTime}}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p style="text-indent:2em; padding:0px; margin:10px 0;">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit tenetur excepturi quisquam ad consequatur nihil vel, corrupti veniam autem eos in eaque nulla deleniti! Ad dolor dolores placeat dignissimos!
                  </p>
                </div>
                <div>
                  <el-button type="text" icon="el-icon-star-off"><span>1人</span>赞</el-button>
                  <el-button type="text" icon="el-icon-edit-outline">回复</el-button>
                </div>
                <ul style="list-style-type:none;">
                  <li>
                    <div>
                      <el-button type="text">文字按钮</el-button><span>: </span><el-button type="text" disabled>@文字按钮</el-button><span>dfsdfds</span>
                    </div>
                    <div>
                      <span style="font-size:12px;">{{page.createTime}}</span><el-button type="text" icon="el-icon-edit-outline">回复</el-button>
                    </div>
                  </li>
                  <li>
                    <div>
                      <el-button type="text">文字按钮</el-button><span>: </span><el-button type="text" disabled>@文字按钮</el-button><span>dfsdfds</span>
                    </div>
                    <div>
                      <span style="font-size:12px;">{{page.createTime}}</span><el-button type="text" icon="el-icon-edit-outline">回复</el-button>
                    </div>
                  </li>
                </ul>
            </div></el-col>
            <el-col :span="3"><div class="grid-content"></div></el-col>
        </el-row>

    </div>    
</template>

<script>
import axion from "@/util/http_url.js"; //接口文件
import { formatDate } from "@/util/dateUtil.js";
export default {
  data() {
    return {
      show: true,
      starOn: "/starOn.png",
      starOff: "/starOff.png",
      starStatus: false,
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
        },
        readNum: 0,
        commentNum: 0,
        likeNum: 0
      },
      textarea: "",
      isShow: false
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
          this.page.createTime = formatDate(d.data.data.createTime);

          //模拟
          this.page.readNum = 0;
          this.page.commentNum = 0;
          this.page.likeNum = 0;
        });
    },
    starchange() {
      this.starStatus = !this.starStatus;
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

.bottom {
  margin-top: 13px;
  line-height: 12px;
  font-size: 12px;
}

.button {
  padding: 2px;
}

.image {
  width: 100%;
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
</style>
