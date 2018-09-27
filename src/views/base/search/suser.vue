<template>
 <el-row :gutter="20">
      <el-col :span="24" margin-bottom="20px">
    <div :span="8" v-for="item in list" :key="item.userId">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-container height="100px">
            <el-aside width="100px" height="70px">              
                    <img :src="item.userImage" class="image"/>                
            </el-aside>
            <el-container>
                <el-header height="20px">
                  <el-button type="text" @click="gotoUserPage(item.userId)" style="padding:20px 0 0 0;">
                  <span>{{item.userName}}</span>
                  </el-button>
                </el-header>
              <br/>
                <el-main height="70px">
                  <el-row>
                    <el-col :span="16">
                    <p>{{item.userAbstract}}</p>
                    </el-col>
                    
                  </el-row>
                </el-main>
               
            </el-container>
        </el-container>
        </el-card>
        <br>
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
        .getUserListByCondition({
         name: this.$route.params.searchkey,
         flag:2,
         status:0,
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
          this.pageNum = d.data.data.pageNum;
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
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.userOperator {
  padding: 20px 0;
  border: 1px solid rgb(252, 252, 252);
}
.imgbtn {
  width: 100%;
}
.el-main{
    padding-left: 20px;
    padding-top: 0;
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
  height: 50px;
  width: 50px;
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
.el-aside{
  margin-top:20px;
}
</style>