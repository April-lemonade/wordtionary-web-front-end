<template>
  <div class="home">
   <div style="height:200px;width:400px;background:yellow;display:flex;flex-direction:row">
     <div style="height:100px;width:200px;background:green;align-self:end"></div>
     
  </div>
  <div id="myChart" :style="{ width: '1200px', height: '500px' }"></div>
  <el-icon><search/></el-icon>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'Home',
  components: {
    HelloWorld,
 
  },
  setup(){
    return{
      
    }
  },
  methods(){

  },
  mounted(){

      let myChart = this.$echarts.init(
          document.getElementById("myChart")
      );
      // echarts 配置
      // 绘制图表
      myChart.setOption({
        title: { text: "时间" },
        tooltip: {},
        xAxis: {
          data: ["8-21", "8-22", "8-23", "8-24", "8-25", "8-26"],
        },
        yAxis: {},
        series: [
          {
            name: "日期",
            type: "bar",
            data: [6, 12, 12, 18, 12, 18],
          },
        ],
      });
    }

  }
  

</script>
<style scoped>

.el-calendar-table .el-calendar-day{
height:20px !important
}
</style>

