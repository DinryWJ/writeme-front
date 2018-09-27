<template>
    <div>
        <el-row>
        <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
            <img src="" class="image">
            <div style="padding: 14px;">
                <span>首页轮播设置</span>
                <el-button style="float:right;" @click="dialogVisible = true">新增</el-button>
                  <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column
                    prop="tag"
                    label="名称"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="文章id"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    label="图片地址"
                    width="120">
                    <template slot-scope="scope"><img :src="scope.row.pic" height="50px"/></template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
            </el-card>
        </el-col>
        </el-row>

        <el-dialog
          title="新增轮播图"
          :visible.sync="dialogVisible"
          width="30%">
          <div>名称<br>
            <el-input v-model="tag" style="width:200px;margin:20px 0;"></el-input>
          </div>
          <div>文章id<br>
            <el-input v-model="address" style="width:200px;margin:20px 0;"></el-input>
          </div>
          <div>图片地址<br>
            <el-input v-model="pic" style="width:200px;margin:20px 0;"></el-input>
            <!-- <el-button type="primary" style="margin-left:20px;">上传<i class="el-icon-upload el-icon--right"></i></el-button> -->
            <el-upload
              style="width:400px;"
              class="upload-demo"
              action="cannot reach here"
              :http-request="uploadCoverImg"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
              :limit=1
              list-type="picture">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="commit()">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import axion from "@/util/http_url.js"; //接口文件
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      tag: "",
      address: "",
      pic: "",
      fileList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getCarouselList();
    },
    getCarouselList(){
      axion
        .getCarouselList({
          pageNum: 1,
          pageSize: 4
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.tableData = d.data.data.list;
        });
    },
    handleDelete(index, row) {
      axion
        .delCarousel({
          token: this.$cookieStore.getCookie("token"),
          id: row.id
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.$message("删除成功");
          this.init();
        });
    },
    commit() {
      axion
        .addCarousel({
          token: this.$cookieStore.getCookie("token"),
          tag: this.tag,
          address: this.address,
          pic: this.pic
        })
        .then(d => {
          if (d.data.code != 200) {
            this.$alert(d.data.type, "提示", {});
            return;
          }
          this.$message("成功");
          this.dialogVisible = false;
          this.init();
        });
    },
    //图片上传
    uploadCoverImg(f) {
      let formData = new FormData();
      formData.append("file", f.file);
      axion.uploadImg(formData).then(d => {
        if (d.data.code != 200) {
          this.$alert(d.data.type, "提示", {});
          f.onError("上传失败");
          return;
        }
        this.pic = d.data.data.url;
        f.onSuccess("上传成功");
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      this.fileLis = [];
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "png";
      const isLt500K = file.size / 1024 < 500;
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 jpg、png格式!",
          type: "warning"
        });
      }
      if (!isLt500K) {
        this.$message({
          message: "上传文件大小不能超过 500KB!",
          type: "warning"
        });
      }
      return (extension || extension2) && isLt500K;
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>



