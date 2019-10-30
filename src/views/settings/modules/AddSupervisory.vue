<template>
  <a-modal
    title="添加督办单"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :centered="true"
  >
    <a-spin :spinning="confirmLoading">
      <a-form>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="督办单名称">
          <a-input placeholder="请输入督办单名称" v-model="list.name"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="所属街道" has-feedback>
          <a-select
            showSearch
            mode="multiple"
            :allowClear="true"
            placeholder="请输入街道"
            optionFilterProp="children"
            style="width: 100%"
            @change="handleChange1"
            :filterOption="filterOption"
            v-model="streetId"
          >
            <a-select-option
              :value="item.id"
              v-for="(item, index) in streetList"
              :key="index"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="所属河流" has-feedback>
          <a-select
            showSearch
            mode="multiple"
            :allowClear="true"
            placeholder="请输入河流"
            optionFilterProp="children"
            style="width: 100%"
            @change="handleChange2"
            :filterOption="filterOption"
            v-model="riverId"
          >
            <a-select-option
              :value="item.id"
              v-for="(item, index) in riverList"
              :key="index"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="风险源类型" has-feedback>
          <a-select
            showSearch
            mode="multiple"
            :allowClear="true"
            placeholder="请输入风险源"
            optionFilterProp="children"
            style="width: 100%"
            @change="handleChange3"
            :filterOption="filterOption"
            v-model="riskSourceTypeId"
          >
            <a-select-option
              :value="item.id"
              v-for="(item, index) in labelList"
              :key="index"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="文件" has-feedback>
          <el-upload
            class="upload-demo"
            ref="upload"
            :data="list"
            name="attachment"
            :headers="headers"
            action="/server/data/admin/supervision/save"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-change="uploadChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit='1'
            :auto-upload="false">
            <a-button type="primary" icon="plus" >添加</a-button>
          </el-upload>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="调查日期" has-feedback>
          <a-date-picker style="width: 100%"  v-model="list.surveyDate" />
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="标签" has-feedback>
            <a-input placeholder="使用逗号分隔"  v-model="list.tags"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="备注" has-feedback>
            <a-input placeholder=""  v-model="list.remark"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
import {SuperviseSave,SuperviseDetail} from '@/api/login'
export default {
  props:{
    streetList: Array,
    riverList: Array,
    labelList: Array,
  },
  data() {
    return {
      fileList:[],
      file:false,
      list:{
        id:'',
        projectId:'5da7d092ea6c156d792df816',
        name:'',
        streetId:'',
        riverId:'',
        riskSourceTypeId:'',
        surveyDate:'',
        remark:'',
        tags:'',
      },
      streetId:[],
      riverId:[],
      riskSourceTypeId:[],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      headers: {
        Authorization: '',
        'X-TENANT-ID': 'jl:jlgis@2019' 
      },
      form: this.$form.createForm(this)
    }
  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o))
    }
  },
  mounted(){
    this.headers.Authorization=Vue.ls.get(ACCESS_TOKEN)
  },
  methods: {
    add() {
      this.visible = true
    },
    // 添加河流
    addRiver(value) {
      console.log(value)
    },
    // 风险源类型
    handleChange(selectedItems) {
      this.selectedItems = selectedItems
      console.log(selectedItems)
    },
    handleChange1(index) {
      console.log(`selected ${index}`)
      this.streetList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
          this.map.setViewport(value.lineData)
          this.drawAllRiver()
        } else {
          value.clicked = false
        }
      })
    },
    handleChange2(index) {
      console.log(`selected ${index}`)
      this.riverList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
          this.map.setViewport(value.lineData)
          this.drawAllRiver()
        } else {
          value.clicked = false
        }
      })
    },
    handleChange3(index) {
      console.log(`selected ${index}`)
      this.labelList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
          this.map.setViewport(value.lineData)
          this.drawAllRiver()
        } else {
          value.clicked = false
        }
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleCancel() {
      this.visible = false
      this.list.id=''
      this.list.name=''
      this.list.streetId=''
      this.list.riverId=''
      this.list.riskSourceTypeId=''
      this.streetId=[]
      this.riverId=[]
      this.riskSourceTypeId=[]
      this.list.surveyDate=''
      this.list.remark=''
      this.list. tags=''
    },
    handleSubmit() {
      this.list.streetId=this.streetId.join(',')
      this.list.riverId=this.riverId.join(',')
      this.list.riskSourceTypeId=this.riskSourceTypeId.join(',')
      if (this.fileList.length == 0) {
        var data = this.list
        SuperviseSave(data).then(res => {
            this.$message.success('保存成功');
            this.$parent.getList();
            this.handleCancel()
        }).catch(err => {
            this.$message.error(err.response.data.message);
        })
      }else{
        this.$refs.upload.submit();
      }
    },
    handleSuccess(response, file, fileList){
      this.$message.success('保存成功');
      this.$parent.getList();
      this.handleCancel()
    },
    uploadChange(file, fileList){
      if(this.fileList.length==0){
        this.fileList=fileList
      }else{
        this.fileList=[]
      }
      this.attachmentJpg=window.URL.createObjectURL(file.raw)
    },
    handleRemove(file, fileList) {
      
    },
    handlePreview(file) {
    }
  }
}
</script>
<style lang="less" >
.ant-form input[type='file'] {
  display: none; 
}
</style>
<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>
