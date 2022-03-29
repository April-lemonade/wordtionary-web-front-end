<template>
  <div style="width:100%;height:calc(100vh - 70px);display:flex">
    <div style="width:calc( 100% - 361px);margin:0 auto;height:calc(100vh - 70px);display:flex;justify-content:center;">
        <div style="width:1300px;justify-content:center;display:flex;margin-top:50px;flex-wrap:wrap;align-content:start">
            <div style="position:relative;width:90%;height:270px;background: white;display:flex;flex-wrap:wrap;justify-content:center;">
                <img src="../../assets/admin_home_icon.svg" style="position:absolute;z-index:3;left:0;width:430px"/>
                <div style="width:100%;height:50px;border-bottom:1px solid black;display:flex;justify-content:center;align-items:center;">
                    <span style="font-size:20px;margin-left:20px">快速开始</span>
                    <el-button v-if="step===1" ype="primary" size="default" style="margin-left:20px;width:110px;font-size:16px;border:none;border-radius:0;color:white;background: #73c8c6">创建题目</el-button>
                    <el-button v-if="step===2" type="primary" size="default" style="margin-left:20px;width:110px;font-size:16px;border:none;border-radius:0;color:white;background: #73c8c6">创建考试</el-button>
                    <el-button v-if="step===3" type="primary" size="default" style="margin-left:20px;width:110px;font-size:16px;border:none;border-radius:0;color:white;background: #73c8c6">批阅试卷</el-button>
                </div>
               <div v-if="step===2" style="width:550px;height:100px;color:  #555555;margin-left:340px">
                   <p style="font-size:20px;font-weight:700;line-height:60px">批阅试卷</p>
                   <p>批阅试卷的简单流程。判断答案对错，给出题目得分</p>
               </div>
                <div v-if="step===1" style="width:550px;height:100px;color:  #555555;margin-left:340px">
                   <p style="font-size:20px;font-weight:700;line-height:60px">创建题目</p>
                   <p>创建题目的简单流程。选择题型，设置题干与答案，评估难度系数</p>
               </div>
                <div v-if="step===3" style="width:550px;height:100px;color:  #555555;margin-left:340px">
                   <p style="font-size:20px;font-weight:700;line-height:60px">设置考试</p>
                   <p>创建考试的简单流程。设置考试的基本信息，选择考生，安排监考员和组卷人</p>
               </div>
               <div style="width:100%;display:flex;justify-content:center">
                   <div style="width:300px;height:80px;display:flex;justify-content:center;align-items:center;margin-left:170px">
                       <div @click="step=1"   style="cursor:pointer;width:40px;height:40px;border-radius:50%;color:white;text-align:center;line-height:40px" :class="{'step':step===1,'disactive':step!=1}">
                           1
                       </div>
                       <img src="../../assets/line.svg" style="width:40px"/>
                       <div   @click="step=2" style="cursor:pointer;width:40px;height:40px;border-radius:50%;color:white;text-align:center;line-height:40px" :class="{'step':step===2,'disactive':step!=2}">
                           2
                       </div>
                        <img src="../../assets/line.svg" style="width:40px"/>
                         <div  @click="step=3"  style="cursor:pointer;width:40px;height:40px;border-radius:50%;color:white;text-align:center;line-height:40px" :class="{'step':step===3,'disactive':step!=3}">
                           3
                       </div>
                   </div>
                   
               </div>


            </div>
            <div style="margin-top:30px;width:90%;font-size:25px;font-weight:700; display:flex;justify-content:space-between;color: #555555;align-items:centers">
                <div>近期考试</div>
                <img src='../../assets/detail.svg' style="width:25px;height:25px;cursor:pointer;" />
            </div>
            <div style="margin-top:10px;width:90%;font-size:25px;font-weight:700; display:flex;justify-content:space-between;color: #555555;align-items:centers;flex-wrap:wrap">
                <div style="margin-top:20px;width:430px;height:250px;box-shadow:0px 0px 6px  rgba(0, 0, 0, 0.35);display:flex;justify-content:center;flex-wrap:wrap">
                    <div style="width:93%;margin-top:10px;display:flex;align-items:center;height:50px">
                        <img src="../../assets/label.svg" style="width:35px">
                        <span style="margin-left:20px;font-size:22px;color:black">高等数学期中考试</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试时间</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">2022/1/1 8:40-10:40</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">题目数量</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">41</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试类型</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">闭卷</span>
                    </div>
                    <div style="width:100%;background: #f4f2f3;height:50px;align-self:end;align-items:center;display:flex">
                        <div style="width:100px;height:30px;border-radius:4px;background: #e9e7ef;display:flex;align-items:center;margin-left:20px">
                            <div style="height:10px;width:10px;border-radius:50%;background: #6569bb;margin-left:10px">
                            </div>
                            <span style="font-size:8px;color:#7f95a7;margin-left:10px">进行中</span>

                        </div>

                    </div>

                </div>
              <div style="margin-top:20px;width:430px;height:250px;box-shadow:0px 0px 6px  rgba(0, 0, 0, 0.35);display:flex;justify-content:center;flex-wrap:wrap">
                    <div style="width:93%;margin-top:10px;display:flex;align-items:center;height:50px">
                        <img src="../../assets/label.svg" style="width:35px">
                        <span style="margin-left:20px;font-size:22px;color:black">高等数学期中考试</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试时间</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">2022/1/1 8:40-10:40</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">题目数量</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">41</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试类型</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">闭卷</span>
                    </div>
                    <div style="width:100%;background: #f4f2f3;height:50px;align-self:end;align-items:center;display:flex">
                        <div style="width:100px;height:30px;border-radius:4px;background: #e9e7ef;display:flex;align-items:center;margin-left:20px">
                            <div style="height:10px;width:10px;border-radius:50%;background: #6569bb;margin-left:10px">
                            </div>
                            <span style="font-size:8px;color:#7f95a7;margin-left:10px">进行中</span>

                        </div>

                    </div>

                </div><div style="margin-top:20px;width:430px;height:250px;box-shadow:0px 0px 6px  rgba(0, 0, 0, 0.35);display:flex;justify-content:center;flex-wrap:wrap">
                    <div style="width:93%;margin-top:10px;display:flex;align-items:center;height:50px">
                        <img src="../../assets/label.svg" style="width:35px">
                        <span style="margin-left:20px;font-size:22px;color:black">高等数学期中考试</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试时间</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">2022/1/1 8:40-10:40</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">题目数量</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">41</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试类型</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">闭卷</span>
                    </div>
                    <div style="width:100%;background: #f4f2f3;height:50px;align-self:end;align-items:center;display:flex">
                        <div style="width:100px;height:30px;border-radius:4px;background: #e9e7ef;display:flex;align-items:center;margin-left:20px">
                            <div style="height:10px;width:10px;border-radius:50%;background: #6569bb;margin-left:10px">
                            </div>
                            <span style="font-size:8px;color:#7f95a7;margin-left:10px">进行中</span>

                        </div>

                    </div>

                </div><div style="margin-top:20px;width:430px;height:250px;box-shadow:0px 0px 6px  rgba(0, 0, 0, 0.35);display:flex;justify-content:center;flex-wrap:wrap">
                    <div style="width:93%;margin-top:10px;display:flex;align-items:center;height:50px">
                        <img src="../../assets/label.svg" style="width:35px">
                        <span style="margin-left:20px;font-size:22px;color:black">高等数学期中考试</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试时间</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">2022/1/1 8:40-10:40</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">题目数量</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">41</span>
                    </div>
                     <div style="width:83%;margin-top:12px;display:flex;align-items:center;height:20px">
                        <span style="font-size:20px;color:black">考试类型</span>
                          <span style="margin-left:20px;font-size:16px;color:black;font-weight:normal">闭卷</span>
                    </div>
                    <div style="width:100%;background: #f4f2f3;height:50px;align-self:end;align-items:center;display:flex">
                        <div style="width:100px;height:30px;border-radius:4px;background: #e9e7ef;display:flex;align-items:center;margin-left:20px">
                            <div style="height:10px;width:10px;border-radius:50%;background: #6569bb;margin-left:10px">
                            </div>
                            <span style="font-size:8px;color:#7f95a7;margin-left:10px">进行中</span>

                        </div>

                    </div>

                </div>
            </div>

            
        </div>


    </div>
    <div style="width:359px;background:#e6e7e8;height:auto !important;display:flex;justify-content:center;flex-wrap:wrap;" >
        <div style="display:flex;justify-content:center;flex-wrap:wrap;align-content:start;margin-top:20px;font-family: 'Arial Normal', 'Arial', sans-serif;">
    
          <div style="margin-top:15px;width:315px;display:flex;align-items:center;height:50px;box-sizing:border-box;border-bottom:1px solid #d7d7d7;">
                <img src="../../assets/calendar.svg" style="height:34px;width:auto"><span style="margin-left:20px;color: #4f5f81;line-height:35px;font-size:22px;font-weight:700">日历</span>
            </div>
            <div style="width:320px;display:flex;justify-content:end;margin-top:15px; font-family: 'Arial Normal', 'Arial', sans-serif;color: #403330">
                <div style="margin-left:10px;width:70px;height:30px;background: #eb733e;border-radius:4px;line-height:30px;text-align:center">
                    考试
                </div>
                 <div style="margin-left:10px;width:70px;height:30px;background: #4799d5;border-radius:4px;line-height:30px;text-align:center">
                     假期
                </div>
                   <div style="margin-left:10px;width:70px;height:30px;background: #fbcb65;border-radius:4px;line-height:30px;text-align:center">
                       事件
                </div>
            </div>
            <div>
             <Datepicker style="border:none" calendarClassName="dp-custom-calendar" calendarCellClassName="dp-custom-cell" menuClassName="dp-custom-menu" v-model="date" inline autoApply>
                  <template #day="{ day,date }">
            <temlplate v-if="day === new Date().getDate() + 1" >
                {{day}}
            </temlplate>
            <template v-else>
              {{ day }}
            </template>
        </template>
             </Datepicker>
             <el-button type="text" size="small" style="color:#73c8c6;font-size:10px" @click="date=new Date()">回到今天</el-button>
            </div>
            <div style="width:90%;display:flex;justify-content:center;margin-bottom:10px;flex-wrap:wrap">
                <div v-for="item in agenda" :key="item.title" style="margin-top:10px;width:100%;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;background:white;height:130px;justify-align:center" :class="{'holiday':item.type==='holiday','exam':item.type==='exam','event':item.type==='event'}">
                    <div style="text-align:left;width:90%;font-szie:18px;font-weight:700">
                       {{item.title}}
                    </div>
                    <div style="text-align:left;width:90%;justify-content:start;display:flex">
                        <div>考试时间</div><div style="margin-left:30px">{{item.time}}</div>
                    </div>

                </div>
            </div>
         
        </div>


    </div>
