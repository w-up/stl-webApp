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
        <a-modal title="计划" :visible="visible">
            <div class="modal_title">计划A
                <span><a-input placeholder="编辑计划名称" style="width:150px;margin-left:20px;"/></span>
            </div>
            <div class="modal-body">
                <a-card :tabList="planTab" :activeTabKey="noPlanTab" @tabChange="key => onTabChange(key,'noPlanTab')">
                    <!-- <div v-if="noPlanTab === 'one'">  
                    </div>
                    <div v-if="noPlanTab === 'two'"></div>
                    <div v-if="noPlanTab === 'three'"></div> --> 
                    <div class="card-info">
                        <a-form :form="planForm" @submit="submitPlan">
                            <div>人员:
                                <a-form-item label="飞手" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/>
                                </a-form-item>
                                <a-form-item label="调查员" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/>
                                </a-form-item>
                            </div>
                            <div>设备：
                                <a-input placeholder="请输入配件名称搜索" style="width:200px;margin-right:20px;"></a-input> 
                                <a-button>添加</a-button>
                                <a-form-item label="无人机类" :label-col="labelCol" :wrapper-col="wrapperCol">
                                    <span style="margin-right:20px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <!-- <a-checkbox-group :options="personList" v-model="personOne" @change="personChange" class="personCheck"/> -->
                                        <a-input-number :min="1" :max="10" v-model="number" @change="numberChange" style="width:40px;height:25px;line-height:25px;"/>
                                    </span>
                                    <span style="margin-right:20px;">
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number :min="1" :max="10" v-model="number" @change="numberChange" style="width:40px;height:25px;line-height:25px;"/>
                                    </span>
                                    <span>
                                        <a-checkbox @change="personChange">无人机</a-checkbox>
                                        <a-input-number :min="1" :max="10" v-model="number" @change="numberChange" style="width:40px;height:25px;line-height:25px;"/>
                                    </span>
                                </a-form-item>
                            </div>
                        </a-form>
                    </div>                  
                </a-card>   
            </div>
            <div class="modal-foot">
                <div class="foot-left" style="border-right:1px solid #e8e8e8;" @click="cancleBtn()">取消</div>
                <div class="foot-left" @click="submitPlan">保存</div>
            </div>
        </a-modal>
    </div>
</template>
<script>
import '../../assets/css/planList.less'

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
    name:'planList',
    data(){
        return{
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            treeData,
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
            number:3
        }
    },
    created(){
        this.visible = true;
    },
    watch: {
        checkedKeys(val) {
        console.log('onCheck', val)
        }
  },
    methods:{
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
        personChange(checkedValues){
            console.log('checked = ', checkedValues)
            console.log('value = ', this.value)
        },
        numberChange(val){
            console.log('changed', val);
        },
        cancleBtn(){
            this.visible = false;
        }
    }
}
</script>