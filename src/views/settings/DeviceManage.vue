<template>
  <div >
    <a-card >
      <div style="display:flex;width:100%;box-sizing:border-box;">
        <div style="width:220px">
          <div class="boder-tree">
            <!-- <a-directory-tree
              multiple
              defaultExpandAll
              @select="onSelect"
              @expand="onExpand"
              :treeData="treeData"
            >
            </a-directory-tree> -->
            <Tree :data="treeData" @on-select-change='select'></Tree>
          </div>
        </div>
        <div style="width:100%;margin-left:20px">
          <div v-if="treeId==true">
            <a-button type="primary" icon="plus" @click="visible=true" style="margin-bottom:15px">添加</a-button>
            <a-table :columns="columns" :dataSource="data" bordered>
              <template slot="operation" slot-scope="row">
                <a @click="handleEdit(id)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleSub(id)">删除</a>
              </template>
            </a-table>
          </div>
          <div v-else>
            <p style="color: #333; font-weight: 900;font-size: 16px;">筛选查询</p>
            <div>
              <a-input placeholder="请输入设备名称" style="width:200px;margin:0  10px 0 0"/>
              <a-button type="primary" >查询</a-button>
            </div>
            <a-button type="primary" icon="plus" @click="equipmentModel=true" style="margin:15px 0" >添加</a-button>
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
    <a-modal
      title="添加以及设备类型"
      v-model="visible"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="设备名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-model='typeList.typeName'
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="添加设备"
      v-model="equipmentModel"
      :width="700"
    >
      <Form ref="formValidate" :model="equipmentList" :rules="ruleValidate" :label-width="90">
        <FormItem label="设备名称" prop="name">
          <Input v-model="equipmentList.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="设备型号" prop="type">
          <Input v-model="equipmentList.type" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="设备聚隆编号">
          <Input v-model="equipmentList.number" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="关联设备"></FormItem>
        <FormItem label="无人机类型"></FormItem>
        <FormItem label="无人机">
          <a-checkbox-group style="display:flex;flex-wrap:wrap;">
            <div v-for="(option, index) in uavList"  :key="index" style="width:260px;margin:0 5px 10px 0">
              <a-checkbox :label="option.id">{{option.name}}</a-checkbox>
              <a-input-number :min="1" :max="100000" :defaultValue="3"  />
            </div>
          </a-checkbox-group>
        </FormItem>
        <FormItem label="无人机电池">
          <a-checkbox-group style="display:flex;flex-wrap:wrap;">
            <div v-for="(option, index) in batteryList"  :key="index" style="width:260px;margin:0 5px 10px 0">
              <a-checkbox :label="option.id">{{option.name}}</a-checkbox>
              <a-input-number :min="1" :max="100000" :defaultValue="3"  />
            </div>
          </a-checkbox-group>
        </FormItem>
      </Form>
    </a-modal>
  </div>
</template>

<script>
const treeData = [{
  title: '全部',
  key: '1',
  id:'1',
  children: [{
    title: '无人机类型',
    key: '2-2',
    id:'2',
    children: [
      { title: '无人机', key: '3-1',id:'3' },
      { title: '无人机螺旋桨', key: '3-2',id:'3' },
      { title: '无人机电池', key: '3-3' ,id:'3'},
    ],
  }, {
    title: '采水样类型',
    key: '2-3',
    id:'2',
    children: [
     
    ],
  }],
}]
const columns = [
   {
    title: '序号',
    width:80,
    dataIndex: 'key',
  }, {
    title: '一级类型名称',
    dataIndex: 'typeName',
  },{
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width:120,
  }
];
const columns1 = [
   {
    title: '序号',
    width:80,
    dataIndex: 'key',
  }, {
    title: '设备名称',
    dataIndex: 'typeName',
  }, {
    title: '数量',
    dataIndex: 'number',
  },{
    title: '状态',
    scopedSlots: { customRender: 'state' },
    width:100,
  },{
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width:170,
  }
];
const data = [{
  id:'111',
  key: '1',
  typeName: '无人机类型',
  }, {
    key: '2',
    id:'222',
    typeName: '采水样类型',
}];
export default {
  data () {
    return {
      treeId:true,
      treeData,
      columns,
      columns1,
      data,
      visible:false,
      equipmentModel:false,
      typeList:{
        id:'',
        typeName:'',
      },
      equipmentList:{
        name:'',
        type:'',
        number:'',
      },
      ruleValidate: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      data1:[
        {
          id:'111',
          key: '1',
          number:'2',
          typeName: '无人机1',
          state:true
        },
        {
          key: '2',
          id:'222',
          number:'1',
          typeName: '无人机2',
          state:true
        },
        {
          key: '3',
          id:'333',
          number:'4',
          typeName: '无人机2',
          state:false
        }
      ],
      uavList:[
        {
          name:'Marvic 2 Pro',
          id:'1',
        },
        {
          name:'Marvic 2 Pro',
          id:'2',
        },
        {
          name:'Marvic 3',
          id:'3',
        },
        {
          name:'Marvic 3',
          id:'3',
        },
        {
          name:'Marvic 3',
          id:'3',
        },
      ],
      batteryList:[
        {
          name:'精灵4电池',
          id:'1',
        },
        {
          name:'精灵4 RTK 遥控器电',
          id:'2',
        },
        {
          name:'Marvic 3',
          id:'3',
        },
        {
          name:'Marvic 3',
          id:'3',
        },
        {
          name:'Marvic 3',
          id:'3',
        },
      ],
      form: this.$form.createForm(this),
    }
  },
  watch: {

  },
  methods: {
    select(e){
      console.log(e);
      if (e[0].id=='1') {
        this.treeId=true
      }else{
        this.treeId=false
      }
    },
    handleEdit(row){
      this.visible=true
      this.typeList.id=row.id
      this.typeList.typeName=row.typeName
    },
    handleSub(){
      
    },

  },
}
</script>

<style lang="less" scoped>
.boder-tree{
  
  border: 1px solid #b8b8b8
}

</style>
