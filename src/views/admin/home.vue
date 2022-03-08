<template>
  <div style="width:100%;height:calc(100vh - 70px)">
    <div style="width:calc( 100% - 361px);float:left;margin:0 auto;height:calc(100vh - 70px);background:blue"></div>
    <div style="float:right;width:359px;background:#e6e7e8;min-height:calc(100vh - 70px);display:flex;justify-content:center;flex-wrap:wrap" >
        <div style="display:flex;justify-content:center;flex-wrap:wrap;align-content:start;margin-top:-20px;font-family: 'Arial Normal', 'Arial', sans-serif;">
        <div style="background:#016fa0;height:90px;width:90px;box-sizing:border-box;border:6px solid #e6e7e8;border-radius:50%;position:relative;top:40px;color:white;line-height:78px;text-align:center;font-size:40px;font-weight:700">A</div>
        <div style="width:320px;height:150px;border-radius:8px;background:#595c75;display:flex;justify-content:center;align-items:center">
            <div style="margin-top:30px">
                <div style="width:100%;text-align:center;color:white; font-weight: 700;font-size:24px;line-height:40px">
                    Alice
                </div>
                  <div style="width:100%;text-align:center;color:white; font-weight: 700;font-size:16px">
                   641676557@qq.com
                </div>
            </div>
        </div>
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
            <datepicker v-model="date"></datepicker>
          
         
      
        </div>


    </div>
</div>
</template>

<script >
import Datepicker from 'vuejs-datepicker';
export default {
    data(){
        return{
            date:new Date()

        }

    },
components:{
    Datepicker

}
}
</script>

<style>

</style>