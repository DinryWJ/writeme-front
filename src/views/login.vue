<template>
<el-container>
    <el-header></el-header>
    <el-main>
        <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        </el-form-item>
        </el-form>
</el-main>
</el-container>

</template>
<script>
export default {
  data() {
    return {
      form: {
        name:'',
        pass: ''
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>