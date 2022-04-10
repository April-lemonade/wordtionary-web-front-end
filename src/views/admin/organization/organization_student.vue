<template>
  <div style="width:100%;min-height:calc(100vh - 70px);">
<div style="float:left;width:400px;min-height:calc(100vh - 70px);background:white;border-right:1px solid  #d7d7d7;display:flex;justify-content:center;flex-wrap:wrap;align-content:flex-start">
    <el-input @focus="input_focus" @blur="input_blur" placeholder="Search" style="height:32px;width:300px;margin-top:30px;color:black" size="default"  >
        <template #prefix>
          <el-icon :size="10" style="top:11px;"><img id="search_icon" src="../../../assets/search.svg" style="width:20px;height:auto"></el-icon>
        </template>
    </el-input>
    <div style="width:80%;height:60px;display:flex;align-items:center;justify-content:space-between"  >
    <div style="float:left;font-size:20px;">学院</div><img  v-if=!show_school src="../../../assets/show.png" style="justify-self:flex-end;width:25px;cursor:pointer" @click="show_school=true"><img v-if=show_school src="../../../assets/hide.png" style="float:right;width:25px;cursor:pointer" @click="show_school=false">
    </div>
     <el-radio-group v-if=show_school v-model="radio" style="width:80%" fill="#ffffff" text-color="#ffffff">
    <el-radio :label="3">Option A</el-radio>
    <el-radio :label="6">Option B</el-radio>
    <el-radio :label="9">Option C</el-radio>
  </el-radio-group>
    <div style="width:80%;height:60px;display:flex;align-items:center;justify-content:space-between"  >
    <div style="float:left;font-size:20px;">班级</div><img  v-if=!show_class src="../../../assets/show.png" style="justify-self:flex-end;width:25px;cursor:pointer" @click="show_class=true"><img v-if=show_class src="../../../assets/hide.png" style="float:right;width:25px;cursor:pointer" @click="show_class=false">
    </div>
     <el-radio-group v-if=show_class v-model="radio" style="width:80%" fill="#ffffff" text-color="#ffffff">
    <el-radio :label="3">Option A</el-radio>
    <el-radio :label="6">Option B</el-radio>
    <el-radio :label="9">Option C</el-radio>
  </el-radio-group>
   
</div>
<div style="width:calc(100%-400px);height:400px;display:flex;justify-content:center">
     <el-table
     border
  
     :header-cell-style="{padding:'10px'}"
      :cell-style="{padding:'10px',align:'center'}"
    :data="tableData"
    
    style="width: 830px;margin-top:30px;font-size:15px"
  >
  <el-table-column  align="center"    prop="number" label="学号" sortable width="140" style="font-weight:bolder"/>
   <el-table-column   align="center" prop="name" label="姓名" sortable width="120" />
    <el-table-column  align="center" prop="sex" label="性别" sortable width="120" />
     <el-table-column align="center"  prop="school" label="学院" sortable width="200" />
       <el-table-column  align="center"  prop="class" label="班级"  width="150"/>
       <el-table-column  align="center" label="操作"  width="100" >
           <el-button type="text" style="color: #84cecd;font-size:15px">
               查看
           </el-button>
       </el-table-column>
     </el-table>
</div>
</div>


</template>

<script>
export default {
    data(){
        return{
            show_school:false,
            show_class:false,
            tableData:[
                {
                    number:1912190112,
                    name:"陈恒冠",
                    sex:"男",
                    school:"工商管理学院",
                    class:"工商管理2001"

                },
                 {
                    number:1912190113,
                    name:"陈恒家",
                    sex:"男",
                    school:"工商管理学院",
                    class:"工商管理2001"

                },
                 {
                    number:1912190102,
                    name:"潘云安",
                    sex:"男",
                    school:"旅游与城乡规划学院",
                    class:"旅游管理2001"

                },
                 {
                    number:1912190117,
                    name:"张冠以",
                    sex:"男",
                    school:"旅游与城乡规划学院",
                    class:"旅游管理2001"

                }

            ]

            

        }

    },

      methods:{
        input_focus(){
            var input=document.getElementById("search_icon")
            input.style.position="relative";
            input.style.left="-80px";
            input.style.filter="drop-shadow(80px 0 #f8c863)";
        },
        input_blur(){
              var input=document.getElementById("search_icon")
                input.style.position="relative";
            input.style.left="-80px";
            input.style.filter="drop-shadow(80px 0 black)";
        }
     
    },
    mounted(){
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
    }



}
</script>

<style scoped>
.el-input>>>.el-input__prefix:focus .search_icon{
  position: relative;
  left: -80px;
  filter: drop-shadow(80px 0 #f8c863);
}
.el-input>>>.el-input__inner:focus{
    border-color: #f8c863}
.el-radio>>>.el-radio__label .is-checked{
    font-size: 16px;
       color: black!important;
}
.el-radio{
    width:100%
}
.el-radio>>>.el-radio__label{
    font-size: 16px;
     color: black!important;
      
}
.el-radio>>>.el-radio__inner{
    width: 14px;
    height: 14px;
}
.el-radio>>>.el-radio__inner .is-checked{
    color: black!important;
}
.el-radio>>>.el-radio__input.is-checked .el-radio__inner {
     color: black!important;
     background: gray !important;
     border:gray !important ;

}
</style>