<template>
  <div>
    <a-card>
      <a-breadcrumb style="font-size: 16px;">
        <a-breadcrumb-item>设置</a-breadcrumb-item>
        <a-breadcrumb-item>绘制类型管理</a-breadcrumb-item>
      </a-breadcrumb>
      <a-divider style="margin: 10px 0" />
      <a-button type="primary" icon="plus" style="margin-bottom:15px" @click="visible=true">添加</a-button>
      <a-table :columns="columns" :dataSource="data" bordered>
        <template slot="operation" slot-scope="row">
          <div v-if="row.key!='001'">
            <a @click="visible=true">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleSub(id)">删除</a>
          </div>
        </template>
      </a-table>
    </a-card>
    <a-modal title="添加/编辑风险源" v-model="visible">
      <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="110">
        <FormItem label="绘制类型" prop="name">
          <Input v-model="list.name" placeholder="请输入" style="width:200px"/>
        </FormItem>
      </Form>
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
    title: '绘制类型',
    dataIndex: 'name'
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
        name: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      visible: false,
      columns,
      data: [
        {
          key: '001',
          name: '风险源'
        },
        {
          key: '002',
          name: '河道连通性'
        },
        {
          key: '003',
          name: '水陆分布'
        }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
