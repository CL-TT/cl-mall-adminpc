import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

import { getCookie } from '../utils/userCookie'
import { getRouter, createRouter } from '../utils/permission'
import store from '../store'

import { routes, asyncRouter } from './routes'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let hasAdd = false;

/**
 * 全局的路由拦截，路由跳转之前的钩子函数
 */
router.beforeEach((to, from, next) => {
  const userInfo = getCookie('userInfo');

  //已经登录过，并且想去登录页, 直接跳转到首页
  if(userInfo && to.path === '/login'){
    return next({
      name: 'Home'
    })
  }

  //如果还没有登录, 从路由的元信息中，看去哪些页面是需要登录的
  if(to.path !== '/login'){
    if(userInfo){  //如果已经登录过了，直接跳转到那个页面
      if(!hasAdd){
        //添加路由
        const routerArr = getRouter(userInfo.role, asyncRouter);
        //保存到vuex中
        store.dispatch('setMenus', createRouter(routes).concat(routerArr)).then(() => {
          routerArr.forEach(item => {
            router.addRoute(item);
          })
          next();
        })

        hasAdd = true;
      }
      return next();
    }else{
      //如果还没有登录，则跳转到登录页，并记录之前想要跳转的页面
      return next({
        name: 'Login',
        query: {
          returnurl: to.fullPath
        }
      })
    }
  }

  return next();
})

export default router
