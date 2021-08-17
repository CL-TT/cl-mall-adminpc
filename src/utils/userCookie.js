/*
 * @Author: CL
 * @Date: 2021-08-13 15:31:49
 * @LastEditTime: 2021-08-13 16:03:41
 * @Description: 把用户信息保存到cookie中
 */

import Cookies from 'js-cookie';


/**
 * 新增cookie
 * @param {*} userInfo: 是一个用户信息对象 
 */
export function setCookie(key, userInfo){
  Cookies.set(key, JSON.stringify(userInfo));
}

/**
 * 获取cookie,根据key值 
 */
export function getCookie(key){
  if(Cookies.get(key)){
    return JSON.parse(Cookies.get(key));
  }
}

/**
 * 根据key值删除cookie
 */
export function removeCookie(key){
  Cookies.remove(key);
}
