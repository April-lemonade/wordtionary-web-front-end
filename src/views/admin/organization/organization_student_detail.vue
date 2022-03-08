<template>
  <div style="width:100%;min-height:calc(100vh - 70px);">
<div div style="float:left;width:400px;min-height:calc(100vh - 70px);background:white;border-right:1px solid  #d7d7d7;">
<div style="display:flex;justify-content:center;flex-wrap:wrap;height:400px">
    <div style="margin-top:20px;font-size:18px; font-family: 'Arial Normal', 'Arial', sans-serif;width:90%;
  font-weight: 700;
  color: #40444d;
  text-align: left;
  line-height: normal;justify-self:start">
        基本信息
    </div>
    <div style="display:flex;jutify-content:start;width:80%;flex-wrap:wrap;height:50px">
        <div style="width:100%; font-family: 'Arial Normal', 'Arial', sans-serif;width:90%;
         font-weight: 700;
         color: #40444d;
         text-align: left;
         line-height: normal;justify-self:start">
            工号
        </div>
         <div style="width:100%;text-align:left">
           191001201
        </div>
        </div>
         <div style="display:flex;jutify-content:start;width:80%;flex-wrap:wrap;height:50px">
        <div style="width:100%; font-family: 'Arial Normal', 'Arial', sans-serif;width:90%;
         font-weight: 700;
         color: #40444d;
         text-align: left;
         line-height: normal;justify-self:start">
            姓名
        </div>
         <div style="width:100%;text-align:left">
           陈恒冠
        </div>
        </div>
           <div style="display:flex;jutify-content:start;width:80%;flex-wrap:wrap;height:50px">
        <div style="width:100%; font-family: 'Arial Normal', 'Arial', sans-serif;width:90%;
         font-weight: 700;
         color: #40444d;
         text-align: left;
         line-height: normal;justify-self:start">
            学院
        </div>
         <div style="width:100%;text-align:left">
          工商管理学院
        </div>
        </div>
            <div style="display:flex;jutify-content:start;width:80%;flex-wrap:wrap;height:50px">
        <div style="width:100%; font-family: 'Arial Normal', 'Arial', sans-serif;width:90%;
         font-weight: 700;
         color: #40444d;
         text-align: left;
         line-height: normal;justify-self:start">
            班级
        </div>
         <div style="width:100%;text-align:left">
           工商管理1901
        </div>
        </div>
</div>
  </div>
  <div style="width:calc(100%-400px);height:400px;">
     
         <div style="display:flex;justify-content:center;flex-wrap:wrap">
              <div  style="width:100%; font-family: 'Arial Normal', 'Arial', sans-serif;width:90%;
         font-weight: 700;
         color: #40444d;
         text-align: left;
         line-height: normal;justify-self:start;margin-left:20px;width:90%;margin-top:20px">教学班信息</div>
     <el-table
      :header-cell-style="{text:'center'}"
    :data="tableData"
    border
    
    style="width: 940px;margin-top:30px;font-size:15px"
  >
  <el-table-column align="center" prop="exam_name" label="考试名称"  width="300" style="font-weight:bolder"/>
   <el-table-column align="center" prop="exam_time" label="考试时间"  width="300" />
    <el-table-column align="center" prop="status" label="状态"  width="120" />
     <el-table-column  align="center" prop="grade" label="成绩" sortable width="120" />
                  <el-table-column  label="操作"  width="100" align="center" >
           <el-button type="text" style="color: #84cecd;font-size:15px">
               查看
           </el-button>
       </el-table-column>
     </el-table>
         </div>
</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[{
                exam_name:"2021-2022第2学期高等数学期末考试",
                exam_time:"2022/1/1 8:40 - 10:40",
                status:"进行中",
                grade:"85"
            },
            {
                exam_name:"2021-2022第2学期高等数学期末考试",
                exam_time:"2022/1/1 8:40 - 10:40",
                status:"进行中",
                grade:"85"
            },
            {
                exam_name:"2021-2022第2学期概率论与数理统计期末考试",
                exam_time:"2022/1/1 8:40 - 10:40",
                status:"进行中",
                grade:"85"
            }]
        }
    }

}
</script>

<style scoped>

</style>