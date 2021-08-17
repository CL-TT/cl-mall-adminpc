/*
 * @Author: CL
 * @Date: 2021-08-15 00:31:08
 * @LastEditTime: 2021-08-15 00:52:06
 * @Description: 商品类目的api
 */

import request from './request';

/**
 * 获取所有的商品类目
 */
export function getCategoryList(data = {}){
  return request({
    url: '/category/all',
    method: 'get',
    params: data
  })
}
