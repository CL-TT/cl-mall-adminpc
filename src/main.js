import Vue from 'vue'

//引入v-charts图表组件
import VCharts from 'v-charts'

import App from './App.vue'
import router from './router'
import store from './store'

//引入ant-design组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(VCharts);
Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
