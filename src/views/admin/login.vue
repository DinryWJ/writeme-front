<template>
<div class = "note" :style = "note">

<div  class="loginFrame">
  <el-card class="box-card">
  <div  class="formGroup">
    <el-form :model="form" status-icon ref="form"  class="demo-ruleForm" >
       <el-col :span="24">
          <el-form-item>
            <!-- <img src="../../assets/bg1.jpg" class="image" > -->
          </el-form-item>
          <el-form-item>
            <h2 style="line-height:10px">进入Write Me</h2>
          </el-form-item>
          <el-form-item >
              <el-input style="width:80%;margin-buttom:0px" placeholder="用户名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item >
              <el-input style="width:80%" type="password" placeholder="密码" v-model="form.pass" auto-complete="off" ></el-input>
          </el-form-item>
        
        <el-form-item :gutter="50">
            <el-button style="width:80%;background:black;color:white" @click="submitForm()" round>登录</el-button>
        </el-form-item>
        <el-col :offset="6">
          <el-form-item >
              <router-link to="/register">注册</router-link>
          </el-form-item>
        </el-col>
       </el-col>
    </el-form>
    <el-col :span="9 ">
      <div class="grid-content bg-purple">`
    </div>
    </el-col>
  </div>
  </el-card>
</div>
</div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.el-input__inner {
  border: 1px solid black;
}
.formGroup {
  width: 100%;
  height: 100%;
  text-align: center;
}
.demo-ruleForm {
  width: 100%;
  height: 100%;
  text-align: center;
}

img {
  width: 200px;
  height: 100px;
  padding-top: 20px;
}
.loginFrame {
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 7%;
  width: 400px;
  height: 450px;
  padding-bottom: 20px;
}
</style>

 
 
<script>
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      logining: false,
      note: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      },
      form: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    submitForm() {
      axion
        .login({
          account: this.form.name,
          password: this.form.pass
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          let currentToken = d.data.data.token;
          this.$cookieStore.addCookie("token", currentToken);
          this.$cookieStore.addCookie("userId", d.data.data.userId);
          this.$cookieStore.addCookie("userName", d.data.data.userName);
          this.$router.push("/");
        });
    }
  }
};
</script>