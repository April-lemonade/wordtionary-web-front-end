<template>
  <div style="display: flex;flex-direction: row">
    <div
        style="border-right-style: solid;border-right-width: 1px;height:calc(100vh);padding-left: 5%;padding-right: 5%;border-right-color: #D7D7D7;width: 20%;display: flex;flex-direction: column">
      <div style="margin-top: 10%;font-size: 20px;font-weight: bold">步骤：</div>
      <div style="display: flex;flex-direction: row;margin-top: 5%">
        <div :class="step==1?'active':'inactive'">1</div>
        <div style="padding: 10px">填写基本信息</div>
      </div>
      <div style="display: flex;flex-direction: row;margin-top: 5%">
        <div :class="step!=1?'active':'inactive'">2</div>
        <div style="padding: 10px">组卷</div>
      </div>
    </div>
    <div
        style="width: 77%;display: flex;justify-content: center;flex-direction: column;align-items: center;height: calc(100vh)">
      <el-scrollbar style="width: 100%;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top"
                 v-if="step==1" style="width: 90%;margin-left: 5%;margin-top: 5%">
          <el-row style="margin-bottom: 3%">
            <el-col :span="10">
              <el-form-item label="考试名称" prop="name">
                <el-input v-model="ruleForm.name" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 3%">
            <el-col :span="14">
              <el-form-item label="学院" prop="institution">
                <el-select size="medium" v-model="ruleForm.institution" placeholder="请选择学院" @change="getCourse">
                  <el-option v-for="institution in institutions" :value="institution.id" :key="institution.id"
                             :label="institution.facultyName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="课程" prop="course">
                <el-select size="medium" v-model="ruleForm.course" placeholder="请选择课程">
                  <el-option v-for="course in courses" :value="course.id" :key="course.id"
                             :label="course.course"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 3%">
            <el-col :span="20">
              <el-form-item label="考试时间" required>
                <el-col :span="6">
                  <el-form-item prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" size="medium"
                                    value-format="YYYY-MM-DD"
                                    style="width: 98%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="startTime">
                    <el-time-picker size="medium" placeholder="选择时间" v-model="ruleForm.startTime"
                                    value-format="HH:mm:ss"
                                    style="width: 98%;"></el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="6">
                  <el-form-item prop="endTime">
                    <el-time-picker size="medium" placeholder="选择时间" v-model="ruleForm.endTime" value-format="HH:mm:ss"
                                    style="width: 98%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 3%;display: flex;flex-direction: row;justify-content: flex-end">
            <el-button style="margin-left:3%;margin-top: 3%" size="medium">取消</el-button>
            <el-button type="primary" style="margin-left:3%;margin-top: 3%" size="medium" @click="goNext">下一步
            </el-button>
          </el-row>
        </el-form>
        <div v-if="step==2" style="width: 90%;margin-left: 5%">
          <div
              style="width: 100%;background-color: #F7F7F7;display:flex;justify-content:center;padding: 1%;border-radius: 10px">
            <div style="width: 100%;background-color: #D7D7D7;border-radius: 10px;padding: 1%">
              <div style="width: 98%;padding: 1%;background-color: white;border-radius: 5px">
                <div style="display: flex;flex-direction: column">
                  <div style="font-weight: bold;font-size: 20px;margin-bottom: 5%">{{ ruleForm.name }}</div>
                  <div style="width: 90%;margin-left:10%">
                    <div style="display: flex;flex-direction: row;width: 100%;margin-bottom: 2%">
                      <div style="width: 50%;display: flex;flex-direction: row">
                        <div style="font-weight: bold;margin-right: 5%">学院</div>
                        <div>{{ ruleForm.institution }}</div>
                      </div>
                      <div style="width: 50%;display: flex;flex-direction: row">
                        <div style="font-weight: bold;margin-right: 5%">考试开始时间</div>
                        <div>{{ ruleForm.date1 }} {{ ruleForm.date2 }}</div>
                      </div>
                    </div>
                    <div style="display: flex;flex-direction: row;width: 100%;margin-bottom: 3%">
                      <div style="width: 50%;display: flex;flex-direction: row">
                        <div style="font-weight: bold;margin-right: 5%">课程</div>
                        <div>{{ ruleForm.course }}</div>
                      </div>
                      <div style="width: 50%;display: flex;flex-direction: row">
                        <div style="font-weight: bold;margin-right: 5%;width: 100px">考试时长</div>
                        <div>{{ ruleForm.duration }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
              style="display: flex;flex-direction: row;margin-top: 5%;width: 80%;margin-left: 10%;justify-content: space-between">
            <div
                style="width: 100px;height:100px;border-radius: 10px;display:flex;flex-direction: column;align-items: center;justify-content: center;border-style: solid;border-width: 1px;border-color: #D7D7D7"
                @click="step = 3">
              <img style="width: 50px;height: 50px" src="../../../assets/auto.png"/>
              <div>智能组卷</div>
            </div>
            <div
                style="width: 100px;height:100px;border-radius: 10px;display:flex;flex-direction: column;align-items: center;justify-content: center;border-style: solid;border-width: 1px;border-color: #D7D7D7"
                @click="step = 4">
              <img style="width: 40px;height: 45px" src="../../../assets/byhand.png"/>
              <div>手动组卷</div>
            </div>
          </div>
          <el-button style="margin-left:3%;margin-top: 3%" size="medium" @click="step = 1">上一步</el-button>
        </div>
        <div v-if="step == 3" style="width: 90%;display: flex;flex-direction: column;margin: 5%">
          <div
              style="padding: 15px;border-radius: 8px;background-color: #fdfdfe;box-sizing: border-box;box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);">
            <div style="font-size: 20px;font-weight: bold;margin-bottom: 5%">试卷统计信息</div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;margin-bottom: 3%">
              <div style="display: flex;flex-direction: row;justify-content: center">
                <div style="width: 100px">总节数</div>
                <div class="num">{{ ruleForm.paper.length }}</div>
              </div>
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">难度系数</div>
                <div class="num">{{ difficulty }}</div>
              </div>
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;margin-bottom: 3%">
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">总题数</div>
                <div class="num">{{ questionCount }}</div>
              </div>
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">知识覆盖率</div>
                <div class="num">{{ difficulty }}</div>
              </div>
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;margin-bottom: 3%">
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">总分数</div>
                <div class="num">{{ totalScore }}</div>
              </div>
            </div>
          </div>
          <div style="display: flex;flex-direction: row">
            <el-button style="margin-left:3%;margin-top: 3%" size="medium" @click="step=2">上一步</el-button>
            <el-button style="margin-left:3%;margin-top: 3%" size="medium" type="primary">开始组卷</el-button>
            <el-button type="primary" size="medium" style="margin-left:3%;margin-top: 3%" @click="addSection">
              <el-icon class="el-icon--right">
                <plus/>
              </el-icon>
              新建小节
            </el-button>
          </div>
          <div v-for="(section,index) in ruleForm.paper">
            <div
                style="padding: 15px;border-radius: 8px;background-color: #fdfdfe;box-sizing: border-box;box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);margin-top: 4%">
              <div style="display: flex;flex-direction: row;justify-content: space-between">
                <div style="margin-bottom: 2%">第{{ index + 1 }}节</div>
                <el-icon @click="removeSection(index)">
                  <delete/>
                </el-icon>
              </div>
              <div style="display: flex;flex-direction: row">
                <el-form :inline="true" :model="ruleForm.paper[index]" class="demo-form-inline">
                  <el-form-item label="题目数量">
                    <el-input @change="countQuestion" v-model="ruleForm.paper[index].questionCount"></el-input>
                  </el-form-item>
                  <el-form-item label="每题分数">
                    <el-input @change="countQuestion" v-model="ruleForm.paper[index].questionScore"></el-input>
                  </el-form-item>
                  <el-form-item label="题目类型">
                    <el-select v-model="ruleForm.paper[index].questionType" placeholder="题型">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="难度系数">
                    <el-input v-model="ruleForm.paper[index].difficulty"></el-input>
                  </el-form-item>
                  <el-form-item label="知识点">
                    <el-cascader
                        placeholder="选择知识点"
                        :options="options"
                        :props="props"
                        collapse-tags
                        @change="handleChange"
                        clearable></el-cascader>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step == 4" style="width: 90%;display: flex;flex-direction: column;margin: 5%">
          <div
              style="padding: 15px;border-radius: 8px;background-color: #fdfdfe;box-sizing: border-box;box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);">
            <div style="font-size: 20px;font-weight: bold;margin-bottom: 5%">试卷统计信息</div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;margin-bottom: 3%">
              <div style="display: flex;flex-direction: row;justify-content: center">
                <div style="width: 100px">总节数</div>
                <div class="num">{{ ruleForm.paper.length }}</div>
              </div>
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">难度系数</div>
                <div class="num">{{ difficulty }}</div>
              </div>
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;margin-bottom: 3%">
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">总题数</div>
                <div class="num">{{ questionCount }}</div>
              </div>
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">知识覆盖率</div>
                <div class="num">{{ difficulty }}</div>
              </div>
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 90%;margin-bottom: 3%">
              <div style="display: flex;flex-direction: row">
                <div style="width: 100px">总分数</div>
                <div class="num">{{ sectionCount }}</div>
              </div>
              <!--            <div style="display: flex;flex-direction: row">
                            <div style="width: 100px">知识覆盖率</div>
                            <div>{{ difficulty }}</div>
                          </div>-->
            </div>
          </div>
          <div style="display: flex;flex-direction: row">
            <el-button style="margin-left:3%;margin-top: 3%" size="medium" @click="step=2">上一步</el-button>
            <el-button style="margin-left:3%;margin-top: 3%" size="medium" type="primary">开始组卷</el-button>
            <el-button type="primary" size="medium" style="margin-left:3%;margin-top: 3%" @click="addSection">
              <el-icon class="el-icon--right">
                <plus/>
              </el-icon>
              新建小节
            </el-button>
          </div>
          <div v-for="(section,index) in ruleForm.paper">
            <div
                style="padding: 15px;border-radius: 8px;background-color: #fdfdfe;box-sizing: border-box;box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);margin-top: 4%">
              <div style="display: flex;flex-direction: row;justify-content: space-between">
                <div style="margin-bottom: 2%">第{{ index + 1 }}节</div>
                <el-form :inline="true" :model="ruleForm.paper[index]">
                  <el-form-item label="题型">
                    <el-select v-model="ruleForm.paper[index].questionType" placeholder="请选择" @change="getQuestion">
                      <el-option
                          v-for="item in questionTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="每题分数">
                    <el-input @change="countQuestion" v-model="ruleForm.paper[index].questionScore"></el-input>
                  </el-form-item>
                </el-form>
                <el-icon @click="removeSection(index)">
                  <delete/>
                </el-icon>
              </div>
              <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="描述"
                    width="240">
                </el-table-column>
                <el-table-column
                    prop="point"
                    label="知识点"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="出题时间"
                    width="140">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="130">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {Plus, Delete} from '@element-plus/icons-vue'

export default {
  components: {
    Plus,
    Delete
  },
  name: "NewExamination",
  mounted() {
    let that = this
    this.$axios.get('http://121.196.198.132:7003/faculty/list', {headers: {'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOjMsImNyZWF0ZWQiOjE2NDc2NTg2NzEyMjQsInVzZXJfYWNjb3VudCI6ImFkbWluIiwiZXhwIjoxNjQ4ODY4MjcxfQ.6bfeYtwoWEQx7EmXRvm-eE8NOWm-Jog_Ix1OFGvsdIyCT1ZFeOvYzGixlrJqV4K9WexiEOLtUp-c0hJoicrO3A'}}).then(res => {
      that.institutions = res.data.data
      console.log(that.institutions[0])
    })

    this.$axios.post(`http://121.196.198.132:7004/question/list?type=1`, {'id': 1}, {
          headers: {
            'content-type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOjMsImNyZWF0ZWQiOjE2NDc2NTg2NzEyMjQsInVzZXJfYWNjb3VudCI6ImFkbWluIiwiZXhwIjoxNjQ4ODY4MjcxfQ.6bfeYtwoWEQx7EmXRvm-eE8NOWm-Jog_Ix1OFGvsdIyCT1ZFeOvYzGixlrJqV4K9WexiEOLtUp-c0hJoicrO3A'
          }
        }
    ).then(res => {
      if (res.data.code == 200) {
        console.log(res.data.data)
        this.allQuestions = res.data.data.data
      } else {
        console.log(res)
      }
    })
  },
  data() {
    return {
      step: 1,
      allQuestions: [],
      ruleForm: {
        name: '',
        institution: '',
        course: '',
        date: '',
        startTime: '',
        endTime: '',
        // duration: '',
        paper: []
      },
      rules: {
        name: [
          {required: true, message: '请输入考试名称', trigger: 'blur'}
        ],
        institution: [
          {required: true, message: '请选择学院', trigger: 'change'}
        ],
        course: [
          {required: true, message: '请选择课程', trigger: 'change'}
        ],
        date: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        startTime: [
          {required: true, message: '请选择时间', trigger: 'change'}
        ],
        endTime: [
          {required: true, message: '请选择时间', trigger: 'change'}
        ],
        /*duration: [
          {required: true, message: '请输入考试用时', trigger: 'blur'},
          {type: 'number', message: '考试时长必须为数字值'}
        ],*/
      },
      sectionCount: 2,
      questionCount: 0,
      difficulty: 0.0,
      totalScore: 0,
      institutions: [],
      courses: [],
      institution: '',
      props: {multiple: true},
      options: [{
        value: 1,
        label: '一级知识点1',
        children: [{
          value: 2,
          label: '二级知识点1',
        }, {
          value: 7,
          label: '二级知识点2',
        }, {
          value: 12,
          label: '二级知识点3',
        }]
      }, {
        value: 17,
        label: '一级知识点2',
        children: [{
          value: 18,
          label: '二级知识点1',
        }, {
          value: 21,
          label: '二级知识点2',
        }]
      }],
      questionTypes: [{
        value: 1,
        label: '选择题'
      }, {
        value: 2,
        label: '判断题'
      }, {
        value: 3,
        label: '填空题'
      }],
      questionData: [{
        id: 1,
        content: "操作员接口是操作系统为用户提供的使用计算机系统的手段之一，该接口是指"
      }]
    }
  },
  methods: {
    getQuestion() {
      // this.allQuestions.find(question => question.)
    },
    goNext() {
      this.step = 2
      console.log(this.ruleForm)
    },
    getCourse() {
      console.log(this.ruleForm.institution)
      let that = this
      this.$axios.get('http://121.196.198.132:7003/course/list?facultyId=' + that.ruleForm.institution, {headers: {'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOjMsImNyZWF0ZWQiOjE2NDc2NTg2NzEyMjQsInVzZXJfYWNjb3VudCI6ImFkbWluIiwiZXhwIjoxNjQ4ODY4MjcxfQ.6bfeYtwoWEQx7EmXRvm-eE8NOWm-Jog_Ix1OFGvsdIyCT1ZFeOvYzGixlrJqV4K9WexiEOLtUp-c0hJoicrO3A'}}).then(res => {
        that.courses = res.data.data.data
        // console.log(res.data.data.data)
        that.ruleForm.course = ''
      })
    },
    countQuestion() {
      this.questionCount = 0
      this.totalScore = 0
      let that = this
      this.ruleForm.paper.forEach(function (section) {
        console.log(section.questionCount)
        that.questionCount += parseInt(section.questionCount)
        that.totalScore += parseInt(section.questionCount) * parseFloat(section.questionScore)
      })
    },
    handleChange(value) {
      console.log(value);
      if (value == 1) {

      }
      if (value == 2) {

      }
      if (value == 3) {

      }
    },
    removeSection(index) {
      this.ruleForm.paper.splice(index, 1)
      this.countQuestion()
    },
    addSection() {
      if (this.step == 3) {
        this.ruleForm.paper.push({
          questionCount: 0,
          questionType: '',
          questionScore: '0',
          difficulty: 0,
          points: [],
        })
      }
      if (this.step == 4) {
        this.ruleForm.paper.push({
          questionCount: 0,
          questionScore: '0',
          questionType: 1,
          questionIds: [],
        })
      }
    }
  }
}
</script>

<style scoped>
.inactive {
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 2px;
  border-radius: 200px;
  text-align: center;
  padding: 10px;
  color: white;
  background-color: #D7D7D7;
}

.active {
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 2px;
  border-radius: 200px;
  text-align: center;
  padding: 10px;
  color: #42b983;
  border-color: #42b983;
}

:deep(.el-form--small.el-form--label-top .el-form-item .el-form-item__label) {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 10px;
}

.num {
  text-align: center;
  width: 40px;
  height: 20px;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  padding: 5px;
}

.el-col.el-col-2.line {
  text-align: center;
}
</style>
