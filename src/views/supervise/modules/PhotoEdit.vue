<template>
  <a-modal
    title="图片展示"
    :width="980"
    :visible="visible"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading"
    :mask="true"
    :centered="true"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <div class="content">
        <img src="../../../assets/loginBg.jpg" alt />
      </div>
      <a-divider orientation="left"></a-divider>
      <a-row style="width:100%; margin-top:10px;" type="flex" justify="space-around">
        <!-- <a-button-group>
            <a-button>取消</a-button>
            <a-button>保存</a-button>
            <a-button>修改河道区域</a-button>
            <a-button>关闭河道</a-button>
        </a-button-group>-->
        <!-- <a-col :span="3">
          <a-button block @click="handleCancel">取消</a-button>
        </a-col>-->
        <a-col :span="3">
          <a-button block>画笔</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>文字</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>裁剪</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>上一步</a-button>
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
      visible: false,
      confirmLoading: false
    }
  },
  computed: {},
  mounted() {
    
  },
  methods: {
    // 显示弹窗
    showVisible() {
      this.visible = true
    },
    // 关闭弹窗
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 450px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
