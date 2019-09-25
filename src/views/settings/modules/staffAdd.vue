<template>
<div>
    <a-card title="新增/编辑员工">
        <a-button  slot="extra" @click="backPage">返回上一页</a-button>
        <Form ref="formValidate" :model="list" :rules="ruleValidate" :label-width="90">
            <h3>员工信息</h3>
            <FormItem label="手机号" prop="phone">
                <Input v-model="list.phone" placeholder="请输入" style="width:200px"></Input>
            </FormItem>
            <FormItem label="登录密码" prop="password">
                <Input v-model="list.password" placeholder="请输入" style="width:200px"></Input>
            </FormItem>
            <FormItem label="编号" prop="number">
                <Input v-model="list.number" placeholder="请输入" style="width:200px"></Input>
            </FormItem>
            <FormItem label="姓名" prop="name">
                <Input v-model="list.name" placeholder="请输入" style="width:200px"></Input>
            </FormItem>
            <FormItem label="性别" prop="sex">
                 <a-select  style="width: 200px" placeholder="请选择" v-model="list.sex">
                    <a-select-option value="jack">男</a-select-option>
                    <a-select-option value="lucy">女</a-select-option>
                </a-select>
            </FormItem>
            <h3>权限信息</h3>
            <FormItem label="角色" >
                <p>外勤</p>
                <a-checkbox-group >
                    <a-checkbox v-for="(option, index) in externalList"  :key="index">{{option.name}}</a-checkbox>
                </a-checkbox-group>
                <p>内业</p>
                <a-checkbox-group >
                    <a-checkbox v-for="(option, index) in externalList"  :key="index">{{option.name}}</a-checkbox>
                </a-checkbox-group>
            </FormItem>
            <FormItem label="管理范围" >
                <a-card style="min-height: 200px;width:300px">
                    <a-directory-tree :treeData="treeData" ></a-directory-tree>
                </a-card>
                <!-- <Tree :data="treeData" :expand='true'></Tree> -->
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

export default {
    data(){
        return{
            list:{
                number:'',
                phone:'',
                name:'',
                password:'',
                sex:'',
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
            externalList:[
                {
                    name:'主飞手'
                },
                {
                    name:'副飞手'
                },
                {
                    name:'河道管理员'
                },
            ],
            treeData : [{
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
            }],
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
