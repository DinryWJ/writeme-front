<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="18"><div class="grid-content">
                <h1 style="text-align:center">{{page.title}}</h1>

                <div style="padding: 20px;">
                  <div style="float:left;height:50px;margin-right:10px;">
                    <img :src="page.author.userImage" style="height:50px;width:50px;border-radius:50px;" />
                  </div>
                  <div>
                    <span>{{page.author.userName}}</span><el-button round class="button" v-show="page.concernStatus==0 &&flag ==0" @click="handleConcern(1)">关注TA</el-button><el-button round class="button" v-show="page.concernStatus==1 &&flag ==0" @click="handleConcern(0)">取消关注</el-button>
                    <div class="bottom clearfix">
                      <span>{{page.createTime}}</span>
                      <span> 阅读 </span><span>{{page.readNum}}</span>
                      <span> 评论 </span><span>{{page.commentNum}}</span>
                      <span> 点赞 </span><span>{{page.starNum}}</span>
                    </div>
                  </div>
                </div>

                <p v-html='page.articleContent'></p>
                <hr/>
                <div style="height:100px;width:100px;margin:50px auto;">
                  <img :src="starOn" v-show="starStatus" @click="starchange()" style="width:100%"/>
                  <img v-show="!starStatus" :src="starOff"  @click="starchange()" style="width:100%"/>
                  <div style="width：100px;">共有{{page.starNum}}人点赞</div>
                </div>
                <h2>写一条评论</h2>
                <div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="textarea">
                  </el-input>
                  <div style="float:right;margin-top:20px;">
                    <el-button type="text" >取消</el-button>
                    <el-button type="success" round @click="addComment()">发送</el-button>
                  </div>
                </div>
                <h2>评论</h2>
                <hr/>
                <div v-if="comments.length==0">暂无评论</div>
                <div v-for="comm in comments" :key="comm.commentId">
                  <div>
                  <div style="float:left;height:50px;margin-right:10px;">
                    <img :src="comm.user.userImage" style="height:100%;border-radius:50px;" />
                  </div>
                  <div>
                    <span>{{comm.user.userName}}</span>
                    <div class="bottom clearfix">
                      <span>{{comm.commentTime}}</span>
                    </div>
                  </div>
                  </div>
                  <div>
                    <p style="text-indent:2em; padding:0px; margin:10px 0;">
                      {{comm.commentContent}}
                    </p>
                  </div>
                  <div>
                    <!-- <el-button type="text" icon="el-icon-star-off"><span>1人</span>赞</el-button> -->
                    <el-button type="text" icon="el-icon-edit-outline" v-show="currentId!=comm.userId" @click="handleQuickReply(comm.user.userName,comm.userId,comm.commentId)">回复</el-button>
                  </div>
                  <ul style="list-style-type:none;">
                    <li v-for="li in comm.commentList" :key="li.commentId">
                      <div>
                        <el-button type="text">{{li.user.userName}}</el-button><span>: </span><span>{{li.commentContent}}</span>
                      </div>
                      <div>
                        <span style="font-size:12px;">{{li.commentTime}}</span>
                        <el-button type="text" icon="el-icon-edit-outline" v-show="currentId!=li.userId" @click="handleQuickReply(li.user.userName,li.user.userId,li.parentCommentId)">回复</el-button>
                      </div>
                    </li>
                  </ul>     
                </div>

                <el-dialog title="回复" :visible.sync="quickReplyVisible">
                    <el-input
                      :rows="2"
                      placeholder="请输入内容"
                      maxlength="100"
                      v-model="quickReply.textarea"><template slot="prepend">@{{quickReply.currentUserName}}</template>
                    </el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="quickReplyVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendQuickReply()">确 定</el-button>
                  </div>
                </el-dialog>
            </div>
            </el-col>
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
      currentId: 0,
      //是否为我的文章 0不是 1是
      flag: 0,
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
        concernStatus: 0,
        readNum: 0,
        commentNum: 0,
        starNum: 0
      },
      comments: [],
      comment: {
        commentId: 0,
        commentContent: "",
        commentTime: "",
        articleId: 0,
        userId: 0,
        commentedUserId: 0,
        user: {},
        parentCommentId: 0,
        commentList: []
      },
      textarea: "",
      pageNum: 1,
      pageSize: 20,
      total: 0,
      quickReplyVisible: false,
      quickReply: {
        parentCommentId: 0,
        currentUserId: 0,
        currentUserName: "",
        textarea: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.currentId = this.$cookieStore.getCookie("userId");
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

          //模拟
          this.page.readNum = 0;

          this.validConcern();
          this.initComment();
          this.initStarStatus();
        });
    },
    initStarStatus(){
      axion.getStarStatus({
                    token: this.$cookieStore.getCookie("token"),
            articleId: this.page.articleId
      }).then(d => {
            if (d.data.code != 200) {
              this.$alert(d.data.type, "提示", {});
              return;
            }
            this.starStatus =d.data.data;
          });
    },
    starchange() {
      if (this.starStatus == false) {
        axion
          .likeArticle({
            token: this.$cookieStore.getCookie("token"),
            articleId: this.page.articleId
          })
          .then(d => {
            if (d.data.code != 200) {
              this.$alert(d.data.type, "提示", {});
              this.init();
              return;
            }
            this.init();
          });
      } else {
        axion
          .nolikeArticle({
            token: this.$cookieStore.getCookie("token"),
            articleId: this.page.articleId
          })
          .then(d => {
            if (d.data.code != 200) {
              this.$alert(d.data.type, "提示", {});
              this.init();
              return;
            }
            this.init();
          });
      }
    },
    addComment() {
      if (this.textarea != null) {
        let comment = {};
        comment.commentContent = this.textarea;
        comment.articleId = this.page.articleId;
        comment.commentedUserId = this.page.userId;
        comment.parentCommentId = 0;
        axion
          .addComment(this.$cookieStore.getCookie("token"), comment)
          .then(d => {
            if (d.data.code != 200) {
              this.$alert(d.data.type, "提示", {});
              return;
            }
            this.$alert("评论成功", "提示", {});
            this.init();
          });
      }
    },
    validConcern() {
      if (this.currentId == this.page.userId) {
        this.flag = 1;
      } else {
        this.flag = 0;
        axion
          .getConcernStatus({
            token: this.$cookieStore.getCookie("token"),
            concernedUserId: this.page.userId
          })
          .then(d => {
            if (d.data.code != 200) {
              this.$alert(d.data.type, "提示", {});
              return;
            }
            if (d.data.data > 0) {
              this.page.concernStatus = 1;
            } else {
              this.page.concernStatus = 0;
            }
            console.log(this.flag);
          });
      }
    },
    handleConcern(val) {
      if (val == 1) {
        this.addConcern();
      } else {
        this.deleteConcern(this.page.userId);
      }
    },
    addConcern() {
      axion
        .addConcern({
          token: this.$cookieStore.getCookie("token"),
          concernedUserId: this.page.userId
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.init();
          this.$message("已关注！");
        });
    },
    deleteConcern(id) {
      axion
        .deleteConcern({
          token: this.$cookieStore.getCookie("token"),
          concernedUserId: id
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.init();
          this.$message("已取消关注！");
        });
    },
    initComment() {
      axion
        .getArticleComment({
          articleId: this.page.articleId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          let commentList = new Array();
          for (let i = 0; i < d.data.data.list.length; i++) {
            let comment = d.data.data.list[i];
            commentList.push(comment);
          }
          this.comments = commentList;
          console.log(this.comments);
        });
    },
    handleQuickReply(name, userId, id) {
      this.quickReplyVisible = true;
      this.quickReply.currentUserName = name;
      this.quickReply.currentUserId = userId;
      this.quickReply.parentCommentId = id;
    },
    sendQuickReply() {
      if (this.textarea != null) {
        let comment = {};
        comment.commentContent =
          "@" +
          this.quickReply.currentUserName +
          " " +
          this.quickReply.textarea;
        comment.articleId = this.page.articleId;
        comment.commentedUserId = this.quickReply.currentUserId;
        comment.parentCommentId = this.quickReply.parentCommentId;
        axion
          .addComment(this.$cookieStore.getCookie("token"), comment)
          .then(d => {
            if (d.data.code != 200) {
              this.$alert(d.data.type, "提示", {});
              return;
            }
            this.$alert("评论成功", "提示", {});
            this.quickReplyVisible = false;
            this.init();
          });
      }
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
