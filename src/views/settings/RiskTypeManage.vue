<template>
  <div  >
    <a-card  >
      <a-button type="primary" icon="plus"  style="margin-bottom:15px" @click="visible=true" >添加</a-button>
      <a-table :columns="columns" :dataSource="data" bordered>
        <template slot="operation" slot-scope="row">
          <a @click="visible=true">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleSub(id)">删除</a>
        </template>
      </a-table>
    </a-card>
    <a-modal
      title="添加/编辑风险源"
      v-model="visible"
    >
      <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="110">
        <FormItem label="风险源类型名称" prop="name">
          <Input v-model="list.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="标注样式" prop="style">
          <Input v-model="list.style" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
      </Form>
    </a-modal>
  </div>
</template>

<script>
const columns = [
   {
    title: '序号',
    width:80,
    dataIndex: 'key',
  }, {
    title: '风险源类型名称',
    dataIndex: 'name',
  }, {
    title: '标注样式',
    dataIndex: 'type',
  },{
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width:160,
  }
];
export default {
  data () {
    return {
      list:{
        name:'',
        style:'',
      },
      ruleValidate:{
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      visible:false,
      columns,
      data:[
        {
          key:'001',
          name:'超级管理员',
          type:'内业',
        },
        {
          key:'002',
          name:'巡河总监',
          type:'内业',
        },
        {
          key:'003',
          name:'基础数据维护员',
          type:'外勤',
        },
      ]
    }
  },
  watch: {

  },
  methods: {

  },
}
</script>

<style lang="less" scoped>

  
</style>
