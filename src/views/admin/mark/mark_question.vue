<template>
  <div style="display: flex;flex-direction: row">
    <div style="margin: 2%;width: 66%;display: flex;flex-direction: column">
      <div
          style="justify-content: center;font-size: 20px;font-weight: bold;display: flex;flex-direction: row;margin-bottom: 2%">
        {{ exam.name }}
        <div style="color: red">样卷</div>
        批阅
      </div>
      <div v-for="(section,index1) in exam.paper">
        <div style="background-color: #F7F7F7;padding: 5%;text-align: center;font-weight: bold;font-size: 20px">
          {{ section.section }}
        </div>
        <div v-for="(question,index2) in section.questions">
          <div
              style="display: flex;flex-direction: row;font-weight: bold;margin-top: 2%;font-size: 20px;margin-bottom: 2%">
            {{ question.qid }}：{{ question.description }}
          </div>
          <div style="color: #a7a7a7;font-weight: bold">学生答案</div>
          <div
              style="border-style: solid;border-width: 1px;border-color: #D7D7D7;border-radius: 5px;margin-top: 2%;padding: 2%">
            {{ exam.stuAns[index1][index2] }}
          </div>
          <div style="color: #a7a7a7;font-weight: bold;margin-top: 2%">标准答案</div>
          <div
              style="border-style: solid;border-width: 1px;border-color: #D7D7D7;border-radius: 5px;margin-top: 2%;padding: 2%">
            {{ question.stdAns }}
          </div>
          <div
              style="background-color: #F7F7F7;padding: 3%;justify-content:space-between;font-weight: bold;font-size: 15px;margin-top: 2%;display: flex;flex-direction: row">
            <div>满分：{{ question.point }}</div>
            <div>得分：
              <el-input-number v-model="stuScores[index1][index2]" @change="handleChange" :min="0"
                               :max="question.point"></el-input-number>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 3%;width: 100%;display: flex;justify-content: center">
        <el-button type="primary" @click="dialogVisible = true">提交</el-button>
      </div>
      <el-dialog
          v-model="dialogVisible"
          width="30%">
        <span>您已经批阅{{ paperCount }}份试卷，是否继续批阅？</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">否，结束批阅</el-button>
        <el-button type="primary" @click="dialogVisible = false">是，继续批阅</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
    <div
        style="width: 28%;display: flex;flex-direction: column;border-left-style: solid;border-left-width: 1px;border-left-color: #D7D7D7">
      <div
          style="width: 100%;padding: 5%;font-weight: bold;font-size: 20px;border-bottom-style: solid;border-bottom-width: 1px;border-bottom-color: #D7D7D7">
        分数概览
      </div>
      <div style="height:400px;">
        <el-scrollbar style="width: 100%">
          <div style="padding: 5%" v-for="(section,index1) in exam.paper">
            <div style="font-weight: bold;margin-bottom: 3%">{{ section.section }}</div>
            <div style="display: flex;flex-direction: row;width: 100%;flex-wrap: wrap">
              <div v-for="(question,index2) in section.questions" style="width: 30%">
                <div style="display: flex;flex-direction: row;margin-top: 2%;align-items: center">
                  <div style="font-weight: bold">{{ question.qid }}</div>
                  <div
                      style="padding: 3%;background-color: #75c9c7;margin-left: 5%;color: white;width: 40px;height: 40px;display: flex;justify-content: center;align-items: center">
                    {{ stuScores[index1][index2] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div
          style="width: 100%;padding: 5%;font-weight: bold;font-size: 20px;border-bottom-style: solid;border-bottom-width: 1px;border-bottom-color: #D7D7D7;border-top-style: solid;border-top-width: 1px;border-top-color: #D7D7D7">
        样卷设定
      </div>
      <div style="padding: 5%;display: flex;flex-direction: row">
        允许误差：

        <el-input-number style="margin-left: 3%;margin-right: 3%" v-model="error" :min="0" :max="100" size="small"
                         @change="handleChange"/>
        %
        <el-popover
            placement="top-start"
            title="允许误差"
            :width="200"
            trigger="hover"
            content="教师批阅时分数可上下浮动的范围，超过范围则需重新批阅"
        >
          <template #reference>
            <el-icon slot="reference">
              <infoFilled color="#409EFC" style="margin-top: 5px"/>
            </el-icon>
          </template>
        </el-popover>
      </div>
      <div style="padding: 5%;display: flex;flex-direction: row">
        样卷数量：
        <div style="width: 50%;text-align: center">{{ paperCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {InfoFilled} from '@element-plus/icons-vue'

export default {
  name: "mark_question",
  components: {
    InfoFilled
  },
  data() {
    return {
      num: 0,
      paperCount: 1,
      dialogVisible: false,
      stuScores: [[0, 0]],
      error: 10,
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
    handleChange() {
      console.log(this.stuScores);
    }
  },
  mounted() {
    console.log(this.$route.query.obj)
    console.log(this.exam.stuAns[0].length)
    let arr = []
    for (let i = 0; i < this.exam.stuAns.length; i++) {
      arr[i] = []
      for (let j = 0; j < this.exam.stuAns[i].length; j++) {
        arr[i][j] = 0
      }
    }
    this.stuScores = arr
    console.log(this.stuScores.length)
    // this.exam = eval('(' + this.$route.query.obj + ')')
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
</style>
