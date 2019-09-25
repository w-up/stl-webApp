<template>
  <a-modal
    title="添加督办单"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :mask="false"
    :centered="true"
  >
    <a-spin :spinning="confirmLoading">
      <a-form>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="督办单名称">
          <a-input placeholder="请输入督办单名称" />
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="所属街道" has-feedback>
          <a-select default-value="1">
            <a-select-option value="1">黄浦江</a-select-option>
            <a-select-option value="2">流沙河</a-select-option>
            <a-select-option value="3">大渡河</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="所属河流" has-feedback>
          <a-select default-value="1">
            <a-select-option value="1">黄浦江</a-select-option>
            <a-select-option value="2">流沙河</a-select-option>
            <a-select-option value="3">大渡河</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="添加河流" has-feedback>
          <a-input-search placeholder="输入河道名称添加" @search="addRiver">
            <a-button slot="enterButton">确定</a-button>
          </a-input-search>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="风险源类型" has-feedback>
          <a-select
            mode="multiple"
            placeholder="请选择类型"
            :value="selectedItems"
            @change="handleChange"
            style="width: 100%"
          >
            <a-select-option v-for="item in filteredOptions" :key="item" :value="item">{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="文件" has-feedback>
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="fileUpload"
          >
            <a-button style="width: 100%;display:inline-block;">
              <a-icon type="upload" />上传
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="调查日期" has-feedback>
          <a-date-picker style="width: 100%" />
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="标签" has-feedback>
          <a-select
            mode="multiple"
            :defaultValue="['a1', 'b2']"
            style="width: 100%"
            @change="handleChangeTag"
            placeholder="请添加标签"
          >
            <a-select-option
              v-for="i in 25"
              :key="(i + 9).toString(36) + i"
            >{{(i + 9).toString(36) + i}}</a-select-option>
          </a-select>
        </a-form-item>
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
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,

      selectedItems: [], //风险源类型
      headers: {
        authorization: 'authorization-text'
      },

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
    }
  }
}
</script>
<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>
