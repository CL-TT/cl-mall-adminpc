<!--
 * @Author: CL
 * @Date: 2021-08-12 17:08:09
 * @LastEditTime: 2021-08-16 01:48:08
 * @Description: 后台管理首页
-->

<template>
  <div class="admin-home-page">
    <LeftMenu :key="key" />
    <div :class="{'main': true, 'main-small': collapsed }">
      <MainHeader />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue';
import MainHeader from './components/MainHeader.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      key: new Date().getTime()
    };
  },

  watch: {
    $route(){
      this.key = new Date().getTime() + Math.random() * 1000;
    }
  },

  components: {
    LeftMenu,
    MainHeader
  },

  computed: {
    ...mapState(['collapsed'])
  }
}
</script>

<style lang="less">
.admin-home-page{
  height: 100%;
  display: flex;

  .main{
    width: 100%;
    height: 100%;
    margin-left: 180px;
    transition: all 0.8s;
    box-sizing: border-box;

    &.main-small{
      margin-left: 80px;
    }
  }
}
</style>
