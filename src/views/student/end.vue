<template>
  <el-container>
    <el-header
        style="width:100%;height:70px;background:white;border-bottom:1px solid  #d7d7d7;box-sizing: border-box;align-items:center;display:flex;justify-content:space-between">
      <div
          style="display:flex;align-content:center;height:40px;align-items:center;margin-right:40px;width: 100%;justify-content: space-between">
        <div>{{ exam.content }}</div>
      </div>
    </el-header>
    <el-main style="display: flex;flex-direction: column;align-items: center">
      <img style="width: 30%" src="../../assets/end_exam.svg">
      <div>提交成功！</div>
      <div>请耐心等待试卷批阅结束</div>
      <el-button type="primary" style="margin-top: 3%" @click="back">返回首页</el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "end",
  data() {
    return {
      exam: {
        content: '2021-2022第2学期线性代数期末考试',
        time: '2022/1/1 13:40'
      },
    }
  },
  created() {
    this.exam = eval('(' + this.$route.query.obj + ')')
    console.log(this.exam)
  },
  methods: {
    back() {
      this.$router.push({path: '/student/examination'})
    }
  }
}
</script>

<style scoped>

</style>
