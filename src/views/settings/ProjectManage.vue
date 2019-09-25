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
            <a-button type="primary" icon="plus" @click="equipmentModel=true" style="margin-bottom:15px" >添加</a-button>
            <a-table :columns="columns1" :dataSource="data1" bordered>
              <template slot="operation" slot-scope="row">
                <a @click="equipmentModel=true">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleSub(id)">删除</a>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </a-card>
    <a-modal
      title=" 添加一级项目"
      v-model="visible"
    >
      <Form ref="formValidate" :model="equipmentList" :rules="ruleValidate" :label-width="90">
        <FormItem label="项目名称" prop="name">
          <Input v-model="equipmentList.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
      </Form>
    </a-modal>
    <a-modal
      title="添加二级项目"
      v-model="equipmentModel"
    >
      <Form ref="formValidate" :model="equipmentList" :rules="ruleValidate" :label-width="90">
        <FormItem label="上级项目" prop="name">
          <Input v-model="equipmentList.name" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="项目名称" prop="type">
          <Input v-model="equipmentList.type" placeholder="请输入" style="width:200px"></Input>
        </FormItem>
        <FormItem label="间隔周期">
          <a-select  style="width: 200px" placeholder="请选择" >
            <a-select-option value="si" >日</a-select-option>
            <a-select-option value="sis" >周</a-select-option>
            <a-select-option value="dsi" >月</a-select-option>
          </a-select>
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
    title: '上海市',
    key: '2-2',
    id:'2',
    children: [
      { title: '黄浦区', key: '3-1',id:'3' },
      { title: '浦东新区', key: '3-2',id:'3' },
      { title: '静安区', key: '3-3' ,id:'3'},
    ],
  }, {
    title: '四川省',
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
    title: '一级分类名称',
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
    title: '二级分类名称',
    dataIndex: 'typeName',
  },{
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width:120,
  }
];
const data = [{
  id:'111',
  key: '1',
  typeName: '上海市',
  }, {
    key: '2',
    id:'222',
    typeName: '四川省',
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
          typeName: '黄浦区',
          state:true
        },
        {
          key: '2',
          id:'222',
          number:'1',
          typeName: '浦东新区',
          state:true
        },
        {
          key: '3',
          id:'333',
          number:'4',
          typeName: '闵行区',
          state:false
        }
      ],

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
