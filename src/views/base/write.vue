<template>
 <div class='tinymce'>
  <div style="padding:20px 0;">
        <div style="float:right;">  
      <el-button type="primary" round @click="save()">保存</el-button>
      <el-button type="success" round @click="publish()">发布</el-button>
    </div>
      <el-input placeholder="请输入标题" v-model="title">
        <template slot="prepend">标题</template>
      </el-input>

  </div>
  <br/>
  <div>
    <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
    <h2>预览</h2>
    <p v-html='tinymceHtml'></p>
  </div>
  
 </div>
</template>

<script>
import axion from "@/util/http_url.js"; //接口文件

import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
export default {
  name: "tinymce",
  data() {
    return {
      tinymceHtml: "",
      title: "",
      init: {
        language_url: "/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/lightgray",
        height: 600,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false,
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler: function(blobInfo, success, failure) {
          let formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          axion.uploadImg(formData).then(d => {
            if (d.data.code != 200) {
              this.$alert(d.data.type, "提示", {});
              failure("上传失败");
            }
            success(d.data.data.url);
          });
        }
      }
    };
  },
  mounted() {
    tinymce.init({});
  },
  components: { Editor },
  methods: {
    publish() {
      //获取预览文本
      let activeEditor = tinymce.activeEditor;
      let editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      let preview = activeEditor.selection.getContent({ format: "text" });
      if (preview.length > 50) {
        preview = preview.substring(0, 50);
      }

      //获取预览图
      let regex = "src=['\"]?([^'\"]*)['\"]?";
      let result = this.tinymceHtml.match(regex);
      // let coverImg = result[0].substring(6,result[0].length-2);
      let coverImg;
      if (result != null) {
        coverImg = result[1];
      } else {
        coverImg = "";
      }
      axion
        .publish({
          token: this.$cookieStore.getCookie("token"),
          title: this.title,
          content: this.tinymceHtml,
          preview: preview,
          coverImg: coverImg,
          corpusId: 1
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.$alert("发布成功,请等待审核通过。。", "提示", {});
          this.$router.push("/");
        });
    },
    save() {
      axion
        .saveArticle({
          token: this.$cookieStore.getCookie("token"),
          title: this.title,
          content: this.tinymceHtml,
          corpusId: 1
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.$alert("保存成功!", "提示", {});
        });
    }
  }
};
</script>