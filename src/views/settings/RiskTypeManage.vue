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
    <a-modal title="添加/编辑风险源" v-model="visible"
      @ok="upload2"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item label="风险源类型名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入风险源类型名称" v-model="list.name"/>
        </a-form-item>
        <a-form-item label="标注样式" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
            <Upload
              multiple
              ref="upload2"
              action="/server/data/admin/param/save"
              :before-upload="handleUpload"
              :data="list"
              :headers="headers"
              :show-upload-list="false"
              name="icon"
              :on-success="handleSuccess1"
              :on-format-error="handleFormatError"
              :on-error="handleError"
            ><Button>添加</Button></Upload>
            <viewer >
                <img  :src="attachmentJpg" alt="" style="height:70px;">
            </viewer >
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
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
      file:null,
      loadingStatus:false,
      attachmentJpg:'',
      id:'',
      list: {
        name: '',
        id:'',
        type:'risk_source_type'
      },
      ruleValidate: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      visible: false,
      columns,
      data: [
       
      ],
      headers: {
        Authorization: '',
        'X-TENANT-ID': 'jl:jlgis@2019' 
      },
    }
  },
  mounted(){
    this.getList()
    this.headers.Authorization=Vue.ls.get(ACCESS_TOKEN)
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
    handleOk(e) {
      // paramSave(data).then(res => {
      //     this.$message.success('保存成功');
      //     this.visible = false;
      //     this.list.id=''
      //     this.list.name=''
      //     this.getList()
      //   }).catch(err => {
      //     this.$message.error(err.response.data.message);
      // })
    },
    handleCancel(e) {
      this.file=null
      this.loadingStatus=false
      this.visible = false;
      this.attachmentJpg=''
    },
    add(id){
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id==id) {
          this.list.name =this.data[i].name
          this.attachmentJpg = this.data[i].icon
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
    upload2 (row) {
        if (this.file==null) {
          var data = this.list
          paramSave(data).then(res => {
              this.$message.success('保存成功');
              this.visible = false;
              this.list.id=''
              this.list.name=''
              this.attachmentJpg=''
              this.getList()
          }).catch(err => {
              this.$message.error(err.response.data.message);
          })
        }else{
          this.loadingStatus = true;
          this.$refs.upload2.post(this.file);
          setTimeout(() => {
              this.file = null;
              this.attachmentJpg=''
              this.loadingStatus = false;
              this.visible = false;
              this.getList()
          }, 1500);
        }
    },
    handleUpload (file) {
      this.file = file;
      this.attachmentJpg = window.URL.createObjectURL(file)
      return false;
    },
    handleSuccess1(response){
        if(response.success === true){
            this.$Message.success('成功！');
        }else{
            this.$Message.error('失败！');
        }
    },
    handleFormatError(file){
        this.$Message.error('文件格式不正确');
    },
    handleError(err){
        console.log(err);
        
        this.$Message.error("数据导入失败！")
    },
  }
}
</script>

<style lang="less" >
.ant-form input[type='file'] {
  display: none; 
}
</style>
