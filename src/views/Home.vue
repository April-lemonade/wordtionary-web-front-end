<template>
  <div class="home">
   <div style="height:200px;width:400px;background:yellow;display:flex;flex-direction:row">
     <div style="height:100px;width:200px;background:green;align-self:end"></div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){
    return{
      
    }
  },
  methods(){

  },
  mounted(){
let elPicker=this.$refs.datepicker
elPicker.focus()

  }
  
}
</script>
<style scoped>

.el-calendar-table .el-calendar-day{
height:20px !important
}
</style>

