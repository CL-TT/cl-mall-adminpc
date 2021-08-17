<!--
 * @Author: CL
 * @Date: 2021-08-12 22:33:41
 * @LastEditTime: 2021-08-14 23:02:26
 * @Description: 主体的头部组件
-->

<template>
  <div class="mainheader-contain">
    <div class="header-wrap">
      <div class="header-btn">
        <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>

      <!-- 面包屑导航 -->
      <div class="bread-crumbs">
        <a-breadcrumb>
          <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
          <a-breadcrumb-item>{{ subTitle }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>

    <!-- 个人信息部分 -->
    <div class="user-info">
      <div class="info-title">欢迎小主人 {{ userInfo? userInfo.username : '' }}</div>
      <a-button type="primary" @click="logOut">退出</a-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(){
    return {
      title: this.$router.currentRoute.matched[0].meta.title,           //主标题
      subTitle: this.$router.currentRoute.matched[1].meta.title         //副标题
    }
  },

  watch: {
    /**
     * 当路由变化的时候，面包屑导航才会发生会变化
     */
    $route(){
      const currentRouter = this.$router.currentRoute;
      this.title = currentRouter.matched[0].meta.title;
      this.subTitle = currentRouter.matched[1].meta.title;
    }
  },

  methods: {
    toggleCollapsed(){
      this.$store.dispatch('setCollapsed');
    },

    /**
     * 退出登录
     * 1. 调用vuex中的退出登录的方法
     * 2. 跳转到登录页面
     */
    logOut(){
      this.$confirm({
        title: '标题',
        content: '您确定要退出系统吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$store.dispatch('logOut');
          this.$message.success('退出成功');
          this.$router.push({ name: 'Login' }); 
        },
        onCancel: () => {
          this.$message.info('取消退出！');
        },
      });
    }
  },

  computed: {
    ...mapState(['collapsed', 'userInfo'])
  }
}
</script>

<style lang="less" scoped>
//头部区域
.mainheader-contain{
  width: 100%;
  height: 50px;
  border: 1px solid rgba(200, 200, 200, 0.8);
  line-height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-wrap{
    height: 100%;
    display: flex;
    align-items: center;

    .header-btn{
      height: 100%;
    }

    .bread-crumbs{
      margin-left: 20px;
    }
  }

  .user-info{
    display: flex;
    align-items: center;

    .info-title{
      margin-right: 20px;
    }
  }
}
</style>
