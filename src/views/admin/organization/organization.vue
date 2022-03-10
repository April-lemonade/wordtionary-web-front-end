<template>
  <div style="width:100%;min-height:calc(100vh - 70px);display:flex;justify-content:center;">
   
      <div style="position:relative;width:1200px;height:400px;background:white;margin-top:100px;display:flex;justify-content:space-around;align-items:center;">
         <div style="position:absolute;left:0;top:0;z-index:1;width:150px;height:150px;display:flex;flex-wrap:wrap;align-content:center">
             <div v-for="i in 20" :key="i" style="margin-left:12px;margin-right:13px;margin-bottom:10px;margin-top:7px;width:10px;height:10px;border-radius:50%;background: #f3cb65"></div>
    </div>
     <div style="position:absolute;right:0;bottom:0;z-index:1;width:150px;height:150px;display:flex;flex-wrap:wrap;align-content:center">
             <div v-for="i in 20" :key="i" style="margin-left:23px;margin-right:2px;margin-bottom:10px;margin-top:7px;width:10px;height:10px;border-radius:50%;background: #f3cb65"></div>
    </div>
          <div style="position:relative;z-index:2;width:223px;height:223px;border:1px solid black;border-radius:8px;display:flex;justify-content:center;flex-wrap:wrap;align-content:center;cursor:pointer;background:white" @click="$router.push('teacher')">
               <img src="../../../assets/organization_teacher.png" style=";width:30%;height:auto">
          <div style="width:100%;font-size:30px;text-align:center;">教师</div>
          </div>
           <div style="width:223px;height:223px;border:1px solid black;border-radius:8px;display:flex;justify-content:center;flex-wrap:wrap;align-content:center;cursor:pointer;background:white" @click="$router.push('student')">
                <img src="../../../assets/organization_student.png" style="width:30%;height:auto">
          <div style="width:100%;font-size:30px;text-align:center">学生</div>

          </div>
           <div style="z-index:2;width:223px;height:223px;border:1px solid black;border-radius:8px;display:flex;justify-content:center;flex-wrap:wrap;align-content:center;cursor:pointer;background:white" @click="$router.push('class')">
   <img src="../../../assets/organization_class.png" style="width:30%;height:auto">
          <div style="width:100%;font-size:30px;text-align:center">教学班</div>
          </div>
      
      </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>