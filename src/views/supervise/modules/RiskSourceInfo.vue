<template>
  <a-modal
    title="风险源信息"
    :width="360"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :mask="false"
    :centered="true"
    class="comment_model"
    :bodyStyle="{margin: 0, left:0}"
    :footer="null"
  >
    <a-row>
      <a-col :span="12">
        <p>内部编码: 4564654</p>
        <p>准确位置: 上海xxx</p>
        <p>面积: 4564654</p>
      </a-col>
      <a-col :span="12">
        <p>风险源类别: 4564654</p>
        <p>首次发现时间: 4564654</p>
        <p>河道所属: 4564654</p>
        <router-link to="#111">查看详情</router-link>
      </a-col>
    </a-row>
    <!-- <a-card style="width: 100%">
      <a-row>
        <a-col :span="12">
          <p>内部编码: 4564654</p>
          <p>准确位置: 上海xxx</p>
          <p>面积: 4564654</p>
          <p>首次发现时间: 4564654</p>
          <p>河道所属: 4564654</p>
        </a-col>
        <a-col :span="12">col-12</a-col>
      </a-row>
    </a-card>-->
    <a-list
      class="comment-list"
      :header="`${data.length} 条评论`"
      itemLayout="horizontal"
      :dataSource="data"
      size="small"
    >
      <a-list-item slot="renderItem" slot-scope="item" class="comment_list">
        <a-comment :author="item.author" :avatar="item.avatar">
          <div class="comment_level">
            <p>I 级</p>
            <span>存在</span>
          </div>
          <template slot="actions"></template>
          <p slot="content">{{item.content}}</p>
          <div class="comment_img">
            <img src="../../../../public/avatar2.jpg" alt />
            <img src="../../../../public/avatar2.jpg" alt />
            <img src="../../../../public/avatar2.jpg" alt />
            <img src="../../../../public/avatar2.jpg" alt />
          </div>
          <a-tooltip slot="datetime" :title="item.datetime">
            <span>{{item.datetime}}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>
    <a-button type="primary" block>更新风险状态</a-button>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,

      data: [
        {
          actions: ['Reply to'],
          author: '张三',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: '管理建议: 持续监督.',
          datetime: '2019-10-01'
        }
        // {
        //   actions: ['Reply to'],
        //   author: 'Han Solo',
        //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //   content:
        //     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        //   datetime: '222days'
        // }
      ]
    }
  },
  computed: {},
  methods: {
    riskInfo() {
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
<style lang="less" scoped>
.comment_level {
  p {
    display: inline-block;
    background-color: red;
    font-size: 12px;
    width: 40px;
    line-height: 20px;
    text-align: center;
    border-radius: 4px;
    color: white;
    margin: 0 6px 6px 0;
  }
  span {
    font-size: 14px;
    color: #333;
  }
}
.comment_img {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  flex-wrap: wrap;
  img {
    width: 30%;
    margin-bottom: 13px;
  }
}
</style>
