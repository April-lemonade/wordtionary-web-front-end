<template>
  <div style="display: flex;flex-direction: row">
    <div style="margin: 2%;width: 96%;display: flex;flex-direction: column">
      <div
          style="justify-content: center;font-size: 20px;font-weight: bold;display: flex;flex-direction: row;margin-bottom: 2%">
        {{ exam.content }}&nbsp;{{ row.detail.id }}题 批阅
      </div>
      <div
          style="display: flex;flex-direction: row;font-weight: bold;margin-top: 2%;font-size: 20px;margin-bottom: 2%">
        {{ row.detail.id }}：{{ row.detail.content }}
      </div>
      <div style="color: #a7a7a7;font-weight: bold">学生答案</div>
      <div
          style="border-style: solid;border-width: 1px;border-color: #D7D7D7;border-radius: 5px;margin-top: 2%;padding: 2%">
        {{ detail.studentAnswer }}
      </div>
      <div style="color: #a7a7a7;font-weight: bold;margin-top: 2%">标准答案</div>
      <div
          style="border-style: solid;border-width: 1px;border-color: #D7D7D7;border-radius: 5px;margin-top: 2%;padding: 2%">
        {{ detail.referenceAnswer }}
      </div>
      <div
          style="background-color: #F7F7F7;padding: 3%;justify-content:space-between;font-weight: bold;font-size: 15px;margin-top: 2%;display: flex;flex-direction: row">
        <div>满分：{{ detail.fullScore }}</div>
        <div>得分：
          <el-input-number v-model="score" @change="handleChange" :min="0"
                           :max="question.point"></el-input-number>
        </div>
      </div>
      <div style="margin-top: 3%;width: 100%;display: flex;justify-content: center;flex-direction: row">
        <el-button @click="this.$router.go (-1)">退出</el-button>
        <el-button type="primary" @click="next">下一份</el-button>
      </div>
      <!--      <el-dialog
                v-model="dialogVisible"
                width="30%">
              <span>未通过样卷批阅，请重试。</span>
              <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">退出</el-button>
              <el-button type="primary" @click="again">重试</el-button>
            </span>
              </template>
            </el-dialog>
            <el-dialog
                v-model="dialogVisible1"
                width="30%">
              <span>您已通过样卷批阅，可前往正式批阅。</span>
              <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">退出</el-button>
              <el-button type="primary" @click="again">前往</el-button>
            </span>
              </template>
            </el-dialog>-->
    </div>
  </div>
</template>

<script>
import {InfoFilled} from '@element-plus/icons-vue'

export default {
  name: "mark_example",
  components: {
    InfoFilled
  },
  data() {
    return {
      teacherAccount: '',
      detail: {},
      row: {},
      num: 0,
      paperCount: 1,
      dialogVisible: false,
      dialogVisible1: false,
      score: 0,
      stuScores: [[0, 0]],
      error: 10,
      exampleFinished: 0,
      current: 0,
      question: {
        qid: '1.1',
        description: '什么是理想？',
        stdAns: '这是第一题的标准答案',
        point: 10,
        error: 20,
      },
      stuAns: '这是一份学生的答案',
      exampleAns: ['这是第一份样卷的答案', '这是第二份样卷的答案', '这是第三份样卷的答案'],
      stdExampleScores: [0, 1, 2],
      exampleScores: [],
      exam: {
        name: '2022学年第一学期思修期末考试',
        stuAns: [['这是第一题的答案', '这是第二题的答案']],
        paper: [{
          section: '第一节',
          questions: [{
            qid: '1.1',
            description: '什么是理想？',
            stdAns: '这是第一题的标准答案',
            point: 10
          }, {
            qid: '1.2',
            description: '什么是信念？',
            stdAns: '这是第二题的标准答案',
            point: 10
          }]
        }]
      },
    }
  },
  methods: {
    again() {
      location.reload()
    },
    submit() {
      console.log(this.exampleScores)
      for (let i = 0; i < this.stdExampleScores.length; i++) {
        let max = this.stdExampleScores[i] + this.stdExampleScores[i] * (this.error / 100)
        let min = this.stdExampleScores[i] - this.stdExampleScores[i] * (this.error / 100)
        if (this.exampleScores[i] > max || this.exampleScores[i] < min) {
          this.dialogVisible = true;
          return;
        }
      }
      this.dialogVisible1 = true
    },
    next() {
      let that = this
      console.log(this.score)
      this.$postRequest('/exam/reviewed/review/score?questionIndex=' + this.row.detail.id + '&reviewedId=' + this.detail.reviewedId + '&score=' + this.score + '&teacherAccount=' + this.teacherAccount).then(res => {
        console.log(res)
      })
      this.detail = {}
      this.$postRequest('/exam/reviewed/review?examinationPaperId=' + this.exam.paperId + '&questionIndex=' + this.row.detail.id).then(res => {
        if (res.data) {
          that.detail = res.data
          console.log(that.detail)
        }
      })
    },
    handleChange() {
      console.log(this.stuScores);
    },
  },
  created() {
    let that = this
    this.exam = eval('(' + this.$route.query.exam + ')')
    this.row = eval('(' + this.$route.query.row + ')')
    this.teacherAccount = this.$route.query.teacherAccount
    console.log(this.exam)
    console.log(this.teacherAccount)
    this.$postRequest('/exam/reviewed/review?examinationPaperId=' + this.exam.paperId + '&questionIndex=' + this.row.info.questionIndex).then(res => {
      console.log(res)
      if (res.data) {
        that.detail = res.data
        console.log(that.detail)
      }
    })
  },
  mounted() {
    let that = this
    this.exampleFinished = this.$route.query.exampleFinished
    let arr = []
    for (let i = 0; i < this.exampleAns.length; i++) {
      arr[i] = 0;
    }
    this.exampleScores = arr

  }
}
</script>

<style scoped>
:deep(.el-input-number__decrease) {
  display: none;
}

:deep(.el-input-number__increase) {
  display: none;
}

.inactive {
  width: 30px;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  padding: 2%;
  margin: 2%;
  font-size: 20px;
  border-color: #D7D7D7
}

.active {
  width: 30px;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  padding: 2%;
  margin: 2%;
  font-size: 20px;
  border-color: #42b983;
}
</style>
