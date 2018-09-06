<template>
<div>
  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:120px;">
      <el-option label="账户名" value="1"></el-option>
      <el-option label="用户昵称" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
  </el-input>
  <p></p>
  <el-table
      v-loading="loading"
      ref="multipleTable"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
      label="用户账号"
      width="100">
      <el-button  
      type="text"
      slot-scope="scope"
      @click="gotoUserPage(scope.row.userId)">{{scope.row.userAccount}}</el-button>
      </el-table-column>
      <el-table-column
      prop="userName"
      label="用户名"
      width="150">
      </el-table-column>
      <el-table-column
      prop="sex"
      label="性别"
      width="50">
      </el-table-column>
      <el-table-column
      prop="userPermission"
      label="权限"
      width="50">
      </el-table-column>    
      <el-table-column
      prop="userAbstract"
      label="简介"
      width="150">
      </el-table-column>  
      <el-table-column
      prop="status"
      label="状态"
      width="50">
      </el-table-column>  
      <el-table-column
      label="头像" 
      width="80">
      <img style="width:100%" slot-scope="scope" :src="scope.row.userImage"/>
      </el-table-column>  
      <el-table-column label="操作">
      <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">发信息</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">封禁</el-button>
          </template>
      </el-table-column>
  </el-table>
  <!-- 分页 -->
  <section class="margintop20 textAlignRight">
      <el-pagination 
      @current-change="handleCurrentChange" 
      :current-page.sync="pageNum" 
      :page-size="10" 
      :total="total">
      </el-pagination>
  </section>
</div>

</template>

<script>
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      total: 0,
      input:'',
      select:'1',
      loading:false
    };
  },
mounted(){
  this.init();
},
  methods: {
    init(){
      this.getUserListByCondition();
    },
    getUserListByCondition(){
      this.loading = true;
      axion.getUserListByCondition({
        name:this.input,
        flag:this.select,
        pageNum:this.pageNum,
        pageSize:10
      }).then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.tableData = d.data.data.list;
          this.total = d.data.data.total;
          this.loading = false;
        });
    },
    search(){
      this.getUserListByCondition();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //分页方法
    handleCurrentChange(val) {
      this.getUserListByCondition();
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
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
