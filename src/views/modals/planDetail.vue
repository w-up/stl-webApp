<template>
    <a-modal title="计划" :width="1200" :visible="visible" @ok="submitPlan" @cancel="cancleBtn" class="palnDetail_modal">
            <span class="editIcon" @click="editModalTitle" v-if="editShow"><a-icon type="edit" /></span>
            <span style="position:absolute;top:12px;left:60px;" v-if="!editShow"><a-input placeholder="计划A" style="width:150px;margin-left:20px;"/></span>
            <div class="planDetail_info">
                <a-row style="padding-bottom:10px;">
                    <a-col :span="4" style="font-size:15px;">下发时间:</a-col>
                    <a-col :span="20">{{date}}</a-col>
                </a-row>
                <a-row>
                    <a-col :span="4" style="font-size:15px;">下发人:</a-col>
                    <a-col :span="20">{{name}}</a-col>
                </a-row>
            </div>
            <div class="modal-body">
                <a-tabs  type="card" :animated="true">
                    <a-tab-pane v-for="option in planTab" :tab="option.name" :key="option.id"   >
                        <div class="card-info">
                            <a-form :form="planForm">
                                <div><span style="font-size:16px;font-weight:500;color: #1F1F1F;">人员:</span>
                                    <a-form-item :label="item.name+' ('+item.amount+'人)'" :label-col="labelCol" :wrapper-col="wrapperCol" v-for="item in option.roles"  :key="item.id">
                                        <a-checkbox-group v-model="item.workerId" >
                                            <a-checkbox v-for="chec in item.users"  :key="chec.id" :value="chec.id">{{chec.name}}</a-checkbox>
                                        </a-checkbox-group>
                                    </a-form-item>
                                </div>
                                <div><span style="font-size:16px;font-weight:500;color: #1F1F1F;">设备:</span>
                                    <a-form-item :label="item.name" :label-col="labelCol" :wrapper-col="wrapperCol" v-for="item in option.devices"  :key="item.id">
                                        <a-checkbox-group v-model="item.workerId" @change="sadsadasdsa()" style="width:100%;display:flex">
                                            <div  style="width:200px;margin:0 15px 10px 0;display:flex;justify-content:space-between"  v-for="devi in item.devices"  :key="devi.device.id">
                                                <a-checkbox disabled :value="devi.device.id" >{{devi.device.name}}</a-checkbox>
                                                <a-input-number class="changeNumber" :min="devi.amount1"  v-model="devi.amount" />
                                            </div>
                                        </a-checkbox-group>
                                    </a-form-item>
                                </div>
                            </a-form>
                        </div> 
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-modal>
</template>
<script>
import { staffInspectPage,planDetail,targetPage,groupingPage,asdasdasdasd,memberRiverSave,equipmentRiverSave,planPublish} from '@/api/login'
export default {
    name:'planDetail',
    data(){
        return{
            date:'',
            name:'',
            visible:false,
            teamId:'',
            planTab:[],
            noPlanTab:'one',
            planForm: this.$form.createForm(this),
            personOne:[],
            labelCol:{
                xs:{span:15},
                sm:{span:3},
            },
            wrapperCol:{
                xs:{span:15},
                sm:{span:18},
            },
            number:3,
            editShow:true
        }
    },
    methods:{

        show(id){
            this.visible = true;
            this.id = id
            planDetail(id).then(res=>{
                console.log(res.data);
                this.name = res.data.creator.name
                this.date = res.data.date
            })
            asdasdasdasd(id).then(res=>{
                console.log(res.data);
                
            })
            groupingPage(id).then(res=>{
                var arr = res.data
                for (const item of arr) {
                    item.roles = []
                    item.devices=[]
                    asdasdasdasd(item.id).then(res=>{
                        var arrr= res.data.data
                        arrr.forEach(v => {
                           v. workerId = []
                        });
                        item.devices=arrr  
                    })
                    // staffInspectPage(item.id).then(res=>{
                    //     var ar= res.data
                    //     ar.forEach(v => {
                    //        v. workerId = []
                    //        v.name = v.role.name
                    //     });
                    //     item.roles = ar
                    // })
                 }
                this.planTab = arr
                // this.spinning=false
            })
            this.teamId = id
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
.editIcon{
    position:absolute;top:18px;left:82px;
    cursor: pointer;
}
.editIcon:hover{
    font-size: 16px;
}
.palnDetail_modal .ant-modal-body{
    padding:0;
}
.planDetail_info{
    padding:10px 20px;
    border-bottom: 1px solid #e8e8e8;
}
</style>
