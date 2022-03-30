<template>
  <el-container>
    <el-header
        style="width:100%;height:70px;background:white;border-bottom:1px solid  #d7d7d7;box-sizing: border-box;align-items:center;display:flex;justify-content:space-between">
      <div
          style="display:flex;align-content:center;height:40px;align-items:center;margin-right:40px;width: 100%;justify-content: space-between">
        <div>{{ exam.content }}</div>
        <div style="display: flex;flex-direction: row">
          <el-button @click="dialogVisible = true">提交试卷</el-button>
          <div>{{ time }}</div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-dialog
          title="提示"
          v-model="dialogVisible"
          width="30%">
        <div style="margin-bottom: 5%">确定提交试卷吗？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
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
        <div v-if="!expand" style="display:flex;width:100%;height:100px;margin-top:10px;flex-direction: column">
          <div v-for="(question,index1) in questions" style="display: flex;align-items: center;flex-direction: column">
            <div
                style="width: 40px;height: 40px;border-style: solid;border-width: 1px;border-radius: 40px;align-items: center;display: flex;justify-content: center;border-color: #a7a7a7">
              <img src="../../assets/testpaper_icon.svg"/>
            </div>
            <div>第{{ question.section }}节</div>
            <div v-for="(each,index2) in question.question">
              <div :class="(currentQuestion === index2 && currentSection=== index1) ?'active':'index'"
                   @click="changeQuestion(index1,index2)">
                {{ index2 + 1 }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="expand" style="display:flex;width:100%;height:100px;margin-top:10px;flex-direction: column">
          <div v-for="question in questions" style="display: flex;align-items: center;flex-direction: column">
            <div
                style="width: 40px;height: 40px;border-style: solid;border-width: 1px;border-radius: 40px;align-items: center;display: flex;justify-content: center;border-color: #a7a7a7">
              <img src="../../assets/testpaper_icon.svg"/>
            </div>
            <div>第{{ question.section }}节</div>
            <div style="display: flex;flex-direction: row;flex-wrap: wrap;width: 100%">
              <div v-for="(each,index) in question.question">
                <div :class="current === index?'active':'index'">{{ index + 1 }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main style="margin:0;padding:0;height: calc(100vh - 70px)">
        <el-scrollbar>
          <div class="main">
            <div style="background-color: white;padding: 50px">
              <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-between">
                <div v-if="questions.length!==0&&questions[currentSection].question[currentQuestion].type===1"
                     style="width: 42px;height: 40px;background-color: #d7d7d7;">
                  <img style="width: 40px;height: 38px;" src="../../assets/select_icon.png">
                </div>
                <div v-if="questions.length!==0&&questions[currentSection].section_score">
                  分值：{{ questions[currentSection].section_score }}
                </div>
              </div>
              <div>
                {{ questions.length === 0 ? undefined : questions[currentSection].question[currentQuestion].content }}
              </div>
              <div class="ans"
                   v-if="questions.length!==0"
                   @click="stuAns[currentSection][currentQuestion]='A'">
                <div :class="stuAns[currentSection][currentQuestion]==='A'?'active1':'select'">A</div>
                <div>
                  {{ questions.length === 0 ? undefined : questions[currentSection].question[currentQuestion].a }}
                </div>
              </div>
              <div class="ans" v-if="questions.length!==0"
                   @click="stuAns[currentSection][currentQuestion]='B'">
                <div :class="stuAns[currentSection][currentQuestion]==='B'?'active1':'select'">B</div>
                <div>
                  {{ questions.length === 0 ? undefined : questions[currentSection].question[currentQuestion].b }}
                </div>
              </div>
              <div class="ans" v-if="questions.length!==0" @click="stuAns[currentSection][currentQuestion]='C'">
                <div :class="stuAns[currentSection][currentQuestion]==='C'?'active1':'select'">C</div>
                <div>
                  {{ questions.length === 0 ? undefined : questions[currentSection].question[currentQuestion].c }}
                </div>
              </div>
              <div class="ans" v-if="questions.length!==0" @click="stuAns[currentSection][currentQuestion]='D'">
                <div :class="stuAns[currentSection][currentQuestion]==='D'?'active1':'select'">D</div>
                <div>
                  {{ questions.length === 0 ? undefined : questions[currentSection].question[currentQuestion].d }}
                </div>
              </div>
              <div style="display: flex;flex-direction: row;margin-top: 3%">
                <el-button v-if="currentSection!==0||currentQuestion!==0" @click="previous">上一题</el-button>
                <el-button
                    v-if="currentSection!==questions.length-1||currentQuestion!==questions[currentSection].question.length-1"
                    @click="next">下一题
                </el-button>
              </div>
            </div>
          </div>
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
      time: '',
      flag: false,
      endTime: '2022-03-30 12:51:00',
      exam: {
        content: '2021-2022第2学期线性代数期末考试',
        time: '2022/1/1 13:40'
      },
      dialogVisible: false,
      questions: [],
      stuAns: [],
      currentQuestion: 0,
      currentSection: 0
    }
  },
  created() {
    let that = this
    this.exam = eval('(' + this.$route.query.obj + ')')
    console.log(this.exam)
  },
  methods: {
    submit() {
      this.dialogVisible = false
      console.log(this.stuAns)
      let obj = JSON.stringify(this.exam)
      this.$router.push({path: '/end', query: {obj: obj}})
    },
    previous() {
      if (this.currentQuestion === 0) {
        this.currentSection -= 1;
        this.currentQuestion = this.questions[this.currentSection].question.length - 1
      } else {
        this.currentQuestion -= 1
      }
    },
    next() {
      console.log(this.questions[this.currentSection].question.length)
      if (this.currentQuestion === this.questions[this.currentSection].question.length - 1) {
        this.currentSection += 1
        this.currentQuestion = 0
      } else {
        this.currentQuestion += 1
      }
    },
    changeQuestion(index1, index2) {
      this.currentSection = index1
      this.currentQuestion = index2
    },
    init() {
      let that = this
      this.$getRequest('/exam/examinationPaper/info/question/' + this.exam.paperId).then(res => {
        if (res.data) {
          this.$nextTick(() => {
            that.questions = res.data
            that.questions.forEach(each => {
              let temp = []
              each.question.forEach(every => {
                temp[temp.length] = ''
              })
              that.stuAns[that.stuAns.length] = temp
            })
            console.log(that.stuAns)
          })
        }
      })
    },
    timeDown() {
      const endTime = new Date(this.endTime)
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
      let d = parseInt(leftTime / (24 * 60 * 60))
      let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
      let m = this.formate(parseInt(leftTime / 60 % 60))
      let s = this.formate(parseInt(leftTime % 60))
      if (leftTime <= 0) {
        this.flag = true
        this.$emit('time-end')
      }
      this.time = `${h}小时${m}分${s}秒`     // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
    },
    formate(time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    }
  },

  mounted() {
    let that = this
    this.exam = eval('(' + this.$route.query.obj + ')')
    console.log(this.exam)
    this.endTime = this.exam.endTime
    this.init()
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time)
      }
      this.timeDown()
    }, 500)
  }
  ,
  props: {
    endTime: {
      type: String
    }
  }
  ,
}
</script>

