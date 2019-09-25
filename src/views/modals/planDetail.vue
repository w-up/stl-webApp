<template>
    <a-modal title="计划A" :width="600" :visible="visible" @ok="submitPlan" @cancel="cancleBtn">
            <span class="editIcon" @click="editModalTitle" v-if="editShow"><a-icon type="edit" /></span>
            <span style="position:absolute;top:12px;left:60px;" v-if="!editShow"><a-input placeholder="计划A" style="width:150px;margin-left:20px;"/></span>
            <div class=" ">
                <a-row style="padding-bottom:10px;">
                    <a-col :span="4" style="font-size:15px;">下发时间:</a-col>
                    <a-col :span="20">2019-07-02 14:30:45</a-col>
                </a-row>
                <a-row>
                    <a-col :span="4" style="font-size:15px;">下发人:</a-col>
                    <a-col :span="20">张三</a-col>
                </a-row>
            </div>
            <div class="modal-body">
                <a-card :tabList="planTab" :activeTabKey="noPlanTab" @tabChange="key => onTabChange(key,'noPlanTab')">
                    <div class="card-info">
                        <a-form :form="planForm" @submit="submitPlan">
                            <div><span style="font-size:16px;font-weight:500;color: #1F1F1F;">人员:</span>
                                <a-form-item label="飞手" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/>
                                </a-form-item>
                                <a-form-item label="调查员" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/>
                                </a-form-item>
                            </div>
                            <div style="margin-top:13px;"><span style="font-size:16px;font-weight:500;color: #1F1F1F;">设备：</span>
                                <a-input placeholder="请输入配件名称搜索" style="width:200px;margin-right:20px;margin-bottom:15px;"></a-input> 
                                <a-button>添加</a-button>
                                <a-form-item label="无人机类" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <span style="margin-right:30px;margin-left:10px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <!-- <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/> -->
                                        <a-input-number class="changeNumber" :min="1" :max="20" v-model="number" @change="numberChange"/>
                                    </span>
                                    <span style="margin-right:30px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange"/>
                                    </span>
                                    <span>
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange"/>
                                    </span>
                                </a-form-item>
                                <a-form-item label="无人机类" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <span style="margin-right:30px;margin-left:10px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <!-- <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/> -->
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange"/>
                                    </span>
                                    <span style="margin-right:30px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange"/>
                                    </span>
                                    <span>
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange"/>
                                    </span>
                                </a-form-item>
                                <a-form-item label="无人机类" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <span style="margin-right:30px;margin-left:10px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <!-- <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/> -->
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange"/>
                                    </span>
                                    <span style="margin-right:30px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange"/>
                                    </span>
                                    <span>
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number class="changeNumber" :min="1" :max="10" v-model="number" @change="numberChange" />
                                    </span>
                                </a-form-item>
                            </div>
                        </a-form>
                    </div>                  
                </a-card>   
            </div>
        </a-modal>
</template>
<script>
const planTab = [{
    key: 'one',
    tab:'组一'
},{
    key: 'two',
    tab:'组二'
},{
    key: 'three',
    tab:'组三' 
}] 
const personList = ['张三','李四','王五']
export default {
    name:'planDetail',
    data(){
        return{
            visible:false,
            planTab,
            noPlanTab:'one',
            planForm: this.$form.createForm(this),
            personList,
            personOne:[],
            labelCol:{
                xs:{span:24},
                sm:{span:4},
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:20},
            },
            number:3,
            editShow:true
        }
    },
    methods:{
        show(){
            this.visible = true;
        },
        submitPlan(){
            this.visible = false;
        },
        cancleBtn(){
            this.visible = false;
        },
        //卡片改变
        onTabChange(key,type){
            console.log(key, type)
            this[type] = key
        },
        //表单提交
        submitPlanInfo(e){
            // e.preventDefault();
            console.log(e);
            this.visible = false;
        },
        //人员修改
        personChange(checkedValues){
            console.log('checked = ', checkedValues)
            console.log('value = ', this.value)
        },
        numberChange(val){
            console.log('changed', val);
        },
        editModalTitle(){
            console.log(this.editShow);
            this.editShow = false; 
            console.log(this.editShow);
        }
    }
}
</script>
<style lang="less">
.addTask_info{
    width: 100%;
    // border-top: 1px solid #e8e8e8;
}
.addTask_title{
    width: 100%;
    height: 34px;
    line-height: 34px;
    border:  1px solid #F5F5F5;
    text-align: left;
    padding-left: 15px;
    background-color: #F5F5F5;
}
.ant-form-item{
    margin-bottom: 3px;
    // margin-bottom:0;
}
.detailPerson{
    padding:10px 20px;
    border-bottom: 1px solid #e8e8e8;
}
.editIcon{
    position:absolute;top:18px;left:82px;
    cursor: pointer;
}
.editIcon:hover{
    font-size: 16px;
}
</style>
