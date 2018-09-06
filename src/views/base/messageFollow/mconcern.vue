<template>
 <el-row :gutter="20">
      <el-col :span="24" margin-bottom="20px">
    <div :span="8" v-for="item in list" :key="item.userId">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-container height="100px">
            <el-aside width="100px" height="70px">              
                    <img :src="item.img" class="image"/>                
            </el-aside>
            <el-container>
                <el-header height="20px">
                  <el-button type="text" @click="gotoUserPage(item.userId)" style="padding:20px 0 0 0;">
                  <span>{{item.name}}</span>
                  </el-button>关注了你
                </el-header>
              <br/>
                <el-main height="70px">
                  <el-row>
                    <el-col :span="16">
                    <p>{{item.time}}</p>
                    </el-col>
                    <el-col :span="8">
                    <el-button  v-if="item.isConcern=='0'" @click="handleAddFollow(item.userId)">关&emsp;&emsp;注</el-button>
                    <el-button  v-if="item.isConcern=='1'" @click="handleCancleFollow(item.userId)">取消关注</el-button>            
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axion from "@/util/http_url.js"; //接口文件
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      currentId:0,

      list:[],
      pageNum: 1,
      total:0
    };
  },
  mounted() {
    this.currentId=this.$cookieStore.getCookie("userId");
    this.polling();
  },
  methods: {
    getDate(){
      axion.getNoReadConcernList({ 
        userId: this.$cookieStore.getCookie("userId"),
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
      this.pageNum=val;
      this.polling();
      },
      handleCancleFollow(id) {
      this.deleteConcern(id);
    },
     handleAddFollow(id) {
      this.addConcern(id);
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
          this.polling();
          this.$message("已取消关注！");
        });
    },addConcern(id) {
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
          this.polling();
          this.$message("已关注！");
        });
    },polling(){
      this.getDate(); 
       var str = location.href; 
       var arr=str.split('/');    
      if(arr[arr.length-1]=='mcollect'){          
      console.log('请求成功');
        setTimeout(()=>{
          this.polling()
        },10000)
      }else{
        console.log('请求失败或切换页面');
        return;
      }
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