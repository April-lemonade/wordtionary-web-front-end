<template>
  <div style="display: flex;flex-direction: row">
    <div style="margin: 2%;width: 66%;display: flex;flex-direction: column">
      <div
          style="justify-content: center;font-size: 20px;font-weight: bold;display: flex;flex-direction: row;margin-bottom: 2%">
        {{ exam.content }}&nbsp;{{ row.detail.id }}题&nbsp;
        <div style="color: red">样卷</div>
        批阅
      </div>
      <div
          style="display: flex;flex-direction: row;font-weight: bold;margin-top: 2%;font-size: 20px;margin-bottom: 2%">
        {{ row.detail.id }}：{{ row.detail.content }}
      </div>
      <div style="color: #a7a7a7;font-weight: bold">学生答案</div>
      <div
          style="border-style: solid;border-width: 1px;border-color: #D7D7D7;border-radius: 5px;margin-top: 2%;padding: 2%">
        {{ detail[current].studentAnswer }}
      </div>
      <div style="color: #a7a7a7;font-weight: bold;margin-top: 2%">标准答案</div>
      <div
          style="border-style: solid;border-width: 1px;border-color: #D7D7D7;border-radius: 5px;margin-top: 2%;padding: 2%">
        {{ row.detail.answer }}
      </div>
      <div
          style="background-color: #F7F7F7;padding: 3%;justify-content:space-between;font-weight: bold;font-size: 15px;margin-top: 2%;display: flex;flex-direction: row">
        <div>满分：{{ row.info.fullScore }}</div>
        <div>得分：
          <el-input-number v-model="stuScores[current]" @change="handleChange" :min="0"
                           :max="row.info.fullScore"></el-input-number>
        </div>
      </div>
      <div style="margin-top: 3%;width: 100%;display: flex;justify-content: center;flex-direction: row">
        <el-button type="primary" @click="current = current-1" v-if="current>0">上一份</el-button>
        <el-button type="primary" @click="next" v-if="current<exampleAns.length-1">下一份</el-button>
      </div>
      <el-dialog
          v-model="dialogVisible"
          width="30%">
        <span>未通过样卷批阅，请重试。</span>
        <template #footer>
      <span class="dialog-footer">
<!--        <el-button @click="dialogVisible = false">退出</el-button>-->
        <el-button type="primary" @click="dialogVisible = false">重试</el-button>
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
      </el-dialog>
    </div>
    <div
        style="width: 27%;display: flex;flex-direction: column;border-left-style: solid;border-left-width: 1px;border-left-color: #D7D7D7">
      <div
          style="width: 100%;padding: 5%;font-weight: bold;font-size: 20px;border-bottom-style: solid;border-bottom-width: 1px;border-bottom-color: #D7D7D7;display: flex;flex-direction: row;justify-content: space-between">
        <div>试卷导航</div>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
      <div style="display: flex;flex-direction: row;flex-wrap: wrap;width: 96%;margin: 2%">
        <div v-for="(ans,index) in detail" :class="current === index?'active':'inactive'" style="cursor: pointer">
          <div style="display:flex;align-content: center;justify-content: center" @click="current=index">{{
              index + 1
            }}
          </div>
        </div>
      </div>
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
      num: 0,
      teacherAccount: '',
      row: {},
      detail: {},
      paperCount: 1,
      dialogVisible: false,
      dialogVisible1: false,
      score: 0,
      stuScores: [],
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
      console.log(this.stuScores)
      let stdScores = []
      this.detail.forEach(each => {
        stdScores[stdScores.length] = each.score
      })
      let that = this
      for (let i = 0; i < stdScores.length; i++) {
        let max = stdScores[i] * (1 + this.error / 100)
        let min = stdScores[i] * (1 - this.error / 100)
        if (this.stuScores[i] > max || this.stuScores[i] < min) {
          this.dialogVisible = true;
          return;
        }
      }
      this.dialogVisible1 = true
      this.$postRequest('/exam/reviewed/set/passExample?examinationPaperId=' + this.exam.paperId + '&questionIndex=' + this.row.info.questionIndex + "&teacherAccount=" + this.teacherAccount).then(res => {
        console.log(res)
        if (res.data) {
          let exam = JSON.stringify(that.exam)
          let rows = JSON.stringify(that.row)
          this.$router.push({
            path: '/teacher/mark/mark_question',
            query: {exam: exam, teacherAccount: that.teacherAccount, row: rows}
          })
        }
      })
    },
    next() {
      if (this.exampleFinished === 0) {
        if (this.current < this.exampleAns.length - 1) {
          this.current = this.current + 1
          this.exampleScores[this.exampleScores.length] = this.score
          console.log(this.exampleScores)
        } else {

        }
      }
    },
    handleChange() {
      console.log(this.stuScores);
    },
    init() {

    }
  },
  created() {
    this.exam = eval('(' + this.$route.query.obj + ')')
    this.row = eval('(' + this.$route.query.row + ')')
    console.log(this.row)
    this.teacherAccount = this.$route.query.teacherAccount
    let that = this
    this.$postRequest('/exam/reviewed/review/example?examinationPaperId=' + this.exam.paperId + "&questionIndex=" + this.row.info.questionIndex).then(res => {
      if (res.data) {
        that.error = res.data.allowableError
        that.detail = res.data.studentAnswers
        that.detail.forEach(each => {
          that.stuScores[that.stuScores.length] = 0
        })
        console.log("sds", that.detail[0].studentAnswer)
      }
    })
  },
  mounted() {

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
