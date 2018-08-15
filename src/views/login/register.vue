<template>
<div class = "note" :style = "note">
<div :span="9 " type="border-card" class="registerFrame">

    <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-ruleForm">
     <el-col :span="18 " style="float:none;margin-lef:10%">
    <el-form-item label="用户名" style="padding-top:20px">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="再次输入密码">
      <el-input type="password" v-model="form.repass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button style="width:100%" type="primary" @click="submitForm('form')">注册</el-button>
    </el-form-item>
     </el-col>
    </el-form>
          
    <el-col :span="9 "><div class="grid-content bg-purple"></div></el-col>
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
   
  .registerFrame{
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 10%;
    width:400px;
    background:rgb(247, 244, 244,0.8);
    padding-bottom: 20px;
  }
 
</style>
<script>
export default {
 name: '注册',
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