/*
 * @Author: CL
 * @Date: 2021-08-15 23:45:15
 * @LastEditTime: 2021-08-16 20:34:17
 * @Description: 商品api
 */

import request from './request';

/**
 * 得到分页的商品数据
 */
export function getGoods(data = {}){
  return request({
    url: '/products/all',
    method: 'get',
    params: data
  })
}

/**
 * 添加商品
 */
export function addGoods(data = {}){
  return request({
    url: '/products/add',
    method: 'post',
    data
  })
}

/**
 * 根据商品id删除商品
 */
export function delGoods(id){
  return request({
    url: `/products/${id}`,
    method: 'delete'
  })
}
