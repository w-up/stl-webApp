<template>
    <!-- <a-modal title="河道查询" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" :mask="false" @cancel="handleCancel">
        <a-input-search placeholder="请输入河道名称" @search="searchRiver"/>
    </a-modal> -->
    <div class="searchRiver" v-show="visible">
        <p class="searchTitle">河道查询 </p>
        <span class="closeSearch_r" @click="close"><a-icon type="close" /></span>
        <div class="searchInfo">
            <!-- <a-input placeholder="请输入河道名称" style="text-align:left;width: 240px;"/>
            <a-button shape="circle" icon="search" class="searchRiverBtn"/> -->
            <a-select
                showSearch
                :value="value"
                placeholder="请选择"
                style="width: 90%"
                :showArrow="false"
                :defaultActiveFirstOption="false"
                :filterOption="false"
                @search="handleSearch"
                @change="handleChange"
                :notFoundContent="null"
            >
                <!-- <a-spin v-if="loading" size="small" /> -->
                <a-select-option v-for="d in riverList" :key="d.id">{{d.name}}</a-select-option>
            </a-select>
        </div> 
    </div>
</template>
<script>
export default {
    name:'searchRiver',
    data(){
        return{
            visible:false,
            riverData: [
                {text:'黄浦江',value:'huang'},
                {text:'松花江',value:'song'},
                {text:'长江',value:'chang'}
            ],
            riverList:[],
            value: undefined,
            // loading:true
            // fetching: false
        }
    },
    methods:{ 
        show(riverList){
            this.visible = true;
            this.riverList = riverList
        },
        close(){
            this.visible = false;
        },
        searchRiver(value){
            console.log(value);
            this.visible = false;
        },
        handleSearch(value) {
            console.log('fetching user', value);
            this.riverData = this.riverData;
        },
        handleChange(id) {
            console.log(name);
            
            this.$parent.$parent.$parent.chooseRiver(id)
            // this.riverData = this.riverData;
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
        position: absolute;
        top:10px;
        right: 10px;
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

