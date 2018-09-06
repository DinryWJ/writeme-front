<template>
    <div>
        <h2>推荐关注</h2>
        <br/>
        <div :span="8" v-for="(usr,index) in recommendedUserList" :key="usr.userId">
        <el-card :body-style="{ padding: '0px' }" shadow="none">
            <el-row>
            <el-col :span="6"><div class="grid-content">
                <img :src="usr.userImage" class="img" style="width:100px;height:100px;margin-top:20px;"/>
            </div></el-col>
            <el-col :span="12"><div class="grid-content">
                <el-button type="text" @click="gotoUserPage(usr.userId)" style="padding:20px 0 0 0;"><span>{{usr.userName}}</span></el-button>
                <p>{{usr.userAbstract}}</p> 
                <div class="bottom clearfix">
                    <el-button type="text" @click="gotoUserPage(usr.fromUserId)" style="padding:20px 0 0 0;"><span>{{usr.fromUserName}}</span></el-button><span>关注了该作者</span>
                </div>
            </div></el-col>
            <el-col :span="6"><el-button plain class="button" v-show="usr.concernStatus==0" @click="handleConcern(1,usr.userId,index)">关注TA</el-button>
            <el-button plain class="button" v-show="usr.concernStatus==1" @click="handleConcern(0,usr.userId,index)">取消关注</el-button></el-col>
            </el-row>
        </el-card>
        <br/>
        </div>
        <!-- 分页 -->
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum" 
        :page-size="10"
        :total="total">
        </el-pagination>
    </div>
</template>
<script>
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      recommendedUserList: [],
      pageNum: 1,
      total: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getMyRecommentUserList();
    },
    gotoUserPage(id) {
      const { href } = this.$router.resolve({
        name: "userPage",
        params: {
          id: id
        }
      });
      window.open(href, "_blank");
    },
    getMyRecommentUserList() {
      axion
        .getMyRecommentUserList({
          token: this.$cookieStore.getCookie("token"),
          pageNum: this.pageNum,
          pageSize: 10
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.recommendedUserList = d.data.data.list;
          this.total = d.data.data.total;
        });
    },
    handleConcern(val, id, index) {
      this.recommendedUserList[index].concernStatus = val;
      if (val == 1) {
        this.addConcern(id);
      } else {
        this.deleteConcern(id);
      }
    },
    addConcern(id) {
      axion
        .addConcern({
          token: this.$cookieStore.getCookie("token"),
          concernedUserId: id
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }

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

          this.$message("已取消关注！");
        });
    },
    //分页方法
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getMyRecommentUserList();
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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

.bottom {
  margin-top: 13px;
  line-height: 12px;
  font-size: 12px;
}

.button{
    margin-top: 50px;
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
