<template>
  <a-modal
    title="添加任务点"
    :width="400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :mask="true"
    :centered="true"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <a-row style="width:100%" type="flex" justify="space-between" align="middle">
        <a-col :span="6">任务点名称</a-col>
        <a-col :span="18">
          <a-input placeholder="任务点名称" />
        </a-col>
      </a-row>
      <a-row style="width:100%;margin-top:10px;" type="flex" justify="space-between" align="top">
        <a-col :span="6">位置信息</a-col>
        <a-col :span="18">上海市黄浦区人民广场巴拉巴拉小魔仙28号</a-col>
      </a-row>
      <a-row style="width:100%;margin-top:10px;" type="flex" justify="space-between" align="top">
        <a-col :span="6">所属河道</a-col>
        <a-col :span="18">
          <span>已为您匹配到相关河道, 您可以手动添加或删除河道</span>
          <a-col :span="24" style="margin-top:10px;">
            <a-select
              showSearch
              placeholder="请输入河流"
              optionFilterProp="children"
              style="width: 100%"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
              :filterOption="filterOption"
              v-model="defaultRiver"
            >
              <a-select-option :value="item.name" v-for="(item, index) in riverList" :key="index">
                <a-row style="width:100%">
                  <a-col :span="20">{{item.name}}</a-col>
                  <a-col :span="4">
                    <a-button
                      size="small"
                      shape="circle"
                      icon="close"
                      @click.stop="deleteRiver(item.name)"
                    />
                  </a-col>
                </a-row>
              </a-select-option>
            </a-select>
          </a-col>
        </a-col>
      </a-row>
      <a-row style="width:100%;margin-top:10px;" type="flex" justify="space-between" align="middle">
        <a-col :span="6">月计划次数</a-col>
        <a-col :span="18">
          <a-input placeholder="请输入月计划次数" />
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
        xs: { span: 6 },
        sm: { span: 18 }
      },
      defaultRiver: '黄浦江',
      riverList: [
        {
          id: 0,
          name: '黄浦江',
          clicked: true
        },
        {
          id: 1,
          name: '大治河',
          clicked: false
        },
        {
          id: 2,
          name: '川杨河',
          clicked: false
        },
        {
          id: 3,
          name: '蕰藻浜',
          clicked: false
        },
        {
          id: 4,
          name: '龙华港',
          clicked: false
        },
        {
          id: 5,
          name: '太浦河',
          clicked: false
        },
        {
          id: 6,
          name: '太湖',
          clicked: false
        }
      ],
      visible: false,
      confirmLoading: false,

      selectedItems: [], //风险源类型
      headers: {
        authorization: 'authorization-text'
      },

      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                },
                {
                  value: 'xiasha',
                  label: 'Xia Sha',
                  disabled: true
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua men'
                }
              ]
            }
          ]
        }
      ],

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
      console.log(value, selectedOptions)
    },
    filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    // 搜索
    handleChange(index) {
      console.log(`selected ${index}`)
      this.riverList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
        } else {
          value.clicked = false
        }
      })
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 删除河道
    deleteRiver(index) {
      console.log(index)
      this.riverList.splice(this.riverList.findIndex(item => item.name === index), 1)
      this.$message.success('删除成功')
      this.defaultRiver = null
    }
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
