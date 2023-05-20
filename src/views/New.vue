<template>
  <div class="container">
    <el-menu style="width: 15%;height: auto;text-align: center;min-height: 100vh"
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
      <img style="width: 70%" src="../assets/logo_wordtionary.png"/>
      <el-menu-item index="2" @click="this.$router.go(-1)">
        <span slot="title">词表管理</span>
      </el-menu-item>
    </el-menu>
    <div style="width: 85%;display: flex;flex-direction: column;">
      <div style="width: fit-content;font-weight: bold;margin: 5%">新建词表</div>
      <!--      <div v-if="isManual===-1"
                 style="width: 60%;align-items: center;text-align: center;display: flex;flex-direction: row;margin-left: 20%;justify-content: space-between">
              <el-button type="primary" class="select" plain @click="isManual=0">
                批量导入
              </el-button>
              <el-button type="primary" class="select" plain @click="isManual=1">
                手动输入
              </el-button>
            </div>-->
      <div v-if="isManual===0" style="width: 100%;align-items: center;text-align: center">
        <el-form label-position="top" label-width="100px" style="width: 40%;margin-left: 30%">
          <el-form-item label="词表名称" prop="listName">
            <el-input style="height:100%" v-model="listName"></el-input>
          </el-form-item>
        </el-form>
        <el-upload
            :disabled="listName===''"
            class="upload-demo"
            drag
            :action="uploadUrl()"
            name="excelFile"
            accept=".csv, .xlsx"
            :on-success="handleSuccess"
            :limit="1"
            :file-list="fileList">
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
        </el-upload>
        <div style="margin:3% 0%">或</div>
        <el-button type="primary" plain @click="isManual=1">手动输入</el-button>
      </div>
      <el-form v-if="isManual===1" label-position="top" label-width="100px" style="width: 60%;margin-left: 20%">
        <el-form-item label="词表名称" prop="listName">
          <el-input style="height:100%" v-model="listName"></el-input>
        </el-form-item>
        <el-form-item prop="words">
          <div slot="label" class="el-form-item__label" style="width:100%;height:22px">
            <span>单词</span>
          </div>
          <el-input
              v-model="words"
              :autosize="{ minRows: 10, maxRows: 20 }"
              type="textarea"
              placeholder="单词之间用,分割"/>
        </el-form-item>
        <el-form-item style="margin-top:50px">
          <el-button type="primary" style="margin:0 auto;height:50px;width:100%;background: #0052d9;border:none"
                     @click="upload">上传
          </el-button>
        </el-form-item>
        <div style="width: 100%;text-align: center">
          <div>或</div>
          <el-button style="margin: 2%" type="primary" plain @click="isManual=0">批量导入</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import axios from "axios";

export function postUpload(file) {
  return axios({
    url: 'http://localhost:2346/wordlist/fileaddlist',
    method: 'post',
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  name: "New",
  data() {
    return {
      openid: '',
      isManual: 0,
      listName: '',
      words: '',
      fileList: []
    }
  },
  mounted() {
    const route = useRoute()
    this.openid = route.query.id
    // console.log(route.query.id)
  },
  methods: {
    upload() {
      let that = this
      if (this.isManual === 1) {
        console.log(this.listName)
        console.log(this.words.split('\n'))
        this.$postRequest('/wordlist/webaddlist?name=' + this.listName + '&word=' + this.words + '&openid=' + this.openid).then(res => {
          console.log(res)
          that.$router.go(-1)
        })
      }
    },
    handleSuccess() {
      console.log("success")
      this.$router.go(-1)
    },
    onUpload(file) {
      let formData = new FormData()
      formData.append('file', file.file)
      formData.append('name', this.listName)
      formData.append('openid', this.openid)
      postUpload(formData).then((res) => {
        console.log(res)
        // this.$message.success(this.$t('UPLOAD_SUCCESS'))
      })
    },
    uploadUrl() {
      return "http://localhost:2346/wordlist/fileaddlist?openid=" + this.openid + '&name=' + this.listName
    }
    /*beforeUpload(){
      const isExcel = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }*/
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

/*.select {
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 20px;
  font-weight: bold;
}*/
</style>
