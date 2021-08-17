<!--
 * @Author: CL
 * @Date: 2021-08-14 23:54:41
 * @LastEditTime: 2021-08-16 01:46:21
 * @Description: 搜索组件
-->

<template>
  <div class="search-contain">
    <a-form-model layout="inline" :model="form" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="搜索关键字">
        <a-input allowClear v-model="form.keyWord" placeholder="请输入关键字"></a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select 
          allowClear 
          style="width: 180px" 
          v-model="form.category" 
          placeholder="请选择商品类目"
          @change="categoryChange"
        >
          <a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>

    <a-button type="primary" icon="plus" @click="goAddGoodsPage">添加商品</a-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        keyWord: '',            //关键字
        category: undefined,           //商品类目
      }
    }
  },

  props: {
    categoryList: {
      type: Array,
      required: true
    }
  },

  methods: {
    handleSubmit(){
      this.$emit('submit', this.form);
    },

    /**
     * 类目切换
     */
    categoryChange(val){
      this.$set(this.form, 'category', val);
    },

    /**
     * 跳转到新增商品页面
     */
    goAddGoodsPage(){
      this.$router.push({
        name: 'AddGoods'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-contain{
  padding: 15px 15px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
