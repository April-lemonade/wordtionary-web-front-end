<template>
  <div style="display: flex;flex-direction: column;margin: 2%;width: 96%">
    <div style="display: flex;flex-direction: row">
      <div
          style="width:42%;display: flex;flex-direction: row;border-style: solid;padding-top: 3%;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-right: 1%">
        <div style="display:flex;flex-direction: column;margin-bottom: 2%;width: 70%">
          <div style="font-weight: bold;font-size: 18px;margin-bottom: 20%">{{ exam.name }}</div>
          <div class="exam_info">考试时间
            <div class="exam_info_content">{{ exam.time }}</div>
          </div>
          <div class="exam_info">考试课程
            <div class="exam_info_content">{{ exam.course }}</div>
          </div>
          <div class="exam_info">开课学院
            <div class="exam_info_content">{{ exam.institution }}</div>
          </div>
          <div class="exam_info">总节数&nbsp;&nbsp;&nbsp;
            <div class="exam_info_content">4</div>
          </div>
          <div class="exam_info">总题数&nbsp;&nbsp;&nbsp;
            <div class="exam_info_content">56</div>
          </div>
        </div>
        <div :style="note" style="width: 30%;text-align: end;position: relative">
          <div style="position:absolute;bottom:20px;right:20px;">
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
        <div id="progress" style="width:100%;height:300px "></div>
      </div>
    </div>
    <div
        style="width:97%;display: flex;flex-direction: column;border-style: solid;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-top: 3%">
      <div style="width: 100%;display: flex;flex-direction: row;position: relative;margin-bottom: 1%">
        <div style="width: 95%;font-weight: bold;font-size: 18px;margin-top: 2%">阅卷详情</div>
        <img src="../../../assets/example_paper.png"
             style="position: absolute;top:0;right:0;transform: rotate(270deg);width: 5%"/>
      </div>
      <div style="width: 50%;display: flex;flex-direction: row;justify-content: space-between">
        <div>阅卷进度：62.5%</div>
        <div>预计完成时间：2022.2.24 16:00</div>
      </div>
      <el-progress style="margin-right: 3%;margin-top: 1%;margin-bottom:1%;" :text-inside="true" :stroke-width="20"
                   :percentage="62.5"
                   status="success" color="rgba(19, 137, 116, 1)"></el-progress>
      <div>只展示未批改完的题目
        <el-switch v-model="onlying" active-color="rgba(19, 137, 116, 1)"></el-switch>
      </div>
      <el-table ref="table" :data="tableData" style="width: 98%">
        <el-table-column type="expand">
          <template #default="props">
            <div style="display: flex;flex-direction: row">
              <div style="width: 50%;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 2%">
                <div
                    style="display: flex;flex-direction: row;font-size: 13px;justify-content: space-between;width: 100%;margin-bottom: 5%">
                  <div style="font-weight: bold">{{ props.row.date }} &nbsp; {{ props.row.description }}</div>
                  <div style="border-style: solid;border-width: 2px;border-radius: 5px;font-weight: bold">
                    {{ props.row.type }}
                  </div>
                  <div style="font-weight: bold">分值: {{ props.row.score }}</div>
                </div>
                <div style="font-weight: bold">正确答案: {{ props.row.ans }}</div>
                <div>
                  作者：{{ props.row.updater }} | 上传时间：{{ props.row.updateTime }}
                </div>
                <div>难度系数：{{ props.row.difficulty }} |
                  知识点：{{ props.row.point1 }}_{{ props.row.point2 }} | 使用次数：{{ props.row.useCount }}
                </div>
                <div v-for="examiner in props.row.examiners">
                  阅卷人：{{ examiner.name }} | 阅卷速度：{{ examiner.speed }} 题/分钟 | 批阅份数：{{ examiner.count }} |
                  预计完成时间：{{ examiner.time }}
                </div>
                <el-button style="margin-top: 5%" type="primary" plain @click="dialogFormVisible = true">调整阅卷人
                </el-button>
              </div>
              <div id="progress1"
                   style="width: 50%;height:300px;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 2%">
                {{ drawEcharts() }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="题号" prop="qid"/>
        <el-table-column label="阅卷人">
          <template #default="scope">
            <div style="display: flex;flex-direction: row">
              <div v-for="item in scope.row.examiners">
                <el-popover
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
                </el-popover>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="阅卷进度" prop="progress">
          <template #default="scope">
            <el-progress style="width: 80%;" :text-inside="true" :stroke-width="15" :percentage="scope.row.progress"
                         color="rgba(19, 137, 116, 1)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="预计完成时间" prop="time"/>
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
        <div slot="footer" class="dialog-footer"
             style="margin-top: 5%;display:flex;flex-direction:row;justify-content:right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editExaminer()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "mark_console",
  data() {
    const generateData = _ => {
      const data = [];
      const cities = [{
        id: 0,
        name: '赵国庆'
      }, {
        id: 1,
        name: '王金材'
      }, {
        id: 2,
        name: '黄子键'
      }];
      cities.forEach((city, index) => {
        data.push({
          label: city.name,
          key: index,
        });
      });
      return data;
    }
    return {
      data: generateData(),
      value: [1, 2],
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
        name: '2021-2022第2学期数学分析期末考试',
        course: '数学分析',
        institution: '统计与数学学院',
        time: '2022/1/1 13:40 - 15:40',
        status: '已结束',
        questionCount: 56,
        sectionCount: 4,
        progress: '62.5%',
      },
      onlying: false,
      dialogFormVisible: false,
      thisQid: 0,
      tableData: [
        {
          qid: '1.1',
          time: '2022.2.24 16:00',
          progress: 56,
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
        {
          qid: '1.2',
          time: '2022.2.24 16:00',
          progress: 56,
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
        {
          qid: '1.3',
          time: '2022.2.24 16:00',
          progress: 56,
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
        {
          qid: '1.4',
          time: '2022.2.24 16:00',
          progress: 56,
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
        {
          qid: '1.5',
          time: '2022.2.24 16:00',
          progress: 56,
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
        {
          qid: '1.6',
          time: '2022.2.24 16:00',
          progress: 56,
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
        {
          qid: '1.7',
          time: '2022.2.24 16:00',
          progress: 56,
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
      ]
    }
  },
  methods: {
    toogleExpand(row) {
      this.value = []
      let $table = this.$refs.table
      this.thisExaminers = row.examiners
      this.thisQid = row.qid
      console.log(this.thisExaminers)
      let that = this
      row.examiners.forEach((examiner, index) => {
        that.value.push(examiner.id)
      })
      this.tableData.map((item) => {
        if (row.qid != item.qid) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
    },
    drawEcharts() {
      //绘制趋势echarts
      // console.log(arguments)
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
          data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Precipitation',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: 'Precipitation',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      };
      let chartId = 'tiger-' + arguments[2] + '-trend-index' + arguments[1];
      this.$nextTick(() => {
        let myChart = this.$echarts.init(document.getElementById('progress1'));
        myChart.setOption(option);
        myChart.resize();
      });
    },
    editExaminer() {
      this.dialogFormVisible = false
      this.thisExaminers = this.value
      console.log(this.thisExaminers)
      let that = this

      this.tableData.find(item => item.qid = that.thisQid).push()
    }
  },
  mounted() {
    console.log(this.$route.query.obj)
    this.exam = eval('(' + this.$route.query.obj + ')')
    let progress = this.$echarts.init(
        document.getElementById("progress")
    );
    // echarts 配置
    // 绘制图表
    progress.setOption({
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
        data: ['Evaporation', 'Precipitation', 'Temperature']
      },
      xAxis: [
        {
          type: 'category',
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
          max: 250,
          interval: 50,
        },
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0,
          ]
        },
        {
          name: 'Precipitation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8,
          ]
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 0,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5,]
        }
      ]
    });
  }
}
</script>

<style scoped>
.exam_info {
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
</style>
