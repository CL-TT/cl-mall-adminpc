/*
 * @Author: CL
 * @Date: 2021-08-12 23:47:42
 * @LastEditTime: 2021-08-13 00:07:12
 * @Description: 登录相关的接口
 */

import request from './request';

/**
 * 登录 
 */
export function login(data){
  return request({
    url: '/passport/login',
    method: 'post',
    data
  })
}
