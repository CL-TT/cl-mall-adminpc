<!--
 * @Author: CL
 * @Date: 2021-08-13 23:03:00
 * @LastEditTime: 2021-08-16 20:10:05
 * @Description: 添加商品页面
-->

<template>
  <div class="addgoods-contain">
    <div class="steps-wrap">
      <a-steps :current="current">
        <a-step>
          <template slot="title">填写商品基本信息</template>
        </a-step>
        <a-step title="填写商品销售信息"/>
      </a-steps>
    </div>
    <div class="form-wrap">
      <BaseInfo v-show="current === 1" @nextSubmit="nextSubmit" />

      <SaleInfo v-show="current === 2" @handleLast="handleLast" @handleAdd="handleAdd" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo.vue';
import SaleInfo from './components/SaleInfo.vue';
import { addGoods } from '@/api/product.js';

export default {
  data(){
    return {
      current: 1,     //进度条的当前页

      baseInfo: {},
      saleInfo: {}
    }
  },

  methods: {
    nextSubmit(data){
      this.current = 2;
      this.baseInfo = data;
    },

    handleLast(){
      this.current = 1;
    },

    /**
     * 添加商品
     */
    async handleAdd(data){
      this.saleInfo = data;
      try{
        const res = await addGoods({
          ...this.baseInfo,
          ...this.saleInfo
        })
        if(res.status === 'success'){
          this.$message.success('添加成功');
          this.$router.push({
            name: 'GoodsList'
          })
        }
      }catch(err){
        console.log(err);
      }
    }
  },

  components: {
    BaseInfo,
    SaleInfo
  }
}
</script>

<style lang="less" scoped>
.addgoods-contain{
  width: 80%;
  margin: 30px auto 0;

  .form-wrap{
    margin-top: 50px;
  }
}
</style>
