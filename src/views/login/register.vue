<template>
<div class = "note" :style = "note">
  <div class="registerFrame">
   <el-card class="box-card">
     <div  class="formGroup">
    <el-form :model="form" status-icon ref="form" class="demo-ruleForm">
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
      <el-input  style="width:80%;margin-buttom:0px" placeholder="密码" type="password" v-model="form.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item >
      <el-input style="width:80%" type="password" placeholder="再次输入密码" v-model="form.repass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item :gutter="50">
        <el-button style="width:80%;background:black;color:white" type="primary" @click="submitForm()">注册</el-button>
    </el-form-item>
    <el-col :offset="6">
          <el-form-item >
              <router-link to="/login">已注册/登录</router-link>
          </el-form-item>
        </el-col>
     </el-col>
    </el-form>
          
  <el-col :span="9 "><div class="grid-content bg-purple"></div></el-col>
     </div>
 </el-card>
</div>  
  
</div>
</template>
<style scoped>
body{
  margin:0 ;
  padding: 0;
  width: 100%;
  height: 100%;
}
    img{
     width: 200px;
     height: 100px;
     padding-top: 20px;
   }
   .formGroup{
  width: 100%;
  height: 100%;
  text-align: center;
}
.demo-ruleForm{
   width: 100%;
  height: 100%;
  text-align: center;
}
.el-input__inner{
  border:1px solid black;
}
  .registerFrame{
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 7%;
    width:400px;
    height: 450px;
    padding-bottom: 20px;
  }
 
</style>
<script>
import axion from "@/util/http_url.js"; //接口文件
export default {
    data() {
        return {
            logining : false,
            note: {
                position:"absolute",
                top:"0px",
                left:"0px",
                width: "100%",
                height:"100%",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                
            },
      form: {
        name:'',
        pass: '',
        repass:''
      }
    };
  },
  methods: {
    submitForm() {
      axion.register({
        account:this.form.name,
        password:this.form.pass,
        repassword:this.form.repass
      }).then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.$alert("注册成功", "提示", {});
          this.$router.push('/login');
        });
    }
  }
};
</script>