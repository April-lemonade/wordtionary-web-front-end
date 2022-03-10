<template>
  <div style="display: flex;flex-direction: column;margin: 2%;width: 96%">
    <div style="display: flex;flex-direction: row">
      <div
          style="width:40%;display: flex;flex-direction: row;border-style: solid;padding-top: 3%;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-right: 5%">
        <div style="display:flex;flex-direction: column;margin-bottom: 5%;width: 70%">
          <div style="font-weight: bold;font-size: 18px;margin-bottom: 5%">{{ exam.name }}</div>
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
          style="width: 40%;display: flex;flex-direction: column;border-style: solid;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7">
        <div style="display: flex;flex-direction: row;position:relative;">
          <div style="width: 90%;font-weight: bold;font-size: 18px;margin-top: 5%">阅卷进度</div>
          <img src="../../../assets/example_paper.png"
               style="position: absolute;top:0;right:0;transform: rotate(270deg);width: 10%"/>
        </div>
      </div>
    </div>
    <div
        style="width:90%;display: flex;flex-direction: column;border-style: solid;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-top: 3%">
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <p>State: {{ props.row.state }}</p>
            <p>City: {{ props.row.city }}</p>
            <p>Address: {{ props.row.address }}</p>
            <p>Zip: {{ props.row.zip }}</p>
          </template>
        </el-table-column>
        <el-table-column label="题号" prop="date"/>
        <el-table-column label="阅卷人" prop="name"/>
        <el-table-column label="阅卷进度" prop="progress">
          <template #default="scope">
            <el-progress style="width: 80%;" :text-inside="true" :stroke-width="15" :percentage="scope.row.progress"
                         color="rgba(19, 137, 116, 1)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="预计完成时间" prop="time"/>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "mark_console",
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../../../assets/example_paper.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        marginTop: "5px",
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
      tableData: [
        {
          date: '1.1',
          time: '2022.2.24 16:00',
          name: '赵国庆 王金材',
          progress: 56,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '1.2',
          time: '2022.2.24 16:00',
          name: '赵国庆 王金材',
          progress: 56,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '1.3',
          time: '2022.2.24 16:00',
          name: '赵国庆 王金材',
          progress: 56,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '1.4',
          time: '2022.2.24 16:00',
          name: '赵国庆 王金材',
          progress: 56,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '1.5',
          time: '2022.2.24 16:00',
          name: '赵国庆 王金材',
          progress: 56,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '1.6',
          time: '2022.2.24 16:00',
          name: '赵国庆 王金材',
          progress: 56,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '1.7',
          time: '2022.2.24 16:00',
          name: '赵国庆 王金材',
          progress: 56,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
      ]
    }
  },
  mounted() {
    // let obj = JSON.parse(decodeURIComponent(this.$route.query.obj))
    console.log(this.$route.query.obj)
    this.exam = eval('(' + this.$route.query.obj + ')')
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

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
