<!--
 * @Author: CL
 * @Date: 2021-08-14 23:12:24
 * @LastEditTime: 2021-08-14 23:51:08
 * @Description: 图标组件
-->

<template>
  <div class="echarts-contain">
    <ve-line class="charts-line" :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>
<script>
export default {
  data () {
    this.chartSettings = {
      area: true
    }
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.echarts-contain{
  width: 100%;
  height: 100%;
  margin-top: 50px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>