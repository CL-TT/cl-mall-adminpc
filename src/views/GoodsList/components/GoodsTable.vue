<!--
 * @Author: CL
 * @Date: 2021-08-15 23:21:33
 * @LastEditTime: 2021-08-16 20:30:51
 * @Description: 表格数据组件
-->

<template>
  <div class="goodstable-contain">
    <a-table 
      :columns="columns" 
      :data-source="dataTable"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="record" style="display: flex; justify-content: space-between">
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="primary" size="small" @click="handleDelete(record)">删除</a-button>
      </span>
  </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    align: 'center',
  },
  {
    title: '类目',
    key: 'category',
    dataIndex: 'category',
    align: 'center',
  },
  {
    title: '预售价格',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    align: 'center',
  },
  {
    title: '限购数量',
    dataIndex: 'inventory',
    key: 'inventory',
    align: 'center',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
  }
];

export default {
  data() {
    return {
      columns,
    };
  },

  props: {
    goodsList: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object
    },
    categoryList: {
      type: Array,
      required: true
    }
  },

  computed: {
    dataTable(){
      return this.goodsList.map(item => {
        return {
          ...item,
          key: item.id,
          status: item.status == 1? '上架' : '下架'
        }
      })
    }
  },

  methods: {
    handleTableChange(p){
      this.$emit('changePage', p.current);
    },

    handleDelete(data){
      this.$emit('handleDelete', data);
    }
  }
};
</script>

<style lang="less" scoped>
.goodstable-contain{
  box-sizing: border-box;
  padding: 10px 0;
}
</style>