<template>
  <div style="display: flex;flex-direction: row;">
    <div
        style="border-right-style: solid;border-right-width: 1px;height:calc(100vh - 70px);padding-left: 5%;padding-right: 5%;border-right-color: #D7D7D7;width: 23%">
      <div style="display: flex;flex-direction: column;">
        <el-input
            style="margin-top: 10%;margin-bottom: 10%"
            size="large"
            placeholder="输入课程名称进行过滤"
            v-model="filterText">
        </el-input>
        <div>
          <el-tree render-after-expand='false' class="filter-tree" ref="tree" node-key="id"
                   :filter-node-method="filterNode" :data="data"
                   accordion show-checkbox
                   :default-expanded-keys="[1]"
                   :props="defaultProps"
                   check-strictly
                   @check-change="handleCheckChange"
          ></el-tree>
        </div>
      </div>
    </div>
    <div v-if="!checked[0]"
         style="display: flex;flex-direction: row;align-items:center;justify-content: center;width: 77%;height:calc(100vh - 70px);">
      <el-icon :size="20">
        <d-arrow-left/>
      </el-icon>
      请选择左侧的课程，查看批阅情况
    </div>
    <div v-if="checked[0]" style="width: 77%">
      <div v-if="exams.length!==0" v-for="(exam,index) in exams" :key="exam.id" @click="show_detail(index)"
           style="border-style: solid;border-width: 1px;border-color: #D7D7D7;margin: 3%;width: 80%;border-radius: 10px;display: flex;flex-direction: column;padding: 2%;cursor: pointer">
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
            批阅中
          </el-tag>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%">
          <div>{{ exam.course }} | {{ exam.facultyName }} | {{ exam.examTime }}</div>
        </div>
      </div>
      <div v-if="exams.length === 0">暂无要批阅的试卷</div>
    </div>
  </div>
</template>

<script>
import {DArrowLeft} from '@element-plus/icons-vue'

export default {
  components: {
    DArrowLeft
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  name: "mark",
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
  },
  data() {
    return {
      filterText: '',
      checked: [],
      data: [
        {
          id: 12,
          label: "工商管理学院",
          disabled: true,
          children: [
            {
              id: 1,
              label: "人力资源管理",
            }, {
              id: 2,
              label: "企业经济学",
            }, {
              id: 3,
              label: "科学方法论",
            }, {
              id: 7,
              label: "市场营销学",
            }, {
              id: 8,
              label: "广告学",
            }, {
              id: 9,
              label: "消费者行为学",
            }, {
              id: 10,
              label: "商业心理学",
            }, {
              id: 11,
              label: "国际商务概论",
            },
          ],
        }, {
          id: 13,
          label: "旅游与城乡管理学院",
          disabled: true,
          children: [
            {
              id: 12,
              label: "休闲学",
            }, {
              id: 13,
              label: "旅游企业管理",
            }, {
              id: 14,
              label: "旅游研究方法",
            }, {
              id: 15,
              label: "城市遥感信息",
            }, {
              id: 16,
              label: "城市生态学",
            }, {
              id: 17,
              label: "旅游规划",
            }, {
              id: 18,
              label: "旅游企业会计",
            }, {
              id: 19,
              label: "酒店管理概论",
            },
          ],
        }
      ],
      exams: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    show_detail(data) {
      console.log(data)
      let obj = JSON.stringify(this.exams[data])
      this.$router.push({path: '/admin/mark/mark_console', query: {obj: obj}})
    },
    handleCheckChange(data, checked, indeterminate) {
      let {id} = data
      let that = this
      let index = this.checked.indexOf(id)
      // 当前节点不在this.checked中,且当前节点为选中状态
      if (this.checked.length != 0 && checked) {
        this.$message.warning('只能同时选中一门课程')
        // console.log(data)
        this.$refs.tree.setChecked(data, false) // 取消当前节点的选中状态
        return
      }
      // 当前节点在this.checked中,当前节点为未选中状态(主动去掉当前选中状态)
      if (!checked && index >= 0 && this.checked.length) {
        this.checked = []
        return
      }
      // 当前节点不在this.checked(长度为0)中,当前节点为选中状态,this.checked中存储当前节点id
      if (index < 0 && !this.checked.length && checked) {
        console.log(data)
        this.checked.push(id)
        this.$postRequest('/exam/examinationPaper/list?courseId=' + data.courseId + "&facultyId=" + data.institutionId).then(res => {
          console.log(res)
          if (res.data) {
            that.exams = res.data.data
          }
        })
      }
    },
    handleNodeClick(data, checked, node) {
      console.log("handleNodeClick", data);
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
