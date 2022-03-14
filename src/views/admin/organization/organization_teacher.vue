<template>
<div style="width:100%;min-height:calc(100vh - 70px);">
<div style="float:left;width:400px;min-height:calc(100vh - 70px);background:white;border-right:1px solid  #d7d7d7;display:flex;justify-content:center;flex-wrap:wrap;align-content:flex-start">
    <el-input @focus="input_focus" @blur="input_blur" placeholder="Search" style="height:32px;width:300px;margin-top:30px;color:black" size="default"  >
        <template #prefix>
          <el-icon :size="10" style="top:11px;"><img id="search_icon" src="../../../assets/search.svg" style="width:20px;height:auto"></el-icon>
        </template>
    </el-input>
    <div style="width:80%;height:60px;display:flex;align-items:center;justify-content:space-between"  >
    <div style="float:left;font-size:20px;">学院</div><img  v-if=!show src="../../../assets/show.png" style="justify-self:flex-end;width:25px;cursor:pointer" @click="show=true"><img v-if=show src="../../../assets/hide.png" style="float:right;width:25px;cursor:pointer" @click="show=false">
    </div>
     <el-radio-group v-if=show v-model="radio" style="width:80%" fill="#ffffff" text-color="#ffffff">
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
    
    style="width: 660px;margin-top:30px;font-size:15px"
  >
  <el-table-column  align="center"    prop="number" label="工号" sortable width="120" style="font-weight:bolder"/>
   <el-table-column   align="center" prop="name" label="姓名" sortable width="120" />
    <el-table-column  align="center" prop="sex" label="性别" sortable width="120" />
     <el-table-column align="center"  prop="school" label="学院" sortable width="200" />
       <el-table-column  align="center"  label="操作"  width="100" >
           <el-button type="text" style="color: #84cecd;font-size:15px">
               查看
           </el-button>
       </el-table-column>
     </el-table>
</div>
</div>
</template>

<script>
import {Search} from "@element-plus/icons-vue"
export default {
    components:{
        Search

    },
    data(){
        return{
            show:false,
            radio:'',
            tableData:[
                {
                    number:191001101,
                    name:"贺铭洋",
                    sex:"男",
                    school:"旅游与城乡规划学院"
                },
                 {
                    number:191001106,
                    name:"贺铭洋",
                    sex:"男",
                    school:"旅游与城乡规划学院"
                },
                 {
                    number:191001104,
                    name:"肖宇",
                    sex:"男",
                    school:"工商管理学院"
                },
                  {
                    number:191001103,
                    name:"李凡",
                    sex:"男",
                    school:"工商管理学院"
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
     
    }

}
</script>


<style  scoped>
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
