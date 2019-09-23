<template>
    <!-- <a-modal title="河道查询" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
        <a-input-search placeholder="请输入河道名称" @search="searchRiver"/>
    </a-modal> -->
    <div class="searchRiver" v-show="visible">
        <p class="searchTitle">河道查询 </p>
        <span class="closeSearch_r" @click="close"><a-icon type="close" /></span>
        <div class="searchInfo">
            <a-input placeholder="请输入河道名称" style="text-align:left;width: 240px;"/>
            <a-button shape="circle" icon="search" class="searchRiverBtn"/>
        </div> 
    </div>
</template>
<script>
export default {
    name:'searchRiver',
    data(){
        return{
            visible:false,
        }
    },
    methods:{
        show(){
            this.visible = true;
        },
        close(){
            this.visible = false;
        },
        searchRiver(value){
            console.log(value);
            this.visible = false;
        }
    }
}
</script>
<style scoped>
    .searchRiver{
        width: 300px;
        background-color: #FFFFFF;
        padding-bottom: 14px;
    }
    .searchTitle{
        text-align:left;
        padding:10px 0;
        padding-left: 20px;
        border-bottom: 1px solid#F5F5F5;
        background-color: #F5F5F5;
    }
    .closeSearch_r{
        position: fixed;
        top: 74px;
        right: 330px;
        cursor: pointer;
    }
    .searchInfo{
        width:100%;
    }
    .searchRiverBtn{
        margin-left:10px;
        width:25px;
        height:25px;
    }
</style>

