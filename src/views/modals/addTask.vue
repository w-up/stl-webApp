<template>
    <div class="addTask_info" v-if="isShow">
        <p class="addTask_title">追加任务</p>
        <a-form :form="addPlan" @submit="submitPlan" class="addTask_from">
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
            <a-form-item label="位置" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }" style="text-align:left;">
                <!-- <span style="cursor: pointer;color: #2fa0ec;font-size:12px;" @click="chooseLocation">
                    选择位置（地图上选点/画线）
                </span> -->
                <a-radio-group>
                    <a-radio-button value="0" @click="addPoint">点</a-radio-button>
                    <a-radio-button value="1" @click="addLineTool">线</a-radio-button>
                    <a-radio-button value="2" @click="addPolygonTool">面</a-radio-button>
                </a-radio-group>
                <a-button v-show="btnShow" style="width:90%;">查看</a-button>
            </a-form-item>
            <a-form-item label="任务职位" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }">
                <a-select style="width: 100%">
                    <a-select-option value='选择任务'>选择任务</a-select-option>
                    <a-select-option value='采水样'>采水样</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="是否紧急" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }" style="text-align:left;">
                <a-checkbox>紧急任务</a-checkbox>
            </a-form-item>
            <a-form-item label="图片上传" :label-col="{ span: 6}" :wrapper-col="{ span: 16 }" style="text-align:left;">
                <a-upload name="file" :multiple="true" action="''">
                    <a-button>
                        <a-icon type="upload" /> Click to Upload
                    </a-button>
                </a-upload>
            </a-form-item>
            <a-form-item :wrapper-col="{span:24}" style="text-align:center;margin-top:10px;">
                <a-button @click="cancleBtn" style="display:inline-block;width:40%;margin-right:10px;">取消</a-button>
                <a-button type="primary" @click="addPlanInfo" style="display:inline-block;width:40%;color:#FFFFFF;">添加</a-button>
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
           addPlan:{},
           lineTool:'',
           btnShow:false,
           checked:false,
           clickPoint:false,
           clickLine:false,
           clickPolygon:false
        }
    },
    methods:{
        show(){
            this.isShow = true;
        },
        cancle(){
            this.isShow = false
            this.clickPoint = false
            this.clickLine = false
            this.clickPolygon = false
        },
        addPlanInfo(){
            // this.isShow = false;
        },
        submitPlan(){
            
        },
        //画线
        chooseLocation(){
            this.$emit('chooseLocation')
            this.btnShow = true
        },
        cancleBtn(){
            this.$emit('cancleBtn')
        },
        addPoint(){
            if(this.clickPoint){
                this.clickPoint =  false
            }else{
                this.clickPoint = true;
            }
            console.log("子组件："+ this.clickPoint)
            this.$emit('addPoint', this.clickPoint)
            if(this.btnShow == false){
                this.btnShow = true
            } 
        },
        addLineTool(){
            if(this.clickLine){
                this.clickLine =  false
            }else{
                this.clickLine = true;
            }
            console.log("子组件："+ this.clickLine)
            this.$emit('addLineTool',this.clickLine)
            if(this.btnShow == false){
                this.btnShow = true
            } 
        },
        addPolygonTool(){
            if(this.clickPolygon){
                this.clickPolygon =  false
            }else{
                this.clickPolygon = true;
            }
            console.log("子组件："+ this.clickPolygon)
            this.$emit('addPolygonTool',this.clickPolygon)
            if(this.btnShow == false){
                this.btnShow = true
            } 
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
.addTask_from{
    padding-left: 20px;
    text-align: center;
}
</style>
