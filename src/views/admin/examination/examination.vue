<template>
  <div style="display: flex;flex-direction: row;">
    <div
        style="border-right-style: solid;border-right-width: 1px;height:calc(100vh - 70px);padding-left: 5%;padding-right: 5%;border-right-color: #D7D7D7;width: 23%">
      <el-scrollbar>
        <div style="display: flex;flex-direction: column;">
          <el-input
              style="margin-top: 10%;margin-bottom: 10%"
              size="large"
              placeholder="输入课程名称进行过滤"
              v-model="filterText">
          </el-input>
          <div>
            <el-tree class="filter-tree" ref="tree" node-key="id" :filter-node-method="filterNode" :data="data"
                     accordion show-checkbox
                     :default-expanded-keys="[1,2]"
                     :props="defaultProps"
                     check-strictly
                     @check-change="handleCheckChange"
            ></el-tree>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div v-if="exams.length===0"
         style="display: flex;flex-direction: row;align-items:center;justify-content: center;width: 77%;height:calc(100vh - 70px);">
      <el-icon :size="20">
        <d-arrow-left/>
      </el-icon>
      暂无相关考试
    </div>
    <div v-if="exams.length!==0" style="width: 77%">

      <div style="height: calc(100vh - 70px)">

        <el-scrollbar>
          <el-button type="primary" @click="goNew" style="margin-left:3%;margin-top: 3%;">发布考试
          </el-button>
          <div v-for="(exam,index) in exams" :key="exam.id"
               style="border-style: solid;border-width: 1px;border-color: #D7D7D7;margin: 3%;width: 90%;border-radius: 10px;display: flex;flex-direction: column;padding: 2%;">
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;margin-bottom: 5%">
              <div>{{ exam.content }}</div>
              <el-tag v-if="exam.status === 3" class="mx-1" type="" effect="dark" style="justify-self: flex-end">
                待开始
              </el-tag>
              <el-tag v-if="exam.status === 4" class="mx-1" type="success" effect="dark" style="justify-self: flex-end">
                进行中
              </el-tag>
              <el-tag v-if="exam.status === 5" class="mx-1" type="warning" effect="dark" style="justify-self: flex-end">
                批阅中
              </el-tag>
              <el-tag v-if="exam.status === 6" class="mx-1" type="info" effect="dark" style="justify-self: flex-end">
                已结束
              </el-tag>
              <!--          <el-tag class="mx-1" type="success" effect="dark" style="justify-self: flex-end">
                          {{ exam.status }}
                        </el-tag>-->
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;">
              <div style="font-size: 12px">
                {{ exam.course }}&nbsp;|&nbsp;{{ exam.facultyName }}&nbsp;|&nbsp;{{ exam.examTime }} - {{
                  exam.endTime
                }}
              </div>
              <div style="font-size: 14px;display: flex;flex-direction: row">
                <el-button type="text" @click="preview(index)">查看试卷&nbsp;</el-button>
                <div v-if="exam.status === 3" style="display: flex;flex-direction: row">
                  <div>|</div>
                  <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      :icon="InfoFilled"
                      @confirm="deleteExam(exam.id)"
                      icon-color="red"
                      title="确定删除本场考试吗？">
                    <template #reference>
                      <el-button type="text">&nbsp;删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
                <div v-if="exam.status === 5" style="display: flex;flex-direction: row">
                  <div>|</div>
                  <el-button type="text" @click="show_detail(index)">&nbsp;批阅详情</el-button>
                </div>
                <div v-if="exam.status === 6" style="display: flex;flex-direction: row">
                  <div>|</div>
                  <el-button type="text">&nbsp;成绩详情</el-button>
                </div>
              </div>
            </div>

          </div>
        </el-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
import {DArrowLeft} from '@element-plus/icons-vue'
import {InfoFilled} from '@element-plus/icons-vue'

export default {
  components: {
    DArrowLeft,
    InfoFilled
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  name: "mark",
  data() {
    return {
      filterText: '',
      checked: [],
      data: [],
      exams: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  /*created() {
    let that = this
    this.$postRequest('/exam/examinationPaper/list').then(res => {
      if (res.data) {
        that.exams = res.data.data
        console.log(that.exams)
      }
    })
  },*/
  mounted() {
    this.data = []
    let that = this
    this.$getRequest('/user/faculty/list').then(res => {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          let id1 = res.data[i].id
          that.data.push({
            id: res.data[i].id,
            label: res.data[i].facultyName,
            disabled: true,
            children: []
          })
          that.$getRequest('/user/course/list?facultyId=' + res.data[i].id).then(res => {
            for (let j = 0; j < res.data.data.length; j++) {
              let id = res.data.data[j].id + i
              that.data[i].children.push({
                id: id,
                courseId: res.data.data[j].id,
                institutionId: id1,
                label: res.data.data[j].course
              })
            }
          })
        }
      }
    })
    this.$postRequest('/exam/examinationPaper/list').then(res => {
      console.log(res)
      if (res.data) {
        that.exams = res.data.data
        console.log(that.exams)
      }
    })
  },
  methods: {
    deleteExam(id) {
      let that = this
      this.$deleteRequest('/exam/examinationPaper/delete?examinationPaperId=' + id).then(res => {
        console.log(res)
        that.$router.go(0)
      })

    },
    goNew() {
      this.$router.push({path: '/admin/examination/new'})
    },
    preview(data) {
      console.log(data)
      let obj = JSON.stringify(this.exams[data])
      this.$router.push({path: '/admin/examination/preview', query: {obj: obj}})
    },
    show_detail(data) {
      console.log(data)
      let obj = JSON.stringify(this.exams[data])
      this.$router.push({path: '/admin/mark/mark_console', query: {obj: obj}})
    },
    handleCheckChange(data, checked, indeterminate) {
      let that = this
      let {id} = data
      let index = this.checked.indexOf(id)
      // 当前节点不在this.checked中,且当前节点为选中状态
      if (index < 0 && this.checked.length && checked) {
        this.$message.warning('只能同时选中一门课程')
        console.log(data)
        this.$refs.tree.setChecked(data, false) // 取消当前节点的选中状态
        return
      }
      // 当前节点在this.checked中,当前节点为未选中状态(主动去掉当前选中状态)
      if (!checked && index >= 0 && this.checked.length) {
        this.checked = []
        this.$postRequest('/exam/examinationPaper/list').then(res => {
          if (res.data) {
            that.exams = res.data.data
          }
        })
        return
      }
      // 当前节点不在this.checked(长度为0)中,当前节点为选中状态,this.checked中存储当前节点id
      if (index < 0 && !this.checked.length && checked) {
        this.checked.push(id)
        this.$postRequest('/exam/examinationPaper/list?courseId=' + data.courseId + "&facultyId=" + data.institutionId).then(res => {
          // console.log(res)
          if (res.data) {
            that.exams = res.data.data
          }
        })
      }
    },
    handleNodeClick(data, checked, node) {
      console.log(data);
      if (checked) {
        this.$refs.tree.setCheckedNodes([data]);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

  },
};
</script>

<style scoped>
:deep(.el-tree-node__content) {
  display: flex;
  align-items: center;
  height: 26px;
  cursor: pointer;
  margin-bottom: 10px;
}

:deep(.el-tree-node__label) {
  font-size: 18px;
}
</style>
