import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import axios from 'axios'
import {postRequest} from './utils/api';
import {postKeyValueRequest} from './utils/api';
import {putRequest} from './utils/api';
import {deleteRequest} from './utils/api';
import {getRequest} from './utils/api';
import {getRequest1} from './utils/api';
// import global from './utils/global'
import global from "./utils/global";
// import Vue from 'vue'

// Vue.prototype.global = global
let app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$global = global;
app.use(store).use(router).use(ElementPlus, {size: 'small', zIndex: 3000}).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$postRequest = postRequest;
app.config.globalProperties.$postKeyValueRequest = postKeyValueRequest
app.config.globalProperties.$putRequest = putRequest;
app.config.globalProperties.$deleteRequest = deleteRequest;
app.config.globalProperties.$getRequest = getRequest;
app.config.globalProperties.$getRequest1 = getRequest1;

// app.use(router).mount('#app')

