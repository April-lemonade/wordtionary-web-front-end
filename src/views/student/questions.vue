<template>
  <el-container>
    <el-header
        style="width:100%;height:70px;background:white;border-bottom:1px solid  #d7d7d7;box-sizing: border-box;align-items:center;display:flex;justify-content:space-between">
      <div
          style="display:flex;align-content:center;height:40px;align-items:center;margin-right:40px;width: 100%">
        <div>{{ exam.content }}</div>
      </div>
    </el-header>
    <el-container>
      <el-aside :style="{'width': (expand ? '175px':'75px')}" class="aside">
        <div style="margin-top: 5%;height: fit-content" @click="expand = !expand">
          <el-icon v-if="!expand">
            <arrow-right-bold/>
          </el-icon>
          <div style="display: flex;flex-direction: row;align-items: center;justify-content: center" v-if="expand">
            <el-icon>
              <arrow-left-bold/>
            </el-icon>
            <div>收缩</div>
          </div>
        </div>
        <div v-if="!expand"
             style="display:flex;width:100%;height:100px;margin-top:10px;flex-direction: column">
          <div v-for="question in questions">
            <div
                style="width: 40px;height: 40px;border-style: solid;border-width: 1px;border-radius: 40px;align-items: center;display: flex;justify-content: center;border-color: #a7a7a7">
              <img src="../../assets/testpaper_icon.svg"/>
            </div>
            <div>第{{question.section}}节</div>
          </div>
        </div>
      </el-aside>
      <el-main style="margin:0;padding:0;height: calc(100vh - 70px)">
        <el-scrollbar>

        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {ArrowRightBold, ArrowLeftBold} from '@element-plus/icons-vue'

export default {
  name: "questions",
  components: {ArrowRightBold, ArrowLeftBold},
  data() {
    return {
      expand: false,
      exam: {
        content: '2021-2022第2学期线性代数期末考试',
        time: '2022/1/1 13:40'
      },
      questions: []
    }
  },
  created() {
    let that = this
    this.exam = eval('(' + this.$route.query.obj + ')')
    console.log(this.exam)
    this.$getRequest('/exam/examinationPaper/info/question/' + this.exam.paperId).then(res => {

      if (res.data) {
        that.questions = res.data
        console.log(that.questions)
      }
    })
  }
}
</script>

<style scoped>
.aside {
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2px 2px 2px 2px;
  border: 1px solid #c7c7c7;
  background-color: #ffffff;
  box-sizing: border-box;
}

</style>
