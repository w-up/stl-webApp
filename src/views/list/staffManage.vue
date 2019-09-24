<template>
  <div  >
    <a-card >
      <p style="color: #333; font-weight: 900;font-size: 16px;">筛选查询</p>
      <div>
        <a-form
          layout="inline"
        >
          <a-form-item label="角色">
            <a-select  style="width: 200px" placeholder="请选择" >
              <a-select-option value="jack">超级管理员</a-select-option>
              <a-select-option value="lucy">巡河总监</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="类型">
            <a-select  style="width: 200px" placeholder="请选择" >
              <a-select-option value="jack">外勤</a-select-option>
              <a-select-option value="lucy">内业</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item >
            <a-button type="primary" >查询</a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-button type="primary" icon="plus"  style="margin:15px 0" @click="add" >添加</a-button>
      <a-table :columns="columns" :dataSource="data" bordered>
        <template slot="state" slot-scope="row">
          <a v-if="row.state==true">启用</a>
          <a v-else>禁用</a>
        </template>
        <template slot="operation" slot-scope="row">
          <a @click="add()">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleSub(id)">删除</a>
          <a-divider type="vertical" />
          <a @click="handleSub(id)" v-if="row.state==false">启用</a>
          <a @click="handleSub(id)" v-else>禁用</a>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
const columns = [
   {
    title: '编号',
    width:80,
    dataIndex: 'key',
  }, {
    title: '姓名',
    dataIndex: 'name',
  },{
    title: '联系方式',
    dataIndex: 'phone',
  },{
    title: '角色',
    dataIndex: 'role',
  },  {
    title: '类型',
    dataIndex: 'type',
  },{
    title: '状态',
    scopedSlots: { customRender: 'state' },
    width:90,
  },{
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width:160,
  }
];
export default {
  data () {
    return {
      columns,
      data:[
        {
          key:'001',
          name:'张三',
          phone:'15555555',
          role:'超级管理员',
          type:'内业',
          state:true
        },
        {
          key:'002',
          name:'张三',
          phone:'15555555',
          role:'巡河总监',
          type:'内业',
          state:false
        },
        {
          key:'003',
          name:'张三',
          phone:'15555555',
          role:'基础数据维护员',
          type:'外勤',
          state:true
        },
      ]
    }
  },
  watch: {

  },
  methods: {
    add(id){
      this.$router.push({
        path: '/list/staff',
        query: {
          id: id,
        }
      }) 
    },
  },
}
</script>

<style lang="less" scoped>

  
</style>
