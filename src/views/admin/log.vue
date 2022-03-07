<template>
  <div style="width:100%;height:calc(100vh - 70px); ">
      <div style="display:flex;justify-content:center;flex-wrap:wrap">
        <el-input placeholder="Search" size="default" style="width:600px;margin-top:40px">
        </el-input>
          <el-table
          border
      :header-cell-style="{border:'1px white solid',text:'center'}"
    :data="tableData"
    
    style="width: 1070px;margin-top:30px;font-size:17px"
  >
  <el-table-column prop="id" label="操作ID"  width="170" align="center" style="font-weight:bolder"/>
   <el-table-column prop="name" label="操作名称" width="120" align="center"/>
    <el-table-column prop="object" label="操作对象" align="center"  width="120" />
     <el-table-column prop="opname" label="操作人名称" align="center" width="210" />
       <el-table-column prop="identity" label="操作人身份" align="center"  width="110" />
            <el-table-column prop="address" label="操作地址" align="center" width="160" />
                  <el-table-column prop="time" label="操作时间" align="center" width="180" />
          
       
     </el-table>

      </div>

  </div>


</template>

<script>
export default {
   data(){
        return{
             tableData:[
                {
                    id:"00001",
                    name:"创建教学班",
                    object:"教学班1",
                    opname:"April",
                    identity:"管理员",
                    address:"127.0.0.0",
                    time:"2020/2/22 12:06"
                  


                },
                 {
                    id:"00002",
                    name:"创建教学班",
                    object:"教学班2",
                    opname:"April",
                    identity:"管理员",
                    address:"127.0.0.1",
                    time:"2020/2/22 12:06"
                  


                },
                {
                    id:"00003",
                    name:"创建教学班",
                    object:"教学班2",
                    opname:"April",
                    identity:"管理员",
                    address:"127.0.0.2",
                    time:"2020/2/22 12:06"
                  


                },{
                    id:"00004",
                    name:"创建教学班",
                    object:"教学班2",
                    opname:"April",
                    identity:"管理员",
                    address:"127.0.0.4",
                    time:"2020/2/22 12:06"
                  


                }
                 
               
               
            ]
        }
    }
}
</script>

<style  scoped>
.el-input>>>.el-input__inner{
    height:40px
}

</style>

