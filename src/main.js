import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
let app=createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(store).use(router).use(ElementPlus, {size: 'small', zIndex: 3000}).mount('#app')
