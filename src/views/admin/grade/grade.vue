<template>
  <div style="width:100%;min-height:calc(100vh - 70px);">
      <div style="float:left;width:400px;min-height:calc(100vh - 70px);background:white;border-right:1px solid  #d7d7d7;display:flex;justify-content:center;flex-wrap:wrap;align-content:flex-start">
    <el-input @focus="input_focus" @blur="input_blur" placeholder="Search" style="height:32px;width:300px;margin-top:30px;color:black" size="default"  >
        <template #prefix>
          <el-icon :size="10" style="top:11px;"><img id="search_icon" src="../../../assets/search.svg" style="width:20px;height:auto"></el-icon>
        </template>
    </el-input>
      <div style="width:300px;margin-top:40px">
          <el-tree class="filter-tree" ref="tree" node-key="id" :filter-node-method="filterNode" :data="data"
                   accordion  show-checkbox
                   :default-expanded-keys="[1,2]"
                   :props="defaultProps"
                   check-strictly
                   @check-change="handleCheckChange"
          >
          </el-tree>
        </div>
  </div>
  <div style="width:calc(100%-400px);height:calc(100vh - 70px);display:flex;justify-content:center;flex-wrap:wrap;align-content:start;overflow:auto">
    <div style="width:90%;">
      <div style="width:100%;">
        <img src="../../../assets/grade_home.png" style="height:150px;width:100%">
      </div>
      <div v-if="!checked[0]" style="height:calc(100vh - 250px);margin-top:10px;width:100%;background: #eefcfe;display:flex;justify-content:center" >

       <div style="margin-top:300px;font-weight:700;font-size:18px"> <img src="../../../assets/pointer.svg" style="width:30px;height:30px;position:relative;top:5px;">请选择左侧的学院和科目，查看考试情况吧~</div>

      </div>
      <div v-if="checked[0]" style="height:calc(100vh - 250px);margin-top:10px;width:100%;display:flex;justify-content:center;flex-wrap:wrap">
        <div style="width:92%;display:flex;justify-content:end;margin-top:20px">
          <el-select  v-model="value" placeholder="考试状态" style="width:100px" size="default">
            <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
                :value="item.value">
    </el-option>
          </el-select>
        </div>
        <div style="width:100%;display:flex;flex-wrap:wrap;justify-content:center;margin-top:-80px">
          <div v-for="(exam,index) in exams" :key="exam.id" 
           style="border-style: solid;border-width: 1px;border-color: #D7D7D7;margin: 3%;width: 90%;border-radius: 10px;display: flex;flex-direction: column;padding: 2%;">
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;margin-bottom: 5%">
          <div>{{ exam.name }}</div>
          <el-tag class="mx-1" type="success" effect="dark" style="justify-self: flex-end">
            {{ exam.status }}
          </el-tag>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 60%">
          <div>{{ exam.course }}</div>
          <div>|</div>
          <div>{{ exam.institution }}</div>
          <div>|</div>
          <div>{{ exam.time }}</div>
        </div>
      </div>
        </div>


      </div>

     </div>
      
  </div>

  </div>
</template>

<script>
export default {
    data(){
        return{
           value:'',
            checked:[],
            data:[
        {
          id: 2,
          label: "工商管理学院",
          disabled: true,
          options:[
            {
               value: '1',
               label: '已结束'
        
            },
             {
               value: '2',
               label: '批阅中'
        
            },
             {
               value: '3',
               label: '进行中'
        
            },
             {
               value: '4',
               label: '待开始'
        
            }
          ],
          children: [
            {
              id: 4,
              label: "人力资源管理",
            }, {
              id: 5,
              label: "企业经济学",
            }, {
              id: 6,
              label: "科学方法论",
            }, {
              id: 7,
              label: "市场营销学",
            }, {
              id: 8,
              label: "广告学",
            }, {
              id: 9,
              label: "消费者行为学",
            }, {
              id: 10,
              label: "商业心理学",
            }, {
              id: 11,
              label: "国际商务概论",
            },
          ],
        }, {
          id: 3,
          label: "旅游与城乡管理学院",
          disabled: true,
          children: [
            {
              id: 12,
              label: "休闲学",
            }, {
              id: 13,
              label: "旅游企业管理",
            }, {
              id: 14,
              label: "旅游研究方法",
            }, {
              id: 15,
              label: "城市遥感信息",
            }, {
              id: 16,
              label: "城市生态学",
            }, {
              id: 17,
              label: "旅游规划",
            }, {
              id: 18,
              label: "旅游企业会计",
            }, {
              id: 19,
              label: "酒店管理概论",
            },
          ],
        }
      ],
        exams: [{
        id: 0,
        name: '2021-2022第2学期线性代数期末考试',
        course: '线性代数',
        institution: '统计与数学学院',
        time: '2022/1/1 13:40 - 15:40',
        status: '批阅中'
      }, {
        id: 1,
        name: '2021-2022第2学期微积分期末考试',
        course: '微积分',
        institution: '统计与数学学院',
        time: '2022/1/1 13:40 - 15:40',
        status: '批阅中'
      }, {
        id: 2,
        name: '2021-2022第2学期数学分析期末考试',
        course: '数学分析',
        institution: '统计与数学学院',
        time: '2022/1/1 13:40 - 15:40',
        status: '已结束'
      }]
        }
    },
     methods:{
          show_detail(data) {
      console.log(data)
      let obj = JSON.stringify(this.exams[data])
      this.$router.push({path:'/admin/mark/mark_console',query: {obj:obj}})
    },
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
        },
         handleCheckChange(data, checked, indeterminate) {
      let {id} = data
      let index = this.checked.indexOf(id)
      if (index < 0 && this.checked.length && checked) {
        this.$message.warning('只能同时选中一门课程')
        console.log(data)
        this.$refs.tree.setChecked(data, false)
        return
      }
      if (!checked && index >= 0 && this.checked.length) {
        this.checked = []
        return
      }
      if (index < 0 && !this.checked.length && checked) {
        this.checked.push(id)
      }
    },
       handleNodeClick(data, checked, node) {
      console.log(data);
      if (checked) {
        this.$refs.tree.setCheckedNodes([data]);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

     
    }

}
</script>

<style scoped>
:deep(.el-tree-node__content) {
  display: flex;
  align-items: center;
  height: 26px;
  cursor: pointer;
  margin-bottom: 10px;
}

:deep(.el-tree-node__label) {
  font-size: 18px;
}
.el-input>>>.el-input__inner:focus{
    border-color: #f8c863}
</style>