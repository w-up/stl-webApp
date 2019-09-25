<template>
  <a-modal
    title="添加街道"
    :width="400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :mask="true"
    :centered="true"
    :footer=null
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="from">
        <p>街道信息</p>
        <a-row style="width:100%">
          <a-col :span="24">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="街道名称">
              <a-input placeholder="请输入街道名称" />
            </a-form-item>
          </a-col>
        </a-row>
        <p style="margin-top: 10px;">负责人信息</p>
        <a-row style="width:100%">
          <a-col :span="24">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="姓名">
              <a-input placeholder="请输入姓名" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="24">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="职位">
              <a-input placeholder="请输入职位" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="24">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="联系电话">
              <a-input placeholder="请输入联系电话" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%; margin-top:10px;" type="flex" justify="space-around">
          <a-col :span="6">
            <a-button type="primary" block>取消</a-button>
          </a-col>
          <a-col :span="6">
            <a-button type="primary" block>保存</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
export default {
  data() {
    return {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 18 }
      },
      visible: false,
      confirmLoading: false,

      selectedItems: [], //风险源类型
      headers: {
        authorization: 'authorization-text'
      },

      options: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake',
          }, {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          }],
        }],
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          }],
        }],
      }],
      

      form: this.$form.createForm(this)
    }
  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o))
    }
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
    // 文件上传
    fileUpload(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    // 标签
    handleChangeTag(value) {
      console.log(`selected ${value}`)
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
    },
    // 选择地址
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions);
    },
    filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
  }
}
</script>
<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
.from {
  max-height: 520px;
}
</style>
