<template>
  <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="账号与密码">
        <h2>账号与密码</h2>
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
        tabPosition: 'left'
      };
    }
  };
</script>