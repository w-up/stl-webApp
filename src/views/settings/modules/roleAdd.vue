<template>
<div>
    <a-card title="权限设置">
        <a-button  slot="extra" @click="backPage">返回上一页</a-button>
        <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="90">
            <FormItem label="编号" prop="number">
                <Input v-model="list.number" placeholder="请输入" style="width:200px"></Input>
            </FormItem>
            <FormItem label="类型" prop="type" >
                <a-select  style="width: 200px" placeholder="请选择" v-model="list.type">
                    <a-select-option value="jack">外勤</a-select-option>
                    <a-select-option value="lucy">内业</a-select-option>
                    <a-select-option value="123">外部用户</a-select-option>
                </a-select>
            </FormItem>
            <FormItem label="名称" prop="name">
                <Input v-model="list.name" placeholder="请输入" style="width:200px"></Input>
            </FormItem>
            <FormItem >
                <a-tabs defaultActiveKey="1">
                    <a-tab-pane tab="巡河" key="1">
                        <a-table :columns="columns" :dataSource="data" bordered>
                            <template slot="see" slot-scope="row">
                                <a-checkbox>查看</a-checkbox>
                            </template>
                            <template slot="del" slot-scope="row">
                                <a-checkbox>操作</a-checkbox>
                            </template>
                        </a-table>
                    </a-tab-pane>
                    <a-tab-pane tab="监管" key="2" forceRender>
                        <a-table :columns="columns" :dataSource="data" bordered>
                            <template slot="see" slot-scope="row">
                                <a-checkbox>查看</a-checkbox>
                            </template>
                            <template slot="del" slot-scope="row">
                                <a-checkbox>操作</a-checkbox>
                            </template>
                        </a-table>
                    </a-tab-pane>
                    <a-tab-pane tab="设置" key="3">
                        <a-table :columns="columns" :dataSource="data" bordered>
                            <template slot="see" slot-scope="row">
                                <a-checkbox>查看</a-checkbox>
                            </template>
                            <template slot="del" slot-scope="row">
                                <a-checkbox>操作</a-checkbox>
                            </template>
                        </a-table>
                    </a-tab-pane>
                </a-tabs>
            </FormItem>
            <FormItem >
                 <Button  style="margin-right:15px;" @click="backPage">返回</Button>
                <Button type="success"  style="">保存</Button>
            </FormItem>
        </Form>
    </a-card >
</div>
</template>

<script>
const columns = [{
  title: '名称',
  dataIndex: 'name',
}, {
  title: '查看',
  scopedSlots: { customRender: 'see' },
}, {
  title: '操作',
  scopedSlots: { customRender: 'del' },
}];
export default {
    data(){
        return{
            list:{
                number:'',
                type:'',
                name:''
            },  
            ruleValidate: {
                number: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
            },
            columns,
            data:[
                {
                    key:'1',
                    name:'巡河计划'
                },
                {
                    key:'12',
                    name:'今日计划'
                },
            ]
        }
    },
    methods:{
        backPage(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>

  
</style>
