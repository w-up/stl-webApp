<template>
  <div>
    <a-card>
      <a-breadcrumb style="font-size: 16px;">
        <a-breadcrumb-item>设置</a-breadcrumb-item>
        <a-breadcrumb-item>设备管理</a-breadcrumb-item>
      </a-breadcrumb>
      <a-divider style="margin: 10px 0" />
      <div style="display:flex;width:100%;box-sizing:border-box;">
        <div style="width:250px">
          <a-card style="min-height: 200px">
            <el-tree :data="treeData"  @node-click="select" ></el-tree>
          </a-card>
        </div>
        <div style="width:100%;margin-left:20px">
          <div v-if="treeId=='1'">
            <a-button type="primary" icon="plus" @click="visible=true" style="margin-bottom:15px">添加</a-button>
            <a-table :columns="columns" :dataSource="data" bordered>
              <template slot="operation" slot-scope="item">
                <a @click="handleEdit(item.id,item.name)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="是否确认删除?"
                  @confirm="handleSub"
                  @cancel="cancel"
                  okText="确认"
                  cancelText="取消"
                >
                  <a @click="del(item.id)">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
          <div v-if="treeId=='2'">
            <a-button type="primary" icon="plus" @click="visible=true" style="margin-bottom:15px">添加</a-button>
            <a-table :columns="columns2" :dataSource="data" bordered>
              <template slot="operation" slot-scope="item">
                <a @click="handleEdit(item.id,item.name)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="是否确认删除?"
                  @confirm="handleSub"
                  @cancel="cancel"
                  okText="确认"
                  cancelText="取消"
                >
                  <a @click="del(item.id)">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
          <div v-if="treeId=='3'">
            <p style="color: #333; font-weight: 900;font-size: 16px;">筛选查询</p>
            <div>
              <a-input placeholder="请输入设备名称" style="width:200px;margin:0  10px 0 0" />
              <a-button type="primary">查询</a-button>
            </div>
            <a-button
              type="primary"
              icon="plus"
              @click="addequipment"
              style="margin:15px 0"
            >添加</a-button>
            <a-table :columns="columns1" :dataSource="data1" bordered>
              <template slot="state" slot-scope="row">
                <a v-if="row.state==true">可用</a>
                <a v-else>不可用</a>
              </template>
              <template slot="operation" slot-scope="row">
                <a @click="addequipment1(row)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="是否确认删除?"
                  @confirm="handleSub1"
                  @cancel="cancel"
                  okText="确认"
                  cancelText="取消"
                >
                  <a @click="del(row.id)">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a @click="handleSub(id)" v-if="row.state==false">启用</a>
                <a @click="handleSub(id)" v-else>禁用</a>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </a-card>
    <a-modal title="添加以及设备类型" v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="设备名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="typeList.name" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="添加设备" v-model="equipmentModel" :width="700"
      @ok="handleOk1"
      @cancel="handleCancel1">
      <el-form ref="formValidate" :model="equipmentList" :rules="ruleValidate"  label-width="100px">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="equipmentList.name" placeholder="请输入" style="width:200px" />
        </el-form-item>
        <el-form-item label="设备型号" prop="type">
          <el-input v-model="equipmentList.type" placeholder="请输入" style="width:200px" />
        </el-form-item>
        <el-form-item label="设备数量">
          <el-input v-model="equipmentList.number" placeholder="请输入" style="width:200px" />
        </el-form-item>
        <el-form-item label="设备聚隆编号">
          <el-input v-model="equipmentList.number" placeholder="请输入" style="width:200px" />
        </el-form-item>
        <el-form-item label="关联设备"></el-form-item>
        <!-- <el-form-item label="无人机类型"></el-form-item> -->
        <el-form-item >
           <el-checkbox-group  style="display:flex;flex-wrap:wrap;" v-model="checkedList">
              <div
              v-for="(option, index) in uavList"
              :key="index"
              style="width:260px;margin:0 5px 10px 0"
              >
                <el-checkbox :label="option.id">{{option.name}}</el-checkbox>
                <a-input-number :min="1" :max="100000"  v-model="option.num" style="margin-left:5px"/>
              </div>
               <!-- <a-row>
                  <a-col :span="12" v-for="(option, index) in uavList" :key="index">
                    <div style="display:flex">
                      <el-checkbox :label="option.id">{{option.name}}</el-checkbox>
                      <a-input-number :min="1" :max="100000"  v-model="option.num" style="margin-left:5px;width:70px"/>
                    </div>
                  </a-col>
                </a-row> -->
            </el-checkbox-group>
        </el-form-item>
      </el-form>
    </a-modal>
  </div>
