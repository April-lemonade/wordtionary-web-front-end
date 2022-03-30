<template>
  <div style="background-color:#f3f4f8;padding: 20px">
    <el-icon @click="this.$router.go(-1)">
      <arrow-left-bold/>
    </el-icon>
    <div style="background-color: white;">
      <div style="width: 100%;text-align: center;font-weight: bold;font-size: 22px;margin-top: 3%">
        {{ exam.content }}
      </div>
      <div
          style="display: flex;flex-direction: row;width: 100%;justify-content: center;margin-top: 3%">
        <div style="font-weight: bold">考试时间</div>
        <div style="margin-left: 2%">{{ duration }}分钟</div>
        <div style="font-weight: bold;margin-left: 3%">满分</div>
        <div style="margin-left: 2%">{{ fullScore }}分</div>
      </div>
      <div>
        <div v-for="section in questions">
          <div style="width: 100%;font-weight: bold;font-size: 18px;margin-left: 5%;margin-top: 3%">
            第{{ section.section }}节 （每题{{ section.section_score }}分)
          </div>
          <div v-for="(question,index) in section.question" style="margin-left: 5%;margin-top: 3%">
            <div style="display: flex;flex-direction: row;">
              <div style="margin-right: 2%">{{ index + 1 }}.</div>
              <div>{{ question.content }}</div>
            </div>
            <div v-if="question.type === 1">
              <div style="margin-top: 2%">A.&nbsp;{{ question.a }}</div>
              <div style="margin-top: 2%">B.&nbsp;{{ question.b }}</div>
              <div style="margin-top: 2%">C.&nbsp;{{ question.c }}</div>
              <div style="margin-top: 2%">D.&nbsp;{{ question.d }}</div>
            </div>
            <div v-if="question.type === 2">
              <div style="margin-top: 2%">A.&nbsp;正确</div>
              <div style="margin-top: 2%">B.&nbsp;错误</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ArrowLeftBold} from '@element-plus/icons-vue'

export default {
  name: "preview",
  components: {
    ArrowLeftBold
  },
  data() {
    return {
      exam: {},
      questions: [],
      duration: 0,
      fullScore: 0
    }
  },
  created() {
    let that = this
    this.exam = eval('(' + this.$route.query.obj + ')')
    console.log(this.exam)
    this.duration = this.getHour(that.exam.examTime, that.exam.endTime)
    this.$getRequest('/exam/examinationPaper/info/question/' + this.exam.id).then(res => {
      if (res.data) {
        that.questions = res.data
        that.questions.forEach(each => {
          that.fullScore += each.section_score * each.question.length
        })
      }
    })
  },
  methods: {
    getHour(s1, s2) {
      const reDate = /\d{4}-\d{1,2}-\d{1,2} /;
      s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'));
      s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'));
      const ms = s2.getTime() - s1.getTime();

      if (ms < 0) return 0;
      return Math.floor(ms / 1000 / 60);  //小时
    }
  }
}
</script>

<style scoped>

</style>
