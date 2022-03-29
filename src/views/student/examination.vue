<template>
  <div style="display: flex;flex-direction: row;">
    <div style="width: 90%;margin-left: 10%">
      <div v-for="(exam,index) in exams" :key="exam.id" @click="show_detail(index)"
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
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 80%">
          <div>{{ exam.courseName }}</div>
          <div>|</div>
          <div>{{ exam.facultyName }}</div>
          <div>|</div>
          <div>{{ exam.examTime }} - {{ exam.endTime }}</div>
        </div>
      </div>
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
  data() {
    return {
      filterText: '',
      studentAccount: '1912190001',
      checked: [],
      exams: [],
    };
  },
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
    this.$getRequest('/exam/studentAnswer/getExam?studentAccount=' + this.studentAccount).then(res => {
      console.log(res)
      if (res.data) {
        that.exams = res.data
        console.log(that.exams)
      }
    })
  },
  methods: {
    show_detail(data) {
      console.log(data)
      let obj = JSON.stringify(this.exams[data])
      this.$router.push({path: '/teacher/mark/mark_console', query: {obj: obj}})
    },
    handleCheckChange(data, checked, indeterminate) {
      let {id} = data
      console.log(checked)
      let index = this.checked.indexOf(id)
      // 当前节点不在this.checked中,且当前节点为选中状态
      if (index < 0 && this.checked.length && checked) {
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
        this.checked.push(id)
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
