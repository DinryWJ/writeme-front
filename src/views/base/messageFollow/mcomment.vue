<template>
 <el-row :gutter="20">
      <el-col :span="24" margin-bottom="20px">
    <div :span="8" v-for="item in list" :key="item.userId">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-container >
            <el-aside width="100px">
                    <img :src="item.img" class="image"/>  
            </el-aside>
           <el-container>
            <el-header> 
              <el-col>              
                <el-button type="text" @click="gotoUserPage(item.userId)"> {{item.name}} </el-button>
                <el-row>                 
                   <el-col :span="4" style="margin-top:11px;"><small>在文章</small></el-col> 
                   <el-col :span="20">
                    <div><el-button style="margin-left:-2px;width:100%;font-size: 20px;" type="text" @click="readFullText(item.articleId)">{{item.articleName}}</el-button>  </div>
                  </el-col>               
                </el-row>
              </el-col>
            </el-header>
            
            <el-main style="margin-top:10px;">
                <p>{{item.content}}</p>
            </el-main>

             <el-footer>{{item.time}}</el-footer>
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
export default{
  data(){
    return{
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
  methods:{
    getDate() {
      axion
        .getCommentList({
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
      polling(){
      this.getDate(); 
       var str = location.href; 
       var arr=str.split('/');    
      if(arr[arr.length-1]=='message'){          
      console.log('请求成功');
        setTimeout(()=>{
          this.polling()
        },10000)
      }else{
        console.log('请求失败或切换页面');
        return;
      }
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
.el-button{
  text-align: left;
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
.el-aside{
  margin-top:20px;
}
.el-button{
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 0.2;
-webkit-box-orient: vertical;
}
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
</style>