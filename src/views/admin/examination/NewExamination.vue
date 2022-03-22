<template>
  <div style="display: flex;flex-direction: row">
    <div
        style="border-right-style: solid;border-right-width: 1px;height:calc(100vh);padding-left: 5%;padding-right: 5%;border-right-color: #D7D7D7;width: 20%;display: flex;flex-direction: column">
      <div style="margin-top: 10%;font-size: 20px;font-weight: bold">步骤：</div>
      <div style="display: flex;flex-direction: row;margin-top: 5%">
        <div :class="step===1?'active':'inactive'">1</div>
        <div style="padding: 10px">填写基本信息</div>
      </div>
      <div style="display: flex;flex-direction: row;margin-top: 5%">
        <div :class="step!==1?'active':'inactive'">2</div>
        <div style="padding: 10px">组卷</div>
      </div>
    </div>
    <div
        style="width: 77%;display: flex;justify-content: center;flex-direction: column;align-items: center;height: calc(100vh)">
      <el-scrollbar style="width: 100%;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top"
                 v-if="step===1" style="width: 90%;margin-left: 5%;margin-top: 5%">
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
                <el-select size="medium" v-model="ruleForm.institution" placeholder="请选择学院" @change="getCourse"
                           value-key="facultyName">
                  <el-option v-for="institution in institutions" :value="institution.id" :key="institution.id"
                             :label="institution.facultyName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="课程" prop="course">
                <el-select size="medium" v-model="ruleForm.course" placeholder="请选择课程" @change="getCourseName">
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
            <el-button type="primary" style="margin-left:3%;margin-top: 3%" size="medium" @click="step = 2">下一步
            </el-button>
          </el-row>
        </el-form>
        <div v-if="step===2" style="width: 90%;margin-left: 5%">
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
                        <div>{{ ruleForm.institutionName }}</div>
                      </div>
                      <div style="width: 50%;display: flex;flex-direction: row">
                        <div style="font-weight: bold;margin-right: 5%">考试时间</div>
                        <div>{{ ruleForm.startTime }} {{ ruleForm.endTime }}</div>
                      </div>
                    </div>
                    <div style="display: flex;flex-direction: row;width: 100%;margin-bottom: 3%">
                      <div style="width: 50%;display: flex;flex-direction: row">
                        <div style="font-weight: bold;margin-right: 5%">课程</div>
                        <div>{{ ruleForm.courseName }}</div>
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
                @click="goNext">
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
            <el-button style="margin-left:3%;margin-top: 3%" size="medium" @click="goPrevious">上一步</el-button>
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
        <div v-if="step === 4" style="width: 90%;display: flex;flex-direction: column;margin: 5%">
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
                  ref="table1"
                  :data="allQuestions"
                  style="width: 98%"
                  @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                  <template #default="props">
                    <div style="display: flex;flex-direction: row">
                      <div style="width: 98%;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 2%">
                        <div
                            style="display: flex;flex-direction: row;font-size: 13px;justify-content: space-between;width: 100%;margin-bottom: 5%">
                          <div style="font-weight: bold">题目： &nbsp; {{ props.row.content }}</div>
                        </div>
                        <div v-if="props.row.type ==1" style="display: flex;flex-direction: column">
                          <div>A. {{ questionDetail.a }}</div>
                          <div>B. {{ questionDetail.b }}</div>
                          <div>C. {{ questionDetail.c }}</div>
                          <div>D. {{ questionDetail.d }}</div>
                        </div>
                        <div style="font-weight: bold">正确答案: {{ questionDetail.answer }}</div>
                        <div>
                          作者：{{ props.row.name }} | 上传时间：{{ props.row.createTime }} | 难度系数：{{ props.row.difficulty }} |
                          知识点：{{ props.row.outline }} | 使用次数：{{ props.row.usageTimes }}
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    type="selection"
                    width="30">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="描述"
                    width="240">
                </el-table-column>
                <el-table-column
                    prop="outline"
                    label="知识点"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="出题时间"
                    width="140">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="80">
                  <template #default="scope">
                    <el-button type="text" @click="toogleExpand(scope.row)">详情</el-button>
                  </template>
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
    this.$getRequest('/user/faculty/list').then(res => {
      if (res.data) {
        that.institutions = res.data
        console.log(that.institutions[0])
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
        institutionName: '',
        course: '',
        courseName: '',
        date: '',
        startTime: '',
        endTime: '',
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
      },
      sectionCount: 2,
      questionCount: 0,
      difficulty: 0.0,
      totalScore: 0,
      institutions: [],
      courses: [],
      questions: [],
      section: [],
      institution: '',
      questionDetail: {},
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
      }]
    }
  },
  methods: {
    handleSelectionChange(value) {
      for (let i = 0; i < value.length; i++) {
        this.questions [this.questions.length + i] = value[i].id
      }
      this.section[this.section.length] = value.length
      console.log(this.questions)
      console.log(this.section)
    },
    goPrevious() {
      this.step = 2
      this.totalScore = 0
      this.questionCount = 0
      this.sectionCount = 0
      this.ruleForm.paper = []
    },
    getCourseName(value) {
      const item1 = this.courses.find((item) => {
        return item.id === value
      })
      this.ruleForm.courseName = item1.course
      console.log(item1.course)
    },
    toogleExpand(row) {
      this.questionDetail = {}
      let that = this
      this.$nextTick(() => {
        let $table = this.$refs.table1[0]
        console.log('sxa', $table)
        that.$getRequest('/exam/question/info/' + row.id).then(res => {
          if (res.data) {
            that.questionDetail = res.data
            console.log(res.data)
          }
        })
        this.allQuestions.map((item) => {
          if (row.id != item.id) {
            $table.toggleRowExpansion(item, false)
          }
        })
        $table.toggleRowExpansion(row)
      });
    },
    getQuestion(value) {
      let that = this
      this.$postRequest('/exam/question/list?type=' + value, {'courseId': that.ruleForm.course}).then(res => {
        if (res.data) {
          that.allQuestions = res.data.data
          console.log(res.data)
        }
      })
    },
    goNext() {
      this.step = 4
      this.totalScore = 0
      console.log(this.totalScore)
    },
    getCourse(value) {
      console.log("label", value)
      let that = this
      this.$getRequest('/user/course/list?facultyId=' + that.ruleForm.institution).then(res => {
        if (res.data) {
          that.courses = res.data.data
          that.ruleForm.course = ''
        }
      })
      const item1 = this.institutions.find((item) => {
        return item.id === value
      })
      this.ruleForm.institutionName = item1.facultyName
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
        let that = this
        this.$postRequest('/exam/question/list?type=1', {'courseId': that.ruleForm.course}).then(res => {
          if (res.data) {
            that.allQuestions = res.data.data
            console.log(res.data)
          }
        })
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

:deep(.el-table__expand-icon) {
  display: none;
}
</style>
