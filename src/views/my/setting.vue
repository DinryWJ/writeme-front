<template>
  <el-tabs :tab-position="tabPosition" style="height: 800px">
     
    <el-tab-pane label="账号与密码">
      
        <h2>账号与密码</h2>
        <hr/>
        <h3>密码</h3>
        <div class="password">
          <el-input style="margin-left:50px;margin-bottom:20px" placeholder="请输入新密码" v-model="pass" clearable></el-input>
          <el-input style="margin-left:50px" placeholder="请重新输入新密码" v-model="pass" clearable></el-input>
        </div>
        <hr class="hr0" />  
        <h3>手机</h3>
        <div class="phone">
          <el-input style="margin-left:50px" placeholder="请输入内容" v-model="phone" clearable></el-input>
        </div>
         <hr class="hr0" />  
         <h3>个性签名</h3>
         <div class="sign">
          <el-input style="margin-left:50px" type="textarea" placeholder="请输入内容" v-model="desc" clearable></el-input>
        </div>
        <el-button style="margin-top:30px" type="primary" round>保存</el-button>
    </el-tab-pane>
    <el-tab-pane type="border-card" label="消息设置">
        <h2>消息设置</h2>
        <hr/>
        <div>
          <h3>赞同消息设置</h3>
           <div class="demo-input-suffix">
          <span>有人对我赞同是，我会收到消息</span>
          <el-switch
          style="margin-top: 35px;"
            v-model="value1"
            active-text="ON"
            inactive-text="OFF"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
           </div>
           <hr class="hr0" />  
           <div class="demo-input-suffix">
          <span>关注消息设置</span>
          <el-switch
          style="margin-top: 35px;"
            v-model="value2"
            active-text="ON"
            inactive-text="OFF"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
           </div>
        </div>
    </el-tab-pane>
    <el-tab-pane label="隐私">
        <h2>隐私</h2>
        <hr/>
         <h3>隐私保护</h3>
         <span>在站外隐藏个人信息</span>
          <el-switch
            v-model="value3"
            active-text="ON"
            inactive-text="OFF"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
    </el-tab-pane>
    <el-tab-pane label="偏好设置">
        <h2>偏好设置</h2>
        <hr/>
        <h3>图片水印</h3>
        <span>在我上传的图片上显示水印</span>
          <el-switch
            v-model="value4"
            active-text="ON"
            inactive-text="OFF"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
    </el-tab-pane>

     
  </el-tabs>
  
</template>

<style scoped>
    el-tab-pane{
        font-size: 30px;
    }
    .el-switch{
      float: right;
    }
    .el-input{
      width: 50%;
    }
    .hr0{ height:1px;
    border:none;
    border-top:1px dashed rgb(67, 72, 77);
    } 
    .phone{
      height: 70px;
      
    }
    .password{
       height: 120px;
      
    }
    .sign{
      height: 100px;
      width: 50%;
    }
 .demo-input-suffix{
height: 70px;
line-height: 70px;
 }
</style>


<script>
  export default {
    data() {
      return {
        tabPosition: 'left',
        pass:'',
        value1:true,
        value2:true,
         value3:true,
          value4:true,
      };
    }
  };
</script>