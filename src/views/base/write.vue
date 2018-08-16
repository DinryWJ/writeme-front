<template>
  <div>
    <!-- <input type="button" value="切换裁切" @click="canCrop=!canCrop"> -->
    <editor ref="myTextEditor"
            :fileName="'myFile'"
            :canCrop="canCrop"
            :uploadUrl="uploadUrl"
            v-model="content"></editor>
    <div v-html="content"></div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import editor from '@/components/Quilleditor.vue'
import {baseURL} from '@/util/config.js'
export default {
  data(){
    return {
      canCrop:true,
      /*测试上传图片的接口，返回结构为{url:''}*/
      uploadUrl: baseURL+'/upload/upload',
      content:''
    }
  },
  components: {
    editor
  }
}
</script>

<style>
</style>
