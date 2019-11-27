<template>
  <a-modal
    title="水面漂浮物"
    :width="980"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="saveClick"
    @click="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="from">
        <h3>名称</h3>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="名称">
              <a-input placeholder  v-model="list.innerName"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="河道">
              <a-select                
                :allowClear="true"
                placeholder="请输入河流"
                optionFilterProp="children"
                style="width: 100%"
                v-model="list.riverId"
              >
                <a-select-option
                  :value="item.id"
                  v-for="(item, index) in riverList"
                  :key="index"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="街道">
               <a-select
                :allowClear="true"
                placeholder="请输入街道"
                optionFilterProp="children"
                style="width: 100%"
                v-model="list.streetId"
              >
                <a-select-option
                  :value="item.id"
                  v-for="(item, index) in streetList"
                  :key="index"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="位置">
              <a-input placeholder v-model="list.address" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="面积">
              <a-input placeholder  v-model="list.currentArea" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="创建时间">
              <a-date-picker style="width:100%"  :format="dateFormat" @change="onChange"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-divider orientation="left"></a-divider>
      <!-- <a-row style="width:100%; margin-top:10px;" type="flex" justify="space-around">
        <a-col :span="3">
          <a-button block @click="handleCancel">取消</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>保存</a-button>
        </a-col>
      </a-row> -->
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { getRiverList,getStreetList,floatageSave} from '@/api/login'
export default {
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      labelCol: {
        xs: { span: 18 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 16 }
      },
      list:{
        drawId:'',
        innerName:'',
        address:'',
        riverId:'',
        streetId:'',
        currentArea:'',
        discoveryTime:''
      },
      visible: false,
      confirmLoading: false,
      riverList:[],
      streetList:[]
    }
  },
  computed: {
  },
  methods: {
    moment,
    getList(){
      getRiverList(this.$store.state.id).then(res=>{
        this.riverList = res.data.data
      })
      getStreetList(this.$store.state.id).then(res=>{
        this.streetList = res.data.data
      })
    },
    add(id,currentArea,result) {
      // console.log(id,currentArea,result);
      this.getList()
      this.list.drawId =id
      this.list.address = result.formatted_address
      this.list.currentArea = currentArea
      this.visible = true
    },
    saveClick(){
      let data = this.list
      floatageSave(data).then(res=>{
        this.$message.success('保存成功')
        this.$parent.getMapdrawPage()
        this.handleCancel()
      }).catch(err => {
        this.$message.error(err.response.data.message);
      })
    },
    onChange(date, dateString) {
      this.list.discoveryTime = dateString
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
      this.list.drawId=''
      this.list.innerName=''
      this.list.address=''
      this.list.riverId=''
      this.list.streetId=''
      this.list.currentArea=''
      this.list.discoveryTime=''
    },
  }
}
</script>
<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0;
}
.from {
  max-height: 450px;
  // overflow-y: scroll;
  h3 {
    font-weight: 600;
    font-size: 15px;
  }
}
</style>
