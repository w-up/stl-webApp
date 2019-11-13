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
        <!-- <tui-image-editor :include-ui="useDefaultUI" :options="options"></tui-image-editor> -->
      </div>
      <a-divider orientation="left"></a-divider>
      <a-row style="width:100%; margin-top:10px;" type="flex" justify="space-around">
        <a-col :span="3">
          <a-button block>画笔</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>文字</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block @click="clipImage">裁剪</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block @click="lastStep">上一步</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>保存</a-button>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
// import '../js/main.js'
// import { ImageEditor } from '@toast-ui/vue-image-editor'
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      useDefaultUI: true,
      options: {
        // for options prop
        cssMaxWidth: 700,
        cssMaxHeight: 500
      }
    }
  },
  components: {
    // 'tui-image-editor': ImageEditor
  },
  computed: {},
  mounted() {
  },
  methods: {
    // 裁剪
    clipImage() {
    },
    // 上一步
    lastStep() {
    },
    init() {
      // var canvas = document.getElementById('canvasId')
      // var context = canvas.getContext('2d')
      // //加载图片
      // var image = new Image()
      // image.src = require('../../../assets/loginBg.jpg')
      // image.onload = function() {
      //   context.beginPath()
      //   //画裁剪区域，此处以圆为例
      //   // context.arc(50, 50, 50, 0, 2 * Math.PI)
      //   // context.clip() //次方法下面的部分为待剪切区域，上面的部分为剪切区域
      //   context.drawImage(image, 0, 0, canvas.width, canvas.height)
      // }
      // let image = document.getElementById('image')
      // var cropper = new Cropper(image, {
      //   aspectRatio: 16 / 9,
      //   viewMode: 1,
      //   crop: function(e) {
      //     console.log(e.detail.x)
      //     console.log(e.detail.y)
      //     console.log(e.detail.width)
      //     console.log(e.detail.height)
      //     console.log(e.detail.rotate)
      //     console.log(e.detail.scaleX)
      //     console.log(e.detail.scaleY)
      //   }
      // })
    },
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
@import '../css/cropper.css';
@import '../css/main.css';
// @import '../css/cropper.min.css';
.content {
  width: 100%;
  height: 450px;
  position: relative;
  #canvasId {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
