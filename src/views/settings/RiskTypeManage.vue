<template>
  <div>
    <a-card>
      <a-breadcrumb style="font-size: 16px;">
        <a-breadcrumb-item>设置</a-breadcrumb-item>
        <a-breadcrumb-item>风险源类型管理</a-breadcrumb-item>
      </a-breadcrumb>
      <a-divider style="margin: 10px 0" />
      <a-button type="primary" icon="plus" style="margin-bottom:15px" @click="visible=true">添加</a-button>
      <a-table :columns="columns" :dataSource="data" bordered>
        <template slot="operation" slot-scope="item">
          <a @click="visible=true">编辑</a>
          <a-divider type="vertical" />
          <a @click="deleteItem(item.key)">删除</a>
        </template>
      </a-table>
    </a-card>
    <a-modal title="添加/编辑风险源" v-model="visible">
      <a-form>
        <a-form-item label="风险源类型名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入风险源类型名称"/>
        </a-form-item>
        <a-form-item label="标注样式" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入标注样式"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'key'
  },
  {
    title: '风险源类型名称',
    dataIndex: 'name'
  },
  {
    title: '标注样式',
    dataIndex: 'type'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width: 160
  }
]
export default {
  data() {
    return {
      list: {
        name: '',
        style: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      visible: false,
      columns,
      data: [
        {
          key: '001',
          name: '超级管理员',
          type: '内业'
        },
        {
          key: '002',
          name: '巡河总监',
          type: '内业'
        },
        {
          key: '003',
          name: '基础数据维护员',
          type: '外勤'
        }
      ]
    }
  },
  watch: {},
  methods: {
    deleteItem(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
