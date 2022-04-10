import axios from 'axios'
// import {Message} from 'element-ui';
import { ElMessage } from 'element-plus'
import router from '../router'
import {mymessage} from '@/utils/mymessage';

axios.interceptors.response.use(success => {
  if (success.status && success.status == 200 && success.data.status == 500) {
    ElMessage.error({message: success.data.msg})
    return;
  }
  if (success.data.msg) {
    ElMessage.success({message: success.data.msg})
  }
  return success.data;
}, error => {
  if (error.response.status == 504 || error.response.status == 404) {
    ElMessage.error({message: '服务器被吃了( ╯□╰ )'})
  } else if (error.response.status == 403) {
    ElMessage.error({message: '权限不足，请联系管理员'})
  } else if (error.response.status == 401) {
    mymessage.error({message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录'})
    router.replace('/');
  } else {
    if (error.response.data.msg) {
      ElMessage.error({message: error.response.data.msg})
    } else {
      ElMessage.error({message: '未知错误!'})
    }
  }
  return;
})

let base = 'http://121.196.198.132:7002';
let Authorization = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOjMsImNyZWF0ZWQiOjE2NDg5Njk1NDk3NjAsInVzZXJfYWNjb3VudCI6ImFkbWluIiwiZXhwIjoxNjUwMTc5MTQ5fQ.upBC-CyUciGzxvpQCCHpIcnFUe_K3NRdp8dbh62jXDFq_37Tfvx24kqpUrvWZhv-CGGxXd6hCDcSNQ97vBG8WA';

export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : Authorization
    }
  });
}
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : Authorization
    }
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : Authorization
    }
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : Authorization
    }
  })
}
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : Authorization
    }
  })
}