<style scoped>
.aside {
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2px;
  border: 1px solid #c7c7c7;
  background-color: #ffffff;
  box-sizing: border-box;
}

.index {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 10px;
  border: 1px solid;
  background-color: #f2f2f2;
  box-sizing: border-box;
  color: #333333;
  align-items: center;
  line-height: normal;
  margin-top: 10%;
  margin-right: 10px;
}

.active {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 10px;
  border: 1px solid #84cecd;
  background-color: rgba(132, 206, 205, 0.28);
  box-sizing: border-box;
  color: #84cecd;
  align-items: center;
  line-height: normal;
  margin-top: 10%;
  margin-right: 10px;
}

.main {
  width: 80%;
  padding: 20px;
  border-radius: 20px;
  background-color: #f2f2f2;
  box-sizing: border-box;
  margin-left: 10%;
  margin-top: 2%;
}

.select {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 40px;
  border: 1px solid;
  background-color: #f2f2f2;
  box-sizing: border-box;
  color: #333333;
  align-items: center;
  line-height: normal;
  margin-right: 10px;
}

.ans {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3%
}

.active1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 40px;
  border: 1px solid #84cecd;
  background-color: rgba(132, 206, 205, 0.28);
  box-sizing: border-box;
  color: #84cecd;
  align-items: center;
  line-height: normal;
  margin-right: 10px;
}
</style>
