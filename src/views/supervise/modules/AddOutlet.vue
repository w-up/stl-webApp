<template>
  <a-modal
    title="排口"
    :width="980"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :mask="true"
    :centered="true"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="from">
        <h3>名称</h3>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="内部编码">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="标准编码">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="内部名称">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="标准名称">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <h3 style="margin-top: 10px;">位置</h3>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="排入水体名称">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="排入水体功能区名称">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="河道序号">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="河道管理等级">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="河道等级">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="所属街道">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="一级河长">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="二级河长">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="地标位置">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="地址">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="经度">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="纬度">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="准确位置">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <h3 style="margin-top: 10px;">属性</h3>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="类别">
              <a-select default-value="1" :allowClear="true" placeholder="请选择类别">
                <a-select-option value="1">雨水</a-select-option>
                <a-select-option value="2">生活</a-select-option>
                <a-select-option value="3">混合</a-select-option>
                <a-select-option value="4">工业</a-select-option>
                <a-select-option value="5">电厂温排水</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="排放方式">
              <a-select default-value="1" :allowClear="true" placeholder="请选择">
                <a-select-option value="1">连续</a-select-option>
                <a-select-option value="2">间接</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="入河方式">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="大小">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="实际年排放总量(万吨)">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="主要污染物">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="设置单位">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="单位地址">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="联系人">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="联系地址">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="封堵状态">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="情况说明">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <h3 style="margin-top: 10px;">等级情况</h3>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="建成时间">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="登记情况">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="批准情况">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="批准单位">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="排污许可">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="许可证号">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="排污许可">
              <a-input placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="许可证号">
              <a-input placeholder />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="影像">
            <a-col :span="24">
              <img
                src="../../../assets/loginBg.jpg"
                style="width:100%;height:100px;border-radius:4px;"
                alt
              />
            </a-col>
          </a-form-item>
        </a-row>
      </a-form>
      <a-divider orientation="left"></a-divider>
      <a-row style="width:100%; margin-top:10px;" type="flex" justify="space-around">
        <a-col :span="3">
          <a-button block @click="handleCancel">取消</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>保存</a-button>
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
        xs: { span: 18 },
        sm: { span: 16 }
      },
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

      form: this.$form.createForm(this),

      dataSource: [
        {
          key: '0',
          insideNum: '黄浦江',
          officialNum: 'HPJ1213',
          date: '2019-12-13'
        },
        {
          key: '1',
          insideNum: '长江',
          officialNum: 'CJ1212',
          date: '2019-12-12'
        }
      ],
      count: 2,
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          width: '10%',
          scopedSlots: { customRender: 'key' }
        },
        {
          title: '内部编号',
          dataIndex: 'insideNum'
        },
        {
          title: '官方编号',
          dataIndex: 'officialNum'
        },
        {
          title: '调查日期',
          dataIndex: 'date'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o))
    }
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
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
    onChangeDate(date, dateString) {
      console.log(date, dateString)
    },
    // 选择地址
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    }
  }
}
</script>
<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0;
}
.from {
  max-height: 450px;
  overflow-y: scroll;
  h3 {
    font-weight: 600;
    font-size: 15px;
  }
}
</style>
