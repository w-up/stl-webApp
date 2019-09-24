<template>
    <div class="addTask_info" v-if="isShow">
        <p class="addTask_title">追加任务</p>
        <a-form :form="addPlan" @submit="submitPlan">
        <a-form-item label="名称" :label-col="{span:6}" :wrapper-col="{span:16}">
            <a-input placeholder="请输入任务名称"></a-input>
        </a-form-item>
        <a-form-item label="任务类型" :label-col="{span:6}" :wrapper-col="{span:16}">
            <a-select>
            <a-select-option value='无人机'>无人机</a-select-option>
            <a-select-option value='采水样'>采水样</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="任务内容" :label-col="{ span: 6}" :wrapper-col="{ span: 16}">
            <a-textarea placeholder="Basic usage" :rows="4"/>
        </a-form-item>
        <a-form-item label="位置" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }">
            <span style="cursor: pointer;color: #2fa0ec;font-size:12px;">选择位置（地图上选点/画线）</span>
        </a-form-item>
        <a-form-item label="任务职位" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }">
            <a-select style="width: 100%">
            <a-select-option value='选择任务'>选择任务</a-select-option>
            <a-select-option value='采水样'>采水样</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="是否紧急" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }">
            <a-checkbox>紧急任务</a-checkbox>
        </a-form-item>
        <a-form-item label="图片上传" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }">
            <a-upload name="file" :multiple="true" action="''">
            <a-button>
                <a-icon type="upload" /> Click to Upload
            </a-button>
            </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{span:24}" style="text-align:center;margin-top:10px;">
            <a-button style="display:inline-block;width:40%;margin-right:10px;">取消</a-button>
            <a-button type="primary" @click="addPlanInfo" style="display:inline-block;width:40%;">添加</a-button>
        </a-form-item>
        </a-form>
    </div>
</template>
<script>
export default {
    name:'addTask',
    data(){
        return{
           isShow:false,
           cBtn:true,
           addPlan:{}
        }
    },
    methods:{
        show(){
            this.isShow = true;
        },
        addPlanInfo(){
            this.isShow = false;
            this.$emit('showAddBtn',this.cBtn);
        },
        submitPlan(){
            
        }
        // showBtn(){
        //     this.cBtn = true;
        // }
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
</style>
