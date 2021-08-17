/*
 * @Author: CL
 * @Date: 2021-08-14 00:27:32
 * @LastEditTime: 2021-08-14 17:32:27
 * @Description: 路由相关的配置
 */

import Home from '../layout/Home.vue'

/**
 * 需要根据权限判断的动态路由
 */
export const asyncRouter = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      auth: true,
      title: '商品',
      hidden: false,
      icon: 'shop'
    },
    redirect: '/product/goodslist',
    children: [
      {
        path: 'goodslist',
        name: 'GoodsList',
        component: () => import(/* webpackChunkName "goodslist" */ '../views/GoodsList'),
        meta: {
          auth: true,
          title: '商品列表',
          hidden: false,
          icon: 'unordered-list'
        }
      },
      {
        path: 'addgoods',
        name: 'AddGoods',
        component: () => import(/* webpackChunkName "addgoods" */ '../views/AddGoods'),
        meta: {
          auth: true,
          title: '添加商品',
          hidden: false,
          icon: 'plus-circle'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import(/* webpackChunkName "category" */ '../views/Category'),
        meta: {
          auth: true,
          title: '类目管理',
          hidden: false
        }
      }
    ]
  }
]

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true,
      title: '首页',
      hidden: false,
      icon: 'home'
    },
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ '../views/Index'),
        meta: {
          auth: true,
          title: '统计',
          hidden: false,
          icon: 'area-chart'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
    meta: {
      auth: false,
      title: '登录',
      hidden: true
    }
  }
]
