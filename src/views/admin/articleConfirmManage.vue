<template>
<div>
  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <p></p>
  <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
      prop="name"
      label="姓名"
      width="120">
      </el-table-column>
      <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      pageNum: 1,
      total: 0,
      input:'',
      loading:false
    };
  },

  methods: {
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
      console.log(`当前页: ${val}`);
    }
  }
};
</script>