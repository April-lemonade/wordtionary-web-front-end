import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import axios from 'axios'
import {postRequest} from './utils/api';
import {postKeyValueRequest} from './utils/api';
import {putRequest} from './utils/api';
import {deleteRequest} from './utils/api';
import {getRequest} from './utils/api';

let app = createApp(App);
app.config.globalProperties.$axios = axios
app.config.globalProperties.$echarts = echarts;
app.use(store).use(router).use(ElementPlus, {size: 'small', zIndex: 3000}).mount('#app')
app.config.globalProperties.$postRequest = postRequest;
app.config.globalProperties.$postKeyValueRequest = postKeyValueRequest
app.config.globalProperties.$putRequest = putRequest;
app.config.globalProperties.$deleteRequest = deleteRequest;
app.config.globalProperties.$getRequest = getRequest;
