<!--
 * @Author: CL
 * @Date: 2021-08-16 18:41:37
 * @LastEditTime: 2021-08-16 20:07:10
 * @Description: 销售信息组件
-->

<template>
  <div class="saleinfo-contain">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item 
        has-feedback 
        ref="price" 
        label="商品售价" 
        prop="price"
      >
        <a-input
          placeholder="输入商品售价"
          allowClear
          v-model.number="form.price"
          @blur="
            () => {
              $refs.price.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item 
        has-feedback 
        ref="price_off" 
        label="折扣价格" 
        prop="price_off"
      >
        <a-input
          allowClear
          placeholder="输入商品折扣价格"
          v-model.number="form.price_off"
          @blur="
            () => {
              $refs.price_off.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item 
        has-feedback 
        ref="inventory" 
        label="商品库存" 
        prop="inventory"
      >
        <a-input
          allowClear
          placeholder="输入商品库存"
          v-model.number="form.inventory"
          @blur="
            () => {
              $refs.inventory.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item 
        has-feedback 
        ref="unit" 
        label="计量单位" 
        prop="unit"
      >
        <a-input
          allowClear
          placeholder="输入计量单位"
          v-model="form.unit"
          @blur="
            () => {
              $refs.unit.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item 
        has-feedback 
        ref="images" 
        label="商品相册" 
      >
        <a-upload
          :action="action + '?appkey=' + userInfo.appkey"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              上传图片
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 4, offset: 9 }">
        <a-button type="primary" @click="handleLast" style="margin-right: 30px">
          上一步
        </a-button>
        <a-button type="primary" @click="handleSubmit">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      form: {
        price: '',        //商品价格
        price_off: '',    //商品折扣价格
        inventory: '',    //商品库存
        unit: '',         //计量单位
        images: [],       //商品图片
      },

      rules: {
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { type: 'number', message: '请输入规范的商品价格', trigger: 'blur' },
        ],

        price_off: [
          { type: 'number', message: '请输入规范的折扣价格', trigger: 'blur' }
        ],

        inventory: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
        ],

        unit: [
          { required: true, message: '请输入计量单位', trigger: 'blur' },
        ],
      },

      fileList: [],
      previewVisible: false,
      previewImage: '',
    }
  },

  computed: {
    ...mapState(['action', 'userInfo'])
  },

  methods: {
    handleLast(){
      this.$emit('handleLast');
    },

    handleSubmit(){
      this.$refs.ruleForm.validate(async (valid) => {
        if(valid){
          this.$emit('handleAdd', this.form);
        }else{
          console.log('err');
          return false;
        }
      })
    },

    handleCancel(){
      this.previewVisible = false;
    },
    
    handlePreview(file){
      console.log(file);
      this.previewImage = file.thumbUrl;
      this.previewVisible = true;
    },

    handleChange({ file, fileList }){
      if(file.status === 'done'){
        this.form.images.push(file.response.data.url);
      }
      if(file.status === 'removed'){
        const url = file.response.data.url;
        this.form.images = this.form.images.filter(item => {
          return item !== url;
        })
      }
      this.fileList = fileList;
    }
  }
}
</script>

<style>

</style>
