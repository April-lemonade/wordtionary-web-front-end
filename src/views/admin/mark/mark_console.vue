<template>
  <div style="display: flex;flex-direction: column;margin: 2%;width: 96%">
    <div style="display: flex;flex-direction: row">
      <div
          style="width:42%;display: flex;flex-direction: row;border-style: solid;padding-top: 3%;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-right: 1%">
        <div style="display:flex;flex-direction: column;margin-bottom: 2%;width: 70%">
          <div style="font-weight: bold;font-size: 18px;margin-bottom: 20%">{{ exam.content }}</div>
          <div class="exam_info">考试时间
            <div class="exam_info_content">{{ exam.examTime }} - {{ exam.endTime }}</div>
          </div>
          <div class="exam_info">考试课程
            <div class="exam_info_content">{{ exam.course }}</div>
          </div>
          <div class="exam_info">开课学院
            <div class="exam_info_content">{{ exam.facultyName }}</div>
          </div>
          <div class="exam_info">总节数&nbsp;&nbsp;&nbsp;
            <div class="exam_info_content">{{ exam.section.length }}</div>
          </div>
          <div class="exam_info">总题数&nbsp;&nbsp;&nbsp;
            <div class="exam_info_content">{{ exam.section[exam.section.length - 1] }}</div>
          </div>
        </div>
        <div :style="note" style="width: 30%;text-align: end;position: relative">
          <div style="position:absolute;bottom:20px;right:20px;cursor: pointer" @click="goMark">
            批阅样卷
          </div>
        </div>
      </div>
      <div
          style="width: 56%;display: flex;flex-direction: column;border-style: solid;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;position: relative;">
        <div style="display: flex;flex-direction: row;position:relative;">
          <div style="width: 90%;font-weight: bold;font-size: 18px;margin-top: 5%">阅卷进度</div>
          <img src="../../../assets/example_paper.png"
               style="position: absolute;top:0;right:0;transform: rotate(270deg);width: 10%"/>
        </div>
        <!--        <div id="progress" style="width:100%;height:300px "></div>-->
        <el-scrollbar height="200px" v-if="progress">
          <div style="display: flex;flex-direction: row;width: 100%">
            <div>总进度：</div>
            <el-progress style="margin-right: 3%;margin-top: 1%;margin-bottom:1%;width: 80%" :text-inside="true"
                         :stroke-width="15"
                         :percentage="progress.reviewedProgress * 100"
                         status="success" color="rgba(19, 137, 116, 1)"></el-progress>
          </div>
          <div v-for="data in progress.reviewedQuestionProgressList">
            <div style="display: flex;flex-direction: row">
              <div style="width: 10%">{{ data.questionId }}</div>
              <el-progress style="margin-right: 3%;margin-top: 1%;margin-bottom:1%;width: 80%" :text-inside="true"
                           :stroke-width="15"
                           :percentage="data.reviewedProgress * 100"
                           status="success" color="rgba(19, 137, 116, 1)"></el-progress>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div
        style="width:97%;display: flex;flex-direction: column;border-style: solid;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-top: 3%">
      <div style="width: 100%;display: flex;flex-direction: row;position: relative;margin-bottom: 1%">
        <div style="width: 95%;font-weight: bold;font-size: 18px;margin-top: 2%">阅卷详情</div>
        <img src="../../../assets/example_paper.png"
             style="position: absolute;top:0;right:0;transform: rotate(270deg);width: 5%"/>
      </div>
      <!--      <div style="width: 50%;display: flex;flex-direction: row;justify-content: space-between">
              <div>阅卷进度：62.5%</div>
              <div>预计完成时间：2022.2.24 16:00</div>
            </div>-->
      <!--      <el-progress style="margin-right: 3%;margin-top: 1%;margin-bottom:1%;" :text-inside="true" :stroke-width="20"
                         :percentage="62.5"
                         status="success" color="rgba(19, 137, 116, 1)"></el-progress>-->
      <!--      <div>只展示未批改完的题目
              <el-switch v-model="onlying" active-color="rgba(19, 137, 116, 1)"></el-switch>
            </div>-->
      <el-table ref="table" :data="tableData" style="width: 98%" v-if="tableData">
        <el-table-column type="expand">
          <template #default="props">
            <div style="display: flex;flex-direction: row">
              <div style="width: 50%;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 2%"
                   v-if="dialogFormVisible === false">
                <div
                    style="display: flex;flex-direction: row;font-size: 13px;justify-content: space-between;width: 100%;margin-bottom: 5%">
                  <div style="font-weight: bold">{{ questionDetail.id }} &nbsp; {{ questionDetail.content }}</div>
                  <div style="border-style: solid;border-width: 2px;border-radius: 5px;font-weight: bold">
                    <div v-if="questionDetail.type === 1">选择题</div>
                    <div v-if="questionDetail.type === 2">判断题</div>
                    <div v-if="questionDetail.type === 3">填空题</div>
                  </div>
                  <!--                  <div style="font-weight: bold">分值: {{ props.row.score }}</div>-->
                </div>
                <div v-if="questionDetail.type === 1" style="display: flex;flex-direction: column">
                  <div>A. {{ questionDetail.a }}</div>
                  <div>B. {{ questionDetail.b }}</div>
                  <div>C. {{ questionDetail.c }}</div>
                  <div>D. {{ questionDetail.d }}</div>
                </div>
                <div style="font-weight: bold">正确答案: {{ questionDetail.answer }}</div>
                <div>
                  作者：{{ questionDetail.name }} | 上传时间：{{ questionDetail.createTime }}
                </div>
                <div>难度系数：{{ questionDetail.difficulty }} |
                  知识点：{{ questionDetail.outline }} | 使用次数：{{ questionDetail.usageTimes }}
                </div>
                <div v-for="examiner in props.row.examiners">
                  阅卷人：{{ examiner.name }} | 阅卷速度：{{ examiner.speed }} 题/分钟 | 批阅份数：{{ examiner.count }} |
                  预计完成时间：{{ examiner.time }}
                </div>
                <el-button style="margin-top: 5%" type="primary" plain @click="dialogFormVisible = true">调整阅卷人
                </el-button>
              </div>
              <div style="width: 50%;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 1%"
                   v-if="dialogFormVisible">
                <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    :titles="['待选', '已选']"
                    filter-placeholder="请输入阅卷人姓名"
                    v-model="value"
                    :data="data">
                </el-transfer>
                <div slot="footer" class="dialog-footer"
                     style="margin-top: 3%;display:flex;flex-direction:row;justify-content:center">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editExaminer">确 定</el-button>
                </div>
              </div>
              <div id="progress1"
                   style="width: 50%;height:300px;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 2%">
                {{ drawEcharts(props.row.teachers) }}
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column label="题号" prop="questionId"/>
        <el-table-column label="阅卷人">
          <template #default="scope">
            <div style="display: flex;flex-direction: row">
              <div v-for="item in scope.row.teachers">
                <!--                <el-popover
                                    placement="bottom"
                                    :title="item.name"
                                    :width="200"
                                    trigger="hover"
                                    content="this is content, this is content, this is content"
                                >
                                  <template #reference>
                                    <p>{{ item.name }}&nbsp;</p>
                                  </template>
                                  <div style="display:flex;flex-direction: row;font-size: 10px">
                                    预计完成时间：{{ item.time }}
                                  </div>
                                  <div style="font-size: 10px;display: flex;flex-direction: row">
                                    <div style="width: 80px">阅卷总进度：</div>
                                    <el-progress style="width: 50%;font-size: 10px" :stroke-width="5" :percentage="item.allProgress"
                                                 color="rgba(19, 137, 116, 1)"></el-progress>
                                  </div>
                                  <div style="font-size: 10px">
                                    <div v-for="progress in item.progresses" style="display: flex;flex-direction: row">
                                      <div style="width: 80px;">{{ progress.qid }}</div>
                                      <el-progress style="width: 50%;font-size: 10px" :stroke-width="5" :percentage="progress.progress"
                                                   color="rgba(19, 137, 116, 1)"></el-progress>
                                    </div>
                                  </div>
                                </el-popover>-->
                {{ item }}&nbsp;
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="阅卷进度" prop="progress.reviewedProgress">
          <template #default="scope">
            <el-progress style="width: 80%;" :text-inside="true" :stroke-width="15"
                         :percentage="scope.row.progress.reviewedProgress*100"
                         color="rgba(19, 137, 116, 1)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="预计完成时间" prop="progress.estimatedTime"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="toogleExpand(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="调整阅卷人" v-model="dialogFormVisible">
        <el-transfer
            filterable
            :filter-method="filterMethod"
            :titles="['待选', '已选']"
            filter-placeholder="请输入阅卷人姓名"
            v-model="value"
            :data="data">
        </el-transfer>
        <!--        <el-transfer :data="data" filterable
                             :filter-method="filterMethod"
                             :titles="['待选', '已选']"
                             filter-placeholder="请输入阅卷人姓名" :left-default-checked="value"></el-transfer>-->
        <div slot="footer" class="dialog-footer"
             style="margin-top: 5%;display:flex;flex-direction:row;justify-content:right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editExaminer()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
          title="提示"
          v-model="dialogVisible"
          width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import log from "@/views/admin/log";

export default {
  name: "mark_console",
  data() {
    return {
      dialogVisible: false,
      data: [],
      value: [],
      originalValue: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      note: {
        backgroundImage: "url(" + require("../../../assets/example_paper.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        marginTop: "70px",
      },
      exam: {
        id: 2,
        name: 'test',
        course: '数学分析',
        institution: '统计与数学学院',
        time: '2022/1/1 13:40 - 15:40',
        status: '已结束',
        questionCount: 56,
        sectionCount: 4,
        progress: 62,
      },
      dialogFormVisible: false,
      questionDetail: [],
      thisQid: 0,
      progress: [],
      section: [],
      question: [],
      tableData: [
        {
          qid: '1.1',
          exampleFinished: 0,
          time: '2022.2.24 16:00',
          progress: 59,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
      ],
      examiners: [{
        name: '赵国庆',
        progress: [0, 20, 50, 76, 98]
      }]
    }
  },
  watch: {
    '$route'(to, from) {
      this.$router.go(0);
    }
  },
  methods: {
    show() {
      console.log("sceswafr")
      console.log(this.dialogFormVisible)
      this.dialogFormVisible = true
      console.log(this.dialogFormVisible)
    },
    goMark() {
      let obj = JSON.stringify(this.exam)
      // console.log(this.exam)
      this.$router.push({path: '/admin/mark/mark_question', query: {obj: obj}})

    },
    toogleExpand(row) {
      this.value = []
      let $table = this.$refs.table
      // console.log('dsd', $table)
      this.thisExaminers = row.examiners
      this.thisQid = row.qid
      // console.log(this.thisExaminers)
      let that = this
      that.$getRequest('/exam/question/info/' + row.questionId).then(res => {
        if (res.data) {
          that.questionDetail = res.data
          // console.log(res.data)
        }
      })
      that.$getRequest('/exam/reviewed/get/teacher/progress?examinationPaperId=' + that.exam.id + '&questionIndex=' + row.questionIndex).then(res => {
        if (res.data) {
          that.examiners = res.data
          that.examiners.forEach((examiner, index) => {
            that.value.push(examiner.teacherAccount)
          })
          console.log("ttt", that.value)
          that.originalValue = that.value
        }
      })
      this.tableData.map((item) => {
        if (row.qid != item.qid) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
    },
    drawEcharts(examiners) {
      //绘制趋势echarts
      console.log(this.examiners)
      let examiner_names = []
      let examiner_progress = []
      let series = []
      let total = []
      for (let i = 0; i < this.examiners.length; i++) {
        examiner_names[i] = this.examiners[i].teacherName
        examiner_progress[i] = this.examiners[i].reviewedTotalPerHour.slice(this.examiners[i].reviewedTotalPerHour.length - 5, this.examiners[i].reviewedTotalPerHour.length)
        series.push({
          name: examiners[i],
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 份';
            }
          },
          data: examiner_progress[i]
        })
      }
      console.log(series)
      console.log(examiners)
      for (let i = 0; i < examiner_progress[0].length; i++) {
        total[i] = 0
        for (let j = 0; j < examiner_progress.length; j++) {
          total[i] += examiner_progress[j][i]
        }
      }
      series.push({
        name: '总计',
        type: 'line',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 份';
          }
        },
        data: total
      })
      // console.log(series)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: examiners
        },
        xAxis: [
          {
            type: 'category',
            name: '时刻',
            data: [new Date().getHours() - 4, new Date().getHours() - 3, new Date().getHours() - 2, new Date().getHours() - 1, new Date().getHours()],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '批阅份数',
            min: 0,
            max: total[total.length - 1] + 5,
            // interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: series
      };
      let chartId = 'tiger-' + arguments[2] + '-trend-index' + arguments[1];
      this.$nextTick(() => {
        let myChart = this.$echarts.init(document.getElementById('progress1'));
        myChart.setOption(option);
        myChart.resize();
      });
    },
    editExaminer() {
      console.log('editExaminer')
      console.log("originalValue", this.originalValue.indexOf("000004"))
      console.log(this.value)
      this.dialogFormVisible = false
      let that = this
      let teacherAccount = []
      this.value.forEach(each => {
        if (that.originalValue.indexOf(each) === -1) {
          teacherAccount[teacherAccount.length] = each
        }
      })
      console.log("teacherAccount", teacherAccount)
      if (teacherAccount) {
        teacherAccount.forEach(each => {
          that.$postRequest('/exam/reviewed/set/teacher?examinationPaperId=' + this.exam.id + '&questionIndex=' + this.questionDetail.id + "&teacherAccount=" + each + '').then(res => {
            if (res) {
              console.log(res)
            }
          })
        })
      }
      window.location.reload()
    }
  },
  created() {
    let that = this
    this.exam = eval('(' + this.$route.query.obj + ')')
    this.$nextTick(() => {
      this.$getRequest('/exam/examinationPaper/info/' + this.exam.id).then(res => {
        // console.log(res)
        if (res.data) {
          that.exam = res.data
          that.$nextTick(() => {
            that.exam.section = that.exam.section.split(',')
            // console.log(that.exam.section.length)
          })
        }
      })
    })
  },
  mounted() {
    let that = this
    this.$nextTick(() => {
      this.$getRequest('/exam/reviewed/get/question?examinationPaperId=' + this.exam.id).then(res => {
        that.$getRequest('/exam/reviewed/get/paper/progress?examinationPaperId=' + this.exam.id).then(res => {
          if (res.data) {
            that.progress = res.data
          }
        })
        if (res.data) {
          that.tableData = res.data
          let progress = []
          this.$getRequest('/exam/reviewed/get/question/progress?examinationPaperId=' + this.exam.id).then(res => {
            if (res.data) {
              progress = res.data
              for (let i = 0; i < that.tableData.length; i++) {
                that.tableData[i].progress = progress[i]
              }
            }
          })
          // console.log(res.data)
        }
        // console.log("uuu", that.tableData)
      })


      const data = []
      let teachers = []
      this.$postRequest('/user/teacher/list', {}).then(res => {
        if (res.data) {
          teachers = res.data.data
          teachers.forEach(teacher => {
            data.push({
              label: teacher.name,
              key: teacher.account,
            });
          });
          that.data = data
          // console.log(that.data)
        }
      })
    })

  }
}
</script>

<style scoped>
.exam_info {
  width: 600px;
  display: flex;
  flex-direction: row;
  margin-bottom: 2%;
}

.exam_info_content {
  margin-left: 2%;
  color: #767676;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

:deep(.el-table__expand-icon) {
  display: none;
}

:deep(.el-table__body) {
  table-layout: fixed;
  border-collapse: separate;
  width: 98%;
}

:deep(.el-transfer__buttons) {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
}

:deep(.el-transfer) {
  font-size: var(--el-font-size-base);
  height: 230px;
}

:deep(.el-transfer-panel__body) {
  height: 190px;
}

:deep(.element.style) {
  display: none;
}

[v-cloak] {
  display: none;
}
</style>