</div>
</template>

<script >
 import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
export default {
    data(){
        return{
            step:1,
            is_holiday:true,
            is_exam:true,
            is_event:true,
            date:new Date(),
            agenda:[{
                title:"高数期中考试",
                time:"2022/1/1 13:40-15:40",
                type:"exam"
                
            },
            {
                title:"高数期中考试",
                time:"2022/1/1 13:40-15:40",
                type:"event"
                
            },
            {
                title:"高数期中考试",
                time:"2022/1/1 13:40-15:40",
                type:"holiday"
                
            }]

        }

    },
components:{
Datepicker

}
}
</script>

<style scoped lang='scss'>
html,body{
    height:100%
}
.disactive{
     background: #d7d7d7;
}
.step{
    background:#73c8c6;
}
.holiday{
    border-left: 8px solid   #4799d5;
}
.exam{
     border-left: 8px solid  #f37543;
}
.event{
     border-left: 8px solid #fbcb65;
}
/deep/.dp-custom-menu{
    width:320px;
    background:#e6e7e8;
    
}
/deep/ .dp-custom-cell {
  border-radius: 50%;
  height:45px;
  width: 45px;
  
}

/deep/.dp-custom-calendar{
  .db__calendar_header{
      background: #595c75;
      color:white;
      width:320px;
      
  }
 
}
*{
    box-sizing: border-box;
   
    font-family: "Arial Normal", "Arial", sans-serif;
}
/deep/.dp__instance_calendar{
 .dp__button_bottom{
      display: none;
  }
}
/deep/.dp__menu {
    border:none;
}
/deep/.dp__active_date{
    background: #73c8c6;
    border:none;


    }
</style>