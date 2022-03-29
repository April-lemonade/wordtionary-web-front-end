<template>
  <el-container>
    <el-header
        style="width:100%;height:70px;background:white;border-bottom:1px solid  #d7d7d7;box-sizing: border-box;align-items:center;display:flex;justify-content:space-between">
      <div
          style="display:flex;align-content:center;height:40px;align-items:center;margin-right:40px;width: 100%">
        <el-icon style="margin-right: 3%">
          <arrow-left-bold/>
        </el-icon>
        <img src="../../assets/testpaper_icon.svg" style="width:18px;height:20px;margin-right: 1%">
        <div>{{ exam.content }}</div>
      </div>
    </el-header>
    <el-main style="margin:0;padding:0;height: calc(100vh - 70px)">
      <el-scrollbar>
        <div style="display: flex;flex-direction: row;width: 100%">
          <div style="width: 20%;position: absolute;bottom: 0">
            <img style="width: 100%" src="../../assets/waiting.png"/>
          </div>
          <div style="width: 25%;position: absolute;right: 0;margin-top: 1%;z-index: -1">
            <img style="width: 20%;margin-right: 10px" src="../../assets/points.png"/>
            <img style="width: 20%;margin-right: 10px" src="../../assets/points.png"/>
            <img style="width: 20%;margin-right: 10px" src="../../assets/points.png"/>
          </div>
          <div
              style="width:58%;height:80%;padding: 5%;background-color: #ffffff;box-sizing: border-box;box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);margin-left: 21%;margin-top: 2%;align-items: center;display: flex;flex-direction: column">
            <div style="font-weight: bold;margin-bottom: 3%">{{ exam.content }}</div>
            <div style="display: flex;flex-direction: row;text-align: center;margin-bottom: 10%">
              <div style="font-weight: bold;margin-right: 4px">考试时间</div>
              {{ exam.examTime }}
            </div>
            <div style="margin-bottom: 10%">
              <div>考试说明：</div>
              <div>1、离开或退出考试界面答题计时不停止，请不要中途离开考试界面。</div>
              <div> 2、保持座位前的桌面干净，不要有与考试无关的内容。</div>
              <div>3、考试时间截止或答题时间结束，如果处于答题页面，将自动提交试卷。</div>
            </div>
            <el-button type="primary" color="#84cecd" round style="font-size: 18px;padding: 5px" @click="startExam">我已仔细阅读考试说明，进入考试
            </el-button>
          </div>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import {ArrowLeftBold} from '@element-plus/icons-vue'

export default {
  name: "waiting",
  components: {
    ArrowLeftBold
  },
  created() {
    let that = this
    this.exam = eval('(' + this.$route.query.obj + ')')
    console.log(this.exam)
  },
  methods:{
    startExam(){
      let obj = JSON.stringify(this.exam)
      // console.log(this.exam)
      this.$router.push({path: '/questions', query: {obj: obj}})
    }
  },
  mounted() {
  },
  data() {
    return {
      exam: {
        content: '2021-2022第2学期线性代数期末考试',
        time: '2022/1/1 13:40'
      }
    }
  }
}
</script>

<style scoped>
:deep(header.el-header) {
  display: none;
}
</style>
