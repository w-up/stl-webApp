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
            <el-tree :data="treeData"  @node-click="select"></el-tree>
          </a-card>
        </div>
        <div style="width:100%;margin-left:20px">
          <div v-if="treeId=='1'">
            <a-button type="primary" icon="plus" @click="visible=true" style="margin-bottom:15px">添加</a-button>
            <a-table :columns="columns" :dataSource="data" bordered>
              <template slot="operation" slot-scope="item">
                <a @click="handleEdit(item.key)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleSub(item.key)">删除</a>
              </template>
            </a-table>
          </div>
          <div v-if="treeId=='2'">
            <a-button type="primary" icon="plus" @click="visible=true" style="margin-bottom:15px">添加</a-button>
            <a-table :columns="columns2" :dataSource="data" bordered>
              <template slot="operation" slot-scope="item">
                <a @click="handleEdit(item.key)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleSub(item.key)">删除</a>
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
              @click="equipmentModel=true"
              style="margin:15px 0"
            >添加</a-button>
            <a-table :columns="columns1" :dataSource="data1" bordered>
              <template slot="state" slot-scope="row">
                <a v-if="row.state==true">可用</a>
                <a v-else>不可用</a>
              </template>
              <template slot="operation" slot-scope="row">
                <a @click="equipmentModel=true">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleSub(id)">删除</a>
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
    <a-modal title="添加设备" v-model="equipmentModel" :width="700">
      <Form ref="formValidate" :model="equipmentList" :rules="ruleValidate" :label-width="90">
        <FormItem label="设备名称" prop="name">
          <Input v-model="equipmentList.name" placeholder="请输入" style="width:200px" />
        </FormItem>
        <FormItem label="设备型号" prop="type">
          <Input v-model="equipmentList.type" placeholder="请输入" style="width:200px" />
        </FormItem>
        <FormItem label="设备聚隆编号">
          <Input v-model="equipmentList.number" placeholder="请输入" style="width:200px" />
        </FormItem>
        <FormItem label="关联设备"></FormItem>
        <FormItem label="无人机类型"></FormItem>
        <FormItem label="无人机">
          <a-checkbox-group style="display:flex;flex-wrap:wrap;">
            <div
              v-for="(option, index) in uavList"
              :key="index"
              style="width:260px;margin:0 5px 10px 0"
            >
              <a-checkbox :label="option.id">{{option.name}}</a-checkbox>
              <a-input-number :min="1" :max="100000" :defaultValue="3" />
            </div>
          </a-checkbox-group>
        </FormItem>
        <FormItem label="无人机电池">
          <a-checkbox-group style="display:flex;flex-wrap:wrap;">
            <div
              v-for="(option, index) in batteryList"
              :key="index"
              style="width:260px;margin:0 5px 10px 0"
            >
              <a-checkbox :label="option.id">{{option.name}}</a-checkbox>
              <a-input-number :min="1" :max="100000" :defaultValue="3" />
            </div>
          </a-checkbox-group>
        </FormItem>
      </Form>
    </a-modal>
  </div>
</template>

<script>
import { structureEquipment, equipmentTypeList,equipmentTypeSave,equipmentTypeDel,equipmentNewsList,equipmentNewsSave,equipmentNewsDel } from '@/api/login'
const treeData = []
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
      oneID:'',
      parentId:'0',
      treeId: '1',
      typeId:'',
      treeData,
      treeData1:[],
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
        name: '',
        type: '',
        number: ''
      },
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
      batteryList: [
        {
          name: '精灵4电池',
          id: '1'
        },
        {
          name: '精灵4 RTK 遥控器电',
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
  },
  methods: {
    getList(){
      this.treeData=[{
        label: '全部',
        id: '0',
        code:'1',
        children: [
        
        ]
      }]
      var data ={
        id:this.parentId
      }
      equipmentTypeList(data).then(res => {
        var sz = res.data
        for (let i = 0; i < sz.length; i++) {
          sz[i].key=i+1
        }
        this.data=sz
        
      }).catch(err => {

      })
      equipmentTypeList(data).then(res => {
        var arr =res.data
        for (let i = 0; i < arr.length; i++) {
          arr[i].key=i+1
          arr[i].code='2'
          arr[i].label=arr[i].name
          arr[i].children=[]
          this.treeData[0].children.push(arr[i])
        }
      }).catch(err => {

      })
    },
    campList(){
      var data={
        id:this.typeId
      }
      // equipmentNewsList(data).then(res => {
      //    var arr = res.data
      //    for (let i = 0; i < arr.length; i++) {
      //      arr[i].key=i+1
      //      arr[i].state=true
      //    }
      //    this.data1=arr
      //   }).catch(err => {

      // })
    },
    handleOk(e) {
      var data ={
        parentId:this.typeList.id,
        name:this.typeList.name
      }
      equipmentTypeSave(data).then(res => {
          this.$message.success('保存成功');
          this.visible = false;
          this.equipmentList.id=''
          this.equipmentList.name=''
          this.getList()
        }).catch(err => {
          this.$message.error(err.response.data.message);
      })
    },
    handleCancel(e) {
      this.equipmentList.id=''
      this.equipmentList.name=''
      this.visible = false;
    },
    twoGetList(){
      this.treeData=this.treeData1
      var data={
        id:this.typeList.id
      }
      equipmentTypeList(data).then(res => {
         var arr = res.data
        for (let i = 0; i < arr.length; i++) {
          arr[i].key=i+1
        }
        this.data=arr
        }).catch(err => {

      })
      // equipmentTypeList(data).then(res => {
      //    var arr = res.data
      //   for (let i = 0; i < arr.length; i++) {
      //     arr[i].key=i+1
      //     arr[i].code='3'
      //     arr[i].label=arr[i].name
      //     arr[i].children=[]
      //   }
      //   for (let i = 0; i < arr.length; i++) {
      //     this.treeData[0].children.push(arr[i])
      //   }
      //   //  this.data=arr
      //   // // console.log(arr);
        
      //   }).catch(err => {

      // })
    },
    select(e) {
      if (e.code=='1') {
        this.treeId='1'
      }else if(e.code=='2') {
        this.treeId='2'
        this.typeList.id=e.id
        this.twoGetList()
        // this.equipmentList.name=e.name
        // this.equipmentList.typeId=e.id
        // this.id=e.id
        // this.newList()
      }
    },
    handleSub() {}
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
