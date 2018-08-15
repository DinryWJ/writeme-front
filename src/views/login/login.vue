<template>
<div class = "note" :style = "note">

<div :span="9 " type="border-card" class="loginFrame">
  <div class="tab">
  <el-radio-group v-model="labelPosition" size="small">
    <el-radio-button label="left">普通用户</el-radio-button>
    <el-radio-button label="right">管理员</el-radio-button>
  </el-radio-group>
  </div>
  <div  class="formGroup">
    <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-ruleForm" >
       <el-col :span="18 " style="float:none;margin-lef:10%">
      <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
      </el-form-item>
      
        <el-form-item :gutter="50">
            <el-button type="primary" @click="submitForm('form')">登录</el-button>
            <el-button style="margin-left:25%" type="primary" @click="submitForm('form')">注册</el-button>
        </el-form-item>
        
      
       </el-col>
    </el-form>
    <el-col :span="9 ">
      <div class="grid-content bg-purple">
    </div>
    </el-col>
  </div>
</div>
</div>
</template>
<style>
body{
  margin:0 ;
  padding: 0;
  width: 100%;
  height: 100%;
}
   
  .loginFrame{
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 10%;
    width:400px;
    background:rgb(247, 244, 244,0.8);
    padding-bottom: 20px;
  }
  .tab{ 
    text-align: center;
    padding-top: 15px;
    margin-bottom:15px; 
  }
</style>

 
 
<script>
export default {
  name: '登录',
    data() {
        return {
            logining : false,
            note: {
                position:"absolute",
                top:"0px",
                left:"0px",
                width: "100%",
                height:"100%",
                backgroundImage: "url(" + require("../../assets/bg1.jpg") + ")",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                
            },
            form: {
                name:'',
                pass:''
            }
      };
    },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //TODO 登录操作。。。

          this.$cookieStore.addCookie( 'token' , "token");
          this.$router.push('/');
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