</template>
<script>
import { structureEquipment, equipmentTypeList,equipmentTypeSave,equipmentTypeDel,equipmentNewsList,equipmentNewsSave,equipmentNewsDel,relatedList } from '@/api/login'
const treeData = [
  {
    label: '全部',
    code:'1',
    children:[]
  },
]
const columns = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'key'
  },
  {
    title: '一级类型名称',
    dataIndex: 'name'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width: 120
  }
]
const columns2 = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'key'
  },
  {
    title: '二级类型名称',
    dataIndex: 'name'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width: 120
  }
]
const columns1 = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'key'
  },
  {
    title: '设备名称',
    dataIndex: 'name'
  },
  {
    title: '数量',
    dataIndex: 'code'
  },
  {
    title: '状态',
    scopedSlots: { customRender: 'state' },
    width: 100
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width: 170
  }
]
export default {
  data() {
    return {
      parentId:'0',
      treeId: '1',
      id:'',
      treeData,
      columns,
      columns1,
      columns2,
      data:[],
      visible: false,
      equipmentModel: false,
      typeList: {
        id: '',
        name: ''
      },
      equipmentList: {
        id:'',
        name: '',
        type: '',
        number: ''
      },
      checkedList:[],
      ruleValidate: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      data1: [
       
      ],
      uavList: [
        {
          name: 'Marvic 2 Pro',
          id: '1'
        },
        {
          name: 'Marvic 2 Pro',
          id: '2'
        },
        {
          name: 'Marvic 3',
          id: '3'
        },
        {
          name: 'Marvic 3',
          id: '3'
        },
        {
          name: 'Marvic 3',
          id: '3'
        }
      ],
      form: this.$form.createForm(this)
    }
  },
  watch: {},
  mounted(){
    this.getList()
    this.getstructure()
  },
  methods: {
    getstructure(){//树
      structureEquipment().then(res => {
        var arr =res.data
        for (let i = 0; i < arr.length; i++) {
          arr[i].code = '2'
          for (let a = 0; a < arr[i].children.length; a++) {
            arr[i].children[a].code = '3'
            for (let c = 0; c < arr[i].children[a].length; c++) {
              arr[i].children[a].children[c].code='4'
            }
          }
        }
        console.log(arr);
        this.treeData[0].children = arr
      }).catch(err => {
      })
    },
    getList(){
      //类型列表
      var data ={
        id:this.parentId
      }
      equipmentTypeList(data).then(res => {
        var sz = res.data
        console.log(sz);
        for (let i = 0; i < sz.length; i++) {
          sz[i].key=i+1
        }
        this.data=sz
      }).catch(err => {
      })
    },
    handleOk(e) {
      //类型保存
      var data ={
        parentId:this.parentId,
        name:this.typeList.name,
        id:this.typeList.id
      }
      equipmentTypeSave(data).then(res => {
          this.$message.success('保存成功');
          this.visible = false;
          this.typeList.id=''
          this.typeList.name=''
          this.getstructure()
          this.getList()
        }).catch(err => {
          this.$message.error(err.response.data.message);
      })
    },
    handleSub() {
      var data = {
        id:this.id
      }
      equipmentTypeDel(data).then(res => {
        var arr = res.data
        this.$message.success('删除成功');
        this.getList()
        this.getstructure()
      }).catch(err => {
        this.$message.error(err.response.data.message);
      })
    },
    handleOk1(){
      //设备型号保存
      var data ={
        id:this.equipmentList.id,
        typeId:this.parentId,
        name:this.equipmentList.name,
        model:this.equipmentList.type,
        code:this.equipmentList.number,
        relatedDeviceId:this.checkedList,
        relatedDeviceNum:'',
      }
      for (let i = 0; i < this.checkedList.length; i++) {
        for (let a = 0; a < this.uavList.length; a++) {
          if (this.checkedList[i]==this.uavList[a].id) {
            if (data.relatedDeviceNum!='') {
              data.relatedDeviceNum=data.relatedDeviceNum + this.uavList[a].num +','
            }else{
              data.relatedDeviceNum=this.uavList[a].num +','
            }
          }
        }
      }
      equipmentNewsSave(data).then(res => {
        var arr = res.data  
        this.$message.success('保存成功');
        this.handleCancel1()
        this.equipmentModel = false
        this.getList1()
      }).catch(err => {
        this.$message.error(err.response.data.message);
      })
    },
    handleCancel1(){
      this.equipmentList.id=''
      this.equipmentList.name=''
      this.equipmentList.type=''
      this.equipmentList.number=''
      this.checkedList=[]
    },
    getList1(){
      //设备列表
      var data ={
        id:this.parentId
      }
      equipmentNewsList(data).then(res => {
        var sz = res.data.data
        for (let i = 0; i < sz.length; i++) {
          sz[i].key=i+1
        }
        this.data1=sz
        this.uavList = sz
      }).catch(err => {

      })
    },
    del(id){
      this.id = id
    },
    handleSub1(id){
      var data = {
        id:this.id
      }
      equipmentNewsDel(data).then(res => {
        var arr = res.data
        console.log(arr);
        this.$message.success('删除成功');
         this.getList1()
      }).catch(err => {
        this.$message.error(err.response.data.message);
      })
    },
    addequipment(){
      this.equipmentModel =true
    },
    addequipment1(row){
      this.equipmentModel =true
      this.equipmentList.id=row.id
      this.equipmentList.name=row.name
      this.equipmentList.type=row.model
      this.equipmentList.number=row.code
      var data ={
        id:row.id
      }
      relatedList(data).then(res => {
        var arr = res.data.data
        var sz = []
        for (let i = 0; i < arr.length; i++) {
          sz.push(arr[i].device.id)
          for (let a = 0; a < this.uavList.length; a++) {
            if (arr[i].device.id==this.uavList[a].id) {
              this.uavList[a].num=arr[i].num
              break
            }
          }
        }
        this.checkedList = sz
      }).catch(err => {

      })

    },
    cancel(){
    },
    handleEdit(id,name){
      //类型编辑
      this.typeList.id=id
      this.visible=true
      this.typeList.name=name
    },
    handleCancel(e) {
      //类型弹窗关闭
      this.typeList.id=''
      this.typeList.name=''
      this.visible = false;
    },
    twoGetList(){
    },
    select(e) {
      if (e.code=='1') {
        this.treeId='1'
        this.parentId='0'
        this.getList()
      }else if(e.code=='2'){
        this.treeId='2'
        this.parentId=e.id
        this.getList()
      }else if(e.code=='3'){
        this.treeId='3'
        this.parentId=e.id
        this.getList1()
      }
    },
  }
}
</script>
<style lang="less" scoped>
.boder-tree {
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  padding: 10px;
  min-height: 200px;
}
</style>
