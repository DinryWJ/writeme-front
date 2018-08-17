<template>
  <el-tabs :tab-position="tabPosition" style="height: 600px;">
    <el-tab-pane label="账号与密码">
        <h2>账号与密码</h2>
        <hr/>
        <div>
          <h3>密码</h3><el-input placeholder="请输入内容" v-model="pass" clearable></el-input>
          手机<el-input placeholder="请输入内容" v-model="phone" clearable></el-input>
          个性签名<el-input placeholder="请输入内容" v-model="sign" clearable></el-input>
        </div>
    </el-tab-pane>
    <el-tab-pane label="消息设置">
        <h2>消息设置</h2>
    </el-tab-pane>
    <el-tab-pane label="隐私">
        <h2>隐私</h2>
    </el-tab-pane>
    <el-tab-pane label="偏好设置">
        <h2>偏好设置</h2>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
    el-tab-pane{
        font-size: 30px;
    }
</style>


<script>
  export default {
    data() {
      return {
        tabPosition: 'left',
        pass:'',

      };
    }
  };
</script>