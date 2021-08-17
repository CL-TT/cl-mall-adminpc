<!--
 * @Author: CL
 * @Date: 2021-08-13 22:59:29
 * @LastEditTime: 2021-08-16 20:36:58
 * @Description: 商品列表页面
-->

<template>
  <div class="goodslist-contain">
    <!-- 搜索区 -->
    <Search @submit="submit" :categoryList="categoryList" /> 

    <!-- 商品列表区 -->
    <GoodsTable 
      :categoryList="categoryList"
      :goodsList="goodsList" 
      :pagination="pagination" 
      @changePage="changePage"
      @handleDelete="handleDelete" 
    />
  </div>
</template>

<script>
import Search from './components/search.vue';
import GoodsTable from './components/GoodsTable.vue'; 
import { getGoods, delGoods } from '@/api/product.js';
import { getCategoryList } from '@/api/category.js';

export default {
  data(){
    return {
      goodsList: [],    //商品数据

      pagination: {
        current: 1,    //当前页
        pageSize: 10,  //每页条数
        total: 0
      },

      searchForm: {},

      categoryList: [],   //类目数组
    }
  },
  
  components: {
    Search,
    GoodsTable
  },

  methods: {
    submit(data){
      this.searchForm = data;

      this.queryGoods();
    },

    /**
     * 查询所有商品的信息
     */
    async queryGoods(){
      try{
        const { current, pageSize } = this.pagination;
        const res = await getGoods({ 
          page: current, 
          size: pageSize,
          ...this.searchForm
        });
        if(res.status === 'success'){
          this.goodsList = res.data.data.map(item => {
            return {
              ...item,
              category: this.categoryList.filter(i => { return item.category === i.id })[0].name
            }
          });
          this.pagination.total = res.data.total;
        }
      }catch(err){
        console.log(err);
      }
    },

    /**
     * 查询所有的商品类目
     */
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

    changePage(page){
      this.$set(this.pagination, 'current', page);
      this.queryGoods();
    },

    handleDelete(data){
      this.$confirm({
        title: '标题',
        content: '您确定要删除此商品吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const res = await delGoods(data.id);
          if(res.status === 'success'){
            this.$message.success('删除成功'); 
            this.queryGoods();
          }
        },
        onCancel: () => {
          this.$message.info('取消删除！');
        },
      });
    }
  },

  created() {
    this.queryCategory();
    this.queryGoods();
  },
}
</script>

<style lang="less" scoped>

</style>
