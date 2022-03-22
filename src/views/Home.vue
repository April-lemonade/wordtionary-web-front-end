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
    this.$getRequest('/user/auth/login?account=1912190001&pwd=1912190001').then(res=>{
      if (res) {
        console.log(res)
      }
    })
    /*this.$axios.get('http://121.196.198.132:7002/user/auth/login?account=1912190001&pwd=1912190001').then(res=>{
      if(res){
        console.log(res)

      }else{
        console.log(res)
      }
    })*/

    /*this.$axios.get('http://121.196.198.132:7002/user/faculty/list',{
      headers:{
        'Authorization' : 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOjMsImNyZWF0ZWQiOjE2NDc3NDU1NjM5NTYsInVzZXJfYWNjb3VudCI6ImFkbWluIiwiZXhwIjoxNjQ4OTU1MTYzfQ.HFPxc1BlEw_zS6QSL9KyTR0j2qzIAPsbhC_br1UGgqu9_TPHLzDrqo9odJrwHJ97lKQzRn-r1shTLLgMy6Rnnw'
      }
    }).then(res=>{
      if(res){
        console.log(res)

      }else{
        console.log(res)
      }
    })*/

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

