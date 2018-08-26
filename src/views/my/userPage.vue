<template>
<div>
    <el-card :body-style="{ padding: '0px' }">
      <el-container>
        <el-aside><img :src="userInfo.userImage" class="img"/></el-aside>
        <el-container>
          <el-header>
                <br/>
                <el-row :gutter="20">
                    <el-col :span="6" :offset="18"><div class="grid-content">
                        <el-button type="primary"  @click="dialogVisible = true" v-if="myflag == 0">上传新头像<i class="el-icon-upload el-icon--right"></i></el-button>
                        <el-button type="danger" round v-if="myflag == 1 && concernStatus==1" @click="addConcern()">加关注</el-button>
                        <el-button type="info" round v-if="myflag == 1 && concernStatus==0" @click="deleteConcern(currentId)">取消关注</el-button>
                    </div></el-col>
                </el-row>
          </el-header>
          <el-main>
              <h1>{{userInfo.userName}}</h1>
              <p>{{userInfo.userAbstract}}</p>
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
                    <h2>文章列表</h2>
                    <el-radio-group v-model="status" size="small" style="float:right" @change="handleRadioChange()">
                      <el-radio-button label="1">已发布</el-radio-button>
                      <el-radio-button label="0" v-if="myflag==0">未发布</el-radio-button>
                    </el-radio-group>
                    <br>
                    <br/>
                    <div :span="8" v-for="item in articleList" :key="item.articleId">
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
                        <el-col :span="8"><div class="grid-content"><img v-bind:src="item.coverImg" class="image" /></div></el-col>
                        </el-row>
                    </el-card>
                    <br/>
                    </div>
                    <!-- 分页 -->
                    <section class="margintop20 textAlignRight">
                      <el-pagination 
                      @current-change="handleCurrentChange" 
                      :current-page.sync="pageNum" 
                      :page-size="10" 
                      :total="total">
                      </el-pagination>
                    </section>
            </el-tab-pane>
            <el-tab-pane label="关注的人">
                    <!-- 我关注的人列表 -->
                    <h2>关注人列表</h2>
                    <br/>
                    <div :span="8" v-for="con in concernList" :key="con.concernId">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <el-row>
                        <el-col :span="6"><div class="grid-content">
                            <img :src="con.concernedUser.userImage" class="img" style="width:100px;height:100px;margin-top:20px;"/>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content">
                            <el-button type="text" @click="gotoUserPage(con.concernedUser.userId)" style="padding:20px 0 0 0;"><span>{{con.concernedUser.userName}}</span></el-button>
                            <p>{{con.concernedUser.userAbstract}}</p> 
                            <div class="bottom clearfix">
                                <span>{{con.userArticleCount}}</span><span>篇文章,</span><span>{{con.userConcernedCount}}</span><span>个关注</span>
                            </div>
                        </div></el-col>
                        <el-col :span="6"><div class="grid-content"><el-button style="margin-top:50px;" @click="handleCancleFollow(con.concernedUser.userId)">取消关注</el-button></div></el-col>
                        </el-row>
                    </el-card>
                    <br/>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                    @current-change="handleCurrentChange2"
                    :current-page.sync="pageNum2" 
                    :page-size="10"
                    :total="total2">
                    </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="被关注">
                    <h2>被关注人列表</h2>
                    <br/>
                    <div :span="8" v-for="cond in concernedList" :key="cond.concernId">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <el-row>
                        <el-col :span="6"><div class="grid-content">
                            <img :src="cond.concernerUser.userImage" class="img" style="width:100px;height:100px;margin-top:20px;"/>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content">
                            <el-button type="text" @click="gotoUserPage(cond.concernerUser.userId)" style="padding:20px 0 0 0;"><span>{{cond.concernerUser.userName}}</span></el-button>
                            <p>{{cond.concernerUser.userAbstract}}</p> 
                            <div class="bottom clearfix">
                                <span>{{cond.userArticleCount}}</span><span>篇文章,</span><span>{{cond.userConcernedCount}}</span><span>个关注</span>
                            </div>
                        </div></el-col>
                        <!-- <el-col :span="6"><div class="grid-content"><el-button style="margin-top:50px;" @click="handleCancleFollow(cond.concernedUser.userId)">加关注</el-button></div></el-col> -->
                        </el-row>
                    </el-card>
                    <br/>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                    @current-change="handleCurrentChange3"
                    :current-page.sync="pageNum3" 
                    :page-size="10"
                    :total="total3">
                    </el-pagination>
            </el-tab-pane>
            <!-- <el-tab-pane label="收藏">

            </el-tab-pane> -->
            </el-tabs>    
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
            <el-card class="box-card">
               <div>关注了 <el-button type="text"><h1>{{concernCount}}</h1></el-button> 个人</div>
            </el-card>
            <br />
            <el-card class="box-card">
               <div>关注者 <el-button type="text"><h1>{{fansCount}}</h1></el-button> 个人</div>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-upload
        class="avatar-uploader"
        action="cannot be reach here"
        :show-file-list="false"
        :http-request="uploadUserImage">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload()">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import axion from "@/util/http_url.js"; //接口文件
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      currentId: 0,
      // 判断当前userId是否为自己 1:是 0：不是
      myflag: 0,
      //关注状态 1：已关注 2:未关注
      concernStatus: 0,
      logo: logo,
      selectedTag: "0",
      status: "1",
      dialogVisible: false,
      imageUrl: "",
      userInfo: {
        userId: 0,
        userAccount: "",
        userPassword: "",
        userName: "",
        sex: "",
        userPermission: "",
        userAbstract: "",
        status: "",
        userImage: ""
      },
      fansCount: 0,
      concernCount: 0,
      //标签1
      articleList: [],
      pageNum: 1,
      total: 0,
      //标签2
      concernList: [],
      pageNum2: 1,
      total2: 0,
      //标签3
      concernedList: [],
      pageNum3: 1,
      total3: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.currentId = this.$route.params.id;
      if (this.currentId == this.$cookieStore.getCookie("userId")) {
        this.myflag = 0;
        this.$message("个人页面", "提示", {});
      } else {
        this.myflag = 1;
        this.$message("他人页面", "提示", {});
        this.getConcernStatus();
      }
      this.getUserInfoById();
      this.getUserFansCount();
      this.getUserConcernCount();
      this.getArticleListByUserId(this.currentId, 1);
    },
    getUserInfoById() {
      axion
        .getUserInfoById({
          userId: this.currentId
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.userInfo = d.data.data;
          console.log(this.userInfo);
        });
    },
    getConcernStatus() {
      axion
        .getConcernStatus({
          token: this.$cookieStore.getCookie("token"),
          concernedUserId: this.currentId
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.concernStatus = d.data.data > 0 ? 0 : 1;
        });
    },
    handleCancleFollow(id) {
      this.deleteConcern(id);
      this.getUserConcernList();
    },
    addConcern() {
      axion
        .addConcern({
          token: this.$cookieStore.getCookie("token"),
          concernedUserId: this.currentId
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
    getUserFansCount() {
      axion
        .getUserFansCount({
          userId: this.currentId
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.fansCount = d.data.data;
        });
    },
    getUserConcernCount() {
      axion
        .getUserConcernCount({
          userId: this.currentId
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.concernCount = d.data.data;
        });
    },
    getArticleListByUserId() {
      axion
        .getArticleListByUserId({
          userId: this.currentId,
          status: this.status,
          pageNum: this.pageNum,
          pageSize: 10
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.articleList = d.data.data.list;
          this.total = d.data.data.total;
          this.currentPage = d.data.data.pageNum;
        });
    },
    readFullText(articleId) {
      const { href } = this.$router.resolve({
        name: "page",
        params: {
          id: articleId
        }
      });
      window.open(href, "_blank");
      // this.$router.push("/" + articleId + "/page");
    },
    getUserConcernList() {
      axion
        .getUserConcernList({
          userId: this.currentId,
          pageNum: this.pageNum2,
          pageSize: 10
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.concernList = d.data.data.list;
          this.total2 = d.data.data.total;
          this.currentPage2 = d.data.data.pageNum;
        });
    },
    getUserFansList(){
      axion.getUserFansList({
          userId: this.currentId,
          pageNum: this.pageNum3,
          pageSize: 10
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.concernedList = d.data.data.list;
          this.total3 = d.data.data.total;
          this.currentPage3 = d.data.data.pageNum;
        });
    },
    // 标签页方法
    tabClick(targetName) {
      console.log(targetName.index);
      if (targetName.index == 0) {
        this.pageNum = 1;
        this.status = "1";
        this.getArticleListByUserId();
      }
      if (targetName.index == 1) {
        this.pageNum2 = 1;
        this.getUserConcernList();
      }
      if (targetName.index == 2) {
        this.pageNum3 = 1;
        this.getUserFansList(this.currentId, 1, 10);
      }
    },
    handleRadioChange() {
      this.getArticleListByUserId();
    },
    //分页方法
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getArticleListByUserId();
    },
    handleRadioChange() {
      this.getArticleListByUserId();
    },
    //分页方法2
    handleCurrentChange2(val) {
      // console.log(`当前页: ${val}`);
      this.getUserConcernList();
    },
    //分页方法3
    handleCurrentChange3(val) {
      // console.log(`当前页: ${val}`);
      this.getUserFansList();
    },
    //上传
    uploadUserImage(f){
      console.log(f);
      let form = new FormData();
      form.append("file",f.file);
      axion.uploadImg(form).then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.imageUrl = d.data.data.url;
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    confirmUpload(){
      
    },
    gotoUserPage(id) {
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
  border-radius: 100%;
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
/*上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
