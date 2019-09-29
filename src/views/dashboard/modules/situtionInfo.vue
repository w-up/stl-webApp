<template>
     <a-modal title="任务完成情况" :visible="visible" onOk="handleOk">
        <template slot="footer">
            <a-button type="primary" @click="handleOk">确定</a-button>
        </template>
        <div class="sitution_info">
            <div class="" v-if="sitution == 0">
                <div class="" style="margin-bottom:15px;">
                    <p>任务开始前数据</p>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="12">无人机编号:</a-col>
                        <a-col :span="12">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">无人机电池:</a-col>
                        <a-col :span="8">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">内存卡编号:</a-col>
                        <a-col :span="8">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">ipad编号:</a-col>
                        <a-col :span="8">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">任务开始时间:</a-col>
                        <a-col :span="8">2019.6.9 13.00.21</a-col> 
                    </a-row>
                </div>
                <div>
                    <p>任务结束后数据</p>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">电池剩余电量:</a-col>
                        <a-col :span="8">40%</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">任务结束时间:</a-col>
                        <a-col :span="8">2019.6.9 13.00.21</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">备注:</a-col>
                        <a-col :span="8">2019.6.9 13.00.21</a-col> 
                    </a-row>
                </div>
            </div>
            <div class="" v-if="sitution == 2">
                <div class="" style="margin-bottom:15px;">
                    <p>任务开始前数据</p>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">调查的河道及位置点:</a-col>
                        <a-col :span="12">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">河道及其河岸的风险源:</a-col>
                        <a-col :span="12">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">内存卡编号:</a-col>
                        <a-col :span="12">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">ipad编号:</a-col>
                        <a-col :span="12">123</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">任务开始时间:</a-col>
                        <a-col :span="12">2019.6.9 13.00.21</a-col> 
                    </a-row>
                </div>
                <div>
                    <p>任务结束后数据</p>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">电池剩余电量:</a-col>
                        <a-col :span="12">40%</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">任务结束时间:</a-col>
                        <a-col :span="12">2019.6.9 13.00.21</a-col> 
                    </a-row>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="8">备注:</a-col>
                        <a-col :span="12">2019.6.9 13.00.21</a-col> 
                    </a-row>
                </div>
            </div>
        </div>
    </a-modal>
</template>
<script>
export default {
    name:'situtionInfo',
    data(){
        return{
            visible:false,
            sitution:2,
        }
    },
    methods:{
        show(){
            this.visible = true;
        },
        handleOk(){
            this.visible = false;
        }
    }
}
</script>
<style lang="less" scoped>
    .sitution_info p{
        margin-bottom: 5px;
        font-size: 15p;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
    }
</style>
