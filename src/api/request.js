/*
 * @Author: CL
 * @Date: 2021-08-12 23:42:41
 * @LastEditTime: 2021-08-15 00:51:53
 * @Description: 网络请求
 */

import axios from 'axios';
import store from '../store';

const request = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/'
})

//请求拦截
request.interceptors.request.use(config => {
  const { url } = config;
  if(url.indexOf('/passport') < 0){
    config.params = {
      ...config.params,
      appkey: store.state.userInfo.appkey
    }
  }
  return config;
}, (error) => Promise.reject(error));


//响应拦截
request.interceptors.response.use(res => {
  if(res.data.status === 'fail'){
    return Promise.reject(res.data.msg);
  }else{
    return res.data;
  }
}, error => Promise.reject(error));


export default request;