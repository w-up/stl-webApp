<template>
     <a-modal title="任务完成情况" :visible="visible" onOk="handleOk">
        <template slot="footer">
            <a-button type="primary" @click="handleOk">确定</a-button>
        </template>
      <p>hehe</p>
    </a-modal>
</template>
<script>
export default {
    name:'situtionInfo',
    data(){
        return{
            visible:false
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

</style>
