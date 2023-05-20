<template>
  <div class="container">
    <div
        style="background-color: white;width:40%;border-style: solid;border-width: 0px;border-radius: 5px;display: flex;flex-direction: column;justify-content: center;align-items: center">
      <img style="width: 20%" src="../assets/logo_wordtionary.png">
      <el-form label-position="top" label-width="100px" style="width: 70%;" size="default"
               :rules=loginFormRules
               :model="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input style="height:100%" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <div slot="label" class="el-form-item__label" style="width:100%;height:22px">
            <span>密码</span>
          </div>
          <el-input show-password style="height:100%" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:50px">
          <el-button type="primary" style="margin:0 auto;height:50px;width:100%;background: #0052d9;border:none"
                     @click="login">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import {getCurrentInstance} from 'vue';


export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{require: true, message: "请输入用户名", trigger: blur}],
        password: [{require: true, message: "请输入密码", trigger: blur}]

      }

    }
  },
  name: 'Home',
  components: {
    HelloWorld,

  },
  mounted() {
  },
  setup() {
    const {proxy} = getCurrentInstance();
    return {
      proxy
    }
  },
  methods: {
    login() {
      let that = this
      // console.log(this.loginForm.username)
      this.$postRequest("/user/weblogin?account=" + that.loginForm.username + '&pwd=' + that.loginForm.password,).then(res => {
        console.log(res)
        // getCurrentInstance().$openid = res.id
        // const { ctx } = getCurrentInstance();
        // ctx.$openid = res.id
        that.proxy.$openid = res.id

        console.log("!!!" + that.proxy.$openid)
        that.$router.push({
          path: '/about', query: {
            openid: res.id
          }
        })
        /* if (res.code == 200) {
         } else {
           console.log(res.data)
         }*/
      })
      /* this.$axios.get('http://localhost:7002/user/auth/login?account=' + that.loginForm.username + "&pwd=" + that.loginForm.password, {
             /!*data: {
               account: that.loginForm.username,
               pwd: that.loginForm.password
             },*!/
             headers: {Authorization: ""}
           }
       ).then(res => {
         console.log(res)
         if (res.code == 200) {
           if (res.data.role == 3) {
             that.$router.push('/admin/home')
           } else if (res.data.role == 1) {
             that.$router.push('/student/home')
           } else if (res.data.role == 2) {
             that.$router.push('/teacher/home')
           }
         } else {
           console.log(res.data.data)
         }
       })*/
    }
  },
  /*mounted() {
    /!*this.$getRequest('/user/auth/login?account=1912190001&pwd=1912190001').then(res=>{
      if (res) {
        console.log(res)
      }
    })*!/
    this.$getRequest('/user/teacher/info/' + '000001').then(res => {
      console.log(res)
    })
    /!*this.$axios.get('http://121.196.198.132:7002/user/auth/login?account=1912190001&pwd=1912190001').then(res=>{
      if(res){
        console.log(res)

      }else{
        console.log(res)
      }
    })*!/

    /!*this.$axios.get('http://121.196.198.132:7002/user/faculty/list',{
      headers:{
        'Authorization' : 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOjMsImNyZWF0ZWQiOjE2NDc3NDU1NjM5NTYsInVzZXJfYWNjb3VudCI6ImFkbWluIiwiZXhwIjoxNjQ4OTU1MTYzfQ.HFPxc1BlEw_zS6QSL9KyTR0j2qzIAPsbhC_br1UGgqu9_TPHLzDrqo9odJrwHJ97lKQzRn-r1shTLLgMy6Rnnw'
      }
    }).then(res=>{
      if(res){
        console.log(res)

      }else{
        console.log(res)
      }
    })*!/

    let myChart = this.$echarts.init(
        document.getElementById("myChart")
    );
    // echarts 配置
    // 绘制图表
    myChart.setOption({
      title: {text: "时间"},
      tooltip: {},
      xAxis: {
        data: ["8-21", "8-22", "8-23", "8-24", "8-25", "8-26"],
      },
      yAxis: {},
      series: [
        {
          name: "日期",
          type: "bar",
          data: [6, 12, 12, 18, 12, 18],
        },
      ],
    });
  }*/

}


</script>
<style scoped>

.el-input >>> .el-input__inner {
  height: 50px;
  font-size: 18px;
}

.el-form-item >>> .el-form-item__label {
  /*color: white;*/
  font-size: 18px;
  font-weight: bold;
}

.container {
  background-image: url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4MDd8MHwxfHNlYXJjaHwxfHx2b2NhYnVsYXJ5fGVufDB8fHx8MTY4MTI3NjczMA&ixlib=rb-4.0.3&q=80&w=1080");
  /*background-color: #618dff;*/
  background-size: cover;
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

