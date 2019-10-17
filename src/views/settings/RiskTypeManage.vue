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
        <template slot="type" slot-scope="row">
          <viewer >
            <img :src="row.icon" alt="" style="width:80px;">
          </viewer>
        </template>
        <template slot="operation" slot-scope="row">
          <a @click="add(row.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确认删除?"
            @confirm="confirm"
            @cancel="cancel"
            okText="确认"
            cancelText="取消"
          >
            <a @click="del(row.id)">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <a-modal title="添加/编辑风险源" v-model="visible">
      <a-form>
        <a-form-item label="风险源类型名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入风险源类型名称"/>
        </a-form-item>
        <!-- <a-form-item label="标注样式" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <Upload
            :before-upload="handleUpload"
            action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
          </Upload>
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { paramList, paramSave,paramDel } from '@/api/login'
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
    scopedSlots: { customRender: 'type' },
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
      id:'',
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
  mounted(){
    this.getList()
  },
  methods: {
    getList(){
      var data ={
        type:'risk_source_type'
      }
      paramList(data).then(res => {
         var arr = res.data
         for (let i = 0; i < arr.length; i++) {
          arr[i].key=i+1
         }
         this.data = arr
        }).catch(err => {

      })
    },
    add(id){
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id==id) {
          this.list.name =this.data[i].name
          break
        }  
      }
      this.list.id=id
      this.visible=true
    },
    del(id){
      this.id=id
    },
    confirm(e) {
      var data ={
        id:this.id
      }
      paramDel(data).then(res => {
          this.$message.success('删除成功');
          this.getList()
        }).catch(err => {
          this.$message.error(err.response.data.message);
      })
    },
    cancel(e) {

    },
    deleteItem(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
