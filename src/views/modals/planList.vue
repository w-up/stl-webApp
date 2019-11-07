<template>
    <div class="planList">
        <div class="planList_info">
            <p class="info_title" @click="clickBtn">组一</p>
            <div class="info_body">
                <p class="plan_title">黄浦江</p>
                <a-tree checkable v-model="checkedKeys" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
            </div>
        </div>
        <div class="planList_info">
            <p class="info_title">组二</p>
            <div class="info_body">
                <p class="plan_title">黄浦江</p>
                <a-tree checkable v-model="checkedKeys" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
            </div>
        </div>

        <!-- 弹框 -->
        <a-modal title="计划A" :width="600" :visible="visible" @ok="submitPlan" @cancel="cancleBtn" class="modal_plan">
            <span class="editIcon" @click="editModalTitle" v-if="editShow"><a-icon type="edit" /></span>
            <span style="position:absolute;top:12px;left:60px;" v-if="!editShow"><a-input placeholder="计划A" style="width:150px;margin-left:20px;"/></span>
            <div class="modal-body">
                <a-tabs  type="card" :animated="true">
                    <a-tab-pane v-for="option in planTab" :tab="option.name" :key="option.id"   >
                        <div class="card-info">
                            <a-form :form="planForm" @submit="submitPlan">
                                <div><span style="font-size:16px;font-weight:500;color: #1F1F1F;">人员:</span>
                                    <a-form-item :label="item.name" :label-col="labelCol" :wrapper-col="wrapperCol" v-for="item in option.roles"  :key="item.id">
                                        <!-- <el-checkbox-group >
                                            <el-checkbox v-for="chec in item.users"  :key="chec.id" :label="chec.id">{{chec.name}}</el-checkbox>
                                        </el-checkbox-group> -->
                                        <a-checkbox-group v-model="item.workerId" @change="sadsadasdsa(item.workerId,item.id)">
                                            <a-checkbox v-for="chec in item.users"  :key="chec.id" :value="chec.id">{{chec.name}}</a-checkbox>
                                        </a-checkbox-group>
                                    </a-form-item>
                                </div>
                                <!-- <div style="margin-top:13px;"><span style="font-size:16px;font-weight:500;color: #1F1F1F;">设备：</span>
                                    <a-input placeholder="请输入配件名称搜索" style="width:200px;margin-right:20px;margin-bottom:15px;"></a-input> 
                                    <a-button>添加</a-button>
                                    <a-form-item label="无人机类" :label-col="labelCol" :wrapper-col="wrapperCol">
                                        <span style="margin-right:30px;margin-left:10px;">
                                            <a-checkbox @change="personChange">无人机</a-checkbox>
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
                                </div> -->
                            </a-form>
                        </div> 
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-modal>
    </div>
</template>
<script>
import '../../assets/css/planList.less'
import { staffInspectPage,targetPage,groupingPage,deviceInspectPage} from '@/api/login'
const treeData = [{
  title: '无人机正射影像',
  key: '0-0',
}, {
  title: '360全景图',
  key: '0-1',
  children: [
    { title: '黄浦江360(一)', key: '0-1-0-0' },
    { title: '黄浦江360(二)', key: '0-1-0-1' },
  ],
}]

const personList = ['张三','李四','王五']
export default {
    name:'planList',
    data(){
        return{
            teamId:'',
            checkedKeys: ['0-1-0-0'],
            selectedKeys: [],
            treeData,
            visible:false,
            planTab:[],
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
            number:20,
            editShow:true
        }
    },
    created(){

    },
    watch: {
        checkedKeys(val) {
        console.log('onCheck', val)
        }
    },
    methods:{
        getstaffInspectPage(id){
            groupingPage(id).then(res=>{
                var arr = res.data
                
                for (const item of arr) {
                    item.roles = []
                    staffInspectPage(item.id).then(res=>{
                        var ar= res.data
                        ar.forEach(v => {
                           v. workerId = []
                        });
                        item.roles = ar
                    })
                    
                }
                this.planTab = arr
                console.log(arr);
            })
            // this.teamId = id
            // deviceInspectPage('').then(res=>{
            //     var arr= res.data.data
            //     console.log(arr);
                
            // })
            
        },
        onSelect (selectedKeys, info) {
            console.log('onSelect', info)
            this.selectedKeys = selectedKeys
        },
        handleOk(e){
            console.log(e);
            this.visible = false;
        },
        clickBtn(){
            this.visible = true;
        },
        //卡片改变
        onTabChange(key,type){
            console.log(key, type)
            this[type] = key
        },
        //表单提交
        submitPlan(e){
            // e.preventDefault();
            console.log(e);
            this.visible = false;
        },
        //人员修改
        numberChange(val){
        },
        cancleBtn(){
            this.visible = false;
        },
        changeTab(key){

        },
        editModalTitle(){
            this.editShow = false; 
        },
        sadsadasdsa(e,id){
            console.log(e,id);
        },
    }
}
</script>
<style lang="less" scoped>

</style>
