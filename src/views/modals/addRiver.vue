<template>
    <a-modal title="河道查询" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
        <a-input-search placeholder="请输入河道名称" @search="searchRiver"/>
    </a-modal>
</template>
<script>
export default {
    name:'addRiver',
    data(){
        return{
            visible:false,
            confirmLoading:false
        }
    },
    methods:{
        show(){
            this.visible = true;
        },
        searchRiver(val){
            console.log(val);
        },
        handleOk(e){
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            },2000);
        },
        handleCancel(e){
            this.visible = false;
        }
    }
}
</script>
