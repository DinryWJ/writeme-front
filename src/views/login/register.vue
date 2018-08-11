<template>
<el-container>
    <el-header></el-header>
    <el-main>
      <el-row>
        <el-col :span="9"><div class="grid-content bg-purple"><h1>writeme</h1></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
            <h1>注册</h1>
            <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码">
              <el-input type="password" v-model="form.repass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
            </el-form>
          </div></el-col>
        <el-col :span="9 "><div class="grid-content bg-purple"></div></el-col>
      </el-row>

</el-main>
</el-container>

</template>

<script>
export default {
  data() {
    return {
      form: {
        name:'',
        pass: '',
        repass:''
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //注册操作。。。
          
          this.$router.push('/login');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

  }
};
</script>