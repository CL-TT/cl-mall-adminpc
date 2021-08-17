<!--
 * @Author: CL
 * @Date: 2021-08-16 12:13:58
 * @LastEditTime: 2021-08-16 16:28:23
 * @Description: 商品基本信息组件
-->

<template>
  <div class="baseinfo-contain">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item 
        has-feedback 
        ref="title" 
        label="标题" 
        prop="title"
      >
        <a-input
          placeholder="输入商品标题"
          allowClear
          v-model="form.title"
          @blur="
            () => {
              $refs.title.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item 
        has-feedback 
        ref="desc" 
        label="商品描述" 
        prop="desc"
      >
        <a-input
          allowClear
          type="desc"
          placeholder="输入商品描述"
          v-model="form.desc"
          @blur="
            () => {
              $refs.desc.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item  ref="category" label="商品类目" prop="category">
        <a-select 
          allowClear 
          placeholder="请选择商品类目" 
          v-model="form.category"
          @change="categoryChange"
        >
          <a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select allowClear placeholder="请选择商品子类目" v-model="form.c_items">
          <a-select-option v-for="item in categoryItems" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item has-feedback ref="category" label="商品标签" prop="tags">
        <a-select 
          v-model="form.tags"
          mode="tags"
          placeholder="选择商品标签"
          :default-value="['包邮，最晚次日送达']"
          allowClear
        >
         <a-select-option value="包邮，最晚次日送达">包邮，最晚次日送达</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 4, offset: 10 }">
        <a-button type="primary" @click="handleNext">
          下一步
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/category.js';

export default {
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      
      form: {
        title: '',     //标题
        desc: '',      //描述
        category: undefined,  //商品类目
        c_items: undefined,   //商品子类目
        tags: [],      //商品标签
      },

      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
        ],

        category: [
          { required: true, message: '请选择商品类目', trigger: 'change' },
        ],

        tags: [
          { required: true, message: '请选择商品标签', trigger: 'change' },
        ]
      },

      categoryList: [],    //类目数组
      categoryItems: [],   //子类目
    }
  },

  methods: {
    async queryCategory(){
      try{
        const res = await getCategoryList();
        if(res.status === 'success'){
          this.categoryList = res.data.data;
        }
      }catch(err){
        console.log(err);
      }
    },

    /**
     * 类目切换的时候
     */
    categoryChange(id){
      this.categoryItems = this.categoryList.filter(item => {
        return item.id === id
      })[0].c_items
    },

    /**
     * 处理下一步
     */
    handleNext(){
      this.$refs.ruleForm.validate(async (valid) => {
        if(valid){
          this.$emit('nextSubmit', this.form);
        }else{
          console.log('error submit');
          return false;
        }
      })
    }
  },

  created(){
    this.queryCategory();
  }
}
</script>

<style lang="less" scoped>

</style>
