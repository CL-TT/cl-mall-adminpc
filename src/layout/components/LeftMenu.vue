<!--
 * @Author: CL
 * @Date: 2021-08-12 22:29:49
 * @LastEditTime: 2021-08-16 00:06:51
 * @Description: 左边菜单组件
-->

<template>
  <div :class="{'left-menu': true, 'left-menu-small': collapsed }">
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1].name? $router.currentRoute.matched[1].name : '']"
      :default-open-keys="[$router.currentRoute.matched[0].name? $router.currentRoute.matched[0].name : '' ]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu v-for="item in menus" :key="item.name">
          <span slot="title"><a-icon :type="item.meta.icon" /><span>{{ item.meta.title }}</span></span>
          <a-menu-item v-for="subTitle in item.children" :key="subTitle.name">
            <router-link :to="{ name: subTitle.name }"><a-icon :type="subTitle.meta.icon" />{{ subTitle.meta.title }}</router-link>
          </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(){
    return {
      
    }
  },

  computed: {
    ...mapState(['collapsed', 'menus'])
  }
}
</script>

<style lang="less" scoped>
// 左边菜单区域
.left-menu{
  position: fixed;
  width: 180px;
  height: 100%;
  transition: width .8s;

  &.left-menu-small{
    width: 80px;
  }

  .ant-menu{
    height: 100%;
  }
}
</style>
