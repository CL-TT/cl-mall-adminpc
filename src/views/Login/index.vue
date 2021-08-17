<!--
 * @Author: CL
 * @Date: 2021-08-12 22:59:56
 * @LastEditTime: 2021-08-15 18:55:43
 * @Description: 登录页面
-->

<template>
  <div class="login-contain">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item has-feedback ref="email" label="邮箱" prop="email">
        <a-input
          v-model="form.email"
          @blur="
            () => {
              $refs.email.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item has-feedback ref="password" label="密码" prop="password">
        <a-input
          type="password"
          v-model="form.password"
          @blur="
            () => {
              $refs.password.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button type="primary" @click="onSubmit">
          登录
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { login } from '@/api/login';

export default {
  data() {
    let  emailReg = /^[\w-]+@[\w-]+.com$/;   //验证邮箱的正则表达式

    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if(emailReg.test(value)){
        return callback();
      }else{
        return callback(new Error('输入的邮箱格式不正确'));
      }
    }

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      form: {
        email: '',        //邮箱
        password: '',     //密码
      },

      rules: {
        email: [
          { required: true, validator: checkEmail, trigger: 'change' },
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度必须在6-12位', trigger: 'blur' },
        ]
      },
    };
  },
  methods: {
    /**
     * 提交表单
     */
    onSubmit() {
      this.$refs.ruleForm.validate( async (valid) => {
        if (valid) {
          try{
            const res = await login(this.form);
            //登录成功，打印成功的信息，跳转到管理后台的首页, 把登录信息保存到vuex中
            this.$store.dispatch('setUserInfo', res.data);
            this.$message.success('登录成功');
            const path = this.$route.query.returnurl || '/';
            this.$router.push({path}).catch(err => {
              console.log(err);
            });
          }catch(err){
            this.$message.error(err);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-contain{
  overflow: hidden;
  
  .ant-form{
    width: 500px;
    border: 1px solid rgba(210, 210, 210, .8);
    border-radius: 5px;
    margin: 100px auto 0;
    padding: 50px 0 30px 0;
  }
}
</style>
