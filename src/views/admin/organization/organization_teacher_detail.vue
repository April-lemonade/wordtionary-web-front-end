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
           肖宇
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
            授课科目
        </div>
         <div style="width:100%;text-align:left">
           人力资源管理
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
      :header-cell-style="{border:'1px white solid',text:'center'}"
    :data="tableData"
    
    style="width: 880px;margin-top:30px;font-size:15px"
  >
  <el-table-column prop="class" label="班级编号" sortable width="200" style="font-weight:bolder"/>
   <el-table-column prop="subject" label="学科"  width="120" />
    <el-table-column prop="teacher" label="授课人"  width="120" />
     <el-table-column prop="sum" label="人数" sortable width="90" />
       <el-table-column prop="time" label="上课时间"  width="110" />
            <el-table-column prop="quality" label="教学质量评估" sortable width="140" />
                  <el-table-column  label="操作" sortable width="100" >
           <el-button type="text" style="color: #f8c863;font-size:15px">
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
             tableData:[
                {
                    class:"(2021-2022-2)-CST043-1",
                    subject:"人力资源管理",
                    teacher:"肖宇",
                    sum:76,
                    time:"周一 3 4 5",
                    quality:"A"

                },
                 {
                    class:"(2021-2022-2)-CST043-1",
                    subject:"人力资源管理",
                    teacher:"肖宇",
                    sum:76,
                    time:"周一 3 4 5",
                    quality:"A-"

                }
               
               
            ]
        }
    }

}
</script>

<style>

</style>