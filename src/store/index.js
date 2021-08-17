import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getCookie, setCookie, removeCookie } from '../utils/userCookie'

export default new Vuex.Store({
  state: {
    collapsed: false,    //用于改变菜单的闭合状态

    userInfo: getCookie('userInfo'),        //登录信息

    menus: [],     //菜单

    action: 'https://mallapi.duyiedu.com/upload/images'
  },
  mutations: {
    changeCollapsed(state){
      state.collapsed = !state.collapsed;
    },

    changeUserInfo(state, info){
      state.userInfo = info;
    },

    changeMenus(state, menus){
      state.menus = menus;
    }
  },
  actions: {
    setCollapsed({ commit }){
      commit('changeCollapsed');
    },

    setUserInfo({ commit }, info){
      //同时保存到cookie中
      setCookie('userInfo', info);
      commit('changeUserInfo', info);
    },

    /**
     * 退出登录
     * 1. 要清空cookie
     * 2. 清空vuex中的数据
     */
    logOut({ commit }){
      removeCookie('userInfo');
      commit('changeUserInfo', null);
    },

    setMenus({ commit }, menus){
      commit('changeMenus', menus);
    }
  },
  modules: {
  }
})
