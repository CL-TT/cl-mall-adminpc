<!--
 * @Author: CL
 * @Date: 2021-08-13 22:50:19
 * @LastEditTime: 2021-08-14 23:22:09
 * @Description: 统计页面
-->

<template>
  <div class="index-contain">
    <!-- 卡片区域 -->
    <div style="background-color: #ececec; padding: 20px;">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="商品总览" :bordered="false">
            <p>card content</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="用户总览" :bordered="false">
            <p>card content</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="销售总览" :bordered="false">
            <p>card content</p>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 图标区域 -->
    <VCharts />
  </div>
</template>

<script>
import VCharts from './components/ECharts.vue'; 

export default {
  components: {
    VCharts
  }
}
</script>

<style lang="less" scoped>
.index-contain{
  width: 100%;
}
</style>